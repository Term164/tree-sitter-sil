;; Keywords
"if" @keyword
"else" @keyword
"for" @keyword
"while" @keyword
"do" @keyword
"switch" @keyword
"case" @keyword
"default" @keyword
"break" @keyword
"continue" @keyword
"return" @keyword
"throw" @keyword
"try" @keyword
"catch" @keyword
"function" @keyword
"include" @keyword
(struct_declaration
  "struct" @keyword)

;; Types
(type_specifier (base_type) @type)
(base_type) @type

;; Identifiers
(identifier) @variable
(field_reference) @property

(struct_declaration
  "struct" @keyword
  name: (identifier) @type)

(structure_literal "{" @punctuation.bracket "}" @punctuation.bracket)

(member_expression
  "." @operator
  (identifier) @field)

(variable_declaration
  name: (identifier) @variable)

;; Literals
(string_literal) @string
(number) @number
(boolean) @boolean
(null_literal) @constant.builtin

;; Comments
(comment) @comment

;; Function declarations and calls
(function_declaration name: (identifier) @function.definition)
(function_call function: (identifier) @function)

;; Operators
"=" @operator
"==" @operator
"!=" @operator
"<" @operator
">" @operator
"<=" @operator
">=" @operator
"+" @operator
"-" @operator
"*" @operator
"/" @operator
"%" @operator
"&&" @operator
"||" @operator
"++" @operator
"--" @operator

;; Punctuation
"," @punctuation.delimiter
";" @punctuation.delimiter
"(" @punctuation.bracket
")" @punctuation.bracket
"{" @punctuation.bracket
"}" @punctuation.bracket
