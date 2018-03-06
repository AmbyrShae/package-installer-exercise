"use strict";
exports.__esModule = true;
var PackageInstaller = (function () {
    function PackageInstaller() {
        this.nonDependentPtn = new RegExp(/\w+:\s(?!\w)/);
        this.parentPtn = new RegExp(/\w+:\s(?=\w)/);
        this.dependencyPtn = new RegExp(/\s\w+/);
        this.wordPtn = new RegExp(/\w+/);
        this.tempArr = [];
    }
    PackageInstaller.prototype.installPackages = function (input) {
        var _this = this;
        input.forEach(function (inputItem) {
            _this.findPackages(inputItem);
        });
        return this.tempArr.join(', ');
    };
    PackageInstaller.prototype.findPackages = function (inputItem) {
        if (this.nonDependentPtn.test(inputItem)) {
            this.tempArr.push(inputItem.match(this.wordPtn).toString());
        }
        else {
            this.isInstalled(inputItem);
        }
    };
    PackageInstaller.prototype.isInstalled = function (inputItem) {
        var parent = inputItem.match(this.parentPtn).toString();
        var dependency = inputItem.match(this.dependencyPtn).toString();
        if (this.tempArr.indexOf(dependency.match(this.wordPtn).toString()) > -1) {
            this.tempArr.push(parent.match(this.wordPtn).toString());
        }
        else {
        }
    };
    return PackageInstaller;
}());
exports.PackageInstaller = PackageInstaller;
