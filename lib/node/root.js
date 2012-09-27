var util = require("util"),
    Node = require("../node");

var RootNode = module.exports = function RootNode(name) {
  Node.call(this);

  this.name = name;
};

util.inherits(RootNode, Node);

RootNode.prototype.to_js = function to_js() {
  return {
    type: "Program",
    body: [
      {
        type: "VariableDeclaration",
        kind: "var",
        declarations: [
          {
            "type": "VariableDeclarator",
            "id": {"type": "Identifier", "name": "dotty"},
            "init": {
              "type": "CallExpression",
              "callee": {"type": "Identifier", "name": "require"},
              "arguments": [{"type": "Literal", "value": "dotty"}],
            }
          },
          {
            "type": "VariableDeclarator",
            "id": {"type": "Identifier", "name": "stream"},
            "init": {
              "type": "CallExpression",
              "callee": {"type": "Identifier", "name": "require"},
              "arguments": [{"type": "Literal", "value": "stream"}],
            }
          },
          {
            "type": "VariableDeclarator",
            "id": {"type": "Identifier", "name": "util"},
            "init": {
              "type": "CallExpression",
              "callee": {"type": "Identifier", "name": "require"},
              "arguments": [{"type": "Literal", "value": "util"}],
            }
          },
          {
            type: "VariableDeclarator",
            id: {type: "Identifier", name: ["tux", this.name].join("_")},
            init: {
              type: "AssignmentExpression",
              operator: "=",
              left: {
                type: "MemberExpression",
                computed: false,
                object: {type: "Identifier", name: "module"},
                property: {type: "Identifier", name: "exports"},
              },
              right: {
                type: "FunctionExpression",
                id: {type: "Identifier", name: ["tux", this.name].join("_")},
                params: [],
                body: {
                  type: "BlockStatement",
                  body: [],
                },
              },
            },
          },
        ],
      },
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "CallExpression",
          "callee": {
            "type": "MemberExpression",
            "computed": false,
            "object": {"type": "Identifier", "name": "util"},
            "property": {"type": "Identifier", "name": "inherits"},
          },
          "arguments": [
            {"type": "Identifier", "name": ["tux", this.name].join("_")},
            {"type": "Identifier", "name": "stream"},
          ],
        },
      },
      {
        type: "ExpressionStatement",
        expression: {
          type: "AssignmentExpression",
          operator: "=",
          left: {
            type: "MemberExpression",
            computed: false,
            object: {
              type: "MemberExpression",
              computed: false,
              object: {type: "Identifier", name: ["tux", this.name].join("_")},
              property: {type: "Identifier", name: "prototype"},
            },
            property: {type: "Identifier", name: "render"},
          },
          right: {
            type: "FunctionExpression",
            id: null,
            params: [{type: "Identifier", name: "data"}],
            body: {
              type: "BlockStatement",
              body: [
                {
                  type: "ExpressionStatement",
                  expression: {
                    "type": "CallExpression",
                    "callee": {
                      "type": "MemberExpression",
                      "computed": false,
                      "object": {"type": "Identifier", "name": "stream"},
                      "property": {"type": "Identifier", "name": "call"},
                    },
                    "arguments": [{"type": "ThisExpression"}],
                  },
                },
              ].concat(this.compile_children()),
            },
          },
        },
      },
    ],
  };
};
