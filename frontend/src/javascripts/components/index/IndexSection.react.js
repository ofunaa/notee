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
                <Link to='/notee/new' >new</Link>
                {this.state.posts.map((post, index)=>{

                    return(
                        <div key={index} >
                            <p>_________________________</p>
                            <p>title:　{post.title}</p>
                            <p>slug:　{post.slug}</p>
                            <p>status:　{post.status}</p>
                            <p>seo_keyword:　{post.seo_keyword}</p>
                            <p>seo_description:　{post.seo_description}</p>
                            <p>{post.id}</p>
                            <p><Link to={`/notee/edit/${post.id}`} activeClassName="active">Edit</Link></p>
                            <p><Link to={`/notee/show/${post.id}`} activeClassName="active">Preview</Link></p>
                        </div>
                    );
                })}
            </div>
        );
    }

};
