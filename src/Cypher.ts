import PolybiusSquare from './PolybiusSquare';
import MatrixGenerator from './MatrixGenerator';
import ColumnarTransposition from './ColumnarTransposition';

export default class Cypher {
    private cryptKey: string = 'JAVA';

    public encrypt(message: string): string {
        message = message.replace(/\s+/gm, '');
        let cypherText = '';
        // loop through all letter and search in the cypher table
        for (const letter of message) {
            // Get codified version of the letter
            cypherText += PolybiusSquare.getCharCode(letter);
        }

        // Generate the matrix with code and cyphered text
        const m = new MatrixGenerator(this.cryptKey);
        const matrix = m.generateMatrix(cypherText);
        // Convert matrix to map using code letters
        const cypherMap = m.convertToMap(matrix);
        // Sort map using columnar transposition
        const sortedMap = ColumnarTransposition.sort(cypherMap);

        // Print the sorted map which is the cyphered message
        return sortedMap.map((v) => v[Object.keys(v)[0]].reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, '')).join('');
    }

    public decrypt(message: string): string {
        // Generate the matrix with code and cyphered text
        const m = new MatrixGenerator(this.cryptKey);
        const matrix = m.generateDecodedMatrix(message);
        // Convert matrix to map using code letters
        const cypherMap = m.convertToMap(matrix);
        // Sort map using columnar transposition
        const unsortedMap = ColumnarTransposition.unsort(cypherMap, this.cryptKey);
        // console.log(unsortedMap);
        let cypherText = ''; /* unsortedMap.map((v) => v[Object.keys(v)[0]].reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, '')).join(''); FGVXXADFGVXG */

        let indexToGet = 0;
        let columns = unsortedMap[0][this.cryptKey[0]].length;
        let column = 0;
        // for (let i = 0; i < unsortedMap.length; i++) {
        while(column < columns){
            // Using code's length to know when to return to the second index
            for (let i = 0; i < unsortedMap.length; i++) {
                if (i % (this.cryptKey.length) === 0) {
                    indexToGet = 0;
                }
    
                // Push the cypher text letter to it
                // cypherText += unsortedMap[i][indexToGet];
                for (let j = 0; j < this.cryptKey.length; j++) {
                    // console.log(unsortedMap[i], 'J', j, unsortedMap[i][Object.keys(unsortedMap[indexToGet])[column]]);
                    cypherText += unsortedMap[i][Object.keys(unsortedMap[indexToGet])[0]][column];
                    break;
                }
                indexToGet++;
            }

            column++;
        }

        let decodedMessage = '';
        // Decode message looping two by two letters
        for (let i = 0; i < cypherText.length; i = i + 2) {
            // Get code pairs
            const code = cypherText[i] + cypherText[i+1];
            decodedMessage += PolybiusSquare.getDecodedCharCode(code);
        }

        return decodedMessage;
    }
}
