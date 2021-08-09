import React from 'react';
import './index.css';
import ReactMarkdown from 'react-markdown';
import { SetContentCSS } from '.';
import axios from 'axios';
import cookie from 'react-cookies'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

var content = SetContentCSS()
var HContent = content + " Horizontal"
var VContent = content + " vertical"

class Content extends React.Component {
	render() {
		return (
			<div className=" ContentMargin vertical">
				<ReactMarkdown>
					{this.props.data.comment}
				</ReactMarkdown>
			</div>
		)
	}
}

class Footer extends React.Component {
	//<i className="icofont-worried icon"></i>
	//<span className="iconnote">123</span>
	render() {
		return (
			<div className="Horizontal ContentMargin Start ">
				<div className="Start Horizontal">
					<i className="icofont-simple-smile icon"></i>
					<span className="iconnote">{this.props.data.like}</span>
				</div>
				<button className="CommentButton">打赏</button>
				<button className="CommentButton">举报</button>
			</div>
		)
	}
}

export class CommentArea extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			cancomment: false
		}

		this.handleCommentInput = this.handleCommentInput.bind(this)

		this.handleCommentClick = this.handleCommentClick.bind(this)
	}


	handleCommentInput(event) {
		this.setState({ comment: event.target.value })
		this.setState({ commentTarget: event.target })
		if (event.target.value.length > 0) {
			this.setState({ cancomment: true })
		} else {
			this.setState({ cancomment: false })
		}
	}

	handleCommentClick(event) {

		var data = {}
		data.post_id = parseInt(this.props.data.id)
		data.comment = this.state.comment
		data.token = cookie.load("usr_token")
		axios.post("/api/createcomment",
			data
		).then(res => {
			if (res.status == 200) {
				this.state.commentTarget.value = ""
				window.location.reload()
			} else {
				console.log("error on comment")
			}
		}).catch(res => {
			console.log(res);
		})
	}

	render() {
		var commentClass = "CommentButton "
		if (this.state.cancomment) {
			commentClass += "activeButton"
		}
		return (
			<div className={VContent + " ContentMargin"}>
				<div className={VContent}>
					<span className={HContent}>评论·Markdown</span>
					<span className="vdot"></span>
					<textarea className={content} onChange={this.handleCommentInput}></textarea>
					<span className="vdot"></span>
				</div>
				<span className="vdot"></span>
				<div className={HContent + " End ContentMargin"}>
					<button className={commentClass} onClick={this.handleCommentClick}>发表</button>
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
				<Link className="apoint" to={"/u/" + this.props.data.username}>
					{this.props.data.username}
				</Link>
				<span>{this.props.data.create_time}</span>
			</div>
		)
	}
}

export class Comments extends React.Component {
	render() {
		return (
			<div className="vertical grayAround comment">
				<Header data={this.props.data} />
				<Content data={this.props.data} />
				<Footer data={this.props.data} />
			</div>
		)
	}
}