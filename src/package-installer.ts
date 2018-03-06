export class PackageInstaller { 

    nonDependentPtn: RegExp;
    parentPtn: RegExp;
    dependencyPtn: RegExp;
    wordPtn: RegExp;
    tempArr: string[];

    constructor(){
        // note: exercise states a space will always follow the package name, even if no dependency present
        this.nonDependentPtn = new RegExp(/\w+:\s(?!\w)/);
        this.parentPtn = new RegExp(/\w+:\s(?=\w)/);
        this.dependencyPtn = new RegExp(/\s\w+/);
        this.wordPtn = new RegExp(/\w+/);
        this.tempArr = [];
    }

    installPackages(input: string[]) : string {

        input.forEach(inputItem => {
            this.findPackages(inputItem);
        });

        return this.tempArr.join(', ');
    }

    findPackages(inputItem: string) : void {
        // base case: it's non-dependent
        if (this.nonDependentPtn.test(inputItem)) {
            this.tempArr.push(inputItem.match(this.wordPtn).toString()); // removes : char
        } else {
            // else, find the dependency and check if is already installed
            this.isInstalled(inputItem) 
        }
    }

    isInstalled(inputItem: string) : void {

        const parent = inputItem.match(this.parentPtn).toString();
        const dependency = inputItem.match(this.dependencyPtn).toString();

        // if the dependency is already installed, then install parent
        if (this.tempArr.indexOf(dependency.match(this.wordPtn).toString()) > -1) {
            this.tempArr.push(parent.match(this.wordPtn).toString());
        } else {
            // else, find the dependency in this.input and call findPackages()
        }
    }
}