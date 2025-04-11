/// <reference types="jest" />
import { LaoWordInfo, LaoWordSplitter } from './LaoWordSplitter';

// Create a singleton instance of LaoWordSplitter
const splitter = new LaoWordSplitter();

describe('splitLao', () => {
  it('should segment sentence 1 correctly', () => {
    const sentence = "ປະເທດລາວເປັນສິ່ງສວຍງາມ";
    const expected: LaoWordInfo[] = [
      { word: "ປະ", startIndex: 0, endIndex: 1 },
      { word: "ເທດ", startIndex: 2, endIndex: 4 },
      { word: "ລາວ", startIndex: 5, endIndex: 7 },
      { word: "ເປັນ", startIndex: 8, endIndex: 11 },
      { word: "ສິ່ງ", startIndex: 12, endIndex: 15 },
      { word: "ສວຍ", startIndex: 16, endIndex: 18 },
      { word: "ງາມ", startIndex: 19, endIndex: 21 }
    ];
    expect(splitter.split(sentence)).toEqual(expected);
  });

  it('should segment sentence 2 correctly', () => {
    const sentence = "ສະບາຍດີຕອນເຊົ້າ";
    const expected: LaoWordInfo[] = [
      { word: "ສະ", startIndex: 0, endIndex: 1 },
      { word: "ບາຍ", startIndex: 2, endIndex: 4 },
      { word: "ດີ", startIndex: 5, endIndex: 6 },
      { word: "ຕອນ", startIndex: 7, endIndex: 9 },
      { word: "ເຊົ້າ", startIndex: 10, endIndex: 14 }
    ];
    expect(splitter.split(sentence)).toEqual(expected);
  });

  it('should segment sentence 3 correctly', () => {
    const sentence = "ຂ້ອຍກິນ  ເຂົ້າ";
    const expected: LaoWordInfo[] = [
      { word: "ຂ້ອຍ", startIndex: 0, endIndex: 3 },
      { word: "ກິນ", startIndex: 4, endIndex: 6 },
      { word: " ", startIndex: 7, endIndex: 7 },
      { word: " ", startIndex: 8, endIndex: 8 },
      { word: "ເຂົ້າ", startIndex: 9, endIndex: 13 }
    ];
    expect(splitter.split(sentence)).toEqual(expected);
  });

  it('should segment sentence 4 correctly with non-Lao chars', () => {
    const sentence = "ພາສາລາວ 101";
    const expected: LaoWordInfo[] = [
      { word: "ພາ", startIndex: 0, endIndex: 1 },
      { word: "ສາ", startIndex: 2, endIndex: 3 },
      { word: "ລາວ", startIndex: 4, endIndex: 6 },
      { word: " ", startIndex: 7, endIndex: 7 },
      { word: "101", startIndex: 8, endIndex: 10 }
    ];
    expect(splitter.split(sentence)).toEqual(expected);
  });

  it('should segment sentence 5 correctly with digraphs and vowels', () => {
    const sentence = "ໂຮງຮຽນຂອງພວກເຮົາ";
    const expected: LaoWordInfo[] = [
      { word: "ໂຮງ", startIndex: 0, endIndex: 2 },
      { word: "ຮຽນ", startIndex: 3, endIndex: 5 },
      { word: "ຂອງ", startIndex: 6, endIndex: 8 },
      { word: "ພວກ", startIndex: 9, endIndex: 11 },
      { word: "ເຮົາ", startIndex: 12, endIndex: 15 }
    ];
    expect(splitter.split(sentence)).toEqual(expected);
  });

  it('should segment sentence 6 correctly with digraphs and vowels', () => {
    const sentence = "ຫວຽດນາມ";
    const expected: LaoWordInfo[] = [
      { word: "ຫວຽດ", startIndex: 0, endIndex: 3 },
      { word: "ນາມ", startIndex: 4, endIndex: 6 }
    ];
    expect(splitter.split(sentence)).toEqual(expected);
  });

  it('should segment sentence 7 correctly (longer complex sentence)', () => {
    const sentence = "ຂ້ອຍມັກກິນເຂົ້າໜຽວໝູປີ້ງແຊບຫລາຍ";
    const expected: LaoWordInfo[] = [
      { word: "ຂ້ອຍ", startIndex: 0, endIndex: 3 },
      { word: "ມັກ", startIndex: 4, endIndex: 6 },
      { word: "ກິນ", startIndex: 7, endIndex: 9 },
      { word: "ເຂົ້າ", startIndex: 10, endIndex: 14 },
      { word: "ໜຽວ", startIndex: 15, endIndex: 17 },
      { word: "ໝູ", startIndex: 18, endIndex: 19 },
      { word: "ປີ້ງ", startIndex: 20, endIndex: 23 },
      { word: "ແຊບ", startIndex: 24, endIndex: 26 },
      { word: "ຫລາຍ", startIndex: 27, endIndex: 30 }
    ];
    expect(splitter.split(sentence)).toEqual(expected);
  });

  it('should segment sentence 8 correctly (mixed Lao and Non-Lao)', () => {
    const sentence = "ພາສາລາວ version 1.0 ເປັນພາສາທີ່ສວຍງາມ.";
    const expected: LaoWordInfo[] = [
      { word: "ພາ", startIndex: 0, endIndex: 1 },
      { word: "ສາ", startIndex: 2, endIndex: 3 },
      { word: "ລາວ", startIndex: 4, endIndex: 6 },
      { word: " ", startIndex: 7, endIndex: 7 },
      { word: "version", startIndex: 8, endIndex: 14 },
      { word: " ", startIndex: 15, endIndex: 15 },
      { word: "1.0", startIndex: 16, endIndex: 18 },
      { word: " ", startIndex: 19, endIndex: 19 },
      { word: "ເປັນ", startIndex: 20, endIndex: 23 },
      { word: "ພາ", startIndex: 24, endIndex: 25 },
      { word: "ສາ", startIndex: 26, endIndex: 27 },
      { word: "ທີ່", startIndex: 28, endIndex: 30 },
      { word: "ສວຍ", startIndex: 31, endIndex: 33 },
      { word: "ງາມ", startIndex: 34, endIndex: 36 },
      { word: ".", startIndex: 37, endIndex: 37 }
    ];
    expect(splitter.split(sentence)).toEqual(expected);
  });

  it('should segment sentence 9 correctly (complex with Mai Yamok)', () => {
    const sentence = "ວຽກບ້ານພາສາອັງກິດຍາກຫລາຍແທ້ໆ.";
    const expected: LaoWordInfo[] = [
      { word: "ວຽກ", startIndex: 0, endIndex: 2 },
      { word: "ບ້ານ", startIndex: 3, endIndex: 6 },
      { word: "ພາ", startIndex: 7, endIndex: 8 },
      { word: "ສາ", startIndex: 9, endIndex: 10 },
      { word: "ອັງ", startIndex: 11, endIndex: 13 },
      { word: "ກິດ", startIndex: 14, endIndex: 16 },
      { word: "ຍາກ", startIndex: 17, endIndex: 19 },
      { word: "ຫລາຍ", startIndex: 20, endIndex: 23 },
      { word: "ແທ້", startIndex: 24, endIndex: 26 },
      { word: "ໆ", startIndex: 27, endIndex: 27 },
      { word: ".", startIndex: 28, endIndex: 28 }
    ];
    expect(splitter.split(sentence)).toEqual(expected);
  });

  it('should return empty array for empty string', () => {
    const sentence = "";
    const expected: LaoWordInfo[] = [];
    expect(splitter.split(sentence)).toEqual(expected);
  });

  it('should return empty array for string with only spaces', () => {
    const sentence = "   ";
    const expected: LaoWordInfo[] = [
      { word: " ", startIndex: 0, endIndex: 0 },
      { word: " ", startIndex: 1, endIndex: 1 },
      { word: " ", startIndex: 2, endIndex: 2 }
    ];
    expect(splitter.split(sentence)).toEqual(expected);
  });

  it('should segment sentence with "ກວ" cluster correctly', () => {
    const sentence = "ຈົນກວ່າຈະ";
    const expected: LaoWordInfo[] = [
      { word: "ຈົນ", startIndex: 0, endIndex: 2 },
      { word: "ກວ່າ", startIndex: 3, endIndex: 6 },
      { word: "ຈະ", startIndex: 7, endIndex: 8 }
    ];
    expect(splitter.split(sentence)).toEqual(expected);
  });
}); 