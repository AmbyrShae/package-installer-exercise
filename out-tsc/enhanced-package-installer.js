"use strict";
exports.__esModule = true;
var node_1 = require("./node");
var EnhancedPackageInstaller = (function () {
    function EnhancedPackageInstaller(input) {
        this.inputArr = input;
        this.outputArr = [];
    }
    EnhancedPackageInstaller.prototype.installPackages = function () {
        var _this = this;
        this.inputArr.forEach(function (inputItem) {
            _this.createNode(inputItem);
        });
        return this.outputArr.join(', ');
    };
    EnhancedPackageInstaller.prototype.createNode = function (inputItem) {
        if (inputItem === null) {
            console.log('ERR: Package not found.');
        }
        else {
            var vData = inputItem.match(/\w+:/).toString().match(/\w+/).toString();
            var vNode = new node_1.Node(vData);
            var dependency = inputItem.match(/:\s\w+/);
            if (!this.isInstalled(vNode.data)) {
                if (dependency !== null) {
                    var childNode = new node_1.Node(dependency.toString().match(/\w+/).toString());
                    vNode.setNext(childNode);
                    childNode.setPrevious(vNode);
                    if (!this.isInstalled(childNode.data)) {
                        var dependencyInput = this.findPackage(childNode.data);
                        this.createNode(dependencyInput);
                    }
                }
                this.outputArr.push(vNode.data);
            }
        }
    };
    EnhancedPackageInstaller.prototype.isInstalled = function (packageName) {
        if (this.outputArr.indexOf(packageName) > -1) {
            return true;
        }
        else {
            return false;
        }
    };
    EnhancedPackageInstaller.prototype.findPackage = function (packageName) {
        for (var _i = 0, _a = this.inputArr; _i < _a.length; _i++) {
            var inputItem = _a[_i];
            var inputItemPackageName = inputItem.match(/\w+:/).toString().match(/\w+/).toString();
            if (inputItemPackageName === packageName) {
                return inputItem;
            }
        }
        return null;
    };
    return EnhancedPackageInstaller;
}());
exports.EnhancedPackageInstaller = EnhancedPackageInstaller;
