"use strict";
exports.__esModule = true;
var PackageInstaller = (function () {
    function PackageInstaller(input) {
        this.nonDependentPtn = new RegExp(/\w+:\s(?!\w)/);
        this.parentPtn = new RegExp(/\w+:\s(?=\w)/);
        this.dependencyPtn = new RegExp(/\s\w+/);
        this.wordPtn = new RegExp(/\w+/);
        this.inputArr = input;
        this.outputArr = [];
    }
    PackageInstaller.prototype.installPackages = function () {
        var _this = this;
        this.inputArr.forEach(function (inputItem) {
            var vPackage = _this.getPackageTypeAndName(inputItem);
            if (!_this.isInstalled(vPackage.name)) {
                _this.addPackageNameToOutput(vPackage, inputItem);
            }
        });
        return this.outputArr.join(', ');
    };
    PackageInstaller.prototype.addPackageNameToOutput = function (vPackage, inputItem) {
        if (vPackage.type === 'parent') {
            var dependency = inputItem.match(this.dependencyPtn).toString().match(this.wordPtn).toString();
            if (!this.isInstalled(dependency)) {
                var dependencyInput = this.findPackage(dependency);
                var dependencyPackage = this.getPackageTypeAndName(dependencyInput);
                this.addPackageNameToOutput(dependencyPackage, dependencyInput);
            }
        }
        this.outputArr.push(vPackage.name);
    };
    PackageInstaller.prototype.getPackageTypeAndName = function (inputItem) {
        var vPackage = { type: '', name: '' };
        if (this.nonDependentPtn.test(inputItem)) {
            vPackage.type = 'nondependent';
            vPackage.name = inputItem.match(this.wordPtn).toString();
        }
        else {
            vPackage.type = 'parent';
            vPackage.name = inputItem.match(this.parentPtn).toString().match(this.wordPtn).toString();
        }
        return vPackage;
    };
    PackageInstaller.prototype.isInstalled = function (packageName) {
        if (this.outputArr.indexOf(packageName) > -1) {
            return true;
        }
        else {
            return false;
        }
    };
    PackageInstaller.prototype.findPackage = function (packageName) {
        var vPackage = { type: '', name: '' };
        for (var _i = 0, _a = this.inputArr; _i < _a.length; _i++) {
            var inputItem = _a[_i];
            vPackage = this.getPackageTypeAndName(inputItem);
            if (packageName === vPackage.name) {
                return inputItem;
            }
        }
    };
    return PackageInstaller;
}());
exports.PackageInstaller = PackageInstaller;
