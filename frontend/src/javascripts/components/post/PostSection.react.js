import React, {Component, PropTypes} from 'react';
import { Link } from "react-router";

// notee
import PostStore from '../../stores/PostStore';
import PostActions from '../../actions/PostActions';
import IndexTableRow from './PostTableRow.react.js';
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
        PostStore.loadAllPosts(this.ajaxLoaded);
    }

    ajaxLoaded(contents) {
        this.setState({posts: contents});
    }

    render() {
        return (
            <div id="list">
                <Link to={`/notee/new`} activeClassName="active">
                    <RaisedButton label="NEW Notee!!" primary={true} />
                </Link>
                <NoteeTable
                    modelName="Post"
                    columns={['title', 'category', 'status', 'published_at']}
                    contents={this.state.notees}
                    store={PostStore}
                    actions={PostActions}
                    ajaxLoad={this.ajaxLoaded}
                    returnTableRow={this.returnTableRow}
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
        PostStore.loadAllPosts(this.ajaxLoaded);
    }

};
