import React, {Component, PropTypes} from 'react'

// notee
import Constants from '../../constants/NoteeConstants'
import CategoryActions from '../../actions/CategoryActions'
import CategoryStore from '../../stores/CategoryStore'

// material-ui
import Snackbar from 'material-ui/Snackbar'
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';

export default class CategoryEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            category: {
                name: "",
                slug: "",
                parent_id: "",
                is_private: ""
            },
            snackbar_open: false,
            snackbar_txt: ""
        };

        // ajax
        this.ajaxLoaded = this.ajaxLoaded.bind(this);
        this.ajaxCategoryLoaded = this.ajaxCategoryLoaded.bind(this);

        // eventemit_callback for user
        this.updateFailed = this.updateFailed.bind(this);
        this.updateSuccessed = this.updateSuccessed.bind(this);
        this.updateContent = this.updateContent.bind(this);

        // snackbar
        this.displaySnackBar = this.displaySnackBar.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);

        // handles
        this.handleChangeCategoryName = this.handleChangeCategoryName.bind(this);
        this.handleChangeCategorySlug = this.handleChangeCategorySlug.bind(this);
        this.handleChangeCategoryParentId = this.handleChangeCategoryParentId.bind(this);
        this.handleChangeCategoryIsPrivate = this.handleChangeCategoryIsPrivate.bind(this);


    }

    componentWillMount() {
        if(this.props.params.id){
            CategoryStore.loadCategory(this.props.params.id, this.ajaxLoaded);
        }
        CategoryStore.loadAllCategories(this.ajaxCategoryLoaded);
        CategoryStore.addChangeListener(Constants.CATEGORY_UPDATE, this.updateSuccessed);
        CategoryStore.addChangeListener(Constants.CATEGORY_UPDATE_FAILED, this.updateFailed);
    }

    ajaxCategoryLoaded(content){
        this.setState({categories: content});
    }

    render() {

        var use_categories = this.state.categories.map(function(category) {
            return <MenuItem key={category.id} value={category.id} primaryText={category.name} />;
        });

        var style = {
            layout: {
                main: {
                    width: "96%",
                    maxWidth: "96%",
                    marginRight: "2%",
                    marginLeft: "2%",
                    float: "left"
                }
            },
            form: {
                main_area: {
                    width: "100%",
                    height: "300px",
                    marginBottom: "10px"
                },
                input_text: {
                    width: "100%",
                    height: "30px",
                    marginBottom: "10px"
                },
                select: {
                    width: "100%",
                    height: "30px",
                    marginBottom: "10px"
                },
                textarea: {
                    width: "100%",
                    height: "80px",
                    marginBottom: "10px"
                },
                button: {
                    width: "100%",
                    height: "50px",
                    marginBottom: "10px"
                },
                image_button: {
                    width: "30%",
                    height: "50px",
                    marginBottom: "10px"
                }
                ,
                thumbnail: {
                    width: "100%",
                    height: "auto",
                    marginBottom: "10px"
                }
            }
        }

        return (
            <div style={style.layout.main}>
                <div style={{float: "left", width: "100%"}}>
                    <TextField
                        hintText="Category Name"
                        type="text"
                        value={this.state.category.name}
                        onChange={this.handleChangeCategoryName}
                        className="mb_15"
                        style={{width: "80%"}}
                    />

                    <TextField
                        hintText="Slug"
                        type="text"
                        value={this.state.category.slug}
                        onChange={this.handleChangeCategorySlug}
                        className="mb_15"
                        style={{width: "80%"}}
                    />

                    <SelectField
                        value={this.state.category.parent_id}
                        onChange={(event, index, value) => this.handleChangeCategoryParentId(event, index, value)}
                        hintText="Parent Category ID"
                        className="mb_15"
                        style={{width: "80%"}}>

                        <MenuItem value={0} primaryText="None" />
                        {use_categories}
                    </SelectField>

                    <Checkbox
                        value={this.state.category.is_private}
                        onChange={(event, index, value) => this.handleChangeCategoryIsPrivate(event, index, value)}
                        label="this category is Privated?"
                        defaultChecked={false}
                    />

                    <RaisedButton
                        label="Update Category"
                        primary={true}
                        onClick={this.updateContent}
                        className="mb_15"
                        style={{float: "right"}}/>
                </div>

                <Snackbar
                    open={this.state.snackbar_open}
                    message={this.state.snackbar_txt}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                    bodyStyle={{backgroundColor: "rgba(0,0,0,0.8)"}}
                />
            </div>
        );
    }

    /////////////////////////////////////////////////
    //                   handles
    /////////////////////////////////////////////////

    handleChangeCategoryName(e) {
        this.state.category.name = e.target.value;
        this.setState({ category: this.state.category });
    }
    handleChangeCategorySlug(e){
        this.state.category.slug = e.target.value;
        this.setState({ category: this.state.category });
    }
    handleChangeCategoryParentId(event, index, value){
        this.state.category.parent_id = value;
        this.setState({ category: this.state.category });
    }
    handleChangeCategoryIsPrivate(event, index, value){
        this.state.category.is_private = value;
        this.setState({ category: this.state.category });
    }

    updateContent(e){
        if(this.props.params.id){
            var item = {params_id: this.props.params.id, category: this.state.category}
            CategoryActions.category_update(item);
        }
    }

    updateSuccessed(){
        this.displaySnackBar("Update Category!");
    }

    updateFailed(){
        this.displaySnackBar("Sorry..! Update Failed..!");
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

    // ajax
    ajaxLoaded(content){
        if(!content){return;}
        this.setState({
            category: {
                name: content.name,
                slug: content.slug,
                parent_id: content.parent_id,
                is_private: content.is_private
            }
        });
    }

};
