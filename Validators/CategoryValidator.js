const {checkLength} = require('./validatorHelpers');

class CategoryValidator {
  validCategoryName(req, res, next){
    const {categories} = req.body
    
    if (checkLength(categories.name, 3, 20)){
      next()
    }else {
      return res.status(403).json({ message: "Length 3-20 symbol" });
    }
  }
}

module.exports = new CategoryValidator()
