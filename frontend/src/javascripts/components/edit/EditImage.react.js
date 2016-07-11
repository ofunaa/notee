import React, {Component, PropTypes} from "react"
import NoteeActions from '../../actions/NoteeActions'
import NoteeStore from '../../stores/NoteeStore';

var createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;

export default class Image extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: [],
            image_url: "",
            upload_file: null,
            tap_image: ""
        };
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.addImage = this.addImage.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.clickImage = this.clickImage.bind(this);
        this.setImages = this.setImages.bind(this);
        this.ajaxLoaded = this.ajaxLoaded.bind(this);
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
                main: {
                    width: "90%",
                    height: "90%",
                    float: "left",
                    position: "fixed",
                    zIndex: "100000",
                    backgroundColor: "rgba(30, 30, 30, 0.9)",
                    marginTop: "-80px",
                    overflowY: "scroll",
                    color: "white"
                },
                header: {
                    width: "100%",
                    height: "4%",
                    float: "left",
                    padding: "3%",
                    borderBottom: "1px solid #fff"
                },
                left: {
                    width: "55%",
                    height: "75%",
                    padding: "5%",
                    float: "left",
                    overflowY: "scroll"
                },
                right: {
                    width: "20%",
                    height: "80%",
                    padding: "5%",
                    float: "left",
                    borderLeft: "1px solid #fff"
                },
                image: {
                    width: "200px",
                    height: "auto",
                    float: "left",
                    marginRight: "10px",
                    marginBottom: "10px"
                },
                preview: {
                    width: "100%",
                    height: "auto"
                },
                close: {
                    float: "right",
                    marginRight: "10%"
                }
            }
        }

        return (
            <div style={style.image.main}>
                <div style={style.image.header}>
                    <input
                        type="file"
                        ref="image"
                        value={this.state.image}
                        onChange={this.handleChangeImage}
                    />
                    <button onClick={this.uploadImage}>Upload</button>
                    <button onClick={this.props.pushImage} style={style.image.close}>閉じる</button>
                </div>
                <div style={style.image.left}>
                    {this.state.images.map((image)=>{
                        return(
                            <img
                                key={image.id}
                                class={image.id}
                                src={window.location.origin + "/notee/" + image.content}
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
                        <button onClick={this.addImage}>Add</button>
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
        this.setState({image_src: ""});
        this.setState({upload_file: null});
    }

    addImage() {
        this.props.imageInsert(this.state.tap_image);
    }

    clickImage(e) {
        this.setState({tap_image: e.target.src});
    }

};
