const {checkLength, checkForNumber} = require('./validatorHelpers');


class ProductValidator {

    validProductFields(req, res, next){
        const {products} = req.body;
        if (
            checkLength(products.name, 3, 20) &&
            checkForNumber.test(products.price) &&
            checkForNumber.test(products.category) &&
            checkLength(products.description, 3, 20)
        ){
            next()
        }else {
            return res.status(403).json({ message: "Valid error" });
        }
    }
}

module.exports = new ProductValidator()
