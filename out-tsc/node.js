"use strict";
exports.__esModule = true;
var Node = (function () {
    function Node(input) {
        this.data = input;
        this.next = null;
        this.previous = null;
    }
    Node.prototype.setData = function (value) {
        this.data = value;
    };
    Node.prototype.setNext = function (value) {
        this.next = value;
    };
    Node.prototype.setPrevious = function (value) {
        this.previous = value;
    };
    return Node;
}());
exports.Node = Node;
