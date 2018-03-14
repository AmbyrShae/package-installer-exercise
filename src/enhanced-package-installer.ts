import { Node } from './node';

export class EnhancedPackageInstaller {
    nonDependentPtn: RegExp;
    parentPtn: RegExp;
    dependencyPtn: RegExp;
    wordPtn: RegExp;
    inputArr: string[];
    outputArr: string[];

    constructor(input: string[]) {
        this.inputArr = input;
        this.outputArr = [];
    }

    installPackages() {
        this.inputArr.forEach(inputItem => {
            this.createNode(inputItem);
        });
    }

    createNode(inputItem: string) {
        console.log('inputItem: ' + inputItem);
        const vData: string = inputItem.match(/\w+:/).toString().match(/\w+/).toString();
        const vNode: Node = new Node(vData);
        const dependency: any = inputItem.match(/:\s\w+/);

        if (dependency !== null) {
            const childNode: Node = new Node(dependency.toString().match(/\w+/).toString());
            vNode.setNext(childNode);
            childNode.setPrevious(vNode);
            console.log('next: ' + vNode.next.data);
            console.log('prev: ' + childNode.previous.data);
        }
        console.log('data: ' + vNode.data);
    }
}