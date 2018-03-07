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
        if (this.isInputValid()) {
            this.inputArr.forEach(function (inputItem) {
                var vPackage = _this.getPackageTypeAndName(inputItem);
                if (!_this.isInstalled(vPackage.name)) {
                    _this.addPackageNameToOutput(vPackage, inputItem);
                }
            });
            return this.outputArr.join(', ');
        }
        else {
            return 'Input is invalid due to cycle.';
        }
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
        if (packageName !== null) {
            var vPackage = { type: '', name: '' };
            for (var _i = 0, _a = this.inputArr; _i < _a.length; _i++) {
                var inputItem = _a[_i];
                vPackage = this.getPackageTypeAndName(inputItem);
                if (packageName === vPackage.name) {
                    return inputItem;
                }
            }
        }
        else {
            return null;
        }
    };
    PackageInstaller.prototype.isInputValid = function () {
        var isValid = true;
        var p1, p2, p1Input, p2Input;
        for (var _i = 0, _a = this.inputArr; _i < _a.length; _i++) {
            var inputItem = _a[_i];
            var vPackage = this.getPackageTypeAndName(inputItem);
            if (vPackage.type === 'parent') {
                p1 = p2 = vPackage;
                p1Input = p2Input = inputItem;
                while (isValid && p2 !== null && this.moveP(1, this.findPackage(p2.name), p2) !== null) {
                    p1Input = this.findPackage(p1.name);
                    p1 = this.moveP(1, p1Input, p1);
                    p2Input = this.findPackage(p2.name);
                    p2 = this.moveP(2, p2Input, p2);
                    if (p1 !== null && p2 !== null && p1.name === p2.name) {
                        isValid = false;
                    }
                }
            }
        }
        return isValid;
    };
    PackageInstaller.prototype.moveP = function (moves, input, vPackage) {
        while (moves > 0) {
            if (vPackage !== null && vPackage.type === 'parent') {
                var dependency = input.match(this.dependencyPtn).toString().match(this.wordPtn).toString();
                input = this.findPackage(dependency);
                vPackage = this.getPackageTypeAndName(input);
                moves--;
            }
            else {
                vPackage = null;
                moves--;
            }
        }
        return vPackage;
    };
    return PackageInstaller;
}());
exports.PackageInstaller = PackageInstaller;
