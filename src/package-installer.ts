export class PackageInstaller { 

    nonDependentPtn: RegExp;
    parentPtn: RegExp;
    dependencyPtn: RegExp;
    wordPtn: RegExp;
    inputArr: string[];
    outputArr: string[];

    constructor(input: string[]) {
        this.nonDependentPtn = new RegExp(/\w+:\s(?!\w)/); // assumes a space will follow the package name, even if no dependency present
        this.parentPtn = new RegExp(/\w+:\s(?=\w)/);
        this.dependencyPtn = new RegExp(/\s\w+/);
        this.wordPtn = new RegExp(/\w+/); // removes : char
        this.inputArr = input;
        this.outputArr = [];
    }

    installPackages() : string {
        if (this.isInputValid()) {
            // loop through input
            this.inputArr.forEach(inputItem => {
                // get package type and name
                let vPackage = this.getPackageTypeAndName(inputItem);
                // check if package is already installed
                if (!this.isInstalled(vPackage.name)){
                    // install package
                    this.addPackageNameToOutput(vPackage, inputItem);
                }
            });
            // return output as comma-separated string
            return this.outputArr.join(', ');
        } else {
            return 'Input is invalid due to cycle.'
        } 
    }

    /**
     * helper functions --------------------------------------------
     */

    // adds package names to output
    addPackageNameToOutput(vPackage: any, inputItem: string) : void {
        // package has a dependency
        if (vPackage.type === 'parent') {
            let dependency = inputItem.match(this.dependencyPtn).toString().match(this.wordPtn).toString();
            // if dependency is not installed, call addPackageNameToOutput() to install it
            if (!this.isInstalled(dependency)) {
                let dependencyInput = this.findPackage(dependency);
                let dependencyPackage = this.getPackageTypeAndName(dependencyInput)
                this.addPackageNameToOutput(dependencyPackage, dependencyInput);   
            }
        } 
        // add package name to output    
        this.outputArr.push(vPackage.name);
    }

    // creates package object for greater readibility  
    getPackageTypeAndName(inputItem: string) : any {

        let vPackage = {type: '', name: ''};

        if(this.nonDependentPtn.test(inputItem)) {
            vPackage.type = 'nondependent';
            vPackage.name = inputItem.match(this.wordPtn).toString();
        }
        else {
            vPackage.type = 'parent';
            vPackage.name = inputItem.match(this.parentPtn).toString().match(this.wordPtn).toString();
        }

        return vPackage;
    }

    // checks to see if package name already in output
    isInstalled(packageName: string) : boolean {
        if(this.outputArr.indexOf(packageName) > -1) {
            return true;
        } else {
            return false;
        }
    }

    // finds package information in the input
    findPackage(packageName: string) : string {
        if (packageName !== null) {

            let vPackage = {type: '', name: ''}; 

            for (let inputItem of this.inputArr) {
                vPackage = this.getPackageTypeAndName(inputItem);
                if (packageName === vPackage.name) {
                    return inputItem;
                }
            }

        } else {
            // currently does not handle null
            return null;
        } 
    }

    // implementing Floyd's cycle-finding algorithm
    isInputValid() : boolean {
        
        let isValid = true;
        let p1, p2, p1Input, p2Input;

        for (let inputItem of this.inputArr) {

            let vPackage = this.getPackageTypeAndName(inputItem);

            if (vPackage.type === 'parent') {
                p1 = p2 = vPackage;
                p1Input = p2Input = inputItem;

                while(isValid && p2 !== null && this.moveP(1, this.findPackage(p2.name), p2) !== null) {
                    // move p1 forward once (tortoise)
                    p1Input = this.findPackage(p1.name);
                    p1 = this.moveP(1, p1Input, p1);
                    // move p2 forward twice (hare) 
                    p2Input = this.findPackage(p2.name);
                    p2 = this.moveP(2, p2Input, p2);
                    // if p1 & p2 match, there's a loop
                    if (p1 !== null && p2 !== null && p1.name === p2.name) {
                        isValid = false;
                    }
                }
            }
        }
        return isValid;
    }
    
    // moves the tortoise and hare pointers
    moveP(moves: number, input: string, vPackage: any) : any {
        while (moves > 0) {
            if (vPackage !== null && vPackage.type === 'parent') {
                let dependency = input.match(this.dependencyPtn).toString().match(this.wordPtn).toString();
                input = this.findPackage(dependency);
                vPackage = this.getPackageTypeAndName(input);
                moves--;
            } else {
                vPackage = null;
                moves--;
            }
        }
        return vPackage;
    }
}