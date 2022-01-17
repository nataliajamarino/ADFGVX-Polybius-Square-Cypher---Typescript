# ADFGVX Polybius Square Cypher implementation by Natalia Souza Jamarino

From Project assignment:

The ADFGVX cypher was used by the German
Army in WW1 from March 1918 to encrypt field communications during the Ludendorff
Offensive (Kaiserschlacht). The cypher is so named because all messages are encrypted into
codes from the small alphabet of ADFGVX to reduce operator error when sending Morse Code
signals. Although an improvement on the ADFGX cypher used by the Germans up until 1918,
the new cypher was broken by the French cryptanalyst Georges Painvin and proved decisive in
repulsing the attack at Compiègne in June 1918.

# Encrypting message

 1. To encode a plaintext character using the Polybius Square, locate the character in the matrix and read off the letter on the far left side on the same row and then the letter at the top of the same column, i.e. each plaintext character is represented by two cipher characters. For example, the plaintext “OBJECT” will generate the sequence of pairs `{FG, VX, XA, DF, GV, XG}`.

2.Create a matrix from a code word with the enciphered codes underneath. In this case the code word JAVA will be used for both encryption and decryption. As each plaintext character has is represented by two enciphered codes, it creates a degree of diffusion in the cypher.

                        J A V A
                        F G V X
                        X A D F
                        G V X G
3.Perform a columnar transposition, by sorting the plaintext alphabetically. This steps fractionates the cypher by splitting up the two enciphered codes associated with each plaintext character.

                        A A J V
                        G X F V
                        A F X D
                        V G G X
4.The final cyphertext is formed by reading off each column: `{GAVXFGFXGVDX}`

## Decrypting a Message

The decryption of a message requires that the columnar transposition in Step 3 above is undone. The can be performed as by reading each set of codes into the correct column denoted by the index and then checking each pair of code along each row against the Polybius Square.

                        J A V A
                        2 0 3 1
                        F G V X
                        X A D F
                        G V X G

Note that, because the encrypted message is 12 characters long and the code word JAVA is four characters long, we can compute the number of rows required in the decoding matrix as the message-length/code-word-length. Use the modulus operator (%) to test if there is a remainder – if so, an additional row will be required.

## How to run Application

```sh
npx ts-node index.ts
```
