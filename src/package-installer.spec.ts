import { PackageInstaller } from './package-installer';
import { expect } from 'chai';
import 'mocha';

let packageInstaller: PackageInstaller;
let input: string[];
let output: string;

/**
 * Clear input/output before running each test
 */
beforeEach(() => {
    packageInstaller = new PackageInstaller;
    input = []; 
    output = '';
});

// Test Suite 1
describe('Recognize packages that do not have dependencies', () => {

    /** 
     * List out non-dependent packages in the order in which
     * they are iterated through the array starting @ index 0
     */

    it('should install non-dependent packages first', () => {
        input = [
                    "KittenService: CamelCaser", 
                    "CamelCaser: " 
                ];
        output = packageInstaller.installPackages(input);
        expect(output).to.equal('CamelCaser');
    });

    it('should install non-dependent packages first', () => {
        input = [ 
                    "KittenService: ",
                    "Cyberportal: Ice",
                    "CamelCaser: KittenService",
                    "Ice: " 
                ];
        output = packageInstaller.installPackages(input);
        expect(output).to.equal('KittenService,Ice');
    });
  });


// Test 2:
// Recognizes package with dependency

// Test 3:
// Recognizes multiple packages with dependencies