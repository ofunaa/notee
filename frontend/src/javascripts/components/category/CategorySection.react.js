import React, {Component, PropTypes} from 'react'
import NoteeActions from '../../actions/NoteeActions';
import NoteeStore from '../../stores/NoteeStore';
import { Link } from "react-router"

export default class CategorySection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            new_category: {
                name: "",
                slug: "",
                parent_id: "",
                status: "published"
            }
        };

        this.ajaxCategoryLoaded = this.ajaxCategoryLoaded.bind(this);
        this.pushCategory = this.pushCategory.bind(this);
        this.createCategory = this.createCategory.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);

        this.handleChangeNewCategoryName = this.handleChangeNewCategoryName.bind(this);
        this.handleChangeNewCategorySlug = this.handleChangeNewCategorySlug.bind(this);
        this.handleChangeNewCategoryParentId = this.handleChangeNewCategoryParentId.bind(this);
        this.handleChangeNewCategoryStatus = this.handleChangeNewCategoryStatus.bind(this);

    }

    componentDidMount() {
        NoteeStore.loadAllCategories(this.ajaxCategoryLoaded);
    }

    ajaxCategoryLoaded(content){
        this.setState({
            categories: content
        })
    }

    render() {

        var style = {
            layout: {
                half: {
                    width: "48%",
                    maxWidth: "48%",
                    marginRight: "1%",
                    marginLeft: "1%",
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
            }
        }

        var new_categories = []

        this.state.categories.map(function(category) {new_categories.push(category);});
        new_categories.unshift({id: null, name: "none"});
        var use_categories = new_categories.map(function(category, index) {
            return <option key={index} value={category.id}>{category.name}</option>;
        });

        var category_status = { content: ["published", "secret_published", "privated", "deleted"]}
        var statues = category_status.content.map(function(status) {
            return <option key={status} value={status}>{status}</option>;
        });

        return (
            <div class="main">
                <Link to='/notee/new' >new</Link>
                <Link to='/notee/category' >category</Link>
                <Link to='/notee/image' >image</Link>
                <div>
                    <p>Name:</p>
                    <input
                        style={style.form.input_text}
                        type="text"
                        value={this.state.new_category.name}
                        onChange={this.handleChangeNewCategoryName}
                    />
                    <p>Slug:</p>
                    <input
                        style={style.form.input_text}
                        type="text"
                        value={this.state.new_category.slug}
                        onChange={this.handleChangeNewCategorySlug}
                    />
                    <p>Parent_ID:</p>
                    <select
                        style={style.form.select}
                        type="select"
                        value={this.state.new_category.parent_id}
                        onChange={this.handleChangeNewCategoryParentId}>
                        {use_categories}
                    </select>
                    <p>Status:</p>
                    <select
                        style={style.form.select}
                        type="select"
                        value={this.state.new_category.status}
                        onChange={this.handleChangeNewCategoryStatus}>
                        {statues}
                    </select>
                    <button
                        style={style.image_button}
                        onClick={this.pushCategory}>create Category</button>
                </div>
                <div>
                    {this.state.categories.map((category)=>{
                        return(
                            <div key={category.id}>
                                <p>-----------------------</p>
                                <p>id: {category.id}</p>
                                <p>name: {category.name}</p>
                                <p>slug: {category.slug}</p>
                                <p>parent_id: {category.parent_id}</p>
                                <p>status: {category.status}</p>
                                <button id={category.id} onClick={this.deleteCategory}>create Category</button>
                            </div>
                        );
                    })}
                </div>
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

    createCategory(){
        this.setState({create_category: true});
    }

    pushCategory(){
        NoteeActions.category_create(this.state.new_category);
        NoteeStore.loadAllCategories(this.ajaxCategoryLoaded);
        this.setState({create_category: false});
    }

    deleteCategory(e){
        console.log(e.target.id);
        NoteeActions.category_delete(e.target.id);
        NoteeStore.loadAllCategories(this.ajaxCategoryLoaded);
    }
};
