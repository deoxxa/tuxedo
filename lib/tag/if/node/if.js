var util = require("util"),
    Node = require("../../../node");

var IfNode = module.exports = function IfNode(expression) {
  Node.call(this);

  this.expression = expression;
};

util.inherits(IfNode, Node);

IfNode.prototype.to_js = function to_js() {
  return {
    type: "IfStatement",
    test: this.expression,
    consequent: {
      type: "BlockStatement",
      body: this.compile_children(),
    },
  };
};
