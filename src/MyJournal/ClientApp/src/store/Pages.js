"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionCreators = {
    getPages: function () { return function (dispatch, getState) {
        fetch("api/pages")
            .then(function (res) { return res.json(); })
            .then(function (data) {
            dispatch({ type: 'GET_PAGES', pages: data });
        });
    }; }
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
        default:
            return unloadedState;
    }
};
//# sourceMappingURL=Pages.js.map