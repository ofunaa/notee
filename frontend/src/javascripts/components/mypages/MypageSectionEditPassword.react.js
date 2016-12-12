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

export default class MypageSectionEditPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                now_password: "",
                password: "",
                password_confirm: ""
            },
            now_user: ""
        };

        // ajax
        this.ajaxNowUserLoaded = this.ajaxNowUserLoaded.bind(this);

        // handles
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentWillMount() {
        UserStore.loadUserByToken(this.ajaxNowUserLoaded);
    }

    ajaxNowUserLoaded(content) {
        this.setState({now_user: content});
    }

    render() {
        AuthorityUtil.checkAuthority("MypageSectionEditPassword", this.state.now_user);

        var handleChange = this.handleChange;

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


        return (
            <div style={style.layout.main}>
                <h2>Mypage - Edit Password</h2>
                <Link to={`/notee/mypage/`} activeClassName="active" class="mr_20">
                    <RaisedButton label="Mypage" primary={true} />
                </Link>
                <div style={{float: "left", width: "100%"}}>
                    <p>Now Password:</p>
                    <input
                        style={style.form.input_text}
                        type="password"
                        value={this.state.user.now_password}
                        onChange={function(e){handleChange(e, "now_password")}}
                    />
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
                    <button
                        style={style.form.button}
                        onClick={this.submit}>Submit</button>
                </div>
            </div>
        );
    }

    handleChange(e, target){
        switch(target){
            case "now_password":
                this.state.user.now_password = e.target.value;
                break;
            case "password":
                this.state.user.password = e.target.value;
                break;
            case "password_confirm":
                this.state.user.password_confirm = e.target.value;
                break;
        }
        this.setState({ user: this.state.user });
    }


    submit(){
        UserActions.update_password(this.state.user);
    }

};
