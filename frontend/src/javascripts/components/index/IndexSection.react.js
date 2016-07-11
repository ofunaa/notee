import React, {Component, PropTypes} from 'react'
import { Link } from "react-router"
import NoteeStore from '../../stores/NoteeStore';

export default class IndexSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }

        this.ajaxLoaded = this.ajaxLoaded.bind(this);
    }

    componentDidMount() {
        NoteeStore.loadAllNotees(this.ajaxLoaded);
    }

    ajaxLoaded(contents) {
        this.setState({posts: contents});
    }

    render() {

        return (
            <div id="list">
                {this.state.posts.map((post, index)=>{
                    return(
                        <div key={index} style={{borderBottom: "1px #dcdcdc solid", width: "94%", padding: "3%", float: "left"}}>
                            <p>title:　{post.title}</p>
                            <p>update:　{post.updated_at}</p>
                            <p><Link to={`/notee/edit/${post.id}`} activeClassName="active">Edit</Link></p>
                        </div>
                    );
                })}
            </div>
        );
    }

};
