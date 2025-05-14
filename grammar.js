/**
 * @file A parser for the Simple Issue Language developed by Appfire
 * @author Jani Bangiev <jani.bangiev@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "sil",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
