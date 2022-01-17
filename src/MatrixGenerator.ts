export default class MatrixGenerator {
    private code: string;

    public constructor (code: string) {
        this.code = code;
    }

    /**
     * Generate matrix using code and cypher text
     * @param code 
     * @param cypherText 
     */
    public generateMatrix(cypherText: string): string[][] {
        // Initialize the matrix
        const matrix: string[][] = [[]];
        let indexToAdd = 0;
        // First add the code to the first index
        for (let i = 0; i < this.code.length; i++) {
            matrix[indexToAdd].push(this.code[i]);
        }

        // Then add cypher text letters to the matrix
        for (let i = 0; i < cypherText.length; i++) {
            // Using code's length to know when to create a new array
            if (i % this.code.length === 0) {
                // Increment indexToAdd 
                indexToAdd++;
                // Initialize the new array for the index
                matrix[indexToAdd] = [];
            }
            // Push the cypher text letter to it
            matrix[indexToAdd].push(cypherText[i]);
        }

        return matrix;
    }

    /**
     * Generate a decoded matrix base on cypher, for this Matrix the
     * letter are added by column instead by row
     * @param cypherText 
     */
    public generateDecodedMatrix(cypherText: string): string[][] {
        // Initialize the matrix
        const matrix: string[][] = [[]];
        const sortedCode = this.code.split('').sort();
        let indexToAdd = 0;
        // First add the reversed code to the first index
        for (let i = 0; i < sortedCode.length; i++) {
            matrix[indexToAdd].push(sortedCode[i]);
        }

        indexToAdd++;
        // Then add cypher text letters to the matrix
        for (let i = 0; i < cypherText.length; i++) {
            // Using code's length and cypher length to know when to return to the second index
            if (i % (cypherText.length / this.code.length) === 0) {
                // Increment indexToAdd 
                indexToAdd = 1;
            }

            if (!matrix[indexToAdd]) {
                // Initialize the new array for the index if it doesnt exist
                matrix[indexToAdd] = [];
            }

            // Push the cypher text letter to it
            matrix[indexToAdd].push(cypherText[i]);
            indexToAdd++
        }

        return matrix;
    }

    /**
     * Convert matrix to a Map, eg: [[1, 2, 3], [a, b, c]]
     * would return [{1: [a]}, {2: [b]}, {3: [c]}]
     * @param matrix
     */
    public convertToMap(matrix: string[][]): Array<{[key: string]: string[]}> {
        const map: Array<{[key: string]: string[]}> = [];
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                const key: {[key: string]: string[]} = {[matrix[i][j]]: []};
                // Loop through all array ignoring the first index that contains the code and pick
                // the column values
                for (let k = 1; k < matrix.length; k++) {
                    key[matrix[i][j]].push(matrix[k][j]);
                }
                map.push(key);
            }
            // Break the loop
            break;
        }

        return map;
    }
}