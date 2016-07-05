import React, {Component, PropTypes} from 'react'
import BlogActions from '../../actions/BlogActions';
import Preview  from './Preview.react'
var BlogStore = require('../../stores/BlogStore');
var request = require('superagent');


export default class EditSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: {
                title: "",
                content: "",
                slug: "",
                status: "",
                category_id: "",
                thumbnail_id: "",
                seo_keyword: "",
                seo_description: ""
            }
        };

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.handleChangeSlug = this.handleChangeSlug.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.handleChangeSeoKeyword = this.handleChangeSeoKeyword.bind(this);
        this.handleChangeSeoDescription = this.handleChangeSeoDescription.bind(this);

    }

    componentDidMount() {
        if(this.props.params.id){
            this._loadPost();
        }
    }

    render() {

        var statues = this.props.statuses.map(function(status) {
            return <option key={status} value={status}>{status}</option>;
        });

        return (
            <div class="main">
                <div class="title">
                    <input
                        class="form_text"
                        type="text"
                        ref="title"
                        value={this.state.content.title}
                        onChange={this.handleChangeTitle}
                    />
                    <textarea
                        class="form_textarea"
                        type="textarea"
                        value={this.state.content.content}
                        onChange={this.handleChangeContent}
                    />
                    <input
                        class="form_text"
                        type="text"
                        value={this.state.content.slug}
                        onChange={this.handleChangeSlug}
                    />
                    <select
                        class="form_select"
                        type="select"
                        value={this.state.content.status}
                        onChange={this.handleChangeStatus}>
                        {statues}
                    </select>
                    <input
                        class="form_text"
                        type="text"
                        value={this.state.content.seo_keyword}
                        onChange={this.handleChangeSeoKeyword}
                    />
                    <textarea
                        class="form_textarea"
                        type="textarea"
                        value={this.state.content.seo_description}
                        onChange={this.handleChangeSeoDescription}
                    />
                    <button onClick={this.aaaclick}>go title</button>
                </div>
                <Preview content = {this.state.content}/>
            </div>
        );
    }

    _loadPost() {
        var url = "/notee/api/posts/" + this.props.params.id
        request.get(url, (err, res) => {
            this.setState({
                content: {
                    title: res.body.post.title,
                    content: res.body.post.content,
                    slug: res.body.post.slug,
                    status: res.body.post.status,
                    category_id: res.body.post.category_id,
                    thumbnail_id: res.body.post.thumbnail_id,
                    seo_keyword: res.body.post.seo_keyword,
                    seo_description: res.body.post.seo_description
                }
            });
        })
    }

    handleChangeTitle(e) {
        this.state.content.title = e.target.value;
        this.setState({ content: this.state.content });
    }
    handleChangeContent(e) {
        this.state.content.content = e.target.value;
        this.setState({ content: this.state.content });
    }
    handleChangeSlug(e) {
        this.state.content.slug = e.target.value;
        this.setState({ content: this.state.content });
    }
    handleChangeStatus(e) {
        this.state.content.status = e.target.value;
        this.setState({ content: this.state.content });
    }
    handleChangeSeoKeyword(e) {
        this.state.content.seo_keyword = e.target.value;
        this.setState({ content: this.state.content });
    }
    handleChangeSeoDescription(e) {
        this.state.content.seo_description = e.target.value;
        this.setState({ content: this.state.content });
    }


    aaaclick(e){

        BlogActions.submit(this.state);
        this.setState({
            title: '',
            content: '',
            slug: '',
            status: this.props.statuses[0],
            seo_keyword: '',
            seo_description: ''
        });
    }
};

EditSection.defaultProps = {statuses: ["draft", "published", "secret_published", "privated", "deleted"]};
