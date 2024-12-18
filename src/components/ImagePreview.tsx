import React from "react";
import ReactDOM from 'react-dom/client';
import "./index.css"

class ImagePreview extends React.Component<any, any> {
    static dom: any = null;

    static show = () => {
        ImagePreview.dom = document.createElement("div");
        ImagePreview.dom.className = "wrapper";
        document.body.appendChild(ImagePreview.dom);

        const root = ReactDOM.createRoot(
            ImagePreview.dom
        );
        root.render(<ImagePreview />)

    };

    static close = () => {
        if (ImagePreview.dom) {
            if (ImagePreview.dom.remove) {
                ImagePreview.dom.remove();
            } else {
                document.body.removeChild(ImagePreview.dom);
            }
            ImagePreview.dom = null;
        }
    };

    render() {
        return (
            <div className="test">
            </div>
        );
    }
}

export default ImagePreview;