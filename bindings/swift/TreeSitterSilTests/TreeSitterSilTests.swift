import XCTest
import SwiftTreeSitter
import TreeSitterSil

final class TreeSitterSilTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_sil())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Simple Issue Language grammar")
    }
}
