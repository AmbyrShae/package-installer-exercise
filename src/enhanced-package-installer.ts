import { Node } from './node';

export class EnhancedPackageInstaller {

    inputArr: string[];
    outputArr: string[];

    constructor(input: string[]) {
        this.inputArr = input;
        this.outputArr = [];
    }

    installPackages() : string {
        this.inputArr.forEach(inputItem => {
            this.createNode(inputItem);
        });
        // return output as comma-separated string
        return this.outputArr.join(', ');
    }

    createNode(inputItem: string) : void {

        if (inputItem === null) {
            console.log('ERR: Package not found.')
        } else {
            // console.log('inputItem: ' + inputItem);

            let vData: string = inputItem.match(/\w+:/).toString().match(/\w+/).toString();
            let vNode: Node = new Node(vData);
            let dependency: any = inputItem.match(/:\s\w+/);

            // console.log('data: ' + vNode.data);

            // check if package is installed
            if (!this.isInstalled(vNode.data)) {
                // check for dependency
                if (dependency !== null) {

                    let childNode: Node = new Node(dependency.toString().match(/\w+/).toString());
                    vNode.setNext(childNode);
                    childNode.setPrevious(vNode);

                    // console.log('next: ' + vNode.next.data);
                    // console.log('prev: ' + childNode.previous.data);

                    // check if dependency is installed
                    if (!this.isInstalled(childNode.data)) {
                        // find dependency and start this process over
                        let dependencyInput = this.findPackage(childNode.data);
                        this.createNode(dependencyInput);
                    }
                }
                // install package
                this.outputArr.push(vNode.data);
            }
        } 
    }

    isInstalled(packageName: string) : boolean {
        if(this.outputArr.indexOf(packageName) > -1) {
            return true;
        } else {
            return false;
        }
    }

    findPackage(packageName: string) : string {

        for (let inputItem of this.inputArr) {
            let inputItemPackageName = inputItem.match(/\w+:/).toString().match(/\w+/).toString();
            if (inputItemPackageName === packageName) {
                return inputItem;
            }
        }
        // package not found
        return null;
    }
}