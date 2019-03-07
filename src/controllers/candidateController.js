import 'babel-polyfill';
import db from '../model/query';

class candidate {
  static async getCandidateInfo(req, res) {
    try {
      let info = [];
      const { candidateId } = req.params;
      const text = 'SELECT * FROM candidates WHERE id=$1 ';
      const param = [candidateId];
      const result = await db(text, param);
      if (result.rowCount >= 1) {
        const text1 = 'SELECT * FROM users WHERE id=$1;';
        const param1 = [result.rows[0].userid];
        const result1 = await db(text1, param1);// user
        const text2 = 'SELECT * FROM parties WHERE id=$1;';
        const param2 = [result.rows[0].partyid];
        const result2 = await db(text2, param2);// party
        const text3 = 'SELECT * FROM offices WHERE id=$1;';
        const param3 = [result.rows[0].officeid];
        const result3 = await db(text3, param3);// office
        console.log(result1.rows[0], ' next ', result2.rows[0], ' next ', result3.rows[0]);
        // start
        const candidateInfo = {
          id: result.rows[0].id,
          userFirstName: result1.rows[0].firstname,
          userLastName: result1.rows[0].lastname,
          partyId: result2.rows[0].id,
          partyName: result2.rows[0].name,
          partyHqAddress: result2.rows[0].hqaddress,
          partyLogoUrl: result2.rows[0].logourl,
          officeId: result3.rows[0].id,
          officetype: result3.rows[0].type,
          officeName: result3.rows[0].name,
        }
        res.status(200).json({
          status: 200,
          data: candidateInfo,
        });
        // end
      } else {
        res.status(200).json({
          status: 400,
          message: 'candidate not found',
        });
      }
    } catch (e) {
      res.status(200).json({
        status: 400,
        message: e.message,
      });
    }
  }
}

export default candidate;
