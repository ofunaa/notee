import React, {Component, PropTypes} from 'react'
import { Link } from "react-router";

// stores
import PostStore from '../../stores/PostStore';
import CategoryStore from '../../stores/CategoryStore';
import UserStore from '../../stores/UserStore';

// components
import AuthorityButtonEdit from '../../components/common/authority/AuthorityButtonEdit.react.js';
import AuthorityButtonDelete from '../../components/common/authority/AuthorityButtonDelete.react.js';

// material-ui
import { TableRow, TableRowColumn } from 'material-ui/Table';

export default class IndexTableRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            category: "",
            status: "",
            user: ""
        }

        this.ajaxCategoryLoad = this.ajaxCategoryLoad.bind(this);
        this.ajaxStatusLoad = this.ajaxStatusLoad.bind(this);
        this.ajaxUserLoad = this.ajaxUserLoad.bind(this);
    }

    componentWillMount(){
        CategoryStore.loadCategory(this.props.post.category_id, this.ajaxCategoryLoad);
        PostStore.loadStatus(this.props.post.status, this.ajaxStatusLoad);
        UserStore.loadUser(this.props.post.user_id, this.ajaxUserLoad);
    }

    render() {
        var date = new Date( this.props.post.published_at );
        var display_date = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDay() + "/" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

        var myPostStyle = function(now_user_id, user_id){
            if(now_user_id == user_id){
                return {backgroundColor: "rgba(250,200,80,0.5)"};
            }
        }

        return(
            <TableRow style={myPostStyle(this.props.now_user.id, this.props.post.user_id)}>
                <TableRowColumn>{this.props.post.title}</TableRowColumn>
                <TableRowColumn>{this.state.category}</TableRowColumn>
                <TableRowColumn>{this.state.user.name}</TableRowColumn>
                <TableRowColumn>{this.state.status}</TableRowColumn>
                <TableRowColumn>{display_date}</TableRowColumn>
                <TableRowColumn>
                    <AuthorityButtonEdit
                        modelName="Post"
                        now_user={this.props.now_user}
                        content={this.props.post}
                    />
                </TableRowColumn>
                <TableRowColumn>
                    <AuthorityButtonDelete
                        modelName="Post"
                        now_user={this.props.now_user}
                        deleteMethod={this.props.deletePost}
                        content={this.props.post}
                    />
                </TableRowColumn>
            </TableRow>
        );
    }

    ajaxCategoryLoad(category){
        if(!category){return false}
        this.setState({category: category.name});
    }

    ajaxStatusLoad(status){
        if(!status){return false}
        this.setState({status: status});
    }

    ajaxUserLoad(user){
        if(!user){return false}
        this.setState({user: user});
    }


    
}
