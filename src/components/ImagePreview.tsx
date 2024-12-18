import React from "react";
import ReactDOM from "react-dom";
import "./index.css"

class ImagePreview extends React.Component<any, any> {
    static dom: any = null;

    static show = () => {
        ImagePreview.dom = document.createElement("div");
        ImagePreview.dom.className = "wrapper";
        document.body.appendChild(ImagePreview.dom);

        ReactDOM.render(
            <ImagePreview />,
            ImagePreview.dom
        );
    };
    render() {
        return (
            <div className="test">
            </div>
        );
    }
}

export default ImagePreview;