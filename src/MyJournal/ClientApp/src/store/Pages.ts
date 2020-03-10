import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';

export interface PagesState {
    pages: Page[];
}

export interface Page {
    id: string,
    date: string,
    entries: Entry[]
}

export interface Entry {
    id: string,
    content: string
}

export interface GetPagesAction { type: 'GET_PAGES', pages: Page[] }

export type KnownAction = GetPagesAction;

export const actionCreators = {
    getPages: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        fetch(`api/pages`)
            .then(res => res.json() as Promise<Page[]>)
            .then(data => {
                dispatch({ type: 'GET_PAGES', pages: data })
            });
    }
}

const unloadedState: PagesState = { pages: [] };

export const reducer: Reducer<PagesState> = (state: PagesState | undefined, incomingAction: Action): PagesState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'GET_PAGES':
            return {
                pages: action.pages
            }
        default:
            return unloadedState;
    }
}