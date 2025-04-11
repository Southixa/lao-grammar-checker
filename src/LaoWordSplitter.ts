/**
 * Splits Lao text into individual words.
 * A class for splitting Lao text into individual words.
 * This class handles various Lao language specific rules for word segmentation,
 * including consonant clusters, leading vowels, and special character sequences.
 */

export interface LaoWordInfo {
  word: string;
  startIndex: number;  // Position where the word starts in the original text
  endIndex: number;    // Position where the word ends in the original text
}

export class LaoWordSplitter {
    // Basic consonants (Consonants)
    private readonly LAO_CONSONANTS = new Set([
      'ກ', 'ຂ', 'ຄ', 'ງ', 'ຈ', 'ສ', 'ຊ', 'ຍ', 'ດ', 'ຕ', 'ຖ', 'ທ', 'ນ',
      'ບ', 'ປ', 'ຜ', 'ຝ', 'ພ', 'ຟ', 'ມ', 'ຢ', 'ຣ', 'ລ', 'ວ', 'ຫ', 'ອ', 'ຮ',
      'ໜ', 'ໝ' // Considered distinct consonants
    ]);
  
    // Characters indicating a potential new word start
    // Examples: ເກມ, ແປ, ໂຕ, ໄປ, ໃນ - These often mark the beginning of a new word
    private readonly LEADING_VOWELS = new Set(['ເ', 'ແ', 'ໂ', 'ໄ', 'ໃ']);
  
    // Mid-word characters: vowels, tones, etc.
    // Examples: ກະ, ນາ, ດິນ, ຊີມ, ກຶກ, ປື, ຮຸກ, ງູ, etc.
    private readonly MIDDLE_CHARS = new Set([
      'ະ', 'າ', 'ິ', 'ີ', 'ຶ', 'ື', 'ຸ', 'ູ', // Base vowels
      'ໍ', // Vowel O / AM
      'ຳ', // Vowel AM (also often acts as middle)
      '່', '້', '໊', '໋', // Tones
      'ຼ', // Ligation mark (LO)
      '໌', // Cancellation mark (KAN)
      'ຽ', // Vowel IA
      'ັ', // Vowel sign MAI KANG
      'ົ' // Vowel sign MAI KON
    ]);
  
    // Consonants that can follow 'ຫ' to form a digraph
    // Examples: ຫງາຍ, ຫຍ້າ, ຫຼາຍ, ຫວ້າ, ຫຣິດ
    private readonly DIGRAPH_FOLLOWERS = new Set(['ງ', 'ຍ', 'ລ', 'ວ', 'ຣ']);
  
    // Special character that always forms its own word
    // Example: ແດງໆ - 'ໆ' is always treated as a separate word
    private readonly MAI_YAMOK = 'ໆ';
  
    /**
     * Checks if a character is part of Lao script
     *
     * Examples:
     * isLaoCharacter('ກ') => true
     * isLaoCharacter('a') => false
     * isLaoCharacter('1') => false
     */
    private isLaoCharacter(char: string): boolean {
      if (!char) return false;
      const charCode = char.charCodeAt(0);
      // Lao Unicode block: U+0E80 to U+0EFF
      return charCode >= 0x0E80 && charCode <= 0x0EFF;
    }
  
    /**
     * Helper function to add a word to the result array and start a new word
     * Also tracks the position of words in the original text
     *
     * Examples:
     * addWordToResult('ປະ', words, 2, 0, 'ເ') => 
     *   returns { word: 'ເ', startIndex: 2 } and 
     *   words = [{ word: 'ປະ', startIndex: 0, endIndex: 1 }]
     * 
     * addWordToResult('ລາວ', words, 8, 5, 'ເ') => 
     *   returns { word: 'ເ', startIndex: 8 } and 
     *   words = [..., { word: 'ລາວ', startIndex: 5, endIndex: 7 }]
     */
    private addWordToResult(
      currentWord: string, 
      resultArray: LaoWordInfo[], 
      currentIndex: number,
      wordStartIndex: number,
      newWord: string = ''
    ): { word: string, startIndex: number } {
      if (currentWord.length > 0) {
        resultArray.push({
          word: currentWord,
          startIndex: wordStartIndex,
          endIndex: currentIndex - 1
        });
      }
      return { 
        word: newWord, 
        startIndex: currentIndex 
      };
    }
  
