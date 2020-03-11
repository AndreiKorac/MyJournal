import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as PagesStore from '../store/Pages';
import PageList from './pages/PageList';
import '../custom.css';

type HomeProps =
    PagesStore.PagesState &
    typeof PagesStore.actionCreators &
    RouteComponentProps<{}>;


class Home extends React.Component<HomeProps> {
    public render() {
        return (
            <div>
                <h3>Your Pages</h3>
                <div className='home-container'>
                    <div className='page-list'>
                        <PageList />
                    </div>
                    <div className='current-page'>
                        Currently selected page
                    </div>
                </div>
            </div>
        )
    }
}


export default connect(
    (state: ApplicationState) => state.pages,
    PagesStore.actionCreators
)(Home as any);
