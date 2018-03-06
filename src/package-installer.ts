export class PackageInstaller { 

    nonDependentPtn = new RegExp(/(\w+:(?!\s))|(\w+:\s(?!\w))/);
    output: string = '';

    constructor(){
        // empty...for now
    }

    installPackages(input: string[]) : string {
        input.forEach(item => {
            if (this.nonDependentPtn.test(item)) {
                console.log(item + ' does not have dependcies.')
                this.output.concat(item);
            }
        });

        return this.output;
    }
}