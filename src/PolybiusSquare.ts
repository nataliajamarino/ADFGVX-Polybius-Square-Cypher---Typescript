/**
 * Cypher table used to code / decode
 *      A D F G V X
    A | p h 0 q g 6
    D | 4 m e a 1 y
    F | l 2 n o f d
    G | x k r 3 c v
    V | s 5 z w 7 b
    X | j 9 u t i 8
 */

export default class PolybiusSquare {
    private static charMap: {[key: string]: string} = {
        'P': 'AA',
        'H': 'AD',
        '0': 'AF',
        'Q': 'AG',
        'G': 'AV',
        '6': 'AX',
        '4': 'DA',
        'M': 'DD',
        'E': 'DF',
        'A': 'DG',
        '1': 'DV',
        'Y': 'DX',
        'L': 'FA',
        '2': 'FD',
        'N': 'FF',
        'O': 'FG',
        'F': 'FV',
        'D': 'FX',
        'X': 'GA',
        'K': 'GD',
        'R': 'GF',
        '3': 'GG',
        'C': 'GV',
        'V': 'GX',
        'S': 'VA',
        '5': 'VD',
        'Z': 'VF',
        'W': 'VG',
        '7': 'VV',
        'B': 'VX',
        'J': 'XA',
        '9': 'XD',
        'U': 'XF',
        'T': 'XG',
        'I': 'XV',
        '8': 'XX',
    };
    /**
     * Return the code based in the char and in the cypher table
     * To get the code by letter:
     * To encode a plaintext character using the Polybius Square, locate the character in the
     *  matrix and read off the letter on the far left side on the same row and then the letter
     *  at the top of the same column
     * @param char 
     */
    public static getCharCode(char: string): string {
        return PolybiusSquare.charMap[char.toUpperCase()];
    }

    /**
     * Return the char corresponding the CODE, example: XD = 9
     * @param char
     */
    public static getDecodedCharCode(char: string): string {
        const charMap = PolybiusSquare.charMap;
        const charValues = Object.values(charMap);
        for(let i = 0; i < charValues.length; i++) {
            if (char === charValues[i]) {
                return Object.keys(charMap)[i];
            }
        }

        throw new Error(`Couldnt find char ${char}`);
    }
}