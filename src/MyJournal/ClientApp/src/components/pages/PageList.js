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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var PagesStore = require("../../store/Pages");
require("../../custom.css");
var PageListItem_1 = require("./PageListItem");
var PageList = /** @class */ (function (_super) {
    __extends(PageList, _super);
    function PageList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PageList.prototype.componentWillMount = function () {
        this.props.getPages();
    };
    PageList.prototype.render = function () {
        var pageList = this.props.pages.map(function (page) {
            var date = new Date(page.date).toLocaleDateString("en-CA");
            return React.createElement("div", { key: page.id, className: 'page-menu-item' }, date);
        });
        return (React.createElement("div", null, this.props.pages.map(function (page) {
            var itemProps = {
                key: page.id,
                text: new Date(page.date).toLocaleDateString("en-CA")
            };
            return React.createElement(PageListItem_1.default, __assign({}, itemProps));
        })));
    };
    return PageList;
}(React.Component));
exports.default = react_redux_1.connect(function (state) { return state.pages; }, PagesStore.actionCreators)(PageList);
//# sourceMappingURL=PageList.js.map