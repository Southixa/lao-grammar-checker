# Lao Grammar Checker

ເຄື່ອງມືສຳລັບກວດໄວຍະກອນຄຳພາສາລາວ ແລະ ແຍກປະໂຫຍກພາສາລາວ ອອກເປັນແຕ່ລະຄຳອີງຕາມໂຄງສ້າງພາສາ.

A utility to check grammar in Lao language sentences and split the text into individual words based on syllable structure rules.

## ການຕິດຕັ້ງ / Installation

```bash
npm install lao-grammar-checker
```

## ການໃຊ້ງານ / Usage

```typescript
import { laoGrammarCheck } from 'lao-grammar-checker';

// Example 1: Basic usage
const sentence = "ສະບາຍດີຕອນເຊົ້າ";
const results = laoGrammarCheck(sentence);
console.log(results);
/* Output:
[
  { word: "ສະ", startIndex: 0, endIndex: 1, grammarCorrect: true },
  { word: "ບາຍ", startIndex: 2, endIndex: 4, grammarCorrect: true },
  { word: "ດີ", startIndex: 5, endIndex: 6, grammarCorrect: true },
  { word: "ຕອນ", startIndex: 7, endIndex: 9, grammarCorrect: true },
  { word: "ເຊົ້າ", startIndex: 10, endIndex: 14, grammarCorrect: true }
]
*/

// Example 2: Finding grammar errors
const textWithErrors = "່ກ ເດືອນເ ຜູ້ ພຽງຽ ະ";
const errorResults = laoGrammarCheck(textWithErrors);
console.log(errorResults);
/* Output:
[
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
  { word: "ະ", startIndex: 19, endIndex: 19, grammarCorrect: false }
]
*/

// Example 3: Mixed Lao and non-Lao text
const mixedText = "ພາສາລາວ Lao language 101";
const mixedResults = laoGrammarCheck(mixedText);
console.log(mixedResults);
/* Output:
[
  { word: "ພາ", startIndex: 0, endIndex: 1, grammarCorrect: true },
  { word: "ສາ", startIndex: 2, endIndex: 3, grammarCorrect: true },
  { word: "ລາວ", startIndex: 4, endIndex: 6, grammarCorrect: true },
  { word: " ", startIndex: 7, endIndex: 7, grammarCorrect: true },
  { word: "Lao", startIndex: 8, endIndex: 10, grammarCorrect: true },
  { word: " ", startIndex: 11, endIndex: 11, grammarCorrect: true },
  { word: "language", startIndex: 12, endIndex: 19, grammarCorrect: true },
  { word: " ", startIndex: 20, endIndex: 20, grammarCorrect: true },
  { word: "101", startIndex: 21, endIndex: 23, grammarCorrect: true }
]
*/
```

## ຄຸນສົມບັດ / Features

- ກວດໄວຍະກອນຄຳພາສາລາວຕາມກົດເກນທາງພາສາ
- ແຍກປະໂຫຍກພາສາລາວ ອອກເປັນແຕ່ລະຄຳ
- ບົ່ງຊີ້ຄຳທີ່ມີໂຄງສ້າງໄວຍະກອນບໍ່ຖືກຕ້ອງ
- ຮອງຮັບເນື້ອຫາທີ່ເປັນພາສາລາວປົນກັບອັກສອນອື່ນໆ

- Checks Lao grammar according to linguistic rules
- Splits Lao sentences into individual words
- Identifies words with incorrect grammatical structure
- Supports mixed Lao and non-Lao text

## ວິທີການທຳງານ / How It Works

ຟັງຊັນນີ້ປະກອບດ້ວຍ 2 ຂັ້ນຕອນຫຼັກ:

1. **ການແຍກຄຳ**: ໃຊ້ກົດເກນທາງດ້ານໂຄງສ້າງພະຍາງຄຳພາສາລາວເພື່ອກຳນົດຂອບເຂດຂອງຄຳ
2. **ການກວດໄວຍະກອນ**: ກວດແຕ່ລະຄຳທີ່ແຍກອອກມາຕາມກົດເກນເຊັ່ນ:
   - ໂຄງສ້າງສະຫຼະ ແລະ ພະຍັນຊະນະ
   - ຕຳແໜ່ງຂອງສະຫຼະ ແລະ ວັນນະຍຸດ
   - ກົດເກນພິເສດສຳລັບຕົວອັກສອນຕ່າງໆ (່ ້ ໊ ໋ ໍ, ຯລຯ)
   - ຈຳນວນພະຍັນຊະນະທີ່ເໝາະສົມໃນຄຳດຽວ

This function operates in two main steps:

1. **Word Segmentation**: Uses Lao syllable structure rules to determine word boundaries
2. **Grammar Checking**: Analyzes each segmented word according to rules such as:
   - Vowel and consonant structure
   - Position of vowels and tone marks
   - Special rules for specific characters (່ ້ ໊ ໋ ໍ, etc.)
   - Appropriate number of consonants in a single word

## ປະສິດທິພາບ / Performance

ອານຸພາບການຄຳນວນ (Time Complexity): **O(n)** ໝາຍຄວາມວ່າໄວຂອງຟັງຊັນຂຶ້ນຢູ່ກັບຄວາມຍາວຂອງປະໂຫຍກທີ່ປ້ອນເຂົ້າໄປ. ການແຍກປະໂຫຍກ ແລະ ການກວດໄວຍະກອນແມ່ນມີປະສິດທິພາບເນື່ອງຈາກການດຳເນີນງານສ່ວນໃຫຍ່ເກີດຂຶ້ນພຽງແຕ່ໃນຮອບດຽວເທົ່ານັ້ນ.

Time Complexity: **O(n)** where n is the length of the input sentence. This means the algorithm's performance scales linearly with the input size. The segmentation and grammar checking are efficient as they process the text primarily in single passes.

## ລິຂະສິດ / License

MIT 