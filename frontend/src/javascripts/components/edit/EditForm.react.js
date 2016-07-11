import React, {Component, PropTypes} from 'react';
import NoteeActions from '../../actions/NoteeActions';
import EditImage  from './EditImage.react.js';
import EditNewCategory  from './EditNewCategory.react.js';

export default class EditForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            is_saving: false,
            display_image: false
        };

        this.saveContent = this.saveContent.bind(this);
        this.pushImage = this.pushImage.bind(this);
        this.insertImage = this.insertImage.bind(this);
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

        var statuses = this.props.statuses.map(function(status) {
            return <option key={status} value={status}>{status}</option>;
        });

        var categories = this.props.categories.map(function(category) {
            return <option key={category.id} value={category.id}>{category.name}</option>;
        });

        return (
            <div class="main">
                {(() => {
                    if (this.state.display_image) {
                        return (<EditImage imageInsert={this.insertImage} pushImage={this.pushImage}/>);
                    }
                })()}

                <div style={style.layout.half}>
                    <p>Title:</p>
                    <input
                        style={style.form.input_text}
                        type="text"
                        value={this.props.content.title}
                        onChange={this.props.handleChanges.title}
                    />
                    <p>Content:</p>
                    <button
                        style={style.form.image_button}
                        onClick={this.pushImage}>image</button>
                    <textarea
                        id="main_area"
                        style={style.form.main_area}
                        type="textarea"
                        value={this.props.content.content}
                        onChange={this.props.handleChanges.content}
                    />
                    <p>slug:</p>
                    <input
                        style={style.form.input_text}
                        type="text"
                        value={this.props.content.slug}
                        onChange={this.props.handleChanges.slug}
                    />
                    <p>status:</p>
                    <select
                        style={style.form.select}
                        type="select"
                        value={this.props.content.status}
                        onChange={this.props.handleChanges.status}>
                        {statuses}
                    </select>
                    <p>category:</p>
                    <select
                        style={style.form.select}
                        type="select"
                        value={this.props.content.category_id}
                        onChange={this.props.handleChanges.category_id}>
                        <option value="none">None</option>
                        {categories}
                    </select>

                    <EditNewCategory categories={this.props.categories} />

                    <p>seo_keyword:</p>
                    <input
                        style={style.form.input_text}
                        type="text"
                        value={this.props.content.seo_keyword}
                        onChange={this.props.handleChanges.seo_keyword}
                    />
                    <p>seo_description:</p>
                    <textarea
                        style={style.form.textarea}
                        type="textarea"
                        value={this.props.content.seo_description}
                        onChange={this.props.handleChanges.seo_description}
                    />
                    <button
                        style={style.form.button}
                        onClick={this.saveContent}>Submit</button>
                </div>
            </div>
        );
    }

    saveContent(e){
        if(this.props.params.id){
            var item = {params_id: this.props.params.id, content: this.state.content}
            NoteeActions.notee_update(item);
        }else{
            NoteeActions.notee_create(this.state.content);
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

    pushImage(e){
        switch (this.state.display_image){
            case true:
                this.setState({display_image: false});
                break;
            case false:
                this.setState({display_image: true});
                break;
        }
    }

    insertImage(image){
        var image_txt = "![](" + image + ")";
        var mainArea = document.getElementById('main_area');
        var leftPart = mainArea.value.substr(0, mainArea.selectionStart);
        var rightPart = mainArea.value.substr(mainArea.selectionStart, mainArea.value.length);
        mainArea.value = leftPart + image_txt + rightPart;
        this.props.content.content = mainArea.value;
        this.setState({display_image: false});
    }
};

