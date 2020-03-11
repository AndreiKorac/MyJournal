"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var PagesStore = require("../../store/Pages");
require("../../custom.css");
var PageListItem = function (props) {
    return (React.createElement("div", { className: 'page-menu-item' }, props.text));
};
exports.default = react_redux_1.connect(function (state) { return state.pages; }, PagesStore.actionCreators)(PageListItem);
//# sourceMappingURL=PageListItem.js.map