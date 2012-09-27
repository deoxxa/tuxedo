var RootNode = require("./node/root");

var Compiler = module.exports = function Compiler() {
  this.ast = new RootNode();
  this.current = this.ast;
  this.tokens = Object.create(null);
};

Compiler.prototype.write = function(token) {
  if (this.tokens[token.type]) {
    return this.tokens[token.type](this, token);
  }

  return false;
};

Compiler.prototype.end = function() {
  this.ast.name = this.hash.digest("hex");
};

Compiler.prototype.compile_expression = function compile_expression(expression) {
  switch (expression.type) {
    case "number":
    case "string":
    case "boolean":
      return {type: "Literal", value: expression.value};
    case "comparison_expression":
      return {type: "BinaryExpression", operator: expression.operator, left: this.compile_expression(expression.left), right: this.compile_expression(expression.right)};
    case "identifier": {
      return {
        type: "CallExpression",
        callee: {type: "MemberExpression", computed: false, object: {type: "Identifier", name: "dotty"}, property: {type: "Identifier", name: "get"}},
        arguments: [{type: "Literal", value: expression.value}],
      };
    }
    case "path": {
      var path = {type: "ArrayExpression", elements: []};

      while (expression.type === "path") {
        path.elements.unshift(this.compile_expression(expression.name));
        expression = expression.base;
      }

      path.elements.unshift(this.compile_expression(expression));

      return {
        type: "CallExpression",
        callee: {type: "MemberExpression", computed: false, object: {type: "Identifier", name: "dotty"}, property: {type: "Identifier", name: "get"}},
        arguments: [path],
      };

      return {type: "MemberExpression", computed: true, object: this.compile_expression(expression.base), property: this.compile_expression(expression.name)};
    }
  }

  console.log(expression);

  return {
    type: "Literal",
    value: null,
  };
};
