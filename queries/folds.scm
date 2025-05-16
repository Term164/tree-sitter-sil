;; Fold all blocks
(block) @fold

;; Fold control structures
(function_declaration body: (block) @fold)
(if_statement consequence: (block) @fold)
(else_clause) @fold
(else_if_clause) @fold
(for_statement) @fold
(foreach_statement) @fold
(while_statement) @fold
(do_while_statement) @fold
(try_catch_statement) @fold
(typed_catch_clause) @fold
(general_catch_clause) @fold
(switch_statement) @fold
(case_clause) @fold
(default_clause) @fold
(structure_literal) @fold
