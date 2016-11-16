import React, {Component, PropTypes} from "react"
import { Link } from "react-router"
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export default class NoteeHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
        this.handleToggle = this.handleToggle.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleToggle() {
        this.setState({open: !this.state.open});
    }

    handleClose() {
        this.setState({open: false});
    }

    render() {
        return (
            <header>
                <AppBar
                    onLeftIconButtonTouchTap={this.handleToggle}
                    title={<Link to='/notee' style={{color: "white"}}>Notee</Link>}
                />
                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    <MenuItem onTouchTap={this.handleClose}>
                        <Link to='/notee/posts'>Post</Link>
                    </MenuItem>
                    <MenuItem onTouchTap={this.handleClose}>
                        <Link to='/notee/categories/'>Category</Link>
                    </MenuItem>
                    <MenuItem onTouchTap={this.handleClose}>
                        <Link to='/notee/images/'>Image</Link>
                    </MenuItem>
                    <MenuItem onTouchTap={this.handleClose}>
                        <Link to='/notee/users/'>User</Link>
                    </MenuItem>
                    <MenuItem onTouchTap={this.handleClose}>
                        <Link to='/notee/comments/'>Comments</Link>
                    </MenuItem>
                </Drawer>
            </header>
        );
    }


};
