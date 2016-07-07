import React, {Component, PropTypes} from 'react'
import NoteeActions from '../../actions/NoteeActions';
import Preview  from './Preview.react'


export default class EditSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: {
                title: "",
                content: "",
                slug: "",
                status: this.props.statuses[0],
                category_id: "",
                thumbnail_id: "",
                seo_keyword: "",
                seo_description: ""
            },
            is_saving: false
        };

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.handleChangeSlug = this.handleChangeSlug.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.handleChangeSeoKeyword = this.handleChangeSeoKeyword.bind(this);
        this.handleChangeSeoDescription = this.handleChangeSeoDescription.bind(this);
        this.saveContent = this.saveContent.bind(this);
        this.ajaxLoaded = this.ajaxLoaded.bind(this);

    }

    componentDidMount() {
        if(this.props.params.id){
            NoteeStore.loadNotee(this.props.params.id, this.ajaxLoaded);
        }
    }

    ajaxLoaded(content){
        this.setState({
            content: {
                title: content.title,
                content: content.content,
                slug: content.slug,
                status: content.status,
                category_id: content.category_id,
                thumbnail_id: content.thumbnail_id,
                seo_keyword: content.seo_keyword,
                seo_description: content.seo_description
            }
        });
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
                    <button onClick={this.saveContent}>go title</button>
                </div>
                <Preview content = {this.state.content}/>
            </div>
        );
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

    saveContent(e){
        if(this.props.params.id){
            var item = {params_id: this.props.params.id, content: this.state.content}
            NoteeActions.notee_update(item);
        }else{
            NoteeActions.notee_create(this.state.content);
            this.setState({
                content: {
                    title: "",
                    content: "",
                    slug: "",
                    status: this.props.statuses[0],
                    category_id: "",
                    thumbnail_id: "",
                    seo_keyword: "",
                    seo_description: ""
                }
            });
        }
    }
};

EditSection.defaultProps = {statuses: ["draft", "published", "secret_published", "privated", "deleted"]};
