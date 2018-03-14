"use strict";
exports.__esModule = true;
var enhanced_package_installer_1 = require("./enhanced-package-installer");
var chai_1 = require("chai");
require("mocha");
var packageInstaller;
var input;
var output;
beforeEach(function () {
    input = [];
    output = '';
});
describe('Install packages in correct order', function () {
    it('Nondependent packages', function () {
        input = [
            "KittenService: ",
            "CamelCaser: ",
            "Ice: "
        ];
        packageInstaller = new enhanced_package_installer_1.EnhancedPackageInstaller(input);
        output = packageInstaller.installPackages();
        chai_1.expect(output).to.equal('KittenService, CamelCaser, Ice');
    });
    it('Dependent packages in sequential order', function () {
        input = [
            "CamelCaser: ",
            "KittenService: CamelCaser",
            "Ice: KittenService"
        ];
        packageInstaller = new enhanced_package_installer_1.EnhancedPackageInstaller(input);
        output = packageInstaller.installPackages();
        chai_1.expect(output).to.equal('CamelCaser, KittenService, Ice');
    });
    it('Dependent packages in random order', function () {
        input = [
            "KittenService: ",
            "Leetmeme: Cyberportal",
            "Cyberportal: Ice",
            "CamelCaser: KittenService",
            "Fraudstream: Leetmeme",
            "Ice: "
        ];
        packageInstaller = new enhanced_package_installer_1.EnhancedPackageInstaller(input);
        output = packageInstaller.installPackages();
        chai_1.expect(output).to.equal('KittenService, Ice, Cyberportal, Leetmeme, CamelCaser, Fraudstream');
    });
    it('Dependent packages in random order 2', function () {
        input = [
            "Fraudstream: Leetmeme",
            "Leetmeme: Cyberportal",
            "Cyberportal: Ice",
            "CamelCaser: KittenService",
            "KittenService: ",
            "Ice: "
        ];
        packageInstaller = new enhanced_package_installer_1.EnhancedPackageInstaller(input);
        output = packageInstaller.installPackages();
        chai_1.expect(output).to.equal('Ice, Cyberportal, Leetmeme, Fraudstream, KittenService, CamelCaser');
    });
    xit('Input contains cycle', function () {
        input = [
            "KittenService: ",
            "Leetmeme: Cyberportal",
            "Cyberportal: Ice",
            "CamelCaser: KittenService",
            "Fraudstream: ",
            "Ice: Leetmeme"
        ];
    });
    xit('Missing package', function () {
        input = [
            "Fraudstream: Leetmeme",
            "Leetmeme: Cyberportal",
            "Cyberportal: Ice",
            "CamelCaser: KittenService",
            "Ice: "
        ];
        packageInstaller = new enhanced_package_installer_1.EnhancedPackageInstaller(input);
        output = packageInstaller.installPackages();
        chai_1.expect(output).to.equal('Ice, Cyberportal, Leetmeme, Fraudstream');
    });
});
