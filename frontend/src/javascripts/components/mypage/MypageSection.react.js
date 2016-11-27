import React, {Component, PropTypes} from 'react';
import { Link } from "react-router";

// stores
import UserStore from '../../stores/UserStore';

// components
import AuthorityDescription from '../../components/common/authority/AuthorityDescription.react';

// material-ui
import RaisedButton from 'material-ui/RaisedButton';

// utils
import AuthorityUtil from '../../utils/AuthorityUtil';

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
        AuthorityUtil.checkAuthority("MypageSection", this.state.user);

        var editButton = function(role){
            if(role != "root"){
                return(
                    <div>
                        <Link to={`/notee/mypage/edit`} activeClassName="active" class="mr_20">
                            <RaisedButton label="Edit Profile" primary={true} />
                        </Link>
                        <Link to={`/notee/mypage/edit/password`} activeClassName="active" class="mr_20">
                            <RaisedButton label="Edit Password" primary={true} />
                        </Link>
                    </div>
                );
            }
        }

        return(
            <div>
                <h2>Mypage</h2>
                {editButton(this.state.user.role)}
                <p>name:</p>
                <h3>{this.state.user.name}</h3>
                <p>email:</p>
                <h3>{this.state.user.email}</h3>
                <p>profile:</p>
                <h3>{this.state.user.profile}</h3>
                <p>profile_img:</p>
                <img src={window.location.origin + "/notee/profile/" + this.state.user.profile_img} />
                <p>role:</p>
                <h3>{this.state.user.role}</h3>
                <AuthorityDescription role={this.state.user.role} />
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

