; Increase indentation inside blocks
(block) @indent

; Maintain indentation for function declarations
(function_declaration
  body: (block) @indent)

; Increase indentation for if/else/for/while/try blocks
(if_statement
  consequence: (block) @indent)

(else_clause
  (block) @indent)

(else_if_clause
  (if_statement
    consequence: (block) @indent))

(for_statement
  (block) @indent)

(foreach_statement
  (block) @indent)

(while_statement
  (block) @indent)

(do_while_statement
  (block) @indent)

(try_catch_statement
  (block) @indent)

(typed_catch_clause
  (block) @indent)

(general_catch_clause
  (block) @indent)

(switch_statement
  (case_clause (_) @indent))
