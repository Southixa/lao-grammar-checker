/**
 * Main entry point for the Lao Grammar Checker library.
 * This file exports the main function for checking Lao grammar in text.
 */

// Import the laoGrammarChecker function and its result interface
import { laoGrammarChecker, LaoGrammarCheckResult } from './laoGrammarChecker';

/**
 * Checks the grammar of a Lao language sentence.
 * This is the main function that users of the library will interact with.
 * 
 * @param sentence - The Lao text to be checked for grammar
 * @returns An array of LaoGrammarCheckResult objects, each containing the word, its indices, and grammar correctness.
 * 
 * @example
 * ```typescript
 * // Basic usage
 * const results = laoGrammarCheck("ສະບາຍດີ");
 * // Returns [
 * //   { word: "ສະ", startIndex: 0, endIndex: 1, grammarCorrect: true },
 * //   { word: "ບາຍ", startIndex: 2, endIndex: 4, grammarCorrect: true },
 * //   { word: "ດີ", startIndex: 5, endIndex: 6, grammarCorrect: true }
 * // ]
 * 
 * // Checking grammar with incorrect cases
 * const complexResults = laoGrammarCheck("່ກ ເດືອນເ ຜູ້ ພຽງຽ ະ");
 * // Returns [
 * //   { word: "່ກ", startIndex: 0, endIndex: 1, grammarCorrect: false },
 * //   { word: " ", startIndex: 2, endIndex: 2, grammarCorrect: true },
 * //   { word: "ເດືອນ", startIndex: 3, endIndex: 7, grammarCorrect: true },
 * //   { word: "ເ", startIndex: 8, endIndex: 8, grammarCorrect: false },
 * //   { word: " ", startIndex: 9, endIndex: 9, grammarCorrect: true },
 * //   { word: "ຜູ້", startIndex: 10, endIndex: 12, grammarCorrect: true },
 * //   { word: " ", startIndex: 13, endIndex: 13, grammarCorrect: true },
 * //   { word: "ພຽ", startIndex: 14, endIndex: 15, grammarCorrect: false },
 * //   { word: "ງຽ", startIndex: 16, endIndex: 17, grammarCorrect: false },
 * //   { word: " ", startIndex: 18, endIndex: 18, grammarCorrect: true },
 * //   { word: "ະ", startIndex: 19, endIndex: 19, grammarCorrect: false }
 * // ]
 * 
 * // Checking grammar with spaces and mixed content
 * const mixedResults = laoGrammarCheck("ພາສາລາວ 101");
 * // Returns [
 * //   { word: "ພາ", startIndex: 0, endIndex: 1, grammarCorrect: true },
 * //   { word: "ສາ", startIndex: 2, endIndex: 3, grammarCorrect: true },
 * //   { word: "ລາວ", startIndex: 4, endIndex: 6, grammarCorrect: true },
 * //   { word: " ", startIndex: 7, endIndex: 7, grammarCorrect: true },
 * //   { word: "101", startIndex: 8, endIndex: 10, grammarCorrect: true }
 * // ]
 * ```
 */
export function laoGrammarCheck(sentence: string): LaoGrammarCheckResult[] {
  return laoGrammarChecker(sentence);
}

// Export the LaoGrammarCheckResult interface for users of the library
export type { LaoGrammarCheckResult };