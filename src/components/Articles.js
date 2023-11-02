import React from "react";
import "./Articles.css";
import * as ArticleApi from '../api/ArticleApi.js';
var Buffer = require('buffer/').Buffer
var parse = require('html-react-parser');

export default class Articles extends React.Component{
    //constructor(props) {
    //    super(props);
    //    this.articleContent = React.createRef();
    //}

    state = {
        drawIndex : null,
        articles : [],
        article_body : ""
    }

    articleOnClick(index){
        this.setState({drawIndex : index});
        ArticleApi.getArticleBody(this.state.articles[index].id).then(response =>{
            this.setState({article_body: Buffer.from(response.file).toString()});
        });
    }

    componentDidMount() {
        /*ArticleApi.getArticleThumbs().then(result => {
            //this.state.articles = result;
            let receivedBuf = Buffer.from(result);
            let receivedLen = receivedBuf.readUint8(0);
            console.log(receivedBuf);
            console.log(receivedLen);
            let dataOffset = 1;
            let titleSize = 0;
            let thumbSize = 0;
            this.state.articles = new Array();
            for (let i=0; i<receivedLen; i++)
            {
                console.log("Buffer length:");
                console.log(receivedBuf.length);
                console.log("Data offset:");
                console.log(dataOffset);
                titleSize = receivedBuf.readUint8(dataOffset);
                console.log("titleSize:");
                console.log(titleSize);
                thumbSize = receivedBuf.readUint32BE(dataOffset + 1);
                console.log("thumbSize:");
                console.log(thumbSize);

                this.state.articles.concat([this.state.articles, [{
                    title: receivedBuf.toString('utf8', dataOffset + 5, dataOffset + 5 + titleSize),
                    thumbnail: new Blob([receivedBuf.slice(dataOffset + 5 + titleSize, dataOffset + 5 + titleSize + thumbSize)])
                }]])
                console.log(receivedBuf.toString('utf8', dataOffset + 5, dataOffset + 5 + titleSize));
                console.log(this.state.articles);
                dataOffset = dataOffset + 5 + titleSize + thumbSize;
            }
            this.setState();
            //this.setState({articles: result});
        })*/

        ArticleApi.getArticleThumbs().then(result => {

            console.log(result.length);
            
            for (let i=0; i<result.length; i++)
            {
                result[i].thumbnail = Buffer.from(result[i].thumbnail).toString();
            }

            this.setState({articles: result});
            //this.setState({articles: result});
        })
    }

    render (){
        let jsxList = []

        if (this.state.drawIndex == null){
            let size = this.state.articles.length;
            let url = ""

            for (let i = 0; i < size; i++)
            {
                //url = URL.createObjectURL(this.state.articles[i].thumbnail);
                url = '9f5.gif';
                console.log(url);
                jsxList.push(
                    <div class = 'articleDiv' style={{width:"250px", height:"270px", margin:"5px"}}>
                        <img src={this.state.articles[i].thumbnail} width="250" height="250" alt="img not found" onClick={(event) => this.articleOnClick(i)}/>
                        <p1 style={{display: "block"}}>{this.state.articles[i].title}</p1>
                    </div>
                );
                //console.log(typeof(this.state.articles[i].thumbnail));
            }
        }
        else
        {
            jsxList.push(parse(this.state.article_body));
            jsxList.push(<button class='goBackButton' onClick={(event) => this.setState({drawIndex : null})}>Go back</button>);
        }

        return jsxList
    }

}