import React, {Component, PropTypes} from 'react'
import NoteeActions from '../../actions/NoteeActions';
import NoteeStore from '../../stores/NoteeStore';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class CategoryForm extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            new_category: {
                name: "",
                slug: "",
                parent_id: "",
                status: "published"
            }
        }

        this.pushCategory = this.pushCategory.bind(this);
        this.handleChangeNewCategoryName = this.handleChangeNewCategoryName.bind(this);
        this.handleChangeNewCategorySlug = this.handleChangeNewCategorySlug.bind(this);
        this.handleChangeNewCategoryParentId = this.handleChangeNewCategoryParentId.bind(this);
        this.handleChangeNewCategoryStatus = this.handleChangeNewCategoryStatus.bind(this);
    }

    render() {


        var use_categories =this.props.categories.map(function(category, index) {
            return <MenuItem key={index} value={category.id} primaryText={category.name} />;
        });

        var statues = ["published", "secret_published", "privated", "deleted"].map(function(status) {
            return <MenuItem key={status} value={status} primaryText={status}/>
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
                        onChange={this.handleChange}
                        hintText="Parent Category ID"
                        className="mb_15"
                        style={{width: "80%"}}>

                        <MenuItem value={1} primaryText="None" />
                        {use_categories}
                    </SelectField>

                    <SelectField
                        value={this.state.new_category.status}
                        onChange={this.handleChange}
                        hintText="Status"
                        className="mb_15"
                        style={{width: "80%"}}>

                        {statues}
                    </SelectField>

                    <RaisedButton
                        label="Create Category"
                        primary={true}
                        onClick={this.pushCategory}
                        className="mb_15"
                        style={{float: "right"}}/>
                </CardText>
            </Card>
        );
    }

    handleChangeNewCategoryName(e) {
        this.state.new_category.name = e.target.value;
        this.setState({ new_category: this.state.new_category });
    }
    handleChangeNewCategorySlug(e){
        this.state.new_category.slug = e.target.value;
        this.setState({ new_category: this.state.new_category });
    }
    handleChangeNewCategoryParentId(e){
        this.state.new_category.parent_id = e.target.value;
        this.setState({ new_category: this.state.new_category });
    }
    handleChangeNewCategoryStatus(e){
        this.state.new_category.status = e.target.value;
        this.setState({ new_category: this.state.new_category });
    }

    pushCategory(){

        if(this.state.new_category.name == ""){ return false; }

        NoteeActions.category_create(this.state.new_category);
        NoteeStore.loadAllCategories(this.props.ajaxLoad);
        this.setState({
            new_category: {
                name: "",
                slug: "",
                parent_id: "",
                status: "published"
            }
        });
    }
}
