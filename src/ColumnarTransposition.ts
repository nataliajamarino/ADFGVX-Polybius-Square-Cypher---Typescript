export default class ColumnarTransposition {
    /**
     * Sort the hash map
     * @param cypherMap 
     */
    public static sort(cypherMap: Array<{[key: string]: string[]}>): Array<{[key: string]: string[]}> {
        // Sort the matrix using key for comparison
        return cypherMap.sort((a, b) => {
            const aValue = Object.keys(a)[0];
            const bValue = Object.keys(b)[0];

            if (aValue < bValue) {
                return -1;
            }

            if (aValue > bValue) {
                return 1;
            }
            
            // names must be equal
            return 0;
        })
    }

    /**
     * Unsort the map returning to the code order
     * @param cypherMap 
     * @param code 
     */
    public static unsort(cypherMap: Array<{[key: string]: string[]}>, code: string): Array<{[key: string]: string[]}> {
        const result: Array<{[key: string]: string[]}> = [];
        const indexUsed: number[] = [];
        for (let i = 0; i < code.length; i++) {
            // Find the letter in the map and push to the results array
            let index = cypherMap.findIndex((v, index) => Object.keys(v)[0] === code[i] && !indexUsed.includes(index));
            indexUsed.push(index);
            result.push(cypherMap[index]);
        }

        return result;
    }
}