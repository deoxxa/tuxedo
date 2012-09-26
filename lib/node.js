var Node = module.exports = function Node() {
  this.children = [];
};

Node.prototype.to_js = function to_js() {
  return null;
};

Node.prototype.compile_children = function compile_children() {
  return this.children.map(function(e) { return e.to_js(); });
};