    /**
     * Helper function to handle consonant + 'ວ' sequences
     * Also tracks the position of words in the original text
     *
     * Examples:
     * "ຈົນກວ່າຈະ" when encountering '່' after 'ກວ':
     * handleConsonantVSequence('ຈົນກວ', '່', words, 5, 0) => 
     *   returns { word: 'ກວ່', startIndex: 3 } and 
     *   words = [{ word: 'ຈົນ', startIndex: 0, endIndex: 2 }]
     *
     * "ຄວາມຮັກ" when encountering 'າ' after 'ຄວ':
     * handleConsonantVSequence('ຄວ', 'າ', words, 2, 0) => 
     *   returns { word: 'ຄວາ', startIndex: 0 } and words = []
     *
     * "ຂວາງາມ" when encountering 'າ' after 'ຂວ':
     * handleConsonantVSequence('ຂວ', 'າ', words, 2, 0) => 
     *   returns { word: 'ຂວາ', startIndex: 0 } and words = []
     */
    private handleConsonantVSequence(
      currentWord: string, 
      char: string, 
      resultArray: LaoWordInfo[],
      currentIndex: number,
      wordStartIndex: number
    ): { word: string, startIndex: number } {
      const secondLastChar = currentWord[currentWord.length - 2];
      const lastChar = currentWord[currentWord.length - 1];
      const consonantVSequence = secondLastChar + lastChar; // e.g., 'ກວ', 'ຂວ', 'ຄວ'
      const wordBeforeSequence = currentWord.slice(0, -2);
      
      if (wordBeforeSequence.length > 0) {
        resultArray.push({
          word: wordBeforeSequence,
          startIndex: wordStartIndex,
          endIndex: currentIndex - 3
        });
      }
      return { 
        word: consonantVSequence + char, 
        startIndex: currentIndex - 2 
      };
    }
  
    /**
     * Helper function to handle consonant + 'ຣ' sequences
     * Also tracks the position of words in the original text
     *
     * Examples:
     * "ທຣັມ" when encountering 'ັ' after 'ຣ':
     * handleConsonantRSequence('ທຣ', 'ັ', words, 2, 0) => 
     *   returns { word: 'ທຣັ', startIndex: 0 } and words = []
     *
     * "ປຣິນເຕີ" when encountering 'ິ' after 'ຣ':
     * handleConsonantRSequence('ປຣ', 'ິ', words, 2, 0) => 
     *   returns { word: 'ປຣິ', startIndex: 0 } and words = []
     *
     * "ກຣາມ" when encountering 'າ' after 'ຣ':
     * handleConsonantRSequence('ກຣ', 'າ', words, 2, 0) => 
     *   returns { word: 'ກຣາ', startIndex: 0 } and words = []
     */
    private handleConsonantRSequence(
      currentWord: string, 
      char: string, 
      resultArray: LaoWordInfo[],
      currentIndex: number,
      wordStartIndex: number
    ): { word: string, startIndex: number } {
      const secondLastChar = currentWord[currentWord.length - 2];
      const lastChar = currentWord[currentWord.length - 1];
      const consonantRSequence = secondLastChar + lastChar; // e.g., 'ທຣ', 'ປຣ', 'ກຣ', 'ບຣ', 'ຟຣ'
      const wordBeforeSequence = currentWord.slice(0, -2);
      
      if (wordBeforeSequence.length > 0) {
        resultArray.push({
          word: wordBeforeSequence,
          startIndex: wordStartIndex,
          endIndex: currentIndex - 3
        });
      }
      return { 
        word: consonantRSequence + char, 
        startIndex: currentIndex - 2 
      };
    }
  
