import React, {Component, PropTypes} from "react"
import { Link } from "react-router"
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

// notee
import TokenActions from '../../actions/TokenActions';
import RoleStore from '../../stores/RoleStore';

export default class NoteeHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            now_role: ""
        };
        this.handleToggle = this.handleToggle.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.logout = this.logout.bind(this);
        this.ajaxLoaded = this.ajaxLoaded.bind(this);
    }

    componentWillMount() {
        RoleStore.loadRole(this.ajaxLoaded);
    }

    ajaxLoaded(content){
        if(!content){return;}
        this.setState({now_role: content});
    }

    handleToggle() {
        this.setState({open: !this.state.open});
    }

    handleClose() {
        this.setState({open: false});
    }

    render() {

        var handleClose = this.handleClose;

        var Links = function(str){

            return (
                <div>
                    <MenuItem onTouchTap={handleClose}>
                        <Link to='/notee/posts'>Post</Link>
                    </MenuItem>
                    <MenuItem onTouchTap={handleClose}>
                        <Link to='/notee/categories/'>Category</Link>
                    </MenuItem>
                    <MenuItem onTouchTap={handleClose}>
                        <Link to='/notee/images/'>Image</Link>
                    </MenuItem>
                    <MenuItem onTouchTap={handleClose}>
                        <Link to='/notee/comments/'>Comments</Link>
                    </MenuItem>
                    {function(str){
                        if(str == "full"){
                            return(
                                <MenuItem onTouchTap={handleClose}>
                                    <Link to='/notee/users/'>User</Link>
                                </MenuItem>
                            );
                        }
                    }}
                    <MenuItem onTouchTap={handleClose}>
                        <Link to='/notee/trashes/'>TrashBox</Link>
                    </MenuItem>
                    <MenuItem onTouchTap={handleClose}>
                        <Link to='/notee/mypage/'>Mypage</Link>
                    </MenuItem>
                </div>
            );
        }

        var setLinks = function(role){
            switch(role){
                case "writer":
                    return Links(null);
                case "editor":
                    return Links(null);
                case "manager":
                    return Links("full")
                case "root":
                    return (
                        <div>
                            <MenuItem onTouchTap={handleClose}>
                                <Link to='/notee/users/'>User</Link>
                            </MenuItem>
                            <MenuItem onTouchTap={handleClose}>
                                <Link to='/notee/mypage/'>Mypage</Link>
                            </MenuItem>
                        </div>

                    );
            }
        }

        return (
            <header>
                <AppBar
                    onLeftIconButtonTouchTap={this.handleToggle}
                    title={<Link to='/notee' style={{color: "white"}}>Notee</Link>}
                    iconElementRight={<FlatButton onClick={this.logout} label="Logout" />}
                />
                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    {setLinks(this.state.now_role)}
                </Drawer>
            </header>
        );
    }

    logout() {
        TokenActions.delete();
    }


};
