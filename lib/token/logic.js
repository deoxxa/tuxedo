var util = require("util");

var Token = require("../token");

var LogicToken = module.exports = function LogicToken() {
  Token.call(this);

  this.handlers = Object.create(null);
};

util.inherits(LogicToken, Token);

LogicToken.prototype.compile = function compile(compiler, token) {
  if (token.expressions[0] && token.expressions[0].type === "identifier" && this.handlers[token.expressions[0].value]) {
    return this.handlers[token.expressions[0].value](compiler, token);
  }

  return false;
};

LogicToken.prototype.attach = function attach(compiler) {
  compiler.tokens.logic = this.compile.bind(this);
};