    /**
     * Helper function to handle digraphs with 'ຫ'
     * Also tracks the position of words in the original text
     *
     * Examples:
     * "ຫວານຫລາຍ" when encountering 'າ' after 'ຫວ':
     * handleDigraphSequence('ຫວ', 'າ', words, 2, 0) => 
     *   returns { word: 'ຫວາ', startIndex: 0 } and words = []
     * 
     * "ຫລັງຈາກ" when encountering 'ັ' after 'ຫລ':
     * handleDigraphSequence('ຫລ', 'ັ', words, 2, 0) => 
     *   returns { word: 'ຫລັ', startIndex: 0 } and words = []
     */
    private handleDigraphSequence(
      currentWord: string, 
      char: string, 
      resultArray: LaoWordInfo[],
      currentIndex: number,
      wordStartIndex: number
    ): { word: string, startIndex: number } {
      const secondLastChar = currentWord[currentWord.length - 2];
      const lastChar = currentWord[currentWord.length - 1];
      const digraph = secondLastChar + lastChar; // e.g., 'ຫວ'
      const wordBeforeDigraph = currentWord.slice(0, -2);
      
      if (wordBeforeDigraph.length > 0) {
        resultArray.push({
          word: wordBeforeDigraph,
          startIndex: wordStartIndex,
          endIndex: currentIndex - 3
        });
      }
      return { 
        word: digraph + char, 
        startIndex: currentIndex - 2 
      };
    }
  
    /**
     * Helper function to handle regular middle character processing
     * Also tracks the position of words in the original text
     *
     * Examples:
     * "ເທດລາວ" when encountering 'າ' after 'ລ':
     * handleRegularMiddleChar('ເທດລ', 'າ', words, 5, 0) => 
     *   returns { word: 'ລາ', startIndex: 4 } and 
     *   words = [{ word: 'ເທດ', startIndex: 0, endIndex: 3 }]
     * 
     * "ພາສາ" when encountering 'າ' after 'ສ':
     * handleRegularMiddleChar('ພາສ', 'າ', words, 3, 0) => 
     *   returns { word: 'ສາ', startIndex: 2 } and 
     *   words = [{ word: 'ພາ', startIndex: 0, endIndex: 1 }]
     */
    private handleRegularMiddleChar(
      currentWord: string, 
      char: string, 
      resultArray: LaoWordInfo[],
      currentIndex: number,
      wordStartIndex: number
    ): { word: string, startIndex: number } {
      const lastChar = currentWord[currentWord.length - 1];
      const wordWithoutLast = currentWord.slice(0, -1);
      
      if (wordWithoutLast.length > 0) {
        resultArray.push({
          word: wordWithoutLast,
          startIndex: wordStartIndex,
          endIndex: currentIndex - 2
        });
      }
      return { 
        word: lastChar + char, 
        startIndex: currentIndex - 1 
      };
    }
  
    /**
     * Helper function to handle 'ວ' or 'ອ' between consonants
     * Also tracks the position of words in the original text
     *
     * Examples:
     * "ສຶ່ງສວຍງາມ" when encountering "ວ" after "ສ" and followed by "ຍ":
     * handleVaOrOSequence('ສຶ່ງສ', 'ວ', words, 5, 0) => 
     *   returns { word: 'ສວ', startIndex: 4 } and 
     *   words = [{ word: 'ສຶ່ງ', startIndex: 0, endIndex: 3 }]
     * 
     * "ຂອງກິນ" when encountering "ອ" after "ຂ" and followed by "ງ":
     * handleVaOrOSequence('ຂ', 'ອ', words, 1, 0) => 
     *   returns { word: 'ຂອ', startIndex: 0 } and words = []
     */
    private handleVaOrOSequence(
      currentWord: string, 
      char: string, 
      resultArray: LaoWordInfo[],
      currentIndex: number,
      wordStartIndex: number
    ): { word: string, startIndex: number } {
      const lastConsonant = currentWord.slice(-1);
      const wordWithoutLast = currentWord.slice(0, -1);
      
      if (wordWithoutLast.length > 0) {
        resultArray.push({
          word: wordWithoutLast,
          startIndex: wordStartIndex,
          endIndex: currentIndex - 2
        });
      }
      return { 
        word: lastConsonant + char, 
        startIndex: currentIndex - 1 
      };
    }
  
    /**
     * Remove Zero Width Spaces
     *
     * Examples:
     * removeZeroWidthSpaces("ສະ​ບາຍ​ດີ") => "ສະບາຍດີ"
     */
    private removeZeroWidthSpaces(text: string): string {
      return text.replace(/\u200B/g, '');
    }
  
