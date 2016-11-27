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

// constants
import Constants from '../../constants/NoteeConstants';

// material-ui
import RaisedButton from 'material-ui/RaisedButton';


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

        // check_authority
        this.checkAuthority = this.checkAuthority.bind(this);
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
        this.checkAuthority(this.state.now_user);

        return (
            <div id="list">
                <Link to={`/notee/posts/new`} activeClassName="active">
                    <RaisedButton label="NEW Notee!!" primary={true} />
                </Link>
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

    checkAuthority(now_user){
        switch(now_user.role){
            case "root":
                history.replaceState('', '', '/notee/users');
                location.reload();
            default:
                return true;
        }
    }

};
