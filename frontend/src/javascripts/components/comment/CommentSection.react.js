import React, {Component, PropTypes} from 'react';

// notee
import CommentStore from '../../stores/CommentStore';
import CommentActions from '../../actions/CommentActions';
import CommentTableRow from './CommentTableRow.react';
import Constants from '../../constants/NoteeConstants';

// common-parts
import NoteeTable from '../common/table/NoteeTable.react';

export default class CommentSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: []
        }

        this.ajaxLoaded = this.ajaxLoaded.bind(this);
        this.returnTableRow = this.returnTableRow.bind(this);
        this.changeSuccessed = this.changeSuccessed.bind(this);
    }

    componentDidMount() {
        CommentStore.addChangeListener(Constants.COMMENT_UPDATE, this.changeSuccessed);
        CommentStore.addChangeListener(Constants.COMMENT_DELETE, this.changeSuccessed);
    }
    
    componentWillMount() {
        CommentStore.loadAllComments(this.ajaxLoaded);
    }

    ajaxLoaded(contents) {
        this.setState({comments: contents});
    }

    render() {
        return (
            <div id="list">
                <NoteeTable
                    modelName="Comment"
                    columns={['post_title', 'name', 'email', 'content', 'is_hidden']}
                    contents={this.state.comments}
                    store={CommentStore}
                    actions={CommentActions}
                    ajaxLoad={this.ajaxLoaded}
                    returnTableRow={this.returnTableRow}
                />
            </div>
        );
    }

    returnTableRow(comment){
        return (
            <CommentTableRow comment={comment} key={comment.id} />
        );
    }

    changeSuccessed(){
        CommentStore.loadAllComments(this.ajaxLoaded);
    }
}
