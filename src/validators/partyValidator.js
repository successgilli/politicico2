import { validateName, validateHqAddress, validateLogoUrl } from '../helpers/validator';

class ValidateParty {
  static validateCreateParty(req, res, next) {
    const { name, hqAddress, logoUrl } = req.body;
    if (typeof name === 'undefined') {
      res.status(400).json({
        status: 400,
        message: 'missing name field',
      });
    } else if (typeof hqAddress === 'undefined') {
      res.status(400).json({
        status: 400,
        message: 'missing hqAddress field',
      });
    } else if (typeof logoUrl === 'undefined') {
      res.status(400).json({
        status: 400,
        message: 'missing logoUrl field',
      });
    } else if (validateName(name)) {
      res.status(400).json({
        status: 400,
        message: validateName(name),
      });
    } else if (validateHqAddress(hqAddress)) {
      res.status(400).json({
        status: 400,
        message: validateHqAddress(hqAddress),
      });
    }
    else if (validateLogoUrl(logoUrl)) {
      res.status(400).json({
        status: 400,
        message: validateLogoUrl(logoUrl),
      });
    } else {
      next();
    }
  }

  static validateEditParty(req, res, next) {
    const { name } = req.params;
    if (validateName(name)) {
      res.status(400).json({
        status: 400,
        message: validateName(name),
      });
    } else {
      next();
    }
  }
}

export default ValidateParty;
