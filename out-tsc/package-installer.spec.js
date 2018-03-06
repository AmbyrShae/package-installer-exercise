"use strict";
exports.__esModule = true;
var package_installer_1 = require("./package-installer");
var chai_1 = require("chai");
require("mocha");
var packageInstaller = new package_installer_1.PackageInstaller;
var input;
beforeEach(function () {
    input = [];
    console.log('before test ' + input);
});
describe('Recognize packages that do not have dependencies', function () {
    it('should install non-dependent packages first', function () {
        input = [
            "KittenService: CamelCaser",
            "CamelCaser: "
        ];
        var output = packageInstaller.installPackages(input);
        chai_1.expect(output).to.equal('CamelCaser');
    });
    it('should install non-dependent packages first', function () {
        input = [
            "KittenService: ",
            "Cyberportal: Ice",
            "CamelCaser: KittenService",
            "Ice: "
        ];
        var output = packageInstaller.installPackages(input);
        chai_1.expect(output).to.equal('KittenService, Ice');
    });
});
