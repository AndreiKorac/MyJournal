"use strict";
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
exports.actionCreators = {
    getPages: function () { return function (dispatch, getState) {
        fetch("api/pages")
            .then(function (res) { return res.json(); })
            .then(function (data) {
            dispatch({ type: 'GET_PAGES', pages: data });
        });
    }; },
    SelectPage: function () { return ({ type: 'SELECT_PAGE' }); }
};
var unloadedState = { pages: [] };
exports.reducer = function (state, incomingAction) {
    if (state === undefined) {
        return unloadedState;
    }
    var action = incomingAction;
    switch (action.type) {
        case 'GET_PAGES':
            return {
                pages: action.pages
            };
        case 'SELECT_PAGE':
            return {
                pages: state.pages.map(function (page) { return page.id === action.id ? __assign(__assign({}, page), { isSelected: !page.isSelected }) : page; })
            };
        default:
            return unloadedState;
    }
};
//# sourceMappingURL=Pages.js.map