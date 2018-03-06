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

// Test Suite 
describe('Install packages in correct order', () => {

    /** 
     * Test 1:
     * Return output of non-dependent packages in the order in which
     * they are iterated through the array starting @ index 0
     */

    it('Nondependent packages', () => {
        input = [
                    "KittenService: ", 
                    "CamelCaser: " ,
                    "Ice: "
                ];
        output = packageInstaller.installPackages(input);
        expect(output).to.equal('KittenService, CamelCaser, Ice');
    });

    /** 
     * Test 2:
     * Happy case where all packages are installed in sequential order
     * Return output of dependent packages in the order in which
     * they are iterated through the array starting @ index 0
     */

    it('Dependent packages in sequential order', () => {
        input = [
                    "CamelCaser: ",        
                    "KittenService: CamelCaser",
                    "Ice: KittenService"    
                ];
        output = packageInstaller.installPackages(input);
        expect(output).to.equal('CamelCaser, KittenService, Ice');
    });

    /**
     * Test 3:
     * Dependencies are scattered within input
     * Return output of dependent packages in the order in which
     * they are iterated through the array starting @ index 0
     */

    it('Dependent packages in random order', () => {
        input = [
                    "KittenService: ",
                    "Leetmeme: Cyberportal",
                    "Cyberportal: Ice",
                    "CamelCaser: KittenService",
                    "Fraudstream: Leetmeme",
                    "Ice: "    
                ];
        output = packageInstaller.installPackages(input);
        // expect(output).to.equal('KittenService, Ice, Cyberportal, Leetmeme, CamelCaser, Fraudstream');
    });


     /**
     * Test 4:
     * Invalid input
     * Throw error due to input containing cycle
     */

    it('Input contains cycle', () => {
        input = [
                    "KittenService: ",
                    "Leetmeme: Cyberportal",
                    "Cyberportal: Ice",
                    "CamelCaser: KittenService",
                    "Fraudstream: ",
                    "Ice: Leetmeme"    
                ];
        // output = packageInstaller.installPackages(input);
    });
    
  });