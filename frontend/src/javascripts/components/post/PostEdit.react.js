import React, {Component, PropTypes} from 'react';

// notee
import PostActions from '../../actions/PostActions';
import PostStore from '../../stores/PostStore';
import CategoryStore from '../../stores/CategoryStore';
import PostForm  from './PostForm.react.js';
import PostPreview  from './PostPreview.react.js';

export default class PostEdit extends Component {


    constructor(props) {
        super(props);
        this.state = {
            content: {
                title: "",
                content: "",
                slug: "",
                status: 0,
                category_id: "",
                thumbnail_id: "",
                seo_keyword: "",
                seo_description: "",
                secret_published_password: ""
            },
            categories: [],
            status: {}
        };

        // ajax
        this.ajaxLoaded = this.ajaxLoaded.bind(this);
        this.ajaxCategoryLoaded = this.ajaxCategoryLoaded.bind(this);
        this.ajaxStatusesLoaded = this.ajaxStatusesLoaded.bind(this);

        // eventemit_callback for notee
        this.saveSuccessed = this.saveSuccessed.bind(this);

        // eventemit_callback for category
        this.saveCategorySuccessed = this.saveCategorySuccessed.bind(this);

        // handles
        this.handleChangeProps = this.handleChangeProps.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.handleChangeSlug = this.handleChangeSlug.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.handleChangeCategoryId = this.handleChangeCategoryId.bind(this);
        this.handleChangeThumbnailId = this.handleChangeThumbnailId.bind(this);
        this.handleChangeSeoKeyword = this.handleChangeSeoKeyword.bind(this);
        this.handleChangeSeoDescription = this.handleChangeSeoDescription.bind(this);
        this.handleChangeSecretPublishedPassword = this.handleChangeSecretPublishedPassword.bind(this);
        this.saveContent = this.saveContent.bind(this);
    }

    componentWillMount() {
        if(this.props.params.id){
            PostStore.loadPost(this.props.params.id, this.ajaxLoaded);
        }
        PostStore.loadStatuses(this.ajaxStatusesLoaded);
        CategoryStore.loadCategories(this.ajaxCategoryLoaded);
    }

    render() {

        var style = {
            layout: {
                half: {
                    width: "50%",
                    maxWidth: "50%",
                    float: "left"
                }
            }
        }

        var handleChanges = {
            title: this.handleChangeTitle,
            content: this.handleChangeContent,
            slug: this.handleChangeSlug,
            status: this.handleChangeStatus,
            category_id: this.handleChangeCategoryId,
            thumbnail_id: this.handleChangeThumbnailId,
            seo_keyword: this.handleChangeSeoKeyword,
            seo_description: this.handleChangeSeoDescription,
            secret_published_password: this.handleChangeSecretPublishedPassword
        }

        return (
            <div class="main">
                <PostForm
                    handleChanges={handleChanges}
                    handleChangeProps={this.handleChangeProps}
                    content={this.state.content}
                    statuses={this.state.statuses}
                    categories={this.state.categories}
                    saveContent={this.saveContent}
                    displaySnackBar={this.displaySnackBar}
                />
                <PostPreview
                    style={style.layout.half}
                    content={this.state.content}/>
            </div>
        );
    }

    handleChangeProps(){
        this.setState({ content: this.state.content });
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
    handleChangeCategoryId(e) {
        this.state.content.category_id = e.target.value;
        this.setState({ content: this.state.content });
    }
    handleChangeThumbnailId(e) {
        this.state.content.thumbnail_id = e.target.value;
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
    handleChangeSecretPublishedPassword(e) {
        this.state.content.secret_published_password = e.target.value;
        this.setState({ content: this.state.content });
    }

    saveContent(e){
        if(this.props.params.id){
            var item = {params_id: this.props.params.id, content: this.state.content}
            PostActions.update(item);
        }else{
            PostActions.create(this.state.content);
        }
    }

    saveSuccessed(){
        this.setState({
            content: {
                title: "",
                content: "",
                slug: "",
                status: this.state.statuses["draft"],
                category_id: "",
                thumbnail_id: "",
                seo_keyword: "",
                seo_description: "",
                secret_published_password: ""
            }
        });
    }

    saveCategorySuccessed(){
        CategoryStore.loadCategories(this.ajaxCategoryLoaded);
    }

    // ajax
    ajaxLoaded(content){
        if(!content){return;}
        this.setState({
            content: {
                title: content.title,
                content: content.content,
                slug: content.slug,
                status: content.status,
                category_id: content.category_id,
                thumbnail_id: content.thumbnail_id,
                seo_keyword: content.seo_keyword,
                seo_description: content.seo_description,
                secret_published_password: content.secret_published_password
            }
        });
    }

    ajaxCategoryLoaded(content){
        if(!content){return;}
        this.setState({categories: content});
    }

    ajaxStatusesLoaded(content){
        if(!content){return;}
        this.setState({statuses: content});
    }

};