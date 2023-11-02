import React from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as ArticleApi from '../api/ArticleApi.js';
import "cropperjs/dist/cropper.min.css"
import ImageCropper from "./ImageCropper";
import {Navigate} from 'react-router-dom';
import "./Articles.css";
import Cookies from 'js-cookie';
var Buffer = require('buffer/').Buffer

export default class ArticlesEditor extends React.Component{

    
        constructor(props)
    {
        super(props);
        let role = Cookies.get('role');
        let AuthWord = true;
        if(role!="editor")
        {
            AuthWord=false;
        }
        
    
   
        this.state = {
            Auth:AuthWord,
            articlePopup: false,
            title: "",
            thumb: null,
            thumb_cropped: null,
            disableButtons: false,
            childKey: true
        }
        this.imageElement = React.createRef();
        this.cropper = React.createRef();
        this.cropHandler = this.cropHandler.bind(this);
       
    }


    submitArticle(){
        //let buf = Buffer.alloc(9);
        //this.state.thumb_cropped.height = 250;
        //this.state.thumb_cropped.width = 250;
        var canvas = document.createElement("canvas");
        canvas.height = 250;
        canvas.width = 250;
        //this.state.thumb_cropped.toBlob( (cropped_blob) =>{
            canvas.getContext("2d").drawImage(this.state.thumb_cropped, 0, 0, 250, 250);
            var dataurl = canvas.toDataURL();
            this.setState({disableButtons: true});
            let editor = document.querySelector( '.ck-editor__editable' ).ckeditorInstance;
            /*
            const reader = new FileReader();
            //console.log("Cropped: ");
            //console.log(this.state.thumb_cropped);
            reader.readAsDataURL(cropped_blob);
            console.log(typeof(editor.getData()));
            reader.onload = () => {

                /*buf.writeUInt8(this.state.title.length);
                buf.writeUInt32BE(editor.getData().length);
                buf.writeUInt32BE(reader.result.length);
                buf.write(this.state.title);
                buf.write(editor.getData());
                buf.write(reader.result);

                ArticleApi.postArticle(Blob(buf)).then(response => {*//*
                ArticleApi.postArticle({title: this.state.title, file: editor.getData(), thumbnail: dataurl.toString('base64')}).then(response => {
                    if (response.status === 200) {
                    alert(response.data);
                    }
                });
                this.setState({disableButtons: false});
            }
            reader.onerror = () => {this.setState({disableButtons: false});}*/

            ArticleApi.postArticle({title: this.state.title, file: editor.getData(), thumbnail: dataurl.toString('base64')}).then(response => {
                if (response.status === 200) {
                alert(response.data);
                }
            });
            this.setState({disableButtons: false});
            this.changePopup();
            editor.setData("");
            alert(`Dodano artykul ${this.state.title}`);
        //})
    }

    changePopup(){
        this.setState({articlePopup: !this.state.articlePopup});
    }

    handleFileChange = (e) => {
        if (e.target.files) {
          //if (this.state.thumb)
          //{
            //this.setState({thumb: e.target.files[0]});
            //this.cropper.current.updateSource(URL.createObjectURL(this.state.thumb));
            //console.log(e.target.files);
          //}
          //else
          //{
            this.setState({thumb: e.target.files[0],
                childKey: !this.state.childKey});
          //}
          //this.setState({thumb_cropped: e.target.files[0]});
        }
      };
    
    cropHandler(image){
        this.setState({thumb_cropped: image});
    }


    render (){
        if(this.state.Auth==false)
        {
            return("Musisz być zalogowany jako editor");
        }
        else
        {
        return (
            <div className="App">
                <h2>Using CKEditor 5 build in React</h2>
                <CKEditor
                    editor={ ClassicEditor }
                    data=""
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
                <button onClick={(event) => this.changePopup()}>Popup</button>

                {this.state.articlePopup && (<div className="overlay">
                    <div className="articlePopup">
                        <form>
                        Tytuł: <input type="text" name="title" value={this.state.title} required minLength="1" onChange={(e) => {this.setState({title: e.target.value})}}/>
                        
                        <input type="file" required onChange={this.handleFileChange} />

                        {this.state.thumb && (
                        <div>
                            <ImageCropper ref={this.cropper} src={URL.createObjectURL(this.state.thumb)} handler={this.cropHandler} key={this.state.childKey}/>
                            {false && (`${this.state.thumb.name} - ${this.state.thumb.type}`)}
                        </div>)}

                        <div>
                            
                            <button onClick={(event) => {this.changePopup(); this.setState({thumb: null, thumb_cropped: null})}} disabled={this.state.disableButtons}>Back to editor</button>
                            <button onClick={(event) => this.submitArticle()} disabled={this.state.disableButtons}>Upload</button>
                        </div>
                        </form>
                        
                    </div>
                </div>
                )}
            </div>
        );
    }
}

}