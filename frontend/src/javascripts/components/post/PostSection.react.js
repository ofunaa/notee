import React, {Component, PropTypes} from 'react';
import { Link } from "react-router";

// notee
import PostStore from '../../stores/PostStore';
import PostActions from '../../actions/PostActions';
import PostTableRow from './PostTableRow.react.js';
import Constants from '../../constants/NoteeConstants';

// material-ui
import RaisedButton from 'material-ui/RaisedButton';

// common-parts
import NoteeTable from '../common/table/NoteeTable.react';

export default class PostSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }

        this.ajaxLoaded = this.ajaxLoaded.bind(this);
        this.returnTableRow = this.returnTableRow.bind(this);
    }

    componentDidMount() {
        PostStore.addChangeListener(Constants.POST_DELETE, this.changeSuccessed);
    }

    componentWillMount() {
        PostStore.loadPosts(this.ajaxLoaded);
    }

    ajaxLoaded(contents) {
        this.setState({posts: contents});
    }

    render() {
        return (
            <div id="list">
                <Link to={`/notee/posts/new`} activeClassName="active">
                    <RaisedButton label="NEW Notee!!" primary={true} />
                </Link>
                <NoteeTable
                    modelName="Post"
                    columns={['title', 'category', 'status', 'published_at']}
                    contents={this.state.posts}
                    actions={PostActions}
                    returnTableRow={this.returnTableRow}
                    buttonNum={1}
                />
            </div>
        );
    }

    returnTableRow(post){
        return (
            <PostTableRow
                post={post}
                ajaxLoad={this.state.ajaxLoad}
                key={post.id} />
        );
    }

    changeSuccessed(){
        PostStore.loadPosts(this.ajaxLoaded);
    }

};
