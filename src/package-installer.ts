export class PackageInstaller { 

    nonDependentPtn: RegExp;
    output: string;

    constructor(){
        // note: exercise states a space will always follow the package name, even if no dependency present
        this.nonDependentPtn = new RegExp(/\w+:\s(?!\w)/);
        this.output = '';
    }

    installPackages(input: string[]) : string {

        let tempArray = [];

        input.forEach(item => {

            if (this.nonDependentPtn.test(item)) {
                tempArray.push(item.match(/\w*/)); // removes : char
            }
            
            this.output = tempArray.join();
        });

        return this.output;
    }
}