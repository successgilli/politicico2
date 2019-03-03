import 'babel-polyfill';
import { createResult, addCandidatesWithZeroVotes, candidates } from '../helpers/createElectionResult';
import db from '../model/query';

class Results {
  static async getOfficeResult(req, res) {
    try {
      const { officeId } = req.params;
      const text = 'SELECT * FROM votes WHERE office=$1;';
      const param = [officeId];
      const result = await db(text, param);
      const text2 = 'SELECT * FROM candidates WHERE officeid=$1;';
      const param2 = [officeId];
      const result2 = await db(text2, param2);
      if (result2.rowCount > 0) {
        if (result.rowCount > 0) {
          res.status(200).json({
            status: 200,
            data: addCandidatesWithZeroVotes(createResult(result.rows), result2.rows),
          });
        } else {
          res.status(200).json({
            status: 200,
            data: candidates(result2.rows),
          });
        }
      } else {
        res.status(400).json({
          status: 400,
          message: 'no candidates yet',
        });
      }
    } catch (e) {
      res.json(e.message);
    }
  }
}

export default Results;
