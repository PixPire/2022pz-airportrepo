import React from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
//import "./imagecropper.css";

class ImageCropper extends React.Component {

    constructor() {
        super();
        this.imageElement = React.createRef();
    }

    componentDidMount() {
        const cropper = new Cropper(this.imageElement.current, {
            zoomable: false,
            scalable: false,
            aspectRatio: 1,
            crop: () => {
                const canvas = cropper.getCroppedCanvas();
                this.props.handler(canvas);
            }
        });
    }
    

    render() {
        return (
            <div>
                <div>
                    <img height="250px" ref={this.imageElement} src={this.props.src} alt="Source"/>
                </div>
            </div>
        );
    }

}

export default ImageCropper;
