import React, {Component, PropTypes} from 'react';

// notee

import NoteeStore from '../../../stores/NoteeStore';
import CategoryStore from '../../../stores/CategoryStore';
import UserStore from '../../../stores/UserStore';
import ImageStore from '../../../stores/ImageStore';
import CommentStore from '../../../stores/CommentStore';
import Constants from '../../../constants/NoteeConstants';

// material-ui
import Snackbar from 'material-ui/Snackbar';


export default class NoteeSnackBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            snackbar_open: false,
            snackbar_txt: ""
        }

        // snackbar
        this.displaySnackBar = this.displaySnackBar.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    componentWillMount() {

        var tmpDisplaySnackBar = this.displaySnackBar;

        // notee
        NoteeStore.addChangeListener(Constants.NOTEE_CREATE, function(){tmpDisplaySnackBar("Create Notee!")});
        NoteeStore.addChangeListener(Constants.NOTEE_UPDATE, function(){tmpDisplaySnackBar("Update Notee!")});
        NoteeStore.addChangeListener(Constants.NOTEE_DELETE, function(){tmpDisplaySnackBar("Delete Notee!")});
        NoteeStore.addChangeListener(Constants.NOTEE_CREATE_FAILED, function(){tmpDisplaySnackBar("Sorry..! Create Failed..!")});
        NoteeStore.addChangeListener(Constants.NOTEE_UPDATE_FAILED, function(){tmpDisplaySnackBar("Sorry..! Update Failed..!")});
        NoteeStore.addChangeListener(Constants.NOTEE_DELETE_FAILED, function(){tmpDisplaySnackBar("Sorry..! Delete Failed..!")});

        // category
        CategoryStore.addChangeListener(Constants.CATEGORY_CREATE, function(){tmpDisplaySnackBar("Create Category!")});
        CategoryStore.addChangeListener(Constants.CATEGORY_UPDATE, function(){tmpDisplaySnackBar("Update Category!")});
        CategoryStore.addChangeListener(Constants.CATEGORY_DELETE, function(){tmpDisplaySnackBar("Delete Category!")});
        CategoryStore.addChangeListener(Constants.CATEGORY_CREATE_FAILED, function(){tmpDisplaySnackBar("Sorry..! Create Failed..!")});
        CategoryStore.addChangeListener(Constants.CATEGORY_UPDATE_FAILED, function(){tmpDisplaySnackBar("Sorry..! Update Failed..!")});
        CategoryStore.addChangeListener(Constants.CATEGORY_DELETE_FAILED, function(){tmpDisplaySnackBar("Sorry..! Delete Failed..!")});

        // user
        UserStore.addChangeListener(Constants.USER_CREATE, function(){tmpDisplaySnackBar("Create User!")});
        UserStore.addChangeListener(Constants.USER_UPDATE, function(){tmpDisplaySnackBar("Update User!")});
        UserStore.addChangeListener(Constants.USER_DELETE, function(){tmpDisplaySnackBar("Delete User!")});
        UserStore.addChangeListener(Constants.USER_CREATE_FAILED, function(){tmpDisplaySnackBar("Sorry..! Create Failed..!")});
        UserStore.addChangeListener(Constants.USER_UPDATE_FAILED, function(){tmpDisplaySnackBar("Sorry..! Update Failed..!")});
        UserStore.addChangeListener(Constants.USER_DELETE_FAILED, function(){tmpDisplaySnackBar("Sorry..! Delete Failed..!")});

        // image
        ImageStore.addChangeListener(Constants.IMAGE_CREATE, function(){tmpDisplaySnackBar("Create Image!")});
        ImageStore.addChangeListener(Constants.IMAGE_DELETE, function(){tmpDisplaySnackBar("Delete Image!")});
        ImageStore.addChangeListener(Constants.IMAGE_CREATE_FAILED, function(){tmpDisplaySnackBar("Sorry..! Create Failed..!")});
        ImageStore.addChangeListener(Constants.IMAGE_DELETE_FAILED, function(){tmpDisplaySnackBar("Sorry..! Delete Failed..!")});

        // comment
        CommentStore.addChangeListener(Constants.COMMENT_UPDATE, function(){tmpDisplaySnackBar("Update Comment status!")});
        CommentStore.addChangeListener(Constants.COMMENT_DELETE, function(){tmpDisplaySnackBar("Delete Comment!")});
        CommentStore.addChangeListener(Constants.COMMENT_UPDATE_FAILED, function(){tmpDisplaySnackBar("Sorry..! Update Failed..!")});
        CommentStore.addChangeListener(Constants.COMMENT_DELETE_FAILED, function(){tmpDisplaySnackBar("Sorry..! Delete Failed..!")});


    }

    render() {
        return (
            <Snackbar
                open={this.state.snackbar_open}
                message={this.state.snackbar_txt}
                autoHideDuration={4000}
                onRequestClose={this.handleRequestClose}
                bodyStyle={{backgroundColor: "rgba(0,0,0,0.8)"}}
            />
        );
    }

    displaySnackBar(txt){
        this.setState({
            snackbar_open: true,
            snackbar_txt: txt
        });
    }

    handleRequestClose(){
        this.setState({
            snackbar_open: false
        });
    }
}
