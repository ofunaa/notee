import React, {Component, PropTypes} from 'react';

// notee
import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import RoleStore from '../../stores/RoleStore';


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
                profile: "",
                profile_img: "",
                password: "",
                password_confirm: "",
                role: ""
            },
            display_image_src: root_img_src + "default.png",
            roles: {}
        };

        // ajax
        this.ajaxLoaded = this.ajaxLoaded.bind(this);
        this.ajaxRolesLoaded = this.ajaxRolesLoaded.bind(this);

        // handles
        this.handleChange = this.handleChange.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeProfileImg = this.handleChangeProfileImg.bind(this);

        this.submit = this.submit.bind(this);
        this.createContent = this.createContent.bind(this);
    }

    componentWillMount() {
        if(this.props.params.id){
            UserStore.loadUser(this.props.params.id, this.ajaxLoaded);
        }
        RoleStore.loadRoles(this.ajaxRolesLoaded);
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

        var handleChange = this.handleChange;

        return (
            <div style={style.layout.main}>
                <div style={{float: "left", width: "100%"}}>
                    <p>Name:</p>
                    <input
                        style={style.form.input_text}
                        type="text"
                        value={this.state.user.name}
                        onChange={function(e){handleChange(e, "name")}}
                    />
                  <p>Email:</p>
                    <input
                        style={style.form.input_text}
                        type="text"
                        value={this.state.user.email}
                        onChange={function(e){handleChange(e, "email")}}
                    />
                    <p>Profile:</p>
                    <textarea
                        id="main_area"
                        style={style.form.main_area}
                        type="textarea"
                        value={this.state.user.profile}
                        onChange={function(e){handleChange(e, "profile")}}
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
                        onChange={function(e){handleChange(e, "role")}}>

                        {Roles}

                    </select>
                    {(()=>{
                        if(!this.props.params.id){
                            return (
                                <div>
                                    <p>Password:</p>
                                    <input
                                        style={style.form.input_text}
                                        type="password"
                                        value={this.state.user.password}
                                        onChange={function(e){handleChange(e, "password")}}
                                    />
                                    <p>Password Confirm:</p>
                                    <input
                                        style={style.form.input_text}
                                        type="password"
                                        value={this.state.user.password_confirm}
                                        onChange={function(e){handleChange(e, "password_confirm")}}
                                    />

                                </div>
                            );
                        }
                    })()}
                    <button
                        style={style.form.button}
                        onClick={this.submit}>Submit</button>
                </div>
            </div>
        );
    }

    handleChange(e, target){
        switch(target){
            case "name":
                this.state.user.name = e.target.value;
                break;
            case "email":
                this.state.user.email = e.target.value;
                break;
            case "password":
                this.state.user.password = e.target.value;
                break;
            case "password_confirm":
                this.state.user.password_confirm = e.target.value;
                break;
            case "profile":
                this.state.user.profile = e.target.value;
                break;
            case "role":
                this.state.user.role = e.target.value;
                break;
        }
        this.setState({ user: this.state.user });
    }

    handleChangePassword(e){
        this.state.auth_password = e.target.value;
        this.setState({ auth_password: this.state.auth_password });
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

    submit(e){
        if(this.props.params.id){
            var item = {params_id: this.props.params.id, user: this.state.user}
            UserActions.update(item);
        }else{
            this.createContent();
        }
    }

    createContent(){
        var item = {user: this.state.user, password: this.state.password}
        UserActions.create(item);
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
                role: content.role
            },
            display_image_src: root_img_src + "profile/" + content.profile_img
        });
    }

    ajaxRolesLoaded(content){
        if(!content){return;}

        // delete root select
        delete content.root;

        this.state.user.role = content.writer;
        this.setState({
          roles: content,
          user: this.state.user
        });
    }

};
