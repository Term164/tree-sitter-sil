;; Mark function blocks as new lexical scopes
(struct_declaration
  name: (identifier) @type
  (struct_field
    name: (identifier) @field)*
  ) @scope

(function_declaration
  body: (block) @scope)

(try_catch_statement
  (block) @scope)

(typed_catch_clause
  (block) @scope)

(general_catch_clause
  (block) @scope)

(block) @scope

;; Parameter definitions
(function_declaration
  (identifier) @parameter.inner
  @parameter.outer)
;; Variable declarations
(variable_declaration
  name: (identifier) @definition.var)

(for_variable_declaration
  name: (identifier) @definition.var)

(foreach_statement
  name: (identifier) @definition.var)

(typed_catch_clause
  (identifier) @definition.var)

;; References
(identifier) @reference
