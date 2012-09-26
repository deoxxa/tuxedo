var util = require("util"),
    Node = require("../node");

var RawNode = module.exports = function RawNode(data) {
  Node.call(this);

  this.data = data;
};

util.inherits(RawNode, Node);

RawNode.prototype.to_js = function to_js() {
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
        {type: "Literal", value: this.data.toString()},
      ],
    },
  };
};
