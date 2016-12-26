import React, {Component, PropTypes} from 'react';

// actions
import CategoryActions from '../../actions/CategoryActions';

// stores
import CategoryStore from '../../stores/CategoryStore';
import UserStore from '../../stores/UserStore';

// material-ui
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';

// utils
import AuthorityUtil from '../../utils/AuthorityUtil';

export default class CategorySectionEdit extends Component {

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
            now_user: "",
            restrict_parent_ids: []
        };

        // ajax
        this.ajaxLoaded = this.ajaxLoaded.bind(this);
        this.ajaxCategoryLoaded = this.ajaxCategoryLoaded.bind(this);
        this.ajaxNowUserLoaded = this.ajaxNowUserLoaded.bind(this);
        this.ajaxRestrictParentIds = this.ajaxRestrictParentIds.bind(this);

        // eventemit_callback for user
        this.updateContent = this.updateContent.bind(this);

        // handles
        this.handleChangeCategoryName = this.handleChangeCategoryName.bind(this);
        this.handleChangeCategorySlug = this.handleChangeCategorySlug.bind(this);
        this.handleChangeCategoryParentId = this.handleChangeCategoryParentId.bind(this);
        this.handleChangeCategoryIsPrivate = this.handleChangeCategoryIsPrivate.bind(this);

    }

    componentWillMount() {
        if(this.props.params.id){
            CategoryStore.loadCategory(this.props.params.id, this.ajaxLoaded);
            CategoryStore.loadRestrictParentIds(this.props.params.id, this.ajaxRestrictParentIds);
        }
        CategoryStore.loadCategories(this.ajaxCategoryLoaded);
        UserStore.loadUserByToken(this.ajaxNowUserLoaded);
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

    ajaxCategoryLoaded(content){
        this.setState({categories: content});
    }

    ajaxNowUserLoaded(content) {
        this.setState({now_user: content});
    }

    ajaxRestrictParentIds(content) {
        this.setState({restrict_parent_ids: content});
    }

    render() {

        AuthorityUtil.checkAuthority("CategorySectionEdit", this.state.now_user);

        var restrict_parent_ids = this.state.restrict_parent_ids;
        var use_categories = this.state.categories.map(function(category) {

            // restrict parent id
            if(!restrict_parent_ids.includes(category.id)){
                return <MenuItem key={category.id} value={category.id} primaryText={category.name} />;
            }else{
                return <MenuItem key={category.id} value={category.id} primaryText={category.name} disabled={true} />;
            }
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
            CategoryActions.update(item);
        }
    }

};
