#!/usr/bin/env node

// need to load templates somehow
var fs = require("fs");

// template syntax parser
var parser = require("./lib/parser");

// for generating code from the js ast
var escodegen = require("escodegen");

// compiler prototype
var Compiler = require("./lib/compiler");

//
// Set up compiler
//

// this is almost a writable stream
var compiler = new Compiler("testing");

var RawToken = require("./lib/token/raw"), raw_token = new RawToken();
raw_token.attach(compiler);

var PrintToken = require("./lib/token/print"), print_token = new PrintToken();
print_token.attach(compiler);

var LogicToken = require("./lib/token/logic"), logic_token = new LogicToken();
logic_token.attach(compiler);

var IfTag = require("./lib/tag/if"), if_tag = new IfTag();
if_tag.attach(logic_token);

//
// Compiler is complete
//

// parse the template
var tokens = parser.parse(fs.readFileSync(process.argv[2] || "./testing.tux").toString());

// process the tokens and construct an AST
tokens.forEach(function(token) {
  compiler.write(token);
});

// finalise anything the compiler is doing
compiler.end();

// this is the javascript AST
var js = compiler.ast.to_js();

// dump some stuff
//console.warn(JSON.stringify(js, null, 2));
//console.warn("");
console.log(escodegen.generate(js));
