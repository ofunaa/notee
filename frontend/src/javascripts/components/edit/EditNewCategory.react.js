import React, {Component, PropTypes} from 'react';

// notee
import NoteeActions from '../../actions/NoteeActions';
import NoteeConstants from '../../constants/NoteeConstants';
import NoteeStore from '../../stores/NoteeStore';

// material-ui
import Checkbox from 'material-ui/Checkbox';

export default class EditNewCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            create_category: false,
            new_category: {
                name: "",
                slug: "",
                parent_id: "",
                is_private: false
            }
        };

        this.openCategoryForm = this.openCategoryForm.bind(this);
        this.createCategory = this.createCategory.bind(this);

        this.handleChangeNewCategoryName = this.handleChangeNewCategoryName.bind(this);
        this.handleChangeNewCategorySlug = this.handleChangeNewCategorySlug.bind(this);
        this.handleChangeNewCategoryParentId = this.handleChangeNewCategoryParentId.bind(this);
        this.handleChangeNewCategoryIsPrivate = this.handleChangeNewCategoryIsPrivate.bind(this);

        // eventemit_callback for category
        this.saveCategoryFailed = this.saveCategoryFailed.bind(this);
        this.saveCategorySuccessed = this.saveCategorySuccessed.bind(this);

    }

    componentDidMount() {
        NoteeStore.addChangeListener(NoteeConstants.CATEGORY_CREATE, this.saveCategorySuccessed);
        NoteeStore.addChangeListener(NoteeConstants.CATEGORY_CREATE_FAILED, this.saveCategoryFailed);
    }

    render() {


        var use_categories = this.props.categories.map(function(category) {
            return <option key={category.id} value={category.id}>{category.name}</option>;
        });


        return (
            <div>
                <button
                    onClick={this.openCategoryForm}>create category?</button>

                    {(() => {

                        var style = {
                            form: {
                                new_category: {
                                    backgroundColor: "#dcdcdc",
                                    padding: "5px"
                                },
                                input_text: {
                                    width: "100%",
                                    height: "30px",
                                    marginBottom: "10px"
                                },
                                select: {
                                    height: "30px",
                                    marginBottom: "10px",
                                    width: "100%"
                                },
                                button: {
                                    width: "100%",
                                    height: "50px",
                                    marginBottom: "10px"
                                }
                            }
                        }

                        if (this.state.create_category) {

                            return (
                                <div style={style.form.new_category}>
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
                                    <Checkbox
                                        value={this.state.new_category.is_private}
                                        onChange={(event, index, value) => this.handleChangeNewCategoryIsPrivate(event, index, value)}
                                        label="this category is Privated?"
                                        defaultChecked={false}
                                    />
                                    <button
                                        style={style.image_button}
                                        onClick={this.createCategory}>create Category</button>
                                </div>
                            );
                        }
                    })()}
            </div>
        );
    }

    openCategoryForm(){
        this.setState({create_category: !this.state.create_category});
    }

    createCategory(){
        if(this.state.new_category.name){
            NoteeActions.category_create(this.state.new_category);
        }
    }

    saveCategorySuccessed(){
        this.props.displaySnackBar("Create New Category!");
        this.setState({create_category: false});
        this.setState({
            new_category: {
                name: "",
                slug: "",
                parent_id: "",
                is_private: false
            }
        });
    }

    saveCategoryFailed(){
        this.props.displaySnackBar("Sorry..! Save Failed..!");
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
    handleChangeNewCategoryIsPrivate(event, index, value){
        this.state.new_category.is_private = value;
        this.setState({ new_category: this.state.new_category });
    }
};
