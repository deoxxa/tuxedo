var util = require("util");

var Token = require("../token");
var PrintNode = require("../node/print");

var PrintToken = module.exports = function PrintToken() {
  Token.call(this);
};

util.inherits(PrintToken, Token);

PrintToken.prototype.compile = function compile(compiler, token) {
  compiler.current.children.push(new PrintNode(compiler.compile_expression(token.expression)));

  return true;
};

PrintToken.prototype.attach = function attach(compiler) {
  compiler.tokens.print = this.compile.bind(this);
};
