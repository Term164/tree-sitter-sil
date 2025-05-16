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

;; Types
(type_specifier (base_type) @type)
(base_type) @type

;; Identifiers
(identifier) @variable
(field_reference) @property

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
