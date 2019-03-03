import { validateName } from '../helpers/validator';

class ValidateOffice {
  static createOfficeValidator(req, res, next) {
    const { name, type } = req.body;
    if (typeof name === 'undefined') {
      res.status(400).json({
        status: 400,
        message: 'missing name field',
      });
    } else if (typeof type === 'undefined') {
      res.status(400).json({
        status: 400,
        message: 'missing type field',
      });
    } else if (validateName(name)) {
      res.status(400).json({
        status: 400,
        message: validateName(name),
      });
    } else if (validateName(type)) {
      res.status(400).json({
        status: 400,
        message: validateName(type),
      });
    } else {
      next();
    }
  }
  
}

export default ValidateOffice;
