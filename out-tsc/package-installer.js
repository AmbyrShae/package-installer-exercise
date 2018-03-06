"use strict";
exports.__esModule = true;
var PackageInstaller = (function () {
    function PackageInstaller() {
        this.nonDependentPtn = new RegExp(/\w+:\s(?!\w)/);
        this.output = '';
    }
    PackageInstaller.prototype.installPackages = function (input) {
        var _this = this;
        var tempArray = [];
        input.forEach(function (item) {
            if (_this.nonDependentPtn.test(item)) {
                tempArray.push(item.match(/\w*/));
            }
            _this.output = tempArray.join();
        });
        return this.output;
    };
    return PackageInstaller;
}());
exports.PackageInstaller = PackageInstaller;
