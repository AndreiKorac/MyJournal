import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';

export interface PagesState {
    pages: Page[];
}

// Workaround: Date should be a Date object but when retrieving via JSON in HTTP Request
// TypeScript interprets it as a string, despite the IDE and interface treating it as a Date
// So methods like myDate.ToLocaleDateString() fail
// And because it thinks its a string, new Date(myDate) also fails
export interface Page {
    id: string,
    date: string,
    entries: Entry[]
    isSelected: boolean
}

export interface Entry {
    id: string,
    content: string
}

export interface GetPagesAction { type: 'GET_PAGES', pages: Page[] }
export interface SelectPageAction { type: 'SELECT_PAGE', id: string }

export type KnownAction = GetPagesAction | SelectPageAction;

export const actionCreators = {
    getPages: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        fetch(`api/pages`)
            .then(res => res.json() as Promise<Page[]>)
            .then(data => {
                dispatch({ type: 'GET_PAGES', pages: data })
            });
    },
    SelectPage: () => ({ type: 'SELECT_PAGE' } as SelectPageAction)
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
        case 'SELECT_PAGE':
            return {
                pages: state.pages.map(page => page.id === action.id ? { ...page, isSelected: !page.isSelected } : page)
            }
        default:
            return unloadedState;
    }
}