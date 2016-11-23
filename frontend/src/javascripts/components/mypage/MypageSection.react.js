import React, {Component, PropTypes} from 'react';
import { Link } from "react-router";

// notee_user
import UserStore from '../../stores/UserStore';

// material-ui
import RaisedButton from 'material-ui/RaisedButton';

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
        UserStore.loadUserByToken(this.ajaxLoaded);
    }

    render() {

        return(
            <div>
                <h2>Mypage</h2>
                <Link to={`/notee/mypage/edit`} activeClassName="active" class="mr_20">
                    <RaisedButton label="Edit Profile" primary={true} />
                </Link>
                <Link to={`/notee/mypage/edit/password`} activeClassName="active" class="mr_20">
                    <RaisedButton label="Edit Password" primary={true} />
                </Link>
                <p>name:</p>
                <p>{this.state.user.name}</p>
                <p>email:</p>
                <p>{this.state.user.email}</p>
                <p>profile:</p>
                <p>{this.state.user.profile}</p>
                <p>profile_img:</p>
                <img src={this.state.profile_img} />
                <p>role:</p>
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