    /**
     * Splits a Lao language sentence into individual words based on syllable structure rules.
     * Also provides the start and end indices of each word in the original text.
     * Space characters are treated as separate words.
     *
     * @param sentence The Lao sentence to be segmented.
     * @returns An array of segmented words with their indices.
     *
     * Examples:
     * splitLao("ປະເທດລາວ") => [
     *   { word: "ປະ", startIndex: 0, endIndex: 1 },
     *   { word: "ເທດ", startIndex: 2, endIndex: 4 },
     *   { word: "ລາວ", startIndex: 5, endIndex: 7 }
     * ]
     * 
     * splitLao("ພາສາ ລາວ") => [
     *   { word: "ພາ", startIndex: 0, endIndex: 1 },
     *   { word: "ສາ", startIndex: 2, endIndex: 3 },
     *   { word: " ", startIndex: 4, endIndex: 4 },
     *   { word: "ລາວ", startIndex: 5, endIndex: 7 }
     * ]
     */
    public split(sentence: string): LaoWordInfo[] {
      // Handle empty input
      if (!sentence || sentence.length === 0) {
        return [];
      }
      
      // Preprocessing: remove zero width spaces
      // Example: "ສະ​ບາຍ​ດີ" => "ສະບາຍດີ"
      sentence = this.removeZeroWidthSpaces(sentence);
      
      const words: LaoWordInfo[] = [];
      let currentWord = '';
      let wordStartIndex = 0;
      
      for (let i = 0; i < sentence.length; i++) {
        const char = sentence[i];
        // Get context for current character
        // Example 1: In sentence "ປະເທດລາວ" at index 3 (character 'ທ'):
        // - char = 'ທ'
        // - currentCharIsLao = true (ທ is a Lao character)
        // - lastCharOfCurrentWord = 'ເ' (last character of currentWord "ເ")
        // - lastCharWasLao = true (ເ is a Lao character)
        // - secondLastChar = '' (no second character because currentWord = "ເ" has only one character)
        // - nextChar = 'ດ' (next character is 'ດ')
        const currentCharIsLao = this.isLaoCharacter(char);
        const lastCharOfCurrentWord = currentWord.length > 0 ? currentWord[currentWord.length - 1] : '';
        const lastCharWasLao = this.isLaoCharacter(lastCharOfCurrentWord);
        const secondLastChar = currentWord.length > 1 ? currentWord[currentWord.length - 2] : '';
        const nextChar = i + 1 < sentence.length ? sentence[i + 1] : null;
  
        // --------- GUARD CONDITIONS ---------
        // GUARD: Space character - add current word, then add space as its own word, and reset
        // Example: "ພາສາ ລາວ" when encountering space after "ສາ"
        // currentWord = "ສາ" => words = [
        //   { word: "ພາ", startIndex: 0, endIndex: 1 },
        //   { word: "ສາ", startIndex: 2, endIndex: 3 },
        //   { word: " ", startIndex: 4, endIndex: 4 }
        // ], currentWord = ""
        if (char === ' ') {
          // Add the current word to results
          const result = this.addWordToResult(currentWord, words, i, wordStartIndex);
          
          // Add the space as its own word
          words.push({
            word: " ",
            startIndex: i,
            endIndex: i
          });
          
          // Reset for next word
          currentWord = result.word; // Should be empty
          wordStartIndex = i + 1;    // Next word starts after space
          continue;
        }
  
        // GUARD: Non-Lao character processing
        if (!currentCharIsLao) {
          // Transition from Lao to non-Lao
          // Example: "ພາສາລາວ 101" when encountering "1" after space
          // currentWord = "" => words = [
          //   { word: "ພາ", startIndex: 0, endIndex: 1 },
          //   { word: "ສາ", startIndex: 2, endIndex: 3 },
          //   { word: "ລາວ", startIndex: 4, endIndex: 6 }
          // ], currentWord = "1", wordStartIndex = 8
          if (lastCharWasLao) {
            const result = this.addWordToResult(currentWord, words, i, wordStartIndex, char);
            currentWord = result.word;
            wordStartIndex = result.startIndex;
            continue;
          }
          // If both current and last char are non-Lao, just append
          // Example: "ພາສາລາວ 101" when encountering "0" after "1"
          // currentWord = "1" => currentWord = "10", wordStartIndex = 8
          currentWord += char;
          continue;
        }
  
        // --- Lao character processing ---
        // GUARD: Mai Yamok ('ໆ') - Always treat as separate word
        // Example: "ແດງໆ" when encountering "ໆ" after "ງ"
        // currentWord = "ແດງ" => words = [{ word: "ແດງ", startIndex: 0, endIndex: 2 }], 
        // currentWord = "ໆ", wordStartIndex = 3
        if (char === this.MAI_YAMOK) {
          const result = this.addWordToResult(currentWord, words, i, wordStartIndex, this.MAI_YAMOK);
          currentWord = result.word;
          wordStartIndex = result.startIndex;
          continue;
        }
        
        // GUARD: Leading vowels start a new word
        // Example: "ປະເທດລາວ" when encountering "ເ" after "ະ"
        // currentWord = "ປະ" => words = [{ word: "ປະ", startIndex: 0, endIndex: 1 }], 
        // currentWord = "ເ", wordStartIndex = 2
        if (this.LEADING_VOWELS.has(char)) {
          // Special case: Don't split on second 'ເ' if previous char was also 'ເ'
          // Example: "ເເຕກຕ່າງ" when encountering second "ເ" after first "ເ"
          // currentWord = "ເ" => currentWord = "ເເ", wordStartIndex unchanged
          if (char === 'ເ' && lastCharOfCurrentWord === 'ເ') {
            currentWord += char;
            continue;
          }
          const result = this.addWordToResult(currentWord, words, i, wordStartIndex, char);
          currentWord = result.word;
          wordStartIndex = result.startIndex;
          continue;
        }
        
        // GUARD: Transition from non-Lao to Lao
        // Example: "RFA ລາວ" when encountering "ລ" after space
        // currentWord = "" => words = [{ word: "RFA", startIndex: 0, endIndex: 2 }], 
        // currentWord = "ລ", wordStartIndex = 4
          if (!lastCharWasLao && currentWord.length > 0) {
            const result = this.addWordToResult(currentWord, words, i, wordStartIndex, char);
            currentWord = result.word;
            wordStartIndex = result.startIndex;
            continue;
          }
        
        // GUARD: Handle middle characters (vowels, tones, etc.)
        if (this.MIDDLE_CHARS.has(char)) {
          // If current word is empty, start a new word with this middle char
          // Example: "າ" when starting with a vowel (unusual case)
          // currentWord = "" => currentWord = "າ", wordStartIndex unchanged
          if (currentWord.length === 0) {
            currentWord = char;
            continue;
          }
          
          // Check if we should simply append the middle character
          // 1. Case: middle character after middle character: "ສຶ່" when encountering "່" after "ຶ" => "ສຶ່"
          // 2. Case: leading vowel followed by consonant: "ເປ" when encountering "ັ" after "ປ" with "ເ" at start => "ເປັ"
          const shouldAppendMiddleChar = 
            this.MIDDLE_CHARS.has(lastCharOfCurrentWord) || 
            (char === 'ັ' && currentWord.length >= 2 && this.LEADING_VOWELS.has(secondLastChar));
            
          if (shouldAppendMiddleChar) {
            currentWord += char;
            continue;
          }
          
          // GUARD: Special case for consonant + 'ວ' sequences (ກວ, ຂວ, ຄວ)
          // Examples: 
          // - "ຈົນກວ່າຈະ" when encountering "່" after "ວ" preceded by "ກ"
          // - "ຄວາມຮັກ" when encountering "າ" after "ວ" preceded by "ຄ"
          // - "ຂວາງາມ" when encountering "າ" after "ວ" preceded by "ຂ"
          if (currentWord.length >= 2 && lastCharOfCurrentWord === 'ວ' && 
              (secondLastChar === 'ກ' || secondLastChar === 'ຂ' || secondLastChar === 'ຄ')) {
            const result = this.handleConsonantVSequence(currentWord, char, words, i, wordStartIndex);
            currentWord = result.word;
            wordStartIndex = result.startIndex;
            continue;
          }
          
          // GUARD: Special case for consonant + 'ຣ' sequences (ທຣ, ປຣ, ກຣ, ບຣ, ຟຣ)
          if (currentWord.length >= 2 && lastCharOfCurrentWord === 'ຣ' && 
              (secondLastChar === 'ທ' || secondLastChar === 'ປ' || secondLastChar === 'ກ' || 
               secondLastChar === 'ບ' || secondLastChar === 'ຟ')) {
            const result = this.handleConsonantRSequence(currentWord, char, words, i, wordStartIndex);
            currentWord = result.word;
            wordStartIndex = result.startIndex;
            continue;
          }
          
          // GUARD: Special case for digraphs with 'ຫ'
          // Example: "ຫວຽດນາມ" when encountering "ຽ" after "ວ" preceded by "ຫ"
          // currentWord = "ຫວ" => words = [], currentWord = "ຫວຽ", wordStartIndex unchanged
          if (currentWord.length >= 2 && secondLastChar === 'ຫ' && this.DIGRAPH_FOLLOWERS.has(lastCharOfCurrentWord)) {
            const result = this.handleDigraphSequence(currentWord, char, words, i, wordStartIndex);
            currentWord = result.word;
            wordStartIndex = result.startIndex;
            continue;
          }
          
          // GUARD: Regular middle char handling - check if we need to split
          // Example: "ເທດລາວ" when encountering "າ" after "ລ"
          // Check if "ລ" is a consonant and "ເທດ" is not a leading vowel followed by consonant
          // currentWord = "ເທດລ" => words = [{ word: "ເທດ", startIndex: 0, endIndex: 3 }], 
          // currentWord = "ລາ", wordStartIndex = 4
          const isLastCharConsonant = this.LAO_CONSONANTS.has(lastCharOfCurrentWord);
          const isSecondLastLeadingVowel = currentWord.length >= 2 && this.LEADING_VOWELS.has(secondLastChar);
          
          if (isLastCharConsonant && !isSecondLastLeadingVowel) {
            const result = this.handleRegularMiddleChar(currentWord, char, words, i, wordStartIndex);
            currentWord = result.word;
            wordStartIndex = result.startIndex;
          } else {
            // Append in other cases
            currentWord += char;
          }
          continue;
        }
        
        // GUARD: Special check for 'ວ' or 'ອ' between consonants
        // Example: "ສຶ່ງສວຍງາມ" when encountering "ວ" after "ສ" and followed by "ຍ"
        // currentWord = "ສຶ່ງສ" => words = [{ word: "ສຶ່ງ", startIndex: 0, endIndex: 3 }], 
        // currentWord = "ສວ", wordStartIndex = 4
        if ((char === 'ວ' || char === 'ອ') && currentWord.length > 0) {
          const lastCharIsConsonant = this.LAO_CONSONANTS.has(lastCharOfCurrentWord);
          const nextCharIsConsonant = nextChar && this.isLaoCharacter(nextChar) && this.LAO_CONSONANTS.has(nextChar);
          
          if (lastCharIsConsonant && nextCharIsConsonant) {
            const result = this.handleVaOrOSequence(currentWord, char, words, i, wordStartIndex);
            currentWord = result.word;
            wordStartIndex = result.startIndex;
            continue;
          }
        }
        
        // DEFAULT: Append character if no special cases matched
        // Example when no conditions above match
        // "ປະ" when encountering "ປ" followed by "ະ" => currentWord = "ປະ", wordStartIndex unchanged
        currentWord += char;
      }
      
      // Add the last remaining word after the loop finishes
      // Example: Last word remaining after loop ends
      // "ປະເທດລາວ" => words = [
      //   { word: "ປະ", startIndex: 0, endIndex: 1 },
      //   { word: "ເທດ", startIndex: 2, endIndex: 4 },
      //   { word: "ລາວ", startIndex: 5, endIndex: 7 }
      // ]
      if (currentWord.length > 0) {
        words.push({
          word: currentWord,
          startIndex: wordStartIndex,
          endIndex: sentence.length - 1
        });
      }
      
      // Filter out any empty strings
      return words.filter(word => word.word.length > 0);
    }
  }