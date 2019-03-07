import 'babel-polyfill';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mailUser from '../helpers/mailer';
import db from '../model/query';

dotenv.config();

class UserController {
  static async signUser(req, res) {
    try {
      const {
        firstname, lastname, othername, email, phoneNumber, userPassword, passportUrl, isAdmin,
      } = req.body;
      let text; let param;
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(userPassword, salt);
      if (typeof isAdmin === 'undefined') {
        text = 'INSERT INTO users (firstname, lastname, othername, email, phoneNumber, passportUrl, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;';
        param = [firstname, lastname, othername, email, phoneNumber, passportUrl, password];
      } else {
        text = 'INSERT INTO users (firstname, lastname, othername, email, phoneNumber, passportUrl, password, isAdmin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;';
        param = [firstname, lastname, othername, email, phoneNumber, passportUrl, password, isAdmin];
      }
      const result = await db(text, param);
      const user = {
        userId: result.rows[0].id,
        isAdmin: result.rows[0].isadmin,
        firstname: result.rows[0].firstname,
        email: result.rows[0].email,
      };
      const token = jwt.sign(user, process.env.jwt_key);
      mailUser(result.rows[0].email, userPassword);
      res.status(200).json({
        status: 200,
        data: [
          {
            token,
            user,
          },
        ],
      });
    } catch (e) {
      if (e.message === 'duplicate key value violates unique constraint "users_email_key"') {
        res.status(400).json({
          status: 400,
          message: 'email already exists',
        });
      } else {
        res.status(400).json({
          status: 400,
          message: e.message,
        });
      }
    }
  }

  static async signInUser(req, res) {
    try {
      const { email, userPassword } = req.body;
      const text = 'SELECT * FROM users WHERE email=$1;';
      const param = [email];
      const result = await db(text, param);
      if (result.rowCount === 0) {
        res.status(400).json({
          status: 400,
          message: 'user not in database',
        });
      } else {
        const match = await bcrypt.compare(userPassword, result.rows[0].password);
        if (match) {
          const user = {
            userId: result.rows[0].id,
            isAdmin: result.rows[0].isadmin,
            firstname: result.rows[0].firstname,
            email: result.rows[0].email,
          };
          const token = jwt.sign(user, process.env.jwt_key);
          res.status(200).json({
            status: 200,
            data: [
              {
                token,
                user,
              },
            ],
          });
        } else {
          res.status(400).json({
            status: 400,
            message: 'email or password incorrect',
          });
        }
      }
    } catch (e) {
      res.status(400).json({
        status: 400,
        message: e.message,
      });
    }
  }

  static async registerUser(req, res) {
    try {
      const { userId } = req.params;
      const { officeId, partyId } = req.body;
      const text = 'INSERT INTO candidates (userId, officeId, partyId) VALUES ($1,$2,$3) RETURNING *;';
      const param = [userId, officeId, partyId];
      const result = await db(text, param);
      res.status(201).json({
        status: 201,
        data: [
          {
            office: result.rows[0].officeid,
            user: result.rows[0].id,
          },
        ],
      });
    } catch (e) {
      if (e.message === 'insert or update on table "candidates" violates foreign key constraint "candidates_officeid_fkey"') {
        res.status(400).json({
          status: 400,
          message: 'the office does not exist',
        });
      } else if (e.message === 'insert or update on table "candidates" violates foreign key constraint "candidates_partyid_fkey"') {
        res.status(400).json({
          status: 400,
          message: 'the party does not exist',
        });
      } else if (e.message === 'insert or update on table "candidates" violates foreign key constraint "candidates_userid_fkey"') {
        res.status(400).json({
          status: 400,
          message: 'the user does not exist',
        });
      } else if (e.message === 'duplicate key value violates unique constraint "candidates_pkey"') {
        res.status(400).json({
          status: 400,
          message: 'you already registered this candidate',
        });
      } else {
        res.status(400).json({
          status: 400,
          message: e.message,
        });
      }
    }
  }

  static async vote(req, res) {
    try {
      const { createdBy, office, candidate } = req.body;
      const text1 = 'SELECT * FROM candidates WHERE id=$1';
      const param1 = [candidate];
      const result1 = await db(text1, param1);
      if (result1.rowCount === 0) {
        res.status(400).json({
          status: 400,
          message: 'cant find candidate',
        });
      } else if (result1.rows[0].officeid == office) {
        const text = 'INSERT INTO votes (createdBy, office, candidate) VALUES ($1,$2,$3) RETURNING *;';
        const param = [createdBy, office, candidate];
        const result = await db(text, param);
        res.status(201).json({
          status: 201,
          data: [
            {
              office: result.rows[0].office,
              candidate: result.rows[0].candidate,
              voter: result.rows[0].createdby,
            },
          ],
        });
      } else {
        res.status(400).json({
          status: 400,
          message: `the user did not run for this office ${office}`,
        });
      }
    } catch (e) {
      if (e.message === 'insert or update on table "votes" violates foreign key constraint "votes_createdby_fkey"') {
        res.status(400).json({
          status: 400,
          message: 'the user does not exist',
        });
      } else if (e.message === 'insert or update on table "votes" violates foreign key constraint "votes_candidate_fkey"') {
        res.status(400).json({
          status: 400,
          message: 'the candidate does not exist',
        });
      } else if (e.message === 'insert or update on table "votes" violates foreign key constraint "votes_office_fkey"') {
        res.status(400).json({
          status: 400,
          message: 'the office does not exist',
        });
      } else if (e.message === 'duplicate key value violates unique constraint "votes_pkey"') {
        res.status(400).json({
          status: 400,
          message: 'you already voted this candidate for this office',
        });
      } else {
        res.status(400).json({
          status: 400,
          message: e.message,
        });
      }
    }
  }

  static async getVotes(req, res) {
    try {
      const { userId } = req.params;
      const text = 'SELECT * FROM votes WHERE createdby=$1;';
      const param = [userId];
      const result = await db(text, param);
      if (result.rowCount >= 1) {
        res.status(200).json({
          status: 200,
          data: result.rows,
        }) 
      } else {
        res.status(400).json({
          status: 400,
          message: 'no votes found',
        });
      }
    } catch (e) {
      res.json(e.message);
    }
  }
}

export default UserController;
