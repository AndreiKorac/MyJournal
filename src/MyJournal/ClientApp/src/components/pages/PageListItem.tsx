import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../store';
import * as PagesStore from '../../store/Pages';
import '../../custom.css';


type ItemProps = {
    text: string
}

type PageListItemProps =
    ItemProps &
    PagesStore.PagesState &
    typeof PagesStore.actionCreators &
    RouteComponentProps<{}>;

const PageListItem: React.FunctionComponent<PageListItemProps> = (props: PageListItemProps) => {
    return (
        <div className='page-menu-item'>
            {props.text}
        </div>
    )
}

export default connect(
    (state: ApplicationState) => state.pages,
    PagesStore.actionCreators
)(PageListItem as any);