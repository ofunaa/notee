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
            user: {
                name: "",
                email: "",
                password: "",
                profile: "",
                profile_img: "",
                sns: "",
                role: ""
            },
            password_confirm: "",
            status: {},
            snackbar_open: false,
            snackbar_txt: ""
        };

        // ajax
        this.ajaxLoaded = this.ajaxLoaded.bind(this);
        this.ajaxStatusesLoaded = this.ajaxStatusesLoaded.bind(this);

        // eventemit_callback for user
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

        this.handleChangePasswordConfirm = this.handleChangePasswordConfirm.bind(this);
    }

    componentWillMount() {
        if(this.props.params.id){
            UserStore.loadUser(this.props.params.id, this.ajaxLoaded);
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
                    width: "48%",
                    maxWidth: "48%",
                    marginRight: "1%",
                    marginLeft: "1%",
                    float: "left"
                }
            },
            form: {
                main_area: {
                    width: "100%",
                    height: "300px",
                    marginBottom: "10px"
                },
                input_text: {
                    width: "100%",
                    height: "30px",
                    marginBottom: "10px"
                },
                select: {
                    width: "100%",
                    height: "30px",
                    marginBottom: "10px"
                },
                textarea: {
                    width: "100%",
                    height: "80px",
                    marginBottom: "10px"
                },
                button: {
                    width: "100%",
                    height: "50px",
                    marginBottom: "10px"
                },
                image_button: {
                    width: "30%",
                    height: "50px",
                    marginBottom: "10px"
                }
                ,
                thumbnail: {
                    width: "100%",
                    height: "auto",
                    marginBottom: "10px"
                }
            }
        }

        var statuses = [];
        for (var key in this.props.statuses) {
            statuses.push(
                <option key={this.props.statuses[key]} value={this.props.statuses[key]}>
                    {key}
                </option>
            );
        }

        return (
            <div style={style.layout.half}>

                {(() => {
                    if (this.state.display_image) {
                        return (
                            <EditImage
                                insertImage={this.insertImage}
                                insertThumbnail={this.insertThumbnail}
                                pushImage={this.pushImage}
                                mode={this.state.display_mode}
                            />
                        );
                    }
                })()}

                <button
                    style={style.form.image_button}
                    onClick={this.pushImage.bind(this, "image")}>image</button>


                <div style={{float: "left", width: "100%"}}>
                    <p>Name:</p>
                    <input
                        style={style.form.input_text}
                        type="text"
                        value={this.state.user.name}
                        onChange={this.handleChangeName}
                    />
                    <p>Password:</p>
                    <input
                        style={style.form.input_text}
                        type="password"
                        value={this.state.user.password}
                        onChange={this.handleChangePassword}
                    />
                    <p>Password Confirm:</p>
                    <input
                        style={style.form.input_text}
                        type="password"
                        value={this.state.user.password_confirm}
                        onChange={this.handleChangePasswordConfirm}
                    />
                    <p>Profile:</p>
                    <textarea
                        id="main_area"
                        style={style.form.main_area}
                        type="textarea"
                        value={this.state.user.profile}
                        onChange={this.handleChangeProfile}
                    />
                    <p>ProfileImg:</p>
                    <button
                        style={style.form.image_button}
                        onClick={console.log("aaaaa")}>image</button>
                    <img
                        style={style.form.thumbnail}
                        alt="thumbnail"
                        src={window.location.origin + "/notee/" + this.state.profile_img}
                    />
                    <input
                        style={style.form.input_text}
                        type="hidden"
                        id="thumbnail_id"
                        value={this.state.profile_img}
                        onChange={this.handleChangeProfileImg}
                    />
                    <p>SNS:</p>
                    <input
                        style={style.form.input_text}
                        type="text"
                        value={this.state.sns}
                        onChange={this.handleChangeSns}
                    />
                    <p>Role:</p>
                    <select
                        style={style.form.select}
                        type="select"
                        value={this.state.user.role}
                        onChange={this.handleChangeRole}>

                        {statuses}

                    </select>
                    <button
                        style={style.form.button}
                        onClick={this.saveContent}>Submit</button>
                </div>

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

    handleChangeName(e) {
        this.state.user.title = e.target.value;
        this.setState({ user: this.state.user });
    }
    handleChangeEmail(e) {
        this.state.user.email = e.target.value;
        this.setState({ user: this.state.user });
    }
    handleChangePassword(e) {
        this.state.user.password = e.target.value;
        this.setState({ user: this.state.user });
    }
    handleChangeProfile(e) {
        this.state.user.profile = e.target.value;
        this.setState({ user: this.state.user });
    }
    handleChangeProfileImg(e) {
        this.state.user.profile_img = e.target.value;
        this.setState({ user: this.state.user });
    }
    handleChangeSns(e) {
        this.state.user.sns = e.target.value;
        this.setState({ user: this.state.user });
    }
    handleChangeRole(e) {
        this.state.user.role = e.target.value;
        this.setState({ user: this.state.user });
    }

    handleChangePasswordConfirm(e) {
        this.setState({ password_confirm: e.target.value });
    }

    saveContent(e){
        if(this.props.params.id){
            var item = {params_id: this.props.params.id, user: this.state.user}
            UserActions.update(item);
        }else{
            UserActions.create(this.state.user);
        }
    }

    saveSuccessed(){
        this.displaySnackBar("Create New User!");
        this.setState({
            user: {
                name: "",
                email: "",
                password: "",
                profile: "",
                profile_img: "",
                sns: "",
                role: this.state.statuses["draft"]
            }
        });
    }

    saveFailed(){
        this.displaySnackBar("Sorry..! Save Failed..!");
    }

    updateSuccessed(){
        this.displaySnackBar("Update User!");
    }

    updateFailed(){
        this.displaySnackBar("Sorry..! Update Failed..!");
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
            user: {
                name: content.name,
                email: content.email,
                profile: content.profile,
                profile_img: content.profile_img,
                sns: content.sns,
                role: content.role
            }
        });
    }

    ajaxStatusesLoaded(content){
        if(!content){return;}
        this.setState({statuses: content});
    }

};
