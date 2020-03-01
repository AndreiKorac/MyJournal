import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../store';
import * as PagesStore from '../../store/Pages';

type PageListProps =
    PagesStore.PagesState &
    typeof PagesStore.actionCreators &
    RouteComponentProps<{}>;

class PageList extends React.Component<PageListProps> {

    public render() {

        const pageList: any = this.props.pages.map(page => {
            return <div key={page.id}>
                {page.date}
            </div>
        });
        
        return (
            
            <div>
                <h3> Your Pages </h3>
                {pageList}
            </div>
        )
    }
}


export default connect(
    (state: ApplicationState) => state.pages,
    PagesStore.actionCreators
)(PageList as any);