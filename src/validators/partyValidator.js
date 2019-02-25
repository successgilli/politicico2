import { validateName, validateHqAddress, validateLogoUrl } from '../helpers/validator';

class ValidateParty {
  static validateCreateParty(req, res, next) {
    const { name, hqAddress, logoUrl } = req.body;
    if (typeof name === 'undefined') {
      res.status(400).json('missing name field');
    } else if ( typeof hqAddress === 'undefined') {
      res.status(400).json('missing hqAddress field');
    } else if ( typeof logoUrl === 'undefined') {
      res.status(400).json('missing logoUrl field');
    } else if (validateName(name)) {
      res.status(400).json(validateName(name));
    } else if (validateHqAddress(hqAddress)) {
      res.status(400).json(validateHqAddress(hqAddress));
    }
    else if (validateLogoUrl(logoUrl)) {
      res.status(400).json(validateLogoUrl(logoUrl));
    } else {
      next();
    }
  }
}

export default ValidateParty;
