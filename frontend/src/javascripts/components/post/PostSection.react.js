import React, {Component, PropTypes} from 'react';
import { Link } from "react-router";

// actions
import PostActions from '../../actions/PostActions';

// stores
import PostStore from '../../stores/PostStore';
import UserStore from '../../stores/UserStore';

// components
import PostTableRow from './PostTableRow.react.js';
import NoteeTable from '../common/table/NoteeTable.react';
import AuthorityButtonCreate from '../common/authority/AuthorityButtonCreate.react';

// constants
import Constants from '../../constants/NoteeConstants';

// utils
import AuthorityUtil from '../../utils/AuthorityUtil';


export default class PostSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            now_user: ""
        }

        // crud
        this.deletePost = this.deletePost.bind(this);

        // ajax
        this.ajaxPostLoaded = this.ajaxPostLoaded.bind(this);
        this.ajaxNowUserLoaded = this.ajaxNowUserLoaded.bind(this);

        // eventemit
        this.changeSuccessed = this.changeSuccessed.bind(this);

        // noteetable
        this.returnTableRow = this.returnTableRow.bind(this);
    }

    componentDidMount() {
        PostStore.addChangeListener(Constants.POST_DELETE, this.changeSuccessed);
    }

    componentWillMount() {
        PostStore.loadPosts(this.ajaxPostLoaded);
        UserStore.loadUserByToken(this.ajaxNowUserLoaded);
    }

    ajaxPostLoaded(contents) {
        this.setState({posts: contents});
    }

    ajaxNowUserLoaded(content) {
        this.setState({now_user: content});
    }

    render() {
        AuthorityUtil.checkAuthority("PostSection", this.state.now_user);

        return (
            <div id="list">
                <AuthorityButtonCreate
                    modelName="Post"
                    now_user={this.state.now_user}
                />
                <NoteeTable
                    modelName="Post"
                    columns={['title', 'category', 'user', 'status', 'published_at']}
                    contents={this.state.posts}
                    actions={PostActions}
                    returnTableRow={this.returnTableRow}
                    buttonNum={2}
                />
            </div>
        );
    }

    returnTableRow(post){
        return (
            <PostTableRow
                post={post}
                deletePost={this.deletePost}
                now_user={this.state.now_user}
                key={post.id} />
        );
    }

    changeSuccessed(){
        PostStore.loadPosts(this.ajaxPostLoaded);
    }

    deletePost(id){
        PostActions.delete(id);
    }

};
