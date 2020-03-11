import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../store';
import * as PagesStore from '../../store/Pages';
import '../../custom.css';
import PageListItem from './PageListItem';

type PageListProps =
    PagesStore.PagesState &
    typeof PagesStore.actionCreators &
    RouteComponentProps<{}>;

class PageList extends React.Component<PageListProps> {

    componentWillMount() {
        this.props.getPages();
    }

    public render() {

        const pageList: any = this.props.pages.map(page => {

            const date: string = new Date(page.date).toLocaleDateString("en-CA")

            return <div key={page.id} className='page-menu-item'>
                {date}
            </div>
        });
        
        return (
            <div>
                {this.props.pages.map(page => {
                    const itemProps = {
                        key: page.id,
                        text: new Date(page.date).toLocaleDateString("en-CA"),
                        onClick: () => { this.props.SelectPage(page.id) }
                    }
                    return <PageListItem {...itemProps} />
                })}
            </div>
        )
    }
}


export default connect(
    (state: ApplicationState) => state.pages,
    PagesStore.actionCreators
)(PageList as any);