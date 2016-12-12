import React, {Component, PropTypes} from 'react'

// actions
import CategoryActions from '../../actions/CategoryActions';

// stores
import CategoryStore from '../../stores/CategoryStore';

// constants
import Constants from '../../constants/NoteeConstants';

// components
import AuthorityButtonCreate from '../commons/authority/AuthorityButtonCreate.react.js';

// material-ui
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';

// utils
import EventUtil from '../../utils/EventUtil';


export default class CategoryForm extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            new_category: {
                name: "",
                slug: "",
                parent_id: null,
                is_private: false
            }
        }

        this.createCategory = this.createCategory.bind(this);

        // eventemit_callback for category
        this.saveSuccessed = this.saveSuccessed.bind(this);

        // handles
        this.handleChangeNewCategoryName = this.handleChangeNewCategoryName.bind(this);
        this.handleChangeNewCategorySlug = this.handleChangeNewCategorySlug.bind(this);
        this.handleChangeNewCategoryParentId = this.handleChangeNewCategoryParentId.bind(this);
        this.handleChangeNewCategoryIsPrivate = this.handleChangeNewCategoryIsPrivate.bind(this);
    }

    componentDidMount() {
        EventUtil.addChangeListener(Constants.CATEGORY_CREATE, this.saveSuccessed);
    }

    componentWillUnmount(){
        EventUtil.removeChangeListener(Constants.CATEGORY_CREATE, this.saveSuccessed);
    }

    render() {
        var use_categories = this.props.categories.map(function(category) {
            return <MenuItem key={category.id} value={category.id} primaryText={category.name} />;
        });

        return(
            <Card style={{paddingBottom: "50px"}}>
                <CardHeader title={<h3>Create New Category</h3>} />
                <CardText>
                    <TextField
                        hintText="Category Name"
                        type="text"
                        value={this.state.new_category.name}
                        onChange={this.handleChangeNewCategoryName}
                        className="mb_15"
                        style={{width: "80%"}}
                    />

                    <TextField
                        hintText="Slug"
                        type="text"
                        value={this.state.new_category.slug}
                        onChange={this.handleChangeNewCategorySlug}
                        className="mb_15"
                        style={{width: "80%"}}
                    />

                    <SelectField
                        value={this.state.new_category.parent_id}
                        onChange={(event, index, value) => this.handleChangeNewCategoryParentId(event, index, value)}
                        hintText="Parent Category ID"
                        className="mb_15"
                        style={{width: "80%"}}>

                        <MenuItem value={0} primaryText="None" />
                        {use_categories}
                    </SelectField>

                    <Checkbox
                        value={this.state.new_category.is_private}
                        onChange={(event, index, value) => this.handleChangeNewCategoryIsPrivate(event, index, value)}
                        label="this category is Privated?"
                        defaultChecked={false}
                    />

                    <AuthorityButtonCreate
                        modelName="Category"
                        now_user={this.props.now_user}
                        createMethod={this.createCategory}
                    />
                </CardText>
                
            </Card>
        );
    }

    createCategory(){
        if(this.state.new_category.name == ""){ return false; }
        CategoryActions.create(this.state.new_category);
    }

    saveSuccessed(){
        this.setState({
            new_category: {
                name: "",
                slug: "",
                parent_id: null,
                is_private: false
            }
        });
    }

    /////////////////////////////////////////////////
    //                   handles
    /////////////////////////////////////////////////

    handleChangeNewCategoryName(e) {
        this.state.new_category.name = e.target.value;
        this.setState({ new_category: this.state.new_category });
    }
    handleChangeNewCategorySlug(e){
        this.state.new_category.slug = e.target.value;
        this.setState({ new_category: this.state.new_category });
    }
    handleChangeNewCategoryParentId(event, index, value){
        this.state.new_category.parent_id = value;
        this.setState({ new_category: this.state.new_category });
    }
    handleChangeNewCategoryIsPrivate(event, index, value){
        this.state.new_category.is_private = value;
        this.setState({ new_category: this.state.new_category });
    }
}

