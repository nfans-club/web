import React from 'react';
import { SetContentCSS } from '.';
import './index.css';
import './icofont.css';

var content = SetContentCSS()
var HContent = content + " Horizontal"
var VContent = content + " vertical"

class Title extends React.Component {

	render() {
		return (
			<div className={HContent + " Header"}>
				<h3>Create a post</h3>
				<input placeholder="Choose a community"></input>
			</div>
		)
	}
}

class TextContext extends React.Component {
	render() {
		return (
			<div className={VContent}>
				<input placeholder='Title' className={content}></input>
				<div className={VContent}>
					<span className={HContent}>Markdown</span>
					<textarea className={content}></textarea>
				</div>
				<div className="Start">
					<button className="TagButton" >NSFW</button>
					<button className="TagButton">剧透</button>
				</div>
				<div className={HContent + " End"}>
					<button>保存</button>
					<span className="dot"></span>
					<button>发表</button>
				</div>
			</div>
		)
	}
}



export class CreatePost extends React.Component {
	render() {
		return (

			<div className="Content ContentMargin grayAround">
				<div className="Content ContentMargin vertical">
					<Title />
					<TextContext />
				</div>
			</div>
		)
	}
}