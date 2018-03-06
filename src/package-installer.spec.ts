import { PackageInstaller } from './package-installer';
import { expect } from 'chai';
import 'mocha';

const packageInstaller = new PackageInstaller;
let input: string[]; 

/**
 * Clear input before running each test
 */
beforeEach(() => {
    input = [];
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
        const output = packageInstaller.installPackages(input);
        expect(output).to.equal('CamelCaser');
    });

    it('should install non-dependent packages first', () => {
        input = [ 
                    "KittenService: ",
                    "Cyberportal: Ice",
                    "CamelCaser: KittenService",
                    "Ice: " 
                ];
        const output = packageInstaller.installPackages(input);
        expect(output).to.equal('KittenService, Ice');
    });
  });


// Test 2:
// Recognizes package with dependency

// Test 3:
// Recognizes multiple packages with dependencies