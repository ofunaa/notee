import React, {Component, PropTypes} from 'react';
import NoteeActions from '../../actions/NoteeActions';
import NoteeConstants from '../../constants/NoteeConstants';
import NoteeStore from '../../stores/NoteeStore';
import EditForm  from './EditForm.react.js';
import EditPreview  from './EditPreview.react.js';
import Snackbar from 'material-ui/Snackbar';

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
            categories: [],
            snackbar_open: false,
            snackbar_txt: ""
        };

        this.ajaxLoaded = this.ajaxLoaded.bind(this);
        this.ajaxCategoryLoaded = this.ajaxCategoryLoaded.bind(this);
        this.setCategories = this.setCategories.bind(this);

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.handleChangeSlug = this.handleChangeSlug.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.handleChangeCategoryId = this.handleChangeCategoryId.bind(this);
        this.handleChangeSeoKeyword = this.handleChangeSeoKeyword.bind(this);
        this.handleChangeSeoDescription = this.handleChangeSeoDescription.bind(this);
        this.saveContent = this.saveContent.bind(this);
        this.saveFailed = this.saveFailed.bind(this);
        this.saveSuccessed = this.saveSuccessed.bind(this);
        this.displaySnackBar = this.displaySnackBar.bind(this);

        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    componentDidMount() {
        if(this.props.params.id){
            NoteeStore.loadNotee(this.props.params.id, this.ajaxLoaded);
        }
        this.setCategories();
        NoteeStore.addChangeListener(NoteeConstants.CATEGORY, this.setCategories);
        NoteeStore.addChangeListener(NoteeConstants.NOTEE, this.saveSuccessed);
        NoteeStore.addChangeListener(NoteeConstants.NOTEE_FAILED, this.saveFailed);
    }

    setCategories() {
        NoteeStore.loadAllCategories(this.ajaxCategoryLoaded);
    }

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
                seo_description: content.seo_description
            }
        });
    }


    ajaxCategoryLoaded(content){
        if(!content){return;}
        this.setState({categories: content});
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
            seo_keyword: this.handleChangeSeoKeyword,
            seo_description: this.handleChangeSeoDescription
        }

        return (
            <div class="main">
                <EditForm
                    content={this.state.content}
                    handleChanges={handleChanges}
                    statuses={this.props.statuses}
                    categories={this.state.categories}
                    ajaxLoaded={this.ajaxLoaded}
                    ajaxCategoryLoaded={this.ajaxCategoryLoaded}
                    saveContent={this.saveContent}
                />
                <EditPreview
                    style={style.layout.half}
                    content = {this.state.content}/>
                <Snackbar
                    open={this.state.snackbar_open}
                    message={this.state.snackbar_txt}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                    bodyStyle={{
                        backgroundColor: "rgba(0,0,0,0.8)"

                        }}
                />
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
        console.log(e.target.value);
        this.state.content.status = e.target.value;
        this.setState({ content: this.state.content });
    }
    handleChangeCategoryId(e) {
        this.state.content.category_id = e.target.value;
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
        }
    }

    saveSuccessed(){
        this.displaySnackBar("save success!");
        if(!this.props.params.id){
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

    saveFailed(){
        this.displaySnackBar("Sorry..! save Failed..!");
    }

    displaySnackBar(txt){
        this.setState({
            snackbar_open: true,
            snackbar_txt: txt
        });
    }

    handleRequestClose(){
        this.setState({
            snackbar_open: false
        });
    }



};

EditSection.defaultProps = {statuses: ["draft", "published", "secret_published", "privated", "deleted"]};
