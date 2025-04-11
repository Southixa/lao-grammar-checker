// src/laoGrammarCheck.ts

// Import the LaoWordSplitter and LaoWordInfo
import { LaoWordSplitter, LaoWordInfo } from './LaoWordSplitter';

// Define extended interface for LaoWordInfo with grammar check result
export interface LaoGrammarCheckResult extends LaoWordInfo {
    grammarCorrect: boolean;
}

// Define character sets based on Lao script components

// Consonants
const LAO_CONSONANTS = new Set([
    'ກ', 'ຂ', 'ຄ', 'ງ', 'ຈ', 'ສ', 'ຊ', 'ຍ', 'ດ', 'ຕ', 'ຖ', 'ທ', 'ນ',
    'ບ', 'ປ', 'ຜ', 'ຝ', 'ພ', 'ຟ', 'ມ', 'ຢ', 'ຣ', 'ລ', 'ວ', 'ຫ', 'ອ', 'ຮ',
    'ໜ', 'ໝ'
]);

// Leading Vowels (Rule 1)
const LEADING_VOWELS_RULE1 = new Set(['ເ', 'ແ', 'ໂ', 'ໄ']);

// Top Vowels (Rule 2 & 4)
const TOP_VOWELS_RULE2 = new Set(['ິ', 'ີ', 'ຶ', 'ື']);

// Tone Marks (Rule 3)
const TONE_MARKS_RULE3 = new Set(['່', '້']);

// Other Diacritics/Vowels (Rule 4)
const OTHER_DIACRITICS_RULE4 = new Set([
    '໊', '໋', 'ໍ', '໌', 'ົ', 'ັ', 'ິ', 'ີ', 'ຶ', 'ື', 'ຸ', 'ູ', 'ຼ'
]);

// Vowel IA (Rule 5)
const VOWEL_IA_RULE5 = 'ຽ';

// Vowels A/AA (Rule 6)
const VOWELS_A_AA_RULE6 = new Set(['ະ', 'າ']);

// Vowels/Diacritics for counting
const COUNTABLE_VOWELS_DIACRITICS = new Set([
    'ະ', 'າ', 'ິ', 'ີ', 'ຶ', 'ື', 'ຸ', 'ູ', 'ໍ', 'ຼ', '໊', 'ັ', 'ົ', '່', '້', '໋', '໌', 'ຽ'
    // Note: 'າ' is counted here, but 'ໃ', 'ໄ', 'ເົາ', 'ຳ' are typically part of the word structure itself
    // and handled by rules rather than just counted as standalone vowels.
]);

/**
 * Checks if a character is part of Lao script.
 * Reusable helper function.
 */
function isLaoCharacter(char: string): boolean {
    if (!char) return false;
    const charCode = char.charCodeAt(0);
    // Lao Unicode block: U+0E80 to U+0EFF
    return charCode >= 0x0E80 && charCode <= 0x0EFF;
}

/**
 * Checks if a Lao word has correct grammatical structure.
 *
 * @param word - The Lao word to check
 * @returns True if the word has correct grammar, false otherwise
 */
function checkLaoWordGrammar(word: string): boolean {
    // Check for space - always return true for spaces
    if (word === " ") {
        return true;
    }
    
        // Word-Level Guard 0: Empty word check
        if (!word || word.length === 0) {
        return false;
        }

        // Word-Level Guard 1: Single character word (usually invalid unless it's a special case not covered here)
        if (word.length === 1) {
        // Exception: Allow 'ໆ' (Mai Yamok) as a single valid character word
        return word === 'ໆ'; // Return true only if it's Mai Yamok
        }

        // Word-Level Guard 2: First character is not Lao
        if (!isLaoCharacter(word[0])) {
        return true; // Non-Lao words are considered valid
        }

        let vowelCount = 0;
        let consonantCount = 0;

    // Iterate through characters of the word
        for (let i = 0; i < word.length; i++) {
            const currentChar = word[i];
            const previousChar = i > 0 ? word[i - 1] : null;
            const previousChar2 = i > 1 ? word[i - 2] : null;
            const previousChar3 = i > 2 ? word[i - 3] : null;
            const nextChar = i < word.length - 1 ? word[i + 1] : null;

            // --- Character Counting ---
            if (LAO_CONSONANTS.has(currentChar)) {
                consonantCount++;
            } else if (COUNTABLE_VOWELS_DIACRITICS.has(currentChar)) {
                vowelCount++; // Count specific vowels/diacritics
            }

            // --- Rule Checks ---

            // Rule 1: Check ['ເ', 'ແ', 'ໂ', 'ໄ']
            if (LEADING_VOWELS_RULE1.has(currentChar)) {
                // 1.1 Must be at index 0
                if (i !== 0) {
                    // Exception: Allow the second 'ເ' if it's at index 1 and follows another 'ເ'
                    const isAllowedDoubleE = (currentChar === 'ເ' && i === 1 && previousChar === 'ເ');
                    if (!isAllowedDoubleE) {
                    return false; // Not at index 0 AND not the allowed double 'ເ'
                    }
                } else { // i === 0 (It's the first character)
                    // 1.2 Next char must be a consonant (or 'ເ' if current is 'ເ')
                    if (!nextChar || (!LAO_CONSONANTS.has(nextChar) && !(currentChar === 'ເ' && nextChar === 'ເ'))) {
                    return false;
                }
                }
            }

            // Rule 2: Check [ິ ີ ຶ ື]
            else if (TOP_VOWELS_RULE2.has(currentChar)) {
                // 2.1 Previous char must be a consonant
                if (!previousChar || !LAO_CONSONANTS.has(previousChar)) {
                return false;
            }
            }

             // Rule 3: Check [່ ້]
            else if (TONE_MARKS_RULE3.has(currentChar)) {
                // 3.1 Previous char or previous char 2 must be a consonant
                 const prevIsConsonant = previousChar && LAO_CONSONANTS.has(previousChar);
                 const prev2IsConsonant = previousChar2 && LAO_CONSONANTS.has(previousChar2);
                 if (!prevIsConsonant && !prev2IsConsonant) {
                return false;
            }
        }

        // Rule 4: Check [໊ ໋ ໍ ໌ ົ ັ ິ ີ ຶ ື ຸ ູ ຼ] (excludes Rule 2 chars)
        else if (OTHER_DIACRITICS_RULE4.has(currentChar) && !TOP_VOWELS_RULE2.has(currentChar)) {
                // 4.1 Previous char must be a consonant
                 if (!previousChar || !LAO_CONSONANTS.has(previousChar)) {
                return false;
            }
            }

            // Rule 5: Check 'ຽ'
            else if (currentChar === VOWEL_IA_RULE5) {
                // 5.1 Next char must be a consonant
                 if (!nextChar || !LAO_CONSONANTS.has(nextChar)) {
                return false;
            }
            }

            // Rule 6: Check [ະ າ]
            else if (VOWELS_A_AA_RULE6.has(currentChar)) {
                // 6.1 Previous, Previous 2, or Previous 3 must be a consonant
                const prevIsConsonant = previousChar && LAO_CONSONANTS.has(previousChar);
                const prev2IsConsonant = previousChar2 && LAO_CONSONANTS.has(previousChar2);
                const prev3IsConsonant = previousChar3 && LAO_CONSONANTS.has(previousChar3);
                 if (!prevIsConsonant && !prev2IsConsonant && !prev3IsConsonant) {
                return false;
            }
            }
    } // End of character loop

        // --- Post-Character Loop Checks ---
        // 1. No consonants found
        if (consonantCount === 0) {
        return false;
        }

    // 2. Too many consonants (more than 4)
        if (consonantCount > 4) {
        return false;
    }

    // If the word passed all rule checks, it's valid
    return true;
}

/**
 * Checks Lao sentence for grammatical structure violations.
 * Uses LaoWordSplitter to split the sentence into words first.
 *
 * @param sentence - The Lao sentence to check
 * @returns An array of LaoGrammarCheckResult objects with grammar correctness indicator
 */
export function laoGrammarChecker(sentence: string): LaoGrammarCheckResult[] {
    // Create splitter instance
    const splitter = new LaoWordSplitter();
    
    // Split the sentence
    const wordInfos = splitter.split(sentence);
    
    // Check grammar for each word and add result
    const results: LaoGrammarCheckResult[] = wordInfos.map(wordInfo => {
        const grammarCorrect = checkLaoWordGrammar(wordInfo.word);
        return {
            ...wordInfo,
            grammarCorrect
        };
    });
    
    return results;
}