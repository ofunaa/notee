import React, {Component, PropTypes} from 'react';

// actions
import CommentActions from '../../actions/CommentActions';

// stores
import CommentStore from '../../stores/CommentStore';
import UserStore from '../../stores/UserStore';

// components
import NoteeTable from '../common/table/NoteeTable.react';
import CommentTableRow from './CommentTableRow.react';

// constants
import Constants from '../../constants/NoteeConstants';

// utils
import AuthorityUtil from '../../utils/AuthorityUtil';
import EventUtil from '../../utils/EventUtil';

export default class CommentSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            now_user: ""
        }

        // ajax
        this.ajaxLoaded = this.ajaxLoaded.bind(this);
        this.ajaxNowUserLoaded = this.ajaxNowUserLoaded.bind(this);

        // table
        this.returnTableRow = this.returnTableRow.bind(this);

        // callbacks
        this.changeSuccessed = this.changeSuccessed.bind(this);
    }

    componentWillMount() {
        CommentStore.loadComments(this.ajaxLoaded);
        UserStore.loadUserByToken(this.ajaxNowUserLoaded);
    }

    componentDidMount() {
        EventUtil.addChangeListener(Constants.COMMENT_UPDATE, this.changeSuccessed);
        EventUtil.addChangeListener(Constants.COMMENT_DELETE, this.changeSuccessed);
    }

    componentWillUnmount(){
        EventUtil.removeChangeListener(Constants.COMMENT_UPDATE, this.changeSuccessed);
        EventUtil.removeChangeListener(Constants.COMMENT_DELETE, this.changeSuccessed);
    }

    ajaxLoaded(contents) {
        this.setState({comments: contents});
    }

    ajaxNowUserLoaded(content) {
        this.setState({now_user: content});
    }

    render() {

        AuthorityUtil.checkAuthority("CommentSection", this.state.now_user);

        return (
            <div id="list">
                <NoteeTable
                    modelName="Comment"
                    columns={['post_title', 'name', 'email', 'content', 'is_hidden']}
                    contents={this.state.comments}
                    actions={CommentActions}
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
        CommentStore.loadComments(this.ajaxLoaded);
    }
}
