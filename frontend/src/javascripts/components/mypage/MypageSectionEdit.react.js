import React, {Component, PropTypes} from 'react';
import { Link } from "react-router";

// actions
import UserActions from '../../actions/UserActions';

// stores
import UserStore from '../../stores/UserStore';

// material-ui
import RaisedButton from 'material-ui/RaisedButton';

// utils
import AuthorityUtil from '../../utils/AuthorityUtil';

// image
var root_img_src = window.location.origin + "/notee/";
var createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;

export default class MypageSectionEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                id: "",
                name: "",
                email: "",
                profile: "",
                profile_img: ""
            },
            display_image_src: root_img_src + "default.png",
            roles: {}
        };

        // ajax
        this.ajaxLoaded = this.ajaxLoaded.bind(this);

        // handles
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeProfileImg = this.handleChangeProfileImg.bind(this);

        this.submit = this.submit.bind(this);
    }

    componentWillMount() {
        UserStore.loadUserByToken(this.ajaxLoaded);
    }

    render() {
        AuthorityUtil.checkAuthority("MypageSectionEdit", this.state.user);

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


        var handleChange = this.handleChange;

        return (
            <div style={style.layout.main}>
                <h2>Mypage - Edit</h2>
                <Link to={`/notee/mypage/`} activeClassName="active" class="mr_20">
                    <RaisedButton label="Mypage" primary={true} />
                </Link>
                <Link to={`/notee/mypage/edit/password`} activeClassName="active" class="mr_20">
                    <RaisedButton label="Edit Password" primary={true} />
                </Link>
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
        }
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

    submit(e){
        var item = {params_id: this.state.user.id, user: this.state.user}
        UserActions.update(item);
    }


    // ajax
    ajaxLoaded(content){
        if(!content){return;}
        this.setState({
            user: {
                id: content.id,
                name: content.name,
                email: content.email,
                profile: content.profile,
                profile_img: content.profile_img
            },
            display_image_src: root_img_src + "profile/" + content.profile_img
        });
    }


};
