var IfNode = require("./node/if");

var IfHandler = module.exports = function IfHandler() {
};

IfHandler.prototype.attach = function attach(token) {
  token.handlers.if = this.handle_if.bind(this);
  token.handlers.endif = this.handle_endif.bind(this);
};

IfHandler.prototype.handle_if = function handle_if(compiler, token) {
  var node = new IfNode(compiler.compile_expression(token.expressions[1]));

  node.parent = compiler.current;
  compiler.current.children.push(node);
  compiler.current = node;

  return true;
};

IfHandler.prototype.handle_endif = function handle_endif(compiler, token) {
  if (!(compiler.current instanceof IfNode)) {
    throw new Error("invalid current node type");
  }

  var current = compiler.current;
  compiler.current = compiler.current.parent;
  delete current.parent;

  return true;
};
