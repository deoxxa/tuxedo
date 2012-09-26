var util = require("util"),
    Node = require("../node");

var RootNode = module.exports = function RootNode() {
  Node.call(this);
};

util.inherits(RootNode, Node);

RootNode.prototype.to_js = function to_js() {
  return {
    type: "Program",
    body: this.compile_children(),
  };
};
