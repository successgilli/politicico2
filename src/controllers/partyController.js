import db from '../model/query';

class partyController {
  static async createParty(req, res) {
    try {
      const { name, logoUrl, hqAddress } = req.body;
      const text = 'INSERT INTO parties (name, hqAddress, logoUrl) VALUES ($1,$2,$3) RETURNING *;';
      const param = [name, hqAddress, logoUrl];
      const result = await db(text, param);
      const results = {
        status: 200,
        data: [{
          id: result.rows[0].id, // id of newly created party
          name: result.rows[0].name,
        }],
      };
      res.status(200).json(results);
    }
    catch (e) {
      if (e.message === 'duplicate key value violates unique constraint "parties_name_key"') {
        res.status(400).json({
          status: 400,
          message: 'party name already exists',
        });
      } else {
        res.status(400).json({
          status: 400,
          message: e.message,
        });
      }
    }
  }

  static async getParty(req, res) {
    try {
      const { partyId } = req.params;
      const text = 'SELECT * FROM parties WHERE id=$1';
      const param = [partyId];
      const result = await db(text, param);
      if (result.rowCount === 0) {
        res.status(400).json({
          status: 400,
          message: 'party does not exit',
        });
      } else {
        res.status(200).json({
          status: 200,
          data: [{
            id: result.rows[0].id, // political party unique id
            name: result.rows[0].name,
            logoUrl: result.rows[0].logourl,
          }],
        });
      }

    } catch (e) {
      res.status(400).json({
        status: 400,
        message: e.message,
      });
    }
  }

  static async getAllParties(req, res) {
    try {
      const text = 'SELECT * FROM parties';
      const result = await db(text);
      res.json({
        status: 200,
        data: result.rows,
      });
    } catch (e) {
      res.status(400).json({
        status: 400,
        message: e.message,
      });
    }
  }

  static async editParty(req, res) {
    const { partyId, name } = req.params;
    try {
      const text = 'UPDATE parties SET name=$1 WHERE id=$2 RETURNING *;';
      const param = [name, partyId];
      const result = await db(text, param);
      if (result.rowCount === 0) {
        res.status(400).json({
          status: 400,
          message: 'party does not exist',
        });
      } else {
        res.status(200).json({
          status: 200,
          data: [{
            id: result.rows[0].id, // political party unique id
            name: result.rows[0].name, // the new name of the political party
          }],
        });
      }
    } catch (e) {
      if (e.message === 'duplicate key value violates unique constraint "parties_name_key"') {
        res.status(400).json({
          status: 400,
          message: `name '${name}' already exist`,
        });
      } else {
        res.status(400).json({
          status: 400,
          message: e.message,
        });
      }
    }
  }

  static async deleteParty(req, res) {
    try {
      const { partyId } = req.params;
      const text = 'DELETE FROM parties where id=$1 RETURNING *;';
      const param = [partyId];
      const result = await db(text, param);
      if (result.rowCount === 0) {
        res.status(200).json({
          status: 400,
          message: 'party not found',
        });
      } else {
        res.status(200).json({
          status: 200,
          data: [
            {
              message: `party '${result.rows[0].name}' deleted`,
            },
          ],
        });
      }
    } catch (e) {
      if (e.message === 'update or delete on table "parties" violates foreign key constraint "candidates_partyid_fkey" on table "candidates"') {
        res.status(400).json({
          status: 400,
          message: 'candidate is attached to this party',
        });
      } else {
        res.status(400).json({
          status: 400,
          message: e.message,
        });
      }

    }
  }
}
export default partyController;
