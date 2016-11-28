import React, {Component, PropTypes} from 'react';

// utils
import EventUtil from '../../../utils/EventUtil';

// constants
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

        // post
        EventUtil.addChangeListener(Constants.POST_CREATE, function(){tmpDisplaySnackBar("Create Post!")});
        EventUtil.addChangeListener(Constants.POST_UPDATE, function(){tmpDisplaySnackBar("Update Post!")});
        EventUtil.addChangeListener(Constants.POST_DELETE, function(){tmpDisplaySnackBar("Delete Post!")});
        EventUtil.addChangeListener(Constants.POST_CREATE_FAILED, function(){tmpDisplaySnackBar("Sorry..! Create Failed..!")});
        EventUtil.addChangeListener(Constants.POST_UPDATE_FAILED, function(){tmpDisplaySnackBar("Sorry..! Update Failed..!")});
        EventUtil.addChangeListener(Constants.POST_DELETE_FAILED, function(){tmpDisplaySnackBar("Sorry..! Delete Failed..!")});

        // category
        EventUtil.addChangeListener(Constants.CATEGORY_CREATE, function(){tmpDisplaySnackBar("Create Category!")});
        EventUtil.addChangeListener(Constants.CATEGORY_UPDATE, function(){tmpDisplaySnackBar("Update Category!")});
        EventUtil.addChangeListener(Constants.CATEGORY_DELETE, function(){tmpDisplaySnackBar("Delete Category!")});
        EventUtil.addChangeListener(Constants.CATEGORY_CREATE_FAILED, function(){tmpDisplaySnackBar("Sorry..! Create Failed..!")});
        EventUtil.addChangeListener(Constants.CATEGORY_UPDATE_FAILED, function(){tmpDisplaySnackBar("Sorry..! Update Failed..!")});
        EventUtil.addChangeListener(Constants.CATEGORY_DELETE_FAILED, function(){tmpDisplaySnackBar("Sorry..! Delete Failed..!")});

        // user
        EventUtil.addChangeListener(Constants.USER_CREATE, function(){tmpDisplaySnackBar("Create User!")});
        EventUtil.addChangeListener(Constants.USER_UPDATE, function(){tmpDisplaySnackBar("Update User!")});
        EventUtil.addChangeListener(Constants.USER_DELETE, function(){tmpDisplaySnackBar("Delete User!")});
        EventUtil.addChangeListener(Constants.USER_CREATE_FAILED, function(){tmpDisplaySnackBar("Sorry..! Create Failed..!")});
        EventUtil.addChangeListener(Constants.USER_UPDATE_FAILED, function(){tmpDisplaySnackBar("Sorry..! Update Failed..!")});
        EventUtil.addChangeListener(Constants.USER_DELETE_FAILED, function(){tmpDisplaySnackBar("Sorry..! Delete Failed..!")});
        EventUtil.addChangeListener(Constants.USER_PASSWORD_UPDATE, function(){tmpDisplaySnackBar("Update Password!")});
        EventUtil.addChangeListener(Constants.USER_PASSWORD_UPDATE_FAILED, function(){tmpDisplaySnackBar("Sorry..! Update Failed..!")});


        // image
        EventUtil.addChangeListener(Constants.IMAGE_CREATE, function(){tmpDisplaySnackBar("Create Image!")});
        EventUtil.addChangeListener(Constants.IMAGE_DELETE, function(){tmpDisplaySnackBar("Delete Image!")});
        EventUtil.addChangeListener(Constants.IMAGE_CREATE_FAILED, function(){tmpDisplaySnackBar("Sorry..! Create Failed..!")});
        EventUtil.addChangeListener(Constants.IMAGE_DELETE_FAILED, function(){tmpDisplaySnackBar("Sorry..! Delete Failed..!")});

        // comment
        EventUtil.addChangeListener(Constants.COMMENT_UPDATE, function(){tmpDisplaySnackBar("Update Comment status!")});
        EventUtil.addChangeListener(Constants.COMMENT_DELETE, function(){tmpDisplaySnackBar("Delete Comment!")});
        EventUtil.addChangeListener(Constants.COMMENT_UPDATE_FAILED, function(){tmpDisplaySnackBar("Sorry..! Update Failed..!")});
        EventUtil.addChangeListener(Constants.COMMENT_DELETE_FAILED, function(){tmpDisplaySnackBar("Sorry..! Delete Failed..!")});

        // trash
        EventUtil.addChangeListener(Constants.TRASH_UPDATE, function(){tmpDisplaySnackBar("Restore Content!")});
        EventUtil.addChangeListener(Constants.TRASH_UPDATE_FAILED, function(){tmpDisplaySnackBar("Sorry..! Restore Failed..!")});

        // token
        EventUtil.addChangeListener(Constants.TOKEN_DELETE, function(){tmpDisplaySnackBar("Logout now!")});
        EventUtil.addChangeListener(Constants.TOKEN_DELETE_FAILED, function(){tmpDisplaySnackBar("Sorry..! Logout Failed..!")});


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
