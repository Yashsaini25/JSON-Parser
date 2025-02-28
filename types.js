/**
 * @typedef {"BraceOpen" / "BraceClose" / "BracketOpen" / "BracketClose" / "Comma" / "Colon" / "String" / "Number" / "True" / "False" / "Null"} TokenType
 */

/**
 * @typedef {Object} Token
 * @property {TokenType} type
 * @property {string} value
 */

/**
 * @typedef {Object} ASTNode
 * @property {"Object" / "Array" / "String" / "Number" / "Boolean" / "Null"} type
 * @property {object.<string, ASTNode> / ASTNode[] / string / number / boolean / null} value
 */

module.exports = {};