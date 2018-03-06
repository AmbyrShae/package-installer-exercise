"use strict";
exports.__esModule = true;
var PackageInstaller = (function () {
    function PackageInstaller() {
        this.nonDependentPtn = new RegExp(/(\w+:(?!\s))|(\w+:\s(?!\w))/);
        this.output = '';
    }
    PackageInstaller.prototype.installPackages = function (input) {
        var _this = this;
        input.forEach(function (item) {
            if (_this.nonDependentPtn.test(item)) {
                console.log(item + ' does not have dependcies.');
                _this.output.concat(item);
            }
        });
        return this.output;
    };
    return PackageInstaller;
}());
exports.PackageInstaller = PackageInstaller;
