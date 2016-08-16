import React, {Component, PropTypes} from 'react';

// notee_user
import UserStore from '../../stores/UserStore';

export default class UserShow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: "",
                email: "",
                profile: "",
                profile_img: "",
                sns: "",
                role: ""
            }
        };

        // ajax
        this.ajaxLoaded = this.ajaxLoaded.bind(this);
    }

    componentWillMount() {
        if(this.props.params.id){
            UserStore.loadUser(this.props.params.id, this.ajaxLoaded);
        }
    }

    render() {
        var style = {
            preview: {
                main: {
                    width: "90%",
                    height: "86%",
                    position: "fixed",
                    maxWidth: "90%",
                    marginLeft: "2%",
                    padding: "3%",
                    overflowY: "scroll",
                    wordWrap: "break-word",
                    zIndex: "1101",
                    backgroundColor: "#fff"
                },
                p: {
                    width: "100%",
                }
            }
        }

        return(
            <div style={style.preview.main}>
                <h3>User: </h3>
                <p style={style.preview.p}>name:</p>
                <p>{this.state.user.name}</p>
                <p style={style.preview.p}>email:</p>
                <p>{this.state.user.email}</p>
                <p style={style.preview.p}>profile:</p>
                <p>{this.state.user.profile}</p>
                <p style={style.preview.p}>profile_img:</p>
                <img src={this.state.profile_img} />
                <p style={style.preview.p}>sns:</p>
                <p>{this.state.user.sns}</p>
                <p style={style.preview.p}>role:</p>
                <p>{this.state.user.role}</p>
            </div>
        );
    }

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
};

