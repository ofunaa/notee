import React, {Component, PropTypes} from 'react';

// notee
import UserActions from '../../actions/UserActions';
import UserConstants from '../../constants/UserConstants';
import UserStore from '../../stores/UserStore';

// material-ui
import Snackbar from 'material-ui/Snackbar';


export default class UserEdit extends Component {


    constructor(props) {
        super(props);
        this.state = {
            content: {
                name: "",
                email: "",
                password: "",
                profile: "",
                profile_img: "",
                sns: "",
                role: ""
            },
            status: {},
            snackbar_open: false,
            snackbar_txt: ""
        };

        // ajax
        this.ajaxLoaded = this.ajaxLoaded.bind(this);
        this.ajaxStatusesLoaded = this.ajaxStatusesLoaded.bind(this);

        // eventemit_callback for notee
        this.saveFailed = this.saveFailed.bind(this);
        this.saveSuccessed = this.saveSuccessed.bind(this);
        this.updateFailed = this.updateFailed.bind(this);
        this.updateSuccessed = this.updateSuccessed.bind(this);

        // snackbar
        this.displaySnackBar = this.displaySnackBar.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);

        // handles
        this.handleChangeProps = this.handleChangeProps.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeProfile = this.handleChangeProfile.bind(this);
        this.handleChangeProfileImg = this.handleChangeProfileImg.bind(this);
        this.handleChangeSns = this.handleChangeSns.bind(this);
        this.handleChangeRole = this.handleChangeRole.bind(this);
        this.saveContent = this.saveContent.bind(this);
    }

    componentWillMount() {
        if(this.props.params.id){
            NoteeStore.loadNotee(this.props.params.id, this.ajaxLoaded);
        }
        // NoteeStore.loadStatuses(this.ajaxStatusesLoaded);
        UserStore.addChangeListener(UserConstants.USER_CREATE, this.saveSuccessed);
        UserStore.addChangeListener(UserConstants.USER_CREATE_FAILED, this.saveFailed);
        UserStore.addChangeListener(UserConstants.USER_UPDATE, this.updateSuccessed);
        UserStore.addChangeListener(UserConstants.USER_UPDATE_FAILED, this.updateFailed);
    }

    render() {

        var style = {
            layout: {
                half: {
                    width: "50%",
                    maxWidth: "50%",
                    float: "left"
                }
            }
        }

        var handleChanges = {
            title: this.handleChangeTitle,
            content: this.handleChangeContent,
            slug: this.handleChangeSlug,
            status: this.handleChangeStatus,
            category_id: this.handleChangeCategoryId,
            thumbnail_id: this.handleChangeThumbnailId,
            seo_keyword: this.handleChangeSeoKeyword,
            seo_description: this.handleChangeSeoDescription,
            secret_published_password: this.handleChangeSecretPublishedPassword
        }

        return (
            <div class="main">
                <EditForm
                    handleChanges={handleChanges}
                    handleChangeProps={this.handleChangeProps}
                    content={this.state.content}
                    statuses={this.state.statuses}
                    categories={this.state.categories}
                    saveContent={this.saveContent}
                    displaySnackBar={this.displaySnackBar}
                />
                <EditPreview
                    style={style.layout.half}
                    content = {this.state.content}/>
                <Snackbar
                    open={this.state.snackbar_open}
                    message={this.state.snackbar_txt}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                    bodyStyle={{backgroundColor: "rgba(0,0,0,0.8)"}}
                />
            </div>
        );
    }

    handleChangeProps(){
        this.setState({ content: this.state.content });
    }

    handleChangeTitle(e) {
        this.state.content.title = e.target.value;
        this.setState({ content: this.state.content });
    }
    handleChangeContent(e) {
        this.state.content.content = e.target.value;
        this.setState({ content: this.state.content });
    }
    handleChangeSlug(e) {
        this.state.content.slug = e.target.value;
        this.setState({ content: this.state.content });
    }
    handleChangeStatus(e) {
        this.state.content.status = e.target.value;
        this.setState({ content: this.state.content });
    }
    handleChangeCategoryId(e) {
        this.state.content.category_id = e.target.value;
        this.setState({ content: this.state.content });
    }
    handleChangeThumbnailId(e) {
        this.state.content.thumbnail_id = e.target.value;
        this.setState({ content: this.state.content });
    }
    handleChangeSeoKeyword(e) {
        this.state.content.seo_keyword = e.target.value;
        this.setState({ content: this.state.content });
    }
    handleChangeSeoDescription(e) {
        this.state.content.seo_description = e.target.value;
        this.setState({ content: this.state.content });
    }
    handleChangeSecretPublishedPassword(e) {
        this.state.content.secret_published_password = e.target.value;
        this.setState({ content: this.state.content });
    }

    saveContent(e){
        if(this.props.params.id){
            var item = {params_id: this.props.params.id, content: this.state.content}
            NoteeActions.notee_update(item);
        }else{
            NoteeActions.notee_create(this.state.content);
        }
    }

    saveSuccessed(){
        this.displaySnackBar("Create New Notee!");
        this.setState({
            content: {
                title: "",
                content: "",
                slug: "",
                status: this.state.statuses["draft"],
                category_id: "",
                thumbnail_id: "",
                seo_keyword: "",
                seo_description: "",
                secret_published_password: ""
            }
        });
    }

    saveFailed(){
        this.displaySnackBar("Sorry..! Save Failed..!");
    }

    updateSuccessed(){
        this.displaySnackBar("Update Notee!");
    }

    updateFailed(){
        this.displaySnackBar("Sorry..! Update Failed..!");
    }

    saveCategorySuccessed(){
        CategoryStore.loadAllCategories(this.ajaxCategoryLoaded);
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


    // ajax

    ajaxLoaded(content){
        if(!content){return;}
        this.setState({
            content: {
                title: content.title,
                content: content.content,
                slug: content.slug,
                status: content.status,
                category_id: content.category_id,
                thumbnail_id: content.thumbnail_id,
                seo_keyword: content.seo_keyword,
                seo_description: content.seo_description,
                secret_published_password: content.secret_published_password
            }
        });
    }

    ajaxCategoryLoaded(content){
        if(!content){return;}
        this.setState({categories: content});
    }

    ajaxStatusesLoaded(content){
        if(!content){return;}
        this.setState({statuses: content});
    }

};