var util = require("util"),
    Node = require("../node");

var PrintNode = module.exports = function PrintNode(expression) {
  Node.call(this);

  this.expression = expression;
};

util.inherits(PrintNode, Node);

PrintNode.prototype.to_js = function to_js() {
  return {
    type: "ExpressionStatement",
    expression: {
      type: "CallExpression",
      callee: {
        type: "MemberExpression",
        computed: false,
        object: {type: "ThisExpression"},
        property: {type: "Identifier", name: "emit"},
      },
      arguments: [
        {type: "Literal", value: "data"},
        this.expression,
      ],
    },
  };
};
