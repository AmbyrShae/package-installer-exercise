export class Node {
    data: string;
    next: Node;
    previous: Node;

    constructor(input: string) {
        this.data = input;
        this.next = null;
        this.previous = null;
    }

    setData(value: string) {
        this.data = value;
    }

    setNext(value: Node) {
        this.next = value;
    }

    setPrevious(value: Node) {
        this.previous = value;
    }
}