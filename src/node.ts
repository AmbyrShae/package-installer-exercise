export class Node {
    data: string;
    next: Node;
    previous: Node;

    constructor(input: string) {
        this.data = input;
        this.next = null;
        this.previous = null;
    }

    getData() : string {
        return this.data;
    }

    setData(value: string) {
        this.data = value;
    }

    getNext() : Node {
        return this.next;
    }

    setNext(value: Node) {
        this.next = value;
    }

    getPrevious() : Node {
        return this.previous;
    }

    setPrevious(value: Node) {
        this.previous = value;
    }
}