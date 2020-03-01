"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var PagesStore = require("../../store/Pages");
var PageList = /** @class */ (function (_super) {
    __extends(PageList, _super);
    function PageList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PageList.prototype.render = function () {
        var pageList = this.props.pages.map(function (page) {
            return React.createElement("div", { key: page.id }, page.date);
        });
        return (React.createElement("div", null,
            React.createElement("h3", null, " Your Pages "),
            pageList));
    };
    return PageList;
}(React.Component));
exports.default = react_redux_1.connect(function (state) { return state.pages; }, PagesStore.actionCreators)(PageList);
//# sourceMappingURL=PageList.js.map