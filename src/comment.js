import React from 'react';
import './index.css';
import ReactMarkdown from 'react-markdown';
import { SetContentCSS } from '.';

var content = SetContentCSS()
var HContent = content + " Horizontal"
var VContent = content + " vertical"

class Content extends React.Component {
	render() {
		var test = "Hello, *world* \r\n\r\n this is my first post check out"
		return (
			<div className="Post ContentMargin vertical">
				<ReactMarkdown>
					{test}
				</ReactMarkdown>
			</div>
		)
	}
}

class Footer extends React.Component {
	render() {
		return (
			<div className="Horizontal ContentMargin Start ">
				<div className="Start Horizontal">
					<i className="icofont-simple-smile icon"></i>
					<span className="iconnote">123</span>
					<i className="icofont-worried icon"></i>
					<span className="iconnote">123</span>
				</div>
				<button className="CommentButton">打赏</button>
				<button className="CommentButton">举报</button>
			</div>
		)
	}
}

export class CommentArea extends React.Component {
	render() {
		return (
			<div className={VContent + " ContentMargin"}>
				<div className={VContent}>
					<span className={HContent}>评论·Markdown</span>
					<span className="vdot"></span>
					<textarea className={content}></textarea>
					<span className="vdot"></span>
				</div>
				<span className="vdot"></span>
				<div className={HContent + " End ContentMargin"}>
					<button className="CommentButton">发表</button>
				</div>
				<span className="vdot"></span>
			</div>
		)
	}
}


class Header extends React.Component {
	render() {
		return (
			<div className="Horizontal Start ContentMargin">
				<img className="BIMG Small " src="logo192.png"></img>
				<span>Name</span>
				<span>time</span>
			</div>
		)
	}
}

export class Comments extends React.Component {
	render() {
		return (
			<div className="vertical grayAround">
				<Header />
				<Content />
				<Footer />
			</div>
		)
	}
}