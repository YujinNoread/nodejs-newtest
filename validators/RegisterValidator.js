const {checkLength, emailReg} = require('./validatorHelpers');

class RegisterValidator {
  validRegister(req, res, next) {
    const { firstName, lastName, email, password } = req.body;
    if (
      checkLength(firstName, 2, 15) &&
      checkLength(lastName, 2, 15) &&
      checkLength(password, 2, 15) &&
      checkLength(email, 3, 25) &&
      emailReg.test(email)
    ) {
      next();
    } else {
      res.status(401).send("Invalid params");
    }
  }
}

module.exports = new RegisterValidator();
