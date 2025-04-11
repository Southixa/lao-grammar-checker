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
      { word: "ທ້ດ", startIndex: 2, endIndex: 4, grammarCorrect: true },
      { word: " ", startIndex: 5, endIndex: 5, grammarCorrect: true },
      { word: "ລວ", startIndex: 6, endIndex: 7, grammarCorrect: true },
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
}); 