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
    };
    EnhancedPackageInstaller.prototype.createNode = function (inputItem) {
        console.log('inputItem: ' + inputItem);
        var vData = inputItem.match(/\w+:/).toString().match(/\w+/).toString();
        var vNode = new node_1.Node(vData);
        var dependency = inputItem.match(/:\s\w+/);
        if (dependency !== null) {
            var childNode = new node_1.Node(dependency.toString().match(/\w+/).toString());
            vNode.setNext(childNode);
            childNode.setPrevious(vNode);
            console.log('next: ' + vNode.next.data);
            console.log('prev: ' + childNode.previous.data);
        }
        console.log('data: ' + vNode.data);
    };
    return EnhancedPackageInstaller;
}());
exports.EnhancedPackageInstaller = EnhancedPackageInstaller;
