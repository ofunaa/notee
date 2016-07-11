import React, {Component, PropTypes} from 'react'
import NoteeActions from '../../actions/NoteeActions';
import NoteeStore from '../../stores/NoteeStore';

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

        var new_categories = []

        this.props.categories.map(function(category) {new_categories.push(category);});
        new_categories.unshift({id: null, name: "none"});
        var use_categories = new_categories.map(function(category, index) {
            return <option key={index} value={category.id}>{category.name}</option>;
        });

        var category_status = { content: ["published", "secret_published", "privated", "deleted"]}
        var statues = category_status.content.map(function(status) {
            return <option key={status} value={status}>{status}</option>;
        });

        return(
            <div>
                <p>Name:</p>
                <input
                    type="text"
                    value={this.state.new_category.name}
                    onChange={this.handleChangeNewCategoryName}
                />
                <p>Slug:</p>
                <input
                    type="text"
                    value={this.state.new_category.slug}
                    onChange={this.handleChangeNewCategorySlug}
                />
                <p>Parent_ID:</p>
                <select
                    type="select"
                    value={this.state.new_category.parent_id}
                    onChange={this.handleChangeNewCategoryParentId}>
                    {use_categories}
                </select>
                <p>Status:</p>
                <select
                    type="select"
                    value={this.state.new_category.status}
                    onChange={this.handleChangeNewCategoryStatus}>
                    {statues}
                </select>
                <button
                    onClick={this.pushCategory}>create Category</button>
            </div>
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
