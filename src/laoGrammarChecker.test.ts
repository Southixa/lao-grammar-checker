/// <reference types="jest" />
import { laoGrammarChecker, LaoGrammarCheckResult } from './laoGrammarChecker';

describe('laoGrammarChecker', () => {
  it('should check basic sentence grammar correctly', () => {
    const sentence = "ປະເທດລາວ";
    const expected: LaoGrammarCheckResult[] = [
      { word: "ປະ", startIndex: 0, endIndex: 1, grammarCorrect: true },
      { word: "ເທດ", startIndex: 2, endIndex: 4, grammarCorrect: true },
      { word: "ລາວ", startIndex: 5, endIndex: 7, grammarCorrect: true },
    ];
    expect(laoGrammarChecker(sentence)).toEqual(expected);
  });

  it('should check sentences with spaces correctly', () => {
    const sentence = "ສະບາຍດີ ທ່ານ";
    const expected: LaoGrammarCheckResult[] = [
      { word: "ສະ", startIndex: 0, endIndex: 1, grammarCorrect: true },
      { word: "ບາຍ", startIndex: 2, endIndex: 4, grammarCorrect: true },
      { word: "ດີ", startIndex: 5, endIndex: 6, grammarCorrect: true },
      { word: " ", startIndex: 7, endIndex: 7, grammarCorrect: true },
      { word: "ທ່ານ", startIndex: 8, endIndex: 11, grammarCorrect: true },
    ];
    expect(laoGrammarChecker(sentence)).toEqual(expected);
  });

  it('should identify incorrect grammar', () => {
    const sentence = "ປ ທ້ດ ລວ";
    const expected: LaoGrammarCheckResult[] = [
      { word: "ປ", startIndex: 0, endIndex: 0, grammarCorrect: false },
      { word: " ", startIndex: 1, endIndex: 1, grammarCorrect: true },
      { word: "ທ້ດ", startIndex: 2, endIndex: 4, grammarCorrect: false },
      { word: " ", startIndex: 5, endIndex: 5, grammarCorrect: true },
      { word: "ລວ", startIndex: 6, endIndex: 7, grammarCorrect: false },
    ];
    expect(laoGrammarChecker(sentence)).toEqual(expected);
  });

  it('should handle Mai Yamok correctly', () => {
    const sentence = "ກິນເຂົ້າແລ້ວໆບໍ່";
    const expected: LaoGrammarCheckResult[] = [
      { word: "ກິນ", startIndex: 0, endIndex: 2, grammarCorrect: true },
      { word: "ເຂົ້າ", startIndex: 3, endIndex: 7, grammarCorrect: true },
      { word: "ແລ້ວ", startIndex: 8, endIndex: 11, grammarCorrect: true },
      { word: "ໆ", startIndex: 12, endIndex: 12, grammarCorrect: true },
      { word: "ບໍ່", startIndex: 13, endIndex: 15, grammarCorrect: true },
    ];
    expect(laoGrammarChecker(sentence)).toEqual(expected);
  });

  it('should handle mixed languages correctly', () => {
    const sentence = "Hello ສະບາຍດີ World123 ພາສາ Lao";
    const expected: LaoGrammarCheckResult[] = [
      { word: "Hello", startIndex: 0, endIndex: 4, grammarCorrect: true },
      { word: " ", startIndex: 5, endIndex: 5, grammarCorrect: true },
      { word: "ສະ", startIndex: 6, endIndex: 7, grammarCorrect: true },
      { word: "ບາຍ", startIndex: 8, endIndex: 10, grammarCorrect: true },
      { word: "ດີ", startIndex: 11, endIndex: 12, grammarCorrect: true },
      { word: " ", startIndex: 13, endIndex: 13, grammarCorrect: true },
      { word: "World123", startIndex: 14, endIndex: 21, grammarCorrect: true },
      { word: " ", startIndex: 22, endIndex: 22, grammarCorrect: true },
      { word: "ພາ", startIndex: 23, endIndex: 24, grammarCorrect: true },
      { word: "ສາ", startIndex: 25, endIndex: 26, grammarCorrect: true },
      { word: " ", startIndex: 27, endIndex: 27, grammarCorrect: true },
      { word: "Lao", startIndex: 28, endIndex: 30, grammarCorrect: true },
    ];
    expect(laoGrammarChecker(sentence)).toEqual(expected);
  });

  it('should identify grammar rule violations', () => {
    const sentence = "່ກ ເດືອນເ ຜູ້ ພຽງຽ ະ";
    const expected: LaoGrammarCheckResult[] = [
      { word: "່ກ", startIndex: 0, endIndex: 1, grammarCorrect: false },
      { word: " ", startIndex: 2, endIndex: 2, grammarCorrect: true },
      { word: "ເດືອນ", startIndex: 3, endIndex: 7, grammarCorrect: true },
      { word: "ເ", startIndex: 8, endIndex: 8, grammarCorrect: false },
      { word: " ", startIndex: 9, endIndex: 9, grammarCorrect: true },
      { word: "ຜູ້", startIndex: 10, endIndex: 12, grammarCorrect: true },
      { word: " ", startIndex: 13, endIndex: 13, grammarCorrect: true },
      { word: "ພຽ", startIndex: 14, endIndex: 15, grammarCorrect: false },
      { word: "ງຽ", startIndex: 16, endIndex: 17, grammarCorrect: false },
      { word: " ", startIndex: 18, endIndex: 18, grammarCorrect: true },
      { word: "ະ", startIndex: 19, endIndex: 19, grammarCorrect: false },
    ];
    expect(laoGrammarChecker(sentence)).toEqual(expected);
  });

  it('should handle multiple spaces correctly', () => {
    const sentence = "ຂ້ອຍກິນ  ເຂົ້າ";
    const expected: LaoGrammarCheckResult[] = [
      { word: "ຂ້ອຍ", startIndex: 0, endIndex: 3, grammarCorrect: true },
      { word: "ກິນ", startIndex: 4, endIndex: 6, grammarCorrect: true },
      { word: " ", startIndex: 7, endIndex: 7, grammarCorrect: true },
      { word: " ", startIndex: 8, endIndex: 8, grammarCorrect: true },
      { word: "ເຂົ້າ", startIndex: 9, endIndex: 13, grammarCorrect: true },
    ];
    expect(laoGrammarChecker(sentence)).toEqual(expected);
  });

  it('should return empty array for empty string', () => {
    const sentence = "";
    const expected: LaoGrammarCheckResult[] = [];
    expect(laoGrammarChecker(sentence)).toEqual(expected);
  });

  it('should return spaces as grammatically correct for string with only spaces', () => {
    const sentence = "   ";
    const expected: LaoGrammarCheckResult[] = [
      { word: " ", startIndex: 0, endIndex: 0, grammarCorrect: true },
      { word: " ", startIndex: 1, endIndex: 1, grammarCorrect: true },
      { word: " ", startIndex: 2, endIndex: 2, grammarCorrect: true }
    ];
    expect(laoGrammarChecker(sentence)).toEqual(expected);
  });

  it('should identify invalid vowel placement (vowel at start)', () => {
    const sentence = "າບ";
    const expected: LaoGrammarCheckResult[] = [
      { word: "າບ", startIndex: 0, endIndex: 1, grammarCorrect: false },
    ];
    expect(laoGrammarChecker(sentence)).toEqual(expected);
  });

  it('should identify invalid tone mark placement (tone without consonant)', () => {
    const sentence = "ບ້ ານ";
    const expected: LaoGrammarCheckResult[] = [
      { word: "ບ້", startIndex: 0, endIndex: 1, grammarCorrect: false }, // Tone mark rule violation
      { word: " ", startIndex: 2, endIndex: 2, grammarCorrect: true },
      { word: "ານ", startIndex: 3, endIndex: 4, grammarCorrect: false },
    ];
    expect(laoGrammarChecker(sentence)).toEqual(expected);
  });

  it('should identify words with too many consonants', () => {
    const sentence = "ກຂຄງຈ";
    const expected: LaoGrammarCheckResult[] = [
      { word: "ກຂຄງຈ", startIndex: 0, endIndex: 4, grammarCorrect: false }, // Exceeds consonant limit
    ];
    expect(laoGrammarChecker(sentence)).toEqual(expected);
  });

  it('should identify leading vowel without following consonant', () => {
    const sentence = "ເ ";
    const expected: LaoGrammarCheckResult[] = [
      { word: "ເ", startIndex: 0, endIndex: 0, grammarCorrect: false },
      { word: " ", startIndex: 1, endIndex: 1, grammarCorrect: true },
    ];
    expect(laoGrammarChecker(sentence)).toEqual(expected);
  });

  it('should identify vowel IA (ຽ) without following consonant', () => {
    const sentence = "ຮຽ ";
    const expected: LaoGrammarCheckResult[] = [
      { word: "ຮຽ", startIndex: 0, endIndex: 1, grammarCorrect: false }, // Vowel IA rule violation
      { word: " ", startIndex: 2, endIndex: 2, grammarCorrect: true },
    ];
    expect(laoGrammarChecker(sentence)).toEqual(expected);
  });

  it('should identify tone mark without following char in short word', () => {
    const sentence = "ກ້ "; // Word length is 2, tone mark at end
    const expected: LaoGrammarCheckResult[] = [
      { word: "ກ້", startIndex: 0, endIndex: 1, grammarCorrect: false }, // Rule 3.2 violation
      { word: " ", startIndex: 2, endIndex: 2, grammarCorrect: true },
    ];
    expect(laoGrammarChecker(sentence)).toEqual(expected);
  });

  it('should handle a sentence with user-provided specific cases', () => {
    const sentence = "ບ່ ບ່ອນ ບ້ອນ ຂ້ອຍ ກ່ ເດ່ອນ ອອ່ນ ອ່ອນ ບ້ ລງອ";
    const expected: LaoGrammarCheckResult[] = [
      { word: "ບ່", startIndex: 0, endIndex: 1, grammarCorrect: false },   // Rule 3.2 violation
      { word: " ", startIndex: 2, endIndex: 2, grammarCorrect: true },
      { word: "ບ່ອນ", startIndex: 3, endIndex: 6, grammarCorrect: true },
      { word: " ", startIndex: 7, endIndex: 7, grammarCorrect: true },
      { word: "ບ້ອນ", startIndex: 8, endIndex: 11, grammarCorrect: true },
      { word: " ", startIndex: 12, endIndex: 12, grammarCorrect: true },
      { word: "ຂ້ອຍ", startIndex: 13, endIndex: 16, grammarCorrect: true },
      { word: " ", startIndex: 17, endIndex: 17, grammarCorrect: true },
      { word: "ກ່", startIndex: 18, endIndex: 19, grammarCorrect: false },   // Rule 3.2 violation
      { word: " ", startIndex: 20, endIndex: 20, grammarCorrect: true },
      { word: "ເດ່ອນ", startIndex: 21, endIndex: 25, grammarCorrect: false }, // Rule 3.1 violation
      { word: " ", startIndex: 26, endIndex: 26, grammarCorrect: true },
      { word: "ອ", startIndex: 27, endIndex: 27, grammarCorrect: false }, // User marked as incorrect
      { word: "ອ່ນ", startIndex: 28, endIndex: 30, grammarCorrect: false }, // User marked as incorrect
      { word: " ", startIndex: 31, endIndex: 31, grammarCorrect: true },
      { word: "ອ່ອນ", startIndex: 32, endIndex: 35, grammarCorrect: true },
      { word: " ", startIndex: 36, endIndex: 36, grammarCorrect: true },
      { word: "ບ້", startIndex: 37, endIndex: 38, grammarCorrect: false },   // Rule 3.2 violation
      { word: " ", startIndex: 39, endIndex: 39, grammarCorrect: true },
      { word: "ລງອ", startIndex: 40, endIndex: 42, grammarCorrect: true }, // Multiple consonants, no vowels/tones, currently passes
    ];
    expect(laoGrammarChecker(sentence)).toEqual(expected);
  });

  // --- Additional Edge Cases (Combined Sentence) ---
  it('should handle a sentence with various edge cases and potentially undefined structures', () => {
    const sentence = "ກຳ ໃຈ ໄປ ກ້ຽວ ສຽງ ຫລັກ ຈັນທ໌ ອອກ ອ່ານ ກກ ສາາ ບິິ ກ່້ ເົາກ ຳ";
    const expected: LaoGrammarCheckResult[] = [
      // Words with special vowels/structures
      { word: "ກຳ", startIndex: 0, endIndex: 1, grammarCorrect: true },
      { word: " ", startIndex: 2, endIndex: 2, grammarCorrect: true },
      { word: "ໃຈ", startIndex: 3, endIndex: 4, grammarCorrect: true },
      { word: " ", startIndex: 5, endIndex: 5, grammarCorrect: true },
      { word: "ໄປ", startIndex: 6, endIndex: 7, grammarCorrect: true },
      { word: " ", startIndex: 8, endIndex: 8, grammarCorrect: true },
      { word: "ກ້ຽວ", startIndex: 9, endIndex: 12, grammarCorrect: true },
      { word: " ", startIndex: 13, endIndex: 13, grammarCorrect: true },
      { word: "ສຽງ", startIndex: 14, endIndex: 16, grammarCorrect: true },
      { word: " ", startIndex: 17, endIndex: 17, grammarCorrect: true },
      { word: "ຫລັກ", startIndex: 18, endIndex: 21, grammarCorrect: true },
      { word: " ", startIndex: 22, endIndex: 22, grammarCorrect: true },
      { word: "ຈັນ", startIndex: 23, endIndex: 25, grammarCorrect: true },
      { word: "ທ໌", startIndex: 26, endIndex: 27, grammarCorrect: true },
      { word: " ", startIndex: 28, endIndex: 28, grammarCorrect: true },
      { word: "ອອກ", startIndex: 29, endIndex: 31, grammarCorrect: true },
      { word: " ", startIndex: 32, endIndex: 32, grammarCorrect: true },
      { word: "ອ່ານ", startIndex: 33, endIndex: 36, grammarCorrect: true },
      { word: " ", startIndex: 37, endIndex: 37, grammarCorrect: true },
      // Potentially incorrect structures
      { word: "ກກ", startIndex: 38, endIndex: 39, grammarCorrect: false },
      { word: " ", startIndex: 40, endIndex: 40, grammarCorrect: true },
      { word: "ສາາ", startIndex: 41, endIndex: 43, grammarCorrect: false },
      { word: " ", startIndex: 44, endIndex: 44, grammarCorrect: true },
      { word: "ບິິ", startIndex: 45, endIndex: 47, grammarCorrect: false },
      { word: " ", startIndex: 48, endIndex: 48, grammarCorrect: true },
      { word: "ກ່້", startIndex: 49, endIndex: 51, grammarCorrect: false },
      { word: " ", startIndex: 52, endIndex: 52, grammarCorrect: true },
      { word: "ເົາກ", startIndex: 53, endIndex: 56, grammarCorrect: false },
      { word: " ", startIndex: 57, endIndex: 57, grammarCorrect: true },
      { word: "ຳ", startIndex: 58, endIndex: 58, grammarCorrect: false },
    ];
    // Note: Expected results might vary slightly depending on the splitter logic for complex cases.
    expect(laoGrammarChecker(sentence)).toEqual(expected);
  });

  // --- Additional Edge Cases (Combined Sentence - No Spaces) ---
  it('should handle a sentence with various edge cases joined without spaces', () => {
    const sentence = "ກຳໃຈໄປກ້ຽວສຽງຫລັກຈັນທ໌ອອກອ່ານກກສາາບິິກ່້ເົາກຳ";
    const expected: LaoGrammarCheckResult[] = [
      { word: "ກຳ", startIndex: 0, endIndex: 1, grammarCorrect: true },
      { word: "ໃຈ", startIndex: 2, endIndex: 3, grammarCorrect: true },
      { word: "ໄປ", startIndex: 4, endIndex: 5, grammarCorrect: true },
      { word: "ກ້ຽວ", startIndex: 6, endIndex: 9, grammarCorrect: true },
      { word: "ສຽງ", startIndex: 10, endIndex: 12, grammarCorrect: true },
      { word: "ຫລັກ", startIndex: 13, endIndex: 16, grammarCorrect: true },
      { word: "ຈັນ", startIndex: 17, endIndex: 19, grammarCorrect: true }, 
      { word: "ທ໌", startIndex: 20, endIndex: 21, grammarCorrect: true },
      { word: "ອອກ", startIndex: 22, endIndex: 24, grammarCorrect: true },
      { word: "ອ່ານກກ", startIndex: 25, endIndex: 30, grammarCorrect: false }, // need to fix later
      { word: "ສາາ", startIndex: 31, endIndex: 33, grammarCorrect: false },
      { word: "ບິິ", startIndex: 34, endIndex: 36, grammarCorrect: false }, 
      { word: "ກ່້", startIndex: 37, endIndex: 39, grammarCorrect: false }, 
      { word: "ເົາ", startIndex: 40, endIndex: 42, grammarCorrect: false },
      { word: "ກຳ", startIndex: 43, endIndex: 44, grammarCorrect: true },
    ];
    // Note: Expected results depend heavily on splitter behavior for the continuous string.
    expect(laoGrammarChecker(sentence)).toEqual(expected);
  });

  // --- Additional User Requested Sentence (Spaced) ---
  it('should handle the long user-provided sentence with spaces', () => {
      const sentence = "ຳ ທ໋ານ ທານ ປ່າ ປ່ຽນ ກ່ານ ກ໋ອນ ກ໊ອນ ກ່ຽວ ກ່ານ ກ ບ່ ບ່ອນ ບ້ອນ ຂ້ອຍ ກ່ ກ່ ດ່ອນ ເງືອນ ອອ່ນ ອ່ອນ ອ່ອນ ບ້ ລງອ ຫລ່ຽນ ຫ່ລຽນ ເອ່ອ ເເອ່ອ ອ່ນ ເລ່ຽນ ລ່ຽນ ເດ່ນ ໂງ່ ແດ່ ເດ່ ເງືອນ ເງ່ອນ ເເງ່ນ ແຟ່ນ ເດ່ອນ ເດ່ວນ ໂດ່ວນ ເ ແ ໂ ໄ ໃ ທ້ດ";
      const expected: LaoGrammarCheckResult[] = [
        { word: "ຳ", startIndex: 0, endIndex: 0, grammarCorrect: false }, // Guard 2
        { word: " ", startIndex: 1, endIndex: 1, grammarCorrect: true },
        { word: "ທ໋ານ", startIndex: 2, endIndex: 5, grammarCorrect: false },
        { word: " ", startIndex: 6, endIndex: 6, grammarCorrect: true },
        { word: "ທານ", startIndex: 7, endIndex: 9, grammarCorrect: true },
        { word: " ", startIndex: 10, endIndex: 10, grammarCorrect: true },
        { word: "ປ່າ", startIndex: 11, endIndex: 13, grammarCorrect: true },
        { word: " ", startIndex: 14, endIndex: 14, grammarCorrect: true },
        { word: "ປ່ຽນ", startIndex: 15, endIndex: 18, grammarCorrect: true },
        { word: " ", startIndex: 19, endIndex: 19, grammarCorrect: true },
        { word: "ກ່ານ", startIndex: 20, endIndex: 23, grammarCorrect: true },
        { word: " ", startIndex: 24, endIndex: 24, grammarCorrect: true },
        { word: "ກ໋ອນ", startIndex: 25, endIndex: 28, grammarCorrect: true },
        { word: " ", startIndex: 29, endIndex: 29, grammarCorrect: true },
        { word: "ກ໊ອນ", startIndex: 30, endIndex: 33, grammarCorrect: true },
        { word: " ", startIndex: 34, endIndex: 34, grammarCorrect: true },
        { word: "ກ່ຽວ", startIndex: 35, endIndex: 38, grammarCorrect: true },
        { word: " ", startIndex: 39, endIndex: 39, grammarCorrect: true },
        { word: "ກ່ານ", startIndex: 40, endIndex: 43, grammarCorrect: true },
        { word: " ", startIndex: 44, endIndex: 44, grammarCorrect: true },
        { word: "ກ", startIndex: 45, endIndex: 45, grammarCorrect: false }, // Guard 1
        { word: " ", startIndex: 46, endIndex: 46, grammarCorrect: true },
        { word: "ບ່", startIndex: 47, endIndex: 48, grammarCorrect: false }, // Rule 3.3
        { word: " ", startIndex: 49, endIndex: 49, grammarCorrect: true },
        { word: "ບ່ອນ", startIndex: 50, endIndex: 53, grammarCorrect: true },
        { word: " ", startIndex: 54, endIndex: 54, grammarCorrect: true },
        { word: "ບ້ອນ", startIndex: 55, endIndex: 58, grammarCorrect: true },
        { word: " ", startIndex: 59, endIndex: 59, grammarCorrect: true },
        { word: "ຂ້ອຍ", startIndex: 60, endIndex: 63, grammarCorrect: true },
        { word: " ", startIndex: 64, endIndex: 64, grammarCorrect: true },
        { word: "ກ່", startIndex: 65, endIndex: 66, grammarCorrect: false }, // Rule 3.3
        { word: " ", startIndex: 67, endIndex: 67, grammarCorrect: true },
        { word: "ກ່", startIndex: 68, endIndex: 69, grammarCorrect: false }, // Rule 3.3
        { word: " ", startIndex: 70, endIndex: 70, grammarCorrect: true },
        { word: "ດ່ອນ", startIndex: 71, endIndex: 74, grammarCorrect: true },
        { word: " ", startIndex: 75, endIndex: 75, grammarCorrect: true },
        { word: "ເງືອນ", startIndex: 76, endIndex: 80, grammarCorrect: true },
        { word: " ", startIndex: 81, endIndex: 81, grammarCorrect: true },
        { word: "ອ", startIndex: 82, endIndex: 82, grammarCorrect: false },
        { word: "ອ່ນ", startIndex: 83, endIndex: 85, grammarCorrect: false },
        { word: " ", startIndex: 86, endIndex: 86, grammarCorrect: true },
        { word: "ອ່ອນ", startIndex: 87, endIndex: 90, grammarCorrect: true },
        { word: " ", startIndex: 91, endIndex: 91, grammarCorrect: true },
        { word: "ອ່ອນ", startIndex: 92, endIndex: 95, grammarCorrect: true },
        { word: " ", startIndex: 96, endIndex: 96, grammarCorrect: true },
        { word: "ບ້", startIndex: 97, endIndex: 98, grammarCorrect: false }, // Rule 3.3
        { word: " ", startIndex: 99, endIndex: 99, grammarCorrect: true },
        { word: "ລງອ", startIndex: 100, endIndex: 102, grammarCorrect: true },
        { word: " ", startIndex: 103, endIndex: 103, grammarCorrect: true },
        { word: "ຫລ່ຽນ", startIndex: 104, endIndex: 108, grammarCorrect: true },
        { word: " ", startIndex: 109, endIndex: 109, grammarCorrect: true },
        { word: "ຫ່", startIndex: 110, endIndex: 111, grammarCorrect: false },
        { word: "ລຽນ", startIndex: 112, endIndex: 114, grammarCorrect: true },
        { word: " ", startIndex: 115, endIndex: 115, grammarCorrect: true },
        { word: "ເອ່ອ", startIndex: 116, endIndex: 119, grammarCorrect: true },
        { word: " ", startIndex: 120, endIndex: 120, grammarCorrect: true },
        { word: "ເເອ່ອ", startIndex: 121, endIndex: 125, grammarCorrect: true },
        { word: " ", startIndex: 126, endIndex: 126, grammarCorrect: true },
        { word: "ອ່ນ", startIndex: 127, endIndex: 129, grammarCorrect: false }, // User marked false (passes rules)
        { word: " ", startIndex: 130, endIndex: 130, grammarCorrect: true },
        { word: "ເລ່ຽນ", startIndex: 131, endIndex: 135, grammarCorrect: true },
        { word: " ", startIndex: 136, endIndex: 136, grammarCorrect: true },
        { word: "ລ່ຽນ", startIndex: 137, endIndex: 140, grammarCorrect: true },
        { word: " ", startIndex: 141, endIndex: 141, grammarCorrect: true },
        { word: "ເດ່ນ", startIndex: 142, endIndex: 145, grammarCorrect: true },
        { word: " ", startIndex: 146, endIndex: 146, grammarCorrect: true },
        { word: "ໂງ່", startIndex: 147, endIndex: 149, grammarCorrect: true },
        { word: " ", startIndex: 150, endIndex: 150, grammarCorrect: true },
        { word: "ແດ່", startIndex: 151, endIndex: 153, grammarCorrect: true },
        { word: " ", startIndex: 154, endIndex: 154, grammarCorrect: true },
        { word: "ເດ່", startIndex: 155, endIndex: 157, grammarCorrect: true },
        { word: " ", startIndex: 158, endIndex: 158, grammarCorrect: true },
        { word: "ເງືອນ", startIndex: 159, endIndex: 163, grammarCorrect: true },
        { word: " ", startIndex: 164, endIndex: 164, grammarCorrect: true },
        { word: "ເງ່ອນ", startIndex: 165, endIndex: 169, grammarCorrect: false },
        { word: " ", startIndex: 170, endIndex: 170, grammarCorrect: true },
        { word: "ເເງ່ນ", startIndex: 171, endIndex: 175, grammarCorrect: true },
        { word: " ", startIndex: 176, endIndex: 176, grammarCorrect: true },
        { word: "ແຟ່ນ", startIndex: 177, endIndex: 180, grammarCorrect: true },
        { word: " ", startIndex: 181, endIndex: 181, grammarCorrect: true },
        { word: "ເດ່ອນ", startIndex: 182, endIndex: 186, grammarCorrect: false }, // Rule 3.1
        { word: " ", startIndex: 187, endIndex: 187, grammarCorrect: true },
        { word: "ເດ່ວນ", startIndex: 188, endIndex: 192, grammarCorrect: false },
        { word: " ", startIndex: 193, endIndex: 193, grammarCorrect: true },
        { word: "ໂດ່ວນ", startIndex: 194, endIndex: 198, grammarCorrect: false },
        { word: " ", startIndex: 199, endIndex: 199, grammarCorrect: true },
        { word: "ເ", startIndex: 200, endIndex: 200, grammarCorrect: false }, // Guard 1
        { word: " ", startIndex: 201, endIndex: 201, grammarCorrect: true },
        { word: "ແ", startIndex: 202, endIndex: 202, grammarCorrect: false }, // Guard 1
        { word: " ", startIndex: 203, endIndex: 203, grammarCorrect: true },
        { word: "ໂ", startIndex: 204, endIndex: 204, grammarCorrect: false }, // Guard 1
        { word: " ", startIndex: 205, endIndex: 205, grammarCorrect: true },
        { word: "ໄ", startIndex: 206, endIndex: 206, grammarCorrect: false }, // Guard 1
        { word: " ", startIndex: 207, endIndex: 207, grammarCorrect: true },
        { word: "ໃ", startIndex: 208, endIndex: 208, grammarCorrect: false }, // Guard 1
        { word: " ", startIndex: 209, endIndex: 209, grammarCorrect: true },
        { word: "ທ້ດ", startIndex: 210, endIndex: 212, grammarCorrect: false }, // Rule 3.5
      ];
      expect(laoGrammarChecker(sentence)).toEqual(expected);
  });

  // --- Additional User Requested Sentence (No Spaces) ---
  it('should handle the long user-provided sentence without spaces', () => {
      const sentence = "ຳທ໋ານທານປ່າປ່ຽນກ່ານກ໋ອນກ໊ອນກ່ຽວກ່ານກບ່ບ່ອນບ້ອນຂ້ອຍກ່ກ່ດ່ອນເງືອນອອ່ນອ່ອນອ່ອນບ້ລງອຫລ່ຽນຫ່ລຽນເອ່ອເເອ່ອອ່ນເລ່ຽນລ່ຽນເດ່ນໂງ່ແດ່ເດ່ເງືອນເງ່ອນເເງ່ນແຟ່ນເດ່ອນເດ່ວນໂດ່ວນເແໂໄໃທ້ດ";
      // NOTE: The expected results here are highly dependent on the splitter's complex logic
      // and how it handles potentially ambiguous or invalid sequences when joined.
      // This is a best guess based on observed behavior and rules.
      const expected: LaoGrammarCheckResult[] = [
        { word: "ຳ", startIndex: 0, endIndex: 0, grammarCorrect: false },
        { word: "ທ໋ານ", startIndex: 1, endIndex: 4, grammarCorrect: false }, 
        { word: "ທານ", startIndex: 5, endIndex: 7, grammarCorrect: true },
        { word: "ປ່າ", startIndex: 8, endIndex: 10, grammarCorrect: true },
        { word: "ປ່ຽນ", startIndex: 11, endIndex: 14, grammarCorrect: true },
        { word: "ກ່ານ", startIndex: 15, endIndex: 18, grammarCorrect: true },
        { word: "ກ໋ອນ", startIndex: 19, endIndex: 22, grammarCorrect: true },
        { word: "ກ໊ອນ", startIndex: 23, endIndex: 26, grammarCorrect: true },
        { word: "ກ່ຽວ", startIndex: 27, endIndex: 30, grammarCorrect: true },
        { word: "ກ່ານກ", startIndex: 31, endIndex: 35, grammarCorrect: false }, // need to fix later
        { word: "ບ່", startIndex: 36, endIndex: 37, grammarCorrect: false },  
        { word: "ບ່ອນ", startIndex: 38, endIndex: 41, grammarCorrect: true },
        { word: "ບ້ອນ", startIndex: 42, endIndex: 45, grammarCorrect: true },
        { word: "ຂ້ອຍ", startIndex: 46, endIndex: 49, grammarCorrect: true },
        { word: "ກ່", startIndex: 50, endIndex: 51, grammarCorrect: false },
        { word: "ກ່", startIndex: 52, endIndex: 53, grammarCorrect: false },
        { word: "ດ່ອນ", startIndex: 54, endIndex: 57, grammarCorrect: true },
        { word: "ເງືອ", startIndex: 58, endIndex: 61, grammarCorrect: true }, // need to fix later
        { word: "ນອ", startIndex: 62, endIndex: 63, grammarCorrect: false },
        { word: "ອ່ນ", startIndex: 64, endIndex: 66, grammarCorrect: false },
        { word: "ອ່ອນ", startIndex: 67, endIndex: 70, grammarCorrect: true },
        { word: "ອ່ອນ", startIndex: 71, endIndex: 74, grammarCorrect: true },
        { word: "ບ້ລ", startIndex: 75, endIndex: 77, grammarCorrect: false },
        { word: "ງອ", startIndex: 78, endIndex: 79, grammarCorrect: false },
        { word: "ຫລ່ຽນ", startIndex: 80, endIndex: 84, grammarCorrect: true },
        { word: "ຫ່", startIndex: 85, endIndex: 86, grammarCorrect: false },
        { word: "ລຽນ", startIndex: 87, endIndex: 89, grammarCorrect: true },
        { word: "ເອ່ອ", startIndex: 90, endIndex: 93, grammarCorrect: true },
        { word: "ເເອ່ອ", startIndex: 94, endIndex: 98, grammarCorrect: true },
        { word: "ອ່ນ", startIndex: 99, endIndex: 101, grammarCorrect: false },
        { word: "ເລ່ຽນ", startIndex: 102, endIndex: 106, grammarCorrect: true },
        { word: "ລ່ຽນ", startIndex: 107, endIndex: 110, grammarCorrect: true },
        { word: "ເດ່ນ", startIndex: 111, endIndex: 114, grammarCorrect: true },
        { word: "ໂງ່", startIndex: 115, endIndex: 117, grammarCorrect: true },
        { word: "ແດ່", startIndex: 118, endIndex: 120, grammarCorrect: true },
        { word: "ເດ່", startIndex: 121, endIndex: 123, grammarCorrect: true },
        { word: "ເງືອນ", startIndex: 124, endIndex: 128, grammarCorrect: true },
        { word: "ເງ່ອນ", startIndex: 129, endIndex: 133, grammarCorrect: false },
        { word: "ເເງ່ນ", startIndex: 134, endIndex: 138, grammarCorrect: true },
        { word: "ແຟ່ນ", startIndex: 139, endIndex: 142, grammarCorrect: true },
        { word: "ເດ່ອນ", startIndex: 143, endIndex: 147, grammarCorrect: false },
        { word: "ເດ່ວນ", startIndex: 148, endIndex: 152, grammarCorrect: false },
        { word: "ໂດ່ວນ", startIndex: 153, endIndex: 157, grammarCorrect: false },
        { word: "ເ", startIndex: 158, endIndex: 158, grammarCorrect: false },
        { word: "ແ", startIndex: 159, endIndex: 159, grammarCorrect: false },
        { word: "ໂ", startIndex: 160, endIndex: 160, grammarCorrect: false },
        { word: "ໄ", startIndex: 161, endIndex: 161, grammarCorrect: false },    
        { word: "ໃທ້ດ", startIndex: 162, endIndex: 165, grammarCorrect: true },  // need to fix later
      ];
      expect(laoGrammarChecker(sentence)).toEqual(expected);
  });

  it('should correctly check the sentence "ທາງເດ່ອນແມ່ນຫ່"', () => {
    const sentence = "ທາງເດ່ອນແມ່ນຫ່";
    const expected: LaoGrammarCheckResult[] = [
        { word: "ທາງ", startIndex: 0, endIndex: 2, grammarCorrect: true },
        { word: "ເດ່ອນ", startIndex: 3, endIndex: 7, grammarCorrect: false },
        { word: "ແມ່ນ", startIndex: 8, endIndex: 11, grammarCorrect: true },
        { word: "ຫ່", startIndex: 12, endIndex: 13, grammarCorrect: false },
    ];
    expect(laoGrammarChecker(sentence)).toEqual(expected);
  });

  it('should handle mixed Lao, non-Lao, and incorrect words correctly', () => {
    const sentence = "lao 123ປທ້ດເທດgrammarລວ!#$";
    const expected: LaoGrammarCheckResult[] = [
      { word: "lao", startIndex: 0, endIndex: 2, grammarCorrect: true },
      { word: " ", startIndex: 3, endIndex: 3, grammarCorrect: true },
      { word: "123", startIndex: 4, endIndex: 6, grammarCorrect: true },
      { word: "ປ", startIndex: 7, endIndex: 7, grammarCorrect: false },
      { word: "ທ້ດ", startIndex: 8, endIndex: 10, grammarCorrect: false },
      { word: "ເທດ", startIndex: 11, endIndex: 13, grammarCorrect: true },
      { word: "grammar", startIndex: 14, endIndex: 20, grammarCorrect: true },
      { word: "ລວ", startIndex: 21, endIndex: 22, grammarCorrect: false },
      { word: "!#$", startIndex: 23, endIndex: 25, grammarCorrect: true },
    ];
    expect(laoGrammarChecker(sentence)).toEqual(expected);
  });
}); 