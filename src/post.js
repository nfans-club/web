import React from 'react';
import './index.css';
import ReactMarkdown from 'react-markdown';
import { Comments, CommentArea } from './comment'
import { Link } from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies'
import { SetContentCSS } from '.';
import { Header, Banner, Footer } from './header'
import { NFANSHOST } from './cfg';

class PHeader extends React.Component {
	render() {
		var usr = "u/" + this.props.data.username
		return (
			<header className="Start TextContent Content">
				<div className="ContentMargin ">
					<Link className="apoint" to="/c/nintendo">
						<div>
							<img src="/favicon.ico" className="BIMG Small"></img>
							<span className="hdot"></span>
							c/nintendo
						</div>
					</Link>
					<span className="hdot">·</span>
					<span>Posted by </span>
					<span className="hdot"></span>
					<Link className="apoint" to={"/" + usr}>
						{usr}
					</Link>
					<span className="hdot"></span>
					<span>{this.props.data.create_time}</span>
				</div>
			</header>
		)
	}
}



class Title extends React.Component {
	render() {
		return (
			<div className="vertical Start ContentMargin">
				<span className="Start PostTitle">{this.props.data.title}</span>
			</div>
		)
	}
}

class Content extends React.Component {
	render() {
		return (
			<div className="Post ContentMargin vertical">
				<ReactMarkdown>
					{this.props.data.Content}
				</ReactMarkdown>
			</div>
		)
	}
}

class PFooter extends React.Component {
	render() {
		return (
			<footer className="Start TextContent">
				<div className="Horizontal ContentMargin Start ">
					<div className="Horizontal">
						<i className="icofont-comment icon"></i>
						<span className="hdot"></span>
						<span className="iconnote">{this.props.data.comments}</span>
					</div>
					<div className="Horizontal">
						<i className="icofont-eye-alt icon"></i>
						<span className="hdot"></span>
						<span className="iconnote">{this.props.data.views}</span>
					</div>
					<div className="Horizontal">
						<button className="ButtonNone">
							<i className="icofont-gift icon"></i>
							<span className="hdot"></span>
							<span className="iconnote">打赏 </span>
						</button>
					</div>
				</div>
			</footer>
		)
	}
}



class PostContent extends React.Component {

	constructor(props) {
		super(props)
		console.log("get props", props)
	}
	render() {
		return (
			<div className="Content vertical ">
				<div className="Content vertical grayAround">
					<PHeader data={this.props.data} />
					<Title data={this.props.data} />
					<Content data={this.props.data} />
					<PFooter data={this.props.data} />
				</div>
				<span className="vdot"></span>
				<div className="Content grayAround">
					<CommentArea data={this.props.data} />
				</div>
			</div>
		)
	}

}

class Post extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			comments: []
		};
		this.id = this.props.id
		this.getPosts()
		this.getComments()
	}

	getPosts() {
		var data = {}
		data.post_id = parseInt(this.id)
		axios.post(NFANSHOST + "/api/getpost", data)
			.then(res => {
				if (res.status == 200) {
					console.log(res)
					this.setState({ data: res.data.data })
				}
			}).catch(res => {
				console.log(res)
			})
	}

	getComments() {
		var data = {}
		data.token = cookie.load("usr_token")
		data.post_id = parseInt(this.id)
		axios.post(NFANSHOST + "/api/getcomments", data)
			.then(res => {
				this.setState({ comments: res.data.data })
			}).catch(res => {
				console.log(res)
			})
	}

	render() {
		if (this.state.data === undefined) {
			return (
				<div>
					<p>
						Loding...
					</p>
				</div>
			)
		}
		var comments = []
		this.state.comments.map((comment, index) => {
			comments.push(
				<li>
					<Comments data={comment} />
				</li>
			)
		})
		return (
			<div className="Content vertical">
				<span className="vdot"></span>
				<div className="Content">
					<PostContent data={this.state.data} />
				</div>
				<span className="vdot"></span>
				<div className="Content">
					<ul >
						{comments}
					</ul>
				</div>
			</div>
		)
	}
}

export class PostPage extends React.Component {
	render() {
		var content = SetContentCSS()
		var root = document.getElementById("root")
		root.setAttribute("class", content)
		content += " NFans vertical"
		var id = this.props.match.params.postid
		return (
			<div className={content}>
				<Header />
				<Banner />
				<div className="Content ContentMargin ">
					<Post id={id} />
				</div>
				<Footer />
			</div>
		)
	}
}
