import db from '../model/query';

class partyController {
  static async createParty(req, res) {
    try {
      const { name, logoUrl, hqAddress } = req.body;
      const text = 'INSERT INTO parties (name, hqAddress, logoUrl) VALUES ($1,$2,$3) RETURNING *;';
      const param = [name, hqAddress, logoUrl];
      const result = await db(text, param);
      console.log(res);
      res.status(200).json(result.rows[0]);
    }
    catch (e) {
      if (e.message === 'duplicate key value violates unique constraint "parties_name_key"') {
        res.status(400).json('party name already exists');
      } else {
        res.status(400).json(e.message);
      }
    }
  }
}
export default partyController;
