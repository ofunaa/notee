import React, {Component, PropTypes} from 'react'
import NoteeActions from '../../actions/NoteeActions';
import NoteeStore from '../../stores/NoteeStore';
import Preview  from './Preview.react'
import Image  from './Image.react'


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
            is_saving: false,
            display_image: false
        };

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.handleChangeSlug = this.handleChangeSlug.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.handleChangeSeoKeyword = this.handleChangeSeoKeyword.bind(this);
        this.handleChangeSeoDescription = this.handleChangeSeoDescription.bind(this);
        this.saveContent = this.saveContent.bind(this);
        this.ajaxLoaded = this.ajaxLoaded.bind(this);
        this.pushImage = this.pushImage.bind(this);
        this.insertImage = this.insertImage.bind(this);

    }

    componentDidMount() {
        if(this.props.params.id){
            NoteeStore.loadNotee(this.props.params.id, this.ajaxLoaded);
        }
    }

    ajaxLoaded(content){
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

        var statues = this.props.statuses.map(function(status) {
            return <option key={status} value={status}>{status}</option>;
        });

        return (
            <div class="main">
                {(() => {
                    if (this.state.display_image) {

                        var style = {
                            image_button: {
                                right: "30px",
                                top: "30px",
                                position: "fixed",
                                zIndex: "101"
                            }
                        }

                        return (
                            <div>
                                <Image imageInsert={this.insertImage} />
                                <button
                                style={style.image_button}
                                onClick={this.pushImage}>閉じる</button>
                            </div>
                        );
                    }
                })()}

                <div style={style.layout.half}>
                    <p>Title:</p>
                    <input
                        style={style.form.input_text}
                        type="text"
                        value={this.state.content.title}
                        onChange={this.handleChangeTitle}
                    />
                    <p>Content:</p>
                    <button
                        style={style.form.image_button}
                        onClick={this.pushImage}>image</button>
                    <textarea
                        id="main_area"
                        style={style.form.main_area}
                        type="textarea"
                        value={this.state.content.content}
                        onChange={this.handleChangeContent}
                    />
                    <p>slug:</p>
                    <input
                        style={style.form.input_text}
                        type="text"
                        value={this.state.content.slug}
                        onChange={this.handleChangeSlug}
                    />
                    <p>status:</p>
                    <select
                        style={style.form.select}
                        type="select"
                        value={this.state.content.status}
                        onChange={this.handleChangeStatus}>
                        {statues}
                    </select>
                    <p>seo_keyword:</p>
                    <input
                        style={style.form.input_text}
                        type="text"
                        value={this.state.content.seo_keyword}
                        onChange={this.handleChangeSeoKeyword}
                    />
                    <p>seo_description:</p>
                    <textarea
                        style={style.form.textarea}
                        type="textarea"
                        value={this.state.content.seo_description}
                        onChange={this.handleChangeSeoDescription}
                    />
                    <button
                        style={style.form.button}
                        onClick={this.saveContent}>Submit</button>
                </div>
                <Preview
                    style={style.layout.half}
                    content = {this.state.content}/>
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
        this.state.content.status = e.target.value;
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
        this.state.content.content = mainArea.value;
        this.setState({ content: this.state.content });
        this.setState({display_image: false});
    }
};

EditSection.defaultProps = {statuses: ["draft", "published", "secret_published", "privated", "deleted"]};
