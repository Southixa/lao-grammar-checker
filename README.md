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
const textWithErrors = "ທາງເດ່ອນແມ່ນຫ່";
const errorResults = laoGrammarCheck(textWithErrors);
console.log(errorResults);
/* Output:
[
  { word: "ທາງ", startIndex: 0, endIndex: 2, grammarCorrect: true },
  { word: "ເດ່ອນ", startIndex: 3, endIndex: 7, grammarCorrect: false },
  { word: "ແມ່ນ", startIndex: 8, endIndex: 11, grammarCorrect: true },
  { word: "ຫ່", startIndex: 12, endIndex: 13, grammarCorrect: false },
]
*/

// Example 3: Mixed Lao, non-Lao, and incorrect words
const mixedText = "lao 123ປທ້ດເທດgrammarລວ!#$";
const mixedResults = laoGrammarCheck(mixedText);
console.log(mixedResults);
/* Output:
[
  { word: "lao", startIndex: 0, endIndex: 2, grammarCorrect: true },
  { word: " ", startIndex: 3, endIndex: 3, grammarCorrect: true },
  { word: "123", startIndex: 4, endIndex: 6, grammarCorrect: true },
  { word: "ປ", startIndex: 7, endIndex: 7, grammarCorrect: false },
  { word: "ທ້ດ", startIndex: 8, endIndex: 10, grammarCorrect: false },
  { word: "ເທດ", startIndex: 11, endIndex: 13, grammarCorrect: true },
  { word: "grammar", startIndex: 14, endIndex: 20, grammarCorrect: true },
  { word: "ລວ", startIndex: 21, endIndex: 22, grammarCorrect: false },
  { word: "!#$", startIndex: 23, endIndex: 25, grammarCorrect: true }
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