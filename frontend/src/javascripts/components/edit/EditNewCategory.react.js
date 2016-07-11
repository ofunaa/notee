import React, {Component, PropTypes} from 'react';
import NoteeActions from '../../actions/NoteeActions';
import NoteeStore from '../../stores/NoteeStore';

export default class EditNewCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            create_category: false,
            new_category: {
                name: "",
                slug: "",
                parent_id: "",
                status: "published"
            }
        };

        this.pushCategory = this.pushCategory.bind(this);
        this.createCategory = this.createCategory.bind(this);

        this.handleChangeNewCategoryName = this.handleChangeNewCategoryName.bind(this);
        this.handleChangeNewCategorySlug = this.handleChangeNewCategorySlug.bind(this);
        this.handleChangeNewCategoryParentId = this.handleChangeNewCategoryParentId.bind(this);
        this.handleChangeNewCategoryStatus = this.handleChangeNewCategoryStatus.bind(this);

    }

    render() {


        var use_categories = this.props.categories.map(function(category) {
            return <option key={category.id} value={category.id}>{category.name}</option>;
        });


        return (
            <div>
                <button
                    style={style.form.button}
                    onClick={this.createCategory}>create category?</button>
                
                    {(() => {

                        var style = {
                            form: {
                                input_text: {
                                    width: "100%",
                                    height: "30px",
                                    marginBottom: "10px"
                                },
                                select: {
                                    height: "30px",
                                    marginBottom: "10px"
                                },
                                button: {
                                    width: "100%",
                                    height: "50px",
                                    marginBottom: "10px"
                                }
                            }
                        }

                        if (this.state.create_category) {

                            var category_status = { content: ["published", "secret_published", "privated", "deleted"]}
                            var statues = category_status.content.map(function(status) {
                                return <option key={status} value={status}>{status}</option>;
                            });

                            return (
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
                                        <option value="none">None</option>
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
                            );
                        }
                    })()}
            </div>
        );
    }
    

    createCategory(){
        this.setState({create_category: true});
    }

    pushCategory(){
        NoteeActions.category_create(this.state.new_category);
        NoteeStore.loadAllCategories(this.ajaxCategoryLoaded);
        this.setState({create_category: false});
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
};
