export class PackageInstaller { 

    nonDependentPtn: RegExp;
    parentPtn: RegExp;
    dependencyPtn: RegExp;
    wordPtn: RegExp;
    inputArr: string[];
    outputArr: string[];

    constructor(input: string[]) {
        // note: exercise states a space will follow the package name, even if no dependency present
        this.nonDependentPtn = new RegExp(/\w+:\s(?!\w)/);
        this.parentPtn = new RegExp(/\w+:\s(?=\w)/);
        this.dependencyPtn = new RegExp(/\s\w+/);
        this.wordPtn = new RegExp(/\w+/); // removes : char
        this.inputArr = input;
        this.outputArr = [];
    }

    installPackages() : string {
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
    // assumes packageName will be found in the input
    findPackage(packageName: string) : string {

        let vPackage = {type: '', name: ''}; 

        for (let inputItem of this.inputArr) {
            vPackage = this.getPackageTypeAndName(inputItem)
            if (packageName === vPackage.name) {
                return inputItem;
            }
        }
    }
}