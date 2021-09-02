import React from 'react';
import './index.css';
import ReactMarkdown from 'react-markdown';
import { SetContentCSS } from '.';
import axios from 'axios';
import cookie from 'react-cookies'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { NFANSHOST } from './cfg';

var content = SetContentCSS()
var HContent = content + " Horizontal"
var VContent = content + " vertical"

class Content extends React.Component {
	render() {
		return (
			<div className=" ContentMargin vertical markdown">
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
	//<div className="Start Horizontal">
	//	<i className="icofont-simple-smile icon"></i>
	//	<span className="iconnote">{this.props.data.like}</span>
	//</div>
	render() {
		return (
			<div className="Horizontal ContentMargin Start ">
				<button className="ButtonNone">
					<i className="icofont-simple-smile icon"></i>
					<span className="hdot"></span>
					<span className="iconnote">{this.props.data.like}</span>
				</button>
				<button className="ButtonNone">
					<i className="icofont-gift icon"></i>
					<span className="hdot"></span>
					<span className="iconnote">打赏 </span>
				</button>
				<button className="ButtonNone">
					<i className="icofont-flag icon"></i>
					<span className="hdot"></span>
					<span className="iconnote">举报 </span>
				</button>
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
		if (data.token == undefined) {
			this.setState({ note: "请先登录" })
			return
		}
		axios.post(NFANSHOST + "/api/createcomment",
			data
		).then(res => {
			if (res.status == 200) {
				this.state.commentTarget.value = ""
				window.location.reload()
			} else {
				console.log("error on comment")
				this.setState({ note: res.response.data.msg })
			}
		}).catch(res => {
			console.log(res);
			if (res.response != undefined && res.response.data != undefined) {
				this.setState({ note: res.response.data.msg })
			}
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
					<span className="error">{this.state.note}</span>
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
				<img className="BIMG Small " src="/logo192.png"></img>
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