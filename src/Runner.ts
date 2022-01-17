import Cypher from './Cypher';

export default class Runner {
  public static main (message: string): void {
    const cypher = new Cypher();
    const cypheredMessage = cypher.encrypt(message);
    console.log(cypheredMessage);
    console.log(cypher.decrypt(cypheredMessage));
  }
}