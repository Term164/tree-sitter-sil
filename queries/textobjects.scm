(function_declaration
  name: (identifier)
  body: (block) @function.inner) @function.outer

(structure_literal
  "{" @structure.inner
  "}" @structure.outer)

(array_literal
  "{" @array.inner
  "}" @array.outer)

(if_statement
  consequence: (block) @conditional.inner) @conditional.outer

(for_statement (block) @loop.inner) @loop.outer
