import React, {Component, PropTypes} from 'react'

// notee
import UserActions from '../../actions/UserActions'
import UserConstants from '../../constants/UserConstants'
import UserStore from '../../stores/UserStore'

// material-ui
import Snackbar from 'material-ui/Snackbar'

// image
var root_img_src = window.location.origin + "/notee/";
var createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;

export default class UserEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: "",
                email: "",
                password: "",
                password_confirm: "",
                profile: "",
                profile_img: "",
                role: ""
            },
            display_image_src: root_img_src + "default.png",
            roles: {},
            snackbar_open: false,
            snackbar_txt: ""
        };

        // ajax
        this.ajaxLoaded = this.ajaxLoaded.bind(this);
        this.ajaxRolesLoaded = this.ajaxRolesLoaded.bind(this);

        // eventemit_callback for user
        this.saveFailed = this.saveFailed.bind(this);
        this.saveSuccessed = this.saveSuccessed.bind(this);
        this.updateFailed = this.updateFailed.bind(this);
        this.updateSuccessed = this.updateSuccessed.bind(this);

        // snackbar
        this.displaySnackBar = this.displaySnackBar.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);

        // handles
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangePasswordConfirm = this.handleChangePasswordConfirm.bind(this);
        this.handleChangeProfile = this.handleChangeProfile.bind(this);
        this.handleChangeProfileImg = this.handleChangeProfileImg.bind(this);
        this.handleChangeRole = this.handleChangeRole.bind(this);
        this.saveContent = this.saveContent.bind(this);

    }

    componentWillMount() {
        if(this.props.params.id){
            UserStore.loadUser(this.props.params.id, this.ajaxLoaded);
        }
        UserStore.loadRoles(this.ajaxRolesLoaded);
        UserStore.addChangeListener(UserConstants.USER_CREATE, this.saveSuccessed);
        UserStore.addChangeListener(UserConstants.USER_CREATE_FAILED, this.saveFailed);
        UserStore.addChangeListener(UserConstants.USER_UPDATE, this.updateSuccessed);
        UserStore.addChangeListener(UserConstants.USER_UPDATE_FAILED, this.updateFailed);
    }

    render() {
        var style = {
            layout: {
                main: {
                    width: "96%",
                    maxWidth: "96%",
                    marginRight: "2%",
                    marginLeft: "2%",
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

        var Roles = [];
        for (var key in this.state.roles) {
            Roles.push(
                <option key={this.state.roles[key]} value={this.state.roles[key]}>
                    {key}
                </option>
            );
        }

        return (
            <div style={style.layout.main}>
                <div style={{float: "left", width: "100%"}}>
                    <p>Name:</p>
                    <input
                        style={style.form.input_text}
                        type="text"
                        value={this.state.user.name}
                        onChange={this.handleChangeName}
                    />
                  <p>Email:</p>
                    <input
                        style={style.form.input_text}
                        type="text"
                        value={this.state.user.email}
                        onChange={this.handleChangeEmail}
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
                    <input
                        style={style.form.input_text}
                        type="file"
                        id="thumbnail_id"
                        value={this.state.profile_img}
                        onChange={this.handleChangeProfileImg}
                    />
                    <img
                        style={style.form.thumbnail}
                        alt="thumbnail"
                        src={this.state.display_image_src}
                    />
                    <p>Role:</p>
                    <select
                        style={style.form.select}
                        type="select"
                        value={this.state.user.role}
                        onChange={this.handleChangeRole}>

                        {Roles}

                    </select>
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
        this.state.user.name = e.target.value;
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

    handleChangePasswordConfirm(e) {
        this.state.user.password_confirm = e.target.value;
        this.setState({ user: this.state.user });
    }

    handleChangeProfile(e) {
        this.state.user.profile = e.target.value;
        this.setState({ user: this.state.user });
    }

    handleChangeProfileImg(e) {
        var files = e.target.files;
        this.state.user.profile_img = files[0];
        var image_url = createObjectURL(files[0]);
        this.setState({
            user: this.state.user,
            display_image_src: image_url
        });
    }

    handleChangeRole(e) {
        this.state.user.role = e.target.value;
        this.setState({ user: this.state.user });
    }

    saveContent(e){
        console.log(this.state.user);
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
                password_confirm: "",
                profile: "",
                profile_img: "",
                role: this.state.roles["writer"]
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
        console.log(content);
        this.setState({
            user: {
                name: content.name,
                email: content.email,
                password: "",
                password_confirm: "",
                profile: content.profile,
                profile_img: content.profile_img,
                role: content.role
            },
            display_image_src: root_img_src + "profile/" + content.profile_img
        });
    }

    ajaxRolesLoaded(content){
        if(!content){return;}
        this.state.user.role = content.writer;
        this.setState({
          roles: content,
          user: this.state.user
        });
    }

};
