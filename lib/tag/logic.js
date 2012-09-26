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
