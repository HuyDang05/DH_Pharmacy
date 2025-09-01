"use strict";

var ProductCategory = require("../../models/product-category.model");

var createTreeHelper = require("../../helpers/createTree");

module.exports.category = function _callee(req, res, next) {
  var productsCategory, newProductsCategory;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(ProductCategory.find({
            deleted: false
          }));

        case 2:
          productsCategory = _context.sent;
          newProductsCategory = createTreeHelper.tree(productsCategory);
          res.locals.layoutProductsCategory = newProductsCategory;
          next();

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};