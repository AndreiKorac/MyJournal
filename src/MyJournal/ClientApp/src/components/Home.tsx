import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as PagesStore from '../store/Pages';
import PageList from './pages/PageList';

type HomeProps =
    PagesStore.PagesState &
    typeof PagesStore.actionCreators &
    RouteComponentProps<{}>;


class Home extends React.Component<HomeProps> {
    public render() {
        return (
            <div>
                <PageList />
                <button
                onClick={() => { this.props.getPages(); }}>
                Get Pages
                </button>
            </div>
        )
    }
}


export default connect(
    (state: ApplicationState) => state.pages,
    PagesStore.actionCreators
)(Home as any);
