"use strict";
exports.__esModule = true;
var package_installer_1 = require("./package-installer");
var chai_1 = require("chai");
require("mocha");
var packageInstaller;
var input;
var output;
beforeEach(function () {
    packageInstaller = new package_installer_1.PackageInstaller;
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
        output = packageInstaller.installPackages(input);
        chai_1.expect(output).to.equal('KittenService, CamelCaser, Ice');
    });
    it('Dependent packages in sequential order', function () {
        input = [
            "CamelCaser: ",
            "KittenService: CamelCaser",
            "Ice: KittenService"
        ];
        output = packageInstaller.installPackages(input);
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
        output = packageInstaller.installPackages(input);
    });
    it('Input contains cycle', function () {
        input = [
            "KittenService: ",
            "Leetmeme: Cyberportal",
            "Cyberportal: Ice",
            "CamelCaser: KittenService",
            "Fraudstream: ",
            "Ice: Leetmeme"
        ];
    });
});
