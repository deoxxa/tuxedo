var util = require("util");

var Token = require("../token");
var RawNode = require("../node/raw");

var RawToken = module.exports = function RawToken() {
  Token.call(this);
};

util.inherits(RawToken, Token);

RawToken.prototype.compile = function compile(compiler, token) {
  compiler.current.children.push(new RawNode(token.data));

  return true;
};

RawToken.prototype.attach = function attach(compiler) {
  compiler.tokens.raw = this.compile.bind(this);
};
