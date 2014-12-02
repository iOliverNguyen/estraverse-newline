var fs = require('fs');
var esprima = require('esprima-fb');
var estraverse = require('estraverse');
var attachNewlines = require('./index').attachNewlines;
var expect = require('chai').expect;

var options = {
  range: true,
  loc: false,
  tokens: false,
  raw: false,
  comment: true
};

var code = fs.readFileSync('test/1.jsx').toString();
var ast = esprima.parse(code, options);
attachNewlines(ast, code);

describe('attach newline', function() {
  it('should attach multiline property and trailing newlines', function() {
    var actual = JSON.stringify(ast, '', '  ');
    var expected = fs.readFileSync('test/1.expect.json').toString().trim();

    fs.writeFileSync('test/1.out.json', actual);
    expect(actual).to.be.equal(expected);
  });
});
