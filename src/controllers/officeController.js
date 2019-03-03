import db from '../model/query';
import 'babel-polyfill';

class OfficeController {
  static async createOffice(req, res) {
    try {
      const { name, type } = req.body;
      const text = 'INSERT INTO offices (name, type) VALUES ($1,$2) RETURNING *;';
      const param = [name, type];
      const result = await db(text, param);
      const results = {
        status: 200,
        data: [{
          id: result.rows[0].id, // id of newly created party
          name: result.rows[0].name,
          type: result.rows[0].type,
        }],
      };
      res.status(200).json(results);
    }
    catch (e) {
      if (e.message === 'duplicate key value violates unique constraint "offices_name_key"') {
        res.status(400).json({
          status: 400,
          message: 'office name already exists',
        });
      } else {
        res.status(400).json({
          status: 400,
          message: e.message,
        });
      }
    }
  }

  static async getAllOffices(req, res) {
    try {
      const text = 'SELECT * FROM offices';
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

  static async getOffice(req, res) {
    try {
      const { officeId } = req.params;
      const text = 'SELECT * FROM offices WHERE id=$1';
      const param = [officeId];
      const result = await db(text, param);
      if (result.rowCount === 0) {
        res.status(400).json({
          status: 400,
          message: 'office does not exit',
        });
      } else {
        res.status(200).json({
          status: 200,
          data: [{
            id: result.rows[0].id, // political party unique id
            name: result.rows[0].name,
            type: result.rows[0].type,
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
}

export default OfficeController;
