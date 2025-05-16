/**
 * @file A parser for the Simple Issue Language developed by Appfire
 * @author Jani Bangiev <jani.bangiev@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

// grammar.js  ── Tree-sitter grammar for Atlassian SIL
// ---------------------------------------------------
module.exports = grammar({
  /** -------------------------------------------------
   *  1. Metadata
   * -------------------------------------------------*/
  name: "sil", // ← internal name of the language
  word: ($) => $.identifier, // ← “word” node used by some plugins
  //    (e.g., completion, spell-checking)

  /** -------------------------------------------------
   *  2. Extras   (things Tree-sitter can always skip)
   * -------------------------------------------------*/
  extras: ($) => [
    /\s/, // ← ASCII whitespace
    $.comment, // ← single-line comments
  ],

  conflicts: ($) => [[$.array_literal, $.structure_literal]],
  /** -------------------------------------------------
   *  3. Main rules
   * -------------------------------------------------*/
  rules: {
    /* Entry point ― a SIL file is just a list of statements */
    source_file: ($) => repeat($._statement),

    /* A statement can be one of many concrete constructs */
    _statement: ($) =>
      choice(
        $.variable_declaration,
        $.assignment,
        $.if_statement,
        $.for_statement,
        $.foreach_statement,
        $.while_statement,
        $.do_while_statement,
        $.return_statement,
        $.function_declaration,
        $.function_call,
        $.expression_statement,
        $.break_statement,
        $.throw_statement,
        $.try_catch_statement,
        $.continue_statement,
        $.include_statement,
        $.switch_statement,
        $.comment, // comments are standalone statements too
      ),

    /* ----- Core statements ---------------------------------------------- */

    variable_declaration: ($) =>
      seq(
        field("type", $.type_specifier),
        field("name", $.identifier),
        "=",
        field("value", $.expression),
        ";",
      ),

    type_specifier: ($) => seq($.base_type, repeat("[]")),

    base_type: ($) =>
      choice(
        "string",
        "number",
        "boolean",
        "date",
        "integer",
        "byte",
        "interval",
        $.identifier,
      ),

    assignment: ($) =>
      seq(
        // <lvalue> = <expr> ;
        field("left", $.lvalue),
        "=",
        field("right", $.expression),
        ";",
      ),

    inline_assignment: ($) =>
      seq(
        // <lvalue> = <expr> ;
        field("left", $.lvalue),
        "=",
        field("right", $.expression),
      ),

    lvalue: ($) => choice($.identifier, $.field_reference, $.member_expression),

    include_statement: ($) => seq("include", $.string_literal, ";"),

    throw_statement: ($) => seq("throw", $.expression, ";"),

    try_catch_statement: ($) =>
      seq(
        "try",
        $.block,
        repeat($.typed_catch_clause),
        optional($.general_catch_clause),
      ),
    typed_catch_clause: ($) =>
      seq("catch", $.type_specifier, $.identifier, $.block),

    general_catch_clause: ($) => seq("catch", $.block),

    switch_statement: ($) =>
      seq(
        "switch",
        "(",
        $.expression,
        ")",
        "{",
        repeat(choice($.case_clause, $.default_clause)),
        "}",
      ),

    case_clause: ($) => seq("case", $.expression, ":", repeat($._statement)),

    default_clause: ($) => seq("default", ":", repeat($._statement)),

    break_statement: ($) => seq("break", ";"),

    continue_statement: ($) => seq("continue", ";"),

    if_statement: ($) =>
      seq(
        // if (<expr>) { ... } else { ... }
        "if",
        "(",
        $.expression,
        ")",
        field("consequence", $.block),
        optional(field("alternative", choice($.else_if_clause, $.else_clause))),
      ),

    else_clause: ($) => seq("else", $.block),

    else_if_clause: ($) => seq("else", $.if_statement),

    for_statement: ($) =>
      seq(
        // for (<init>; <cond>; <update>) { ... }
        "for",
        "(",
        choice($.assignment, $.for_variable_declaration),
        $.expression,
        ";",
        choice($.inline_assignment, $.expression),
        ")",
        $.block,
      ),

    for_variable_declaration: ($) =>
      seq(
        field("type", $.type_specifier),
        field("name", $.identifier),
        "=",
        field("value", $.expression),
        ";",
      ),

    foreach_statement: ($) =>
      seq(
        "for",
        "(",
        field("type", $.type_specifier),
        field("name", $.identifier),
        "in",
        field("collection", $.expression),
        ")",
        $.block,
      ),

    while_statement: ($) => seq("while", "(", $.expression, ")", $.block),

    do_while_statement: ($) =>
      seq("do", $.block, "while", "(", $.expression, ")", ";"),

    return_statement: ($) =>
      seq(
        // return <expr>? ;
        "return",
        optional($.expression),
        ";",
      ),

    function_declaration: ($) =>
      seq(
        // function foo(a, b) { ... }
        "function",
        field("name", $.identifier),
        "(",
        optional(seq($.identifier, repeat(seq(",", $.identifier)))),
        ")",
        $.block,
      ),

    function_call: ($) =>
      seq(
        // foo(a, b, c);
        field("function", $.identifier),
        "(",
        optional(seq($.expression, repeat(seq(",", $.expression)))),
        ")",
      ),

    expression_statement: ($) => seq($.expression, ";"),

    /* ----- Building blocks ---------------------------------------------- */

    block: ($) => seq("{", repeat($._statement), "}"),

    expression: ($) =>
      choice(
        $.string_literal,
        $.number,
        $.boolean,
        $.null_literal,
        $.identifier,
        $.field_reference,
        $.unary_expression,
        $.function_call,
        seq("(", $.expression, ")"),
        $.member_expression,
        $.binary_expression,
        $.structure_literal,
        $.array_literal,
      ),

    member_expression: ($) => seq($.expression, ".", $.identifier),

    unary_expression: ($) =>
      choice(seq($.expression, "++"), seq($.expression, "--")),

    binary_expression: ($) =>
      prec.left(
        seq(
          $.expression,
          choice(
            "==",
            "!=",
            "<",
            ">",
            "<=",
            ">=",
            "+",
            "-",
            "*",
            "/",
            "&&",
            "||",
            "%",
          ),
          $.expression,
        ),
      ),
    array_literal: ($) =>
      seq(
        "{",
        optional(seq($.expression, repeat(seq(",", $.expression)))),
        "}",
      ),

    structure_literal: ($) =>
      seq(
        "{",
        optional(seq($.expression, repeat(seq(",", $.expression)))),
        "}",
      ),

    /* ----- Primitive tokens --------------------------------------------- */

    null_literal: (_) => choice("null", "nil"),

    comment: (_) => token(seq("//", /.*/)),

    identifier: (_) => /[A-Za-z_][A-Za-z0-9_]*/,
    field_reference: (_) => /customfield_[0-9]+/,

    string_literal: (_) =>
      token(
        seq(
          '"',
          repeat(choice(/[^"\\]/, /\\./)), // allow escape sequences
          '"',
        ),
      ),

    number: (_) => /\d+(?:\.\d+)?/,
    boolean: (_) => choice("true", "false"),
  },
});
