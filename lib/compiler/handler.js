var util = require("util");

var Node = module.exports = function Node() {
  this.children = [];
};

Node.prototype.to_ast = function to_ast() {
  return null;
};

function RootNode() {
  Node.call(this);
}

util.inherits(RootNode, Node);

RootNode.prototype.to_ast = function to_ast() {
  return {
    type: "Program",
    body: this.children.map(function(e) { return e.to_ast(); }),
  };
};

function RawNode(data) {
  Node.call(this);

  this.data = data;
}

util.inherits(RawNode, Node);

RawNode.prototype.to_ast = function to_ast() {
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

function IfNode(condition) {
  Node.call(this);

  this.condition = condition;
}

util.inherits(IfNode, Node);

IfNode.prototype.to_ast = function to_ast() {
  return {
    type: "IfStatement",
    test: {
      type: "Literal",
      value: 1,
    },
    consequent: {
      type: "BlockStatement",
      body: this.children.map(function(e) { return e.to_ast(); }),
    },
  };
};

var tag_handlers = Object.create(null);

tag_handlers.raw = function(state, token) {
  var node = new RawNode(token.data);

  state.current.children.push(node);
};

tag_handlers.tag_logic = function(state, token) {
  if (token.expressions[0] && token.expressions[0].type === "identifier" && logic_handlers[token.expressions[0].value]) {
    return logic_handlers[token.expressions[0].value](state, token);
  }
};

var logic_handlers = Object.create(null);

logic_handlers.if = function(state, token) {
  var node = new IfNode(token.expressions[1]);

  node.parent = state.current;
  state.current.children.push(node);
  state.current = node;
};

logic_handlers.endif = function(state, token) {
  if (!(state.current instanceof IfNode)) {
    throw new Error("invalid current node type");
  }

  var current = state.current;
  state.current = state.current.parent;
  delete current.parent;
};

function compile(state, token) {
  if (tag_handlers[token.type]) {
    tag_handlers[token.type](state, token);
  } else {
    console.log(token);
  }
}

var state = {};
state.ast = new RootNode();
state.current = state.ast;

tokens.forEach(function(token) {
  compile(state, token);
});

console.log(JSON.stringify(state.ast.to_ast(), null, 2));

console.log("");

console.log(escodegen.generate(state.ast.to_ast()));
