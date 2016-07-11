import React, {Component, PropTypes} from "react"
import NoteeActions from '../../actions/NoteeActions'
import NoteeStore from '../../stores/NoteeStore';
import { Link } from "react-router"

var createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;

export default class ImageSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: [],
            image_url: "",
            upload_file: null,
            tap_image: ""
        };
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.clickImage = this.clickImage.bind(this);
        this.setImages = this.setImages.bind(this);
        this.ajaxLoaded = this.ajaxLoaded.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
    }

    componentDidMount() {
        this.setImages();
        NoteeStore.addChangeListener(this.setImages);
    }

    ajaxLoaded(content){
        this.setState({images: content});
    }

    setImages() {
        NoteeStore.loadAllImages(this.ajaxLoaded);
    }

    render() {

        var style = {
            image: {
                header: {
                    width: "100%",
                    height: "10%",
                    float: "left",
                    backgroundColor: "rgba(255, 255, 255, 0.9)"
                },
                left: {
                    width: "70%",
                    height: "80%",
                    paddingTop: "30px",
                    float: "left",
                    overflowY: "scroll"
                },
                right: {
                    width: "30%",
                    height: "90%",
                    float: "left"
                },
                image: {
                    width: "200px",
                    height: "auto",
                    float: "left",
                    marginRight: "10px",
                    marginBottom: "10px"
                },
                preview: {
                    width: "90%",
                    height: "auto",
                    marginLeft: "5%",
                    paddingTop: "30px",
                    float: "left"
                }
            },

            form: {
                input_file: {

                },
                button: {

                }
            }
        }

        return (
            <div style={style.image.main}>
                <Link to='/notee/new' >new</Link>
                <Link to='/notee/category' >category</Link>
                <Link to='/notee/image' >image</Link>
                <div style={style.image.header}>
                    <input
                        style={style.form.input_file}
                        type="file"
                        ref="image"
                        value={this.state.image}
                        onChange={this.handleChangeImage}
                    />
                    <button
                        style={style.form.button}
                        onClick={this.uploadImage}>Upload</button>
                </div>
                <div style={style.image.left}>
                    {this.state.images.map((image)=>{
                        return(
                            <img
                                key={image.id}
                                class={image.id}
                                src={image.content}
                                style={style.image.image}
                                onClick={this.clickImage}
                            />
                        );
                    })}
                </div>
                <div style={style.image.right}>
                    <div>
                        <img style={style.image.preview} src={this.state.tap_image} />
                    </div>
                    <div>
                        <button
                            style={style.form.button}
                            onClick={this.deleteImage}>Delete</button>
                    </div>
                </div>
            </div>
        );
    }

    handleChangeImage(e) {
        var files = e.target.files;
        var image_url = createObjectURL(files[0]);
        this.setState({image_src: image_url});
        this.setState({upload_file: files[0]});
    }

    uploadImage() {
        NoteeActions.image_create(this.state.upload_file);
        this.setState({
            image_src: "",
            upload_file: null,
            image: null
        });
    }

    clickImage(e) {
        this.setState({tap_image: e.target.src});
    }
    
    deleteImage() {
        NoteeActions.image_delete(this.state.tap_image);
        this.setState({tap_image: ""});
        this.setImages();
    }

};
