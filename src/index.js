import React from 'react';
import ReactMarkdown from 'react-markdown';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, withRouter, Link } from 'react-router-dom';
import { logicalExpression } from '@babel/types';
import axios from 'axios';
import { UserPage } from './user';
import { PostPage } from './post';
import { CreatePost } from './createPost';
import { SignUp } from './signup';
import { Login } from './login'
import { NotFoundPage } from './notfound';
import './index.css';
import { Header, Banner, Footer } from './header'
import { NFANSHOST } from './cfg';




export function fIsMobile() {
	return /Android|iPhone|iPad|iPod|BlackBerry|webOS|Windows Phone|SymbianOS|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export function SetContentCSS() {
	if (fIsMobile()) {
		return "MobContent"
	} else {
		return "Content"
	}
}

export class PostHeader extends React.Component {

	render() {
		return (
			<header className="Start TextContent">
				<div className="ContentMargin">
					<div>
						<img src="/favicon.ico" className="BIMG Small"></img>
						<span className="hdot">·</span>
						<Link className="apoint" to={"/u/" + this.props.data.username}>
							{this.props.data.username}
						</Link>
					</div>
					<span className="hdot">·</span>
					<span>{this.props.data.create_time}</span>
				</div>
			</header>
		)
	}
}

class PostContent extends React.Component {
	clicked(event) {
		console.log(event) //hello world
	}
	render() {
		//var test = "Hello, *world* 以小写字母开头的元素代表一个 HTML 内置组件，比如 <div> 或者 <span> 会生成相应的字符串 'div' 或者 'span' 传递给 React.createElement（作为参数）。大写字母开头的元素则对应着在 JavaScript 引入或自定义的组件，如 <Foo /> 会编译为 React.createElement(Foo)。 sdjf; ajfd;adjf; akljdfa; lsdjfka; skdjfa; sdjkfa; skdjfas; ljdfkas;kdfjas;fjas; lkdjfsa;ldkfja;slkdfjas;lkfja;slkdjfa;slkjfdljflajfka;lskjdfa;lskdjf;lkjl!\r\n\r\n![Image of Yaktocat](/logo192.png)\r\n\r\n![Image of test](/test.png)\r\n\r\n this is my first post check out"
		return (
			<div onClick={this.clicked} className="Start TextTitle ContentMargin vertical">
				<Link className="apoint" to={"/post/" + this.props.data.id}>
					{this.props.data.title}
				</Link>
			</div>
		)
	}
}

class PostFooter extends React.Component {
	render() {
		return (
			<footer className="Content">
				<div className="End TextContent ContentMargin" >
					<span> Views {this.props.data.views} </span>
					<span className="hdot">·</span>
					<a className="apoint" to={"/post/" + this.props.data.id}>
						<span > Comments {this.props.data.comments} </span>
					</a>
				</div>
			</footer>
		)
	}
}

export class Post extends React.Component {

	constructor(props) {
		super(props)
		console.log(props)
	}

	render() {
		return (
			<div className="Post vertical " >
				<PostHeader data={this.props.data} />
				<PostContent data={this.props.data} />
				<PostFooter data={this.props.data} />
			</div>
		)
	}

}


class PostList extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			posts: [],
		};
		this.getPosts()
	}

	getPosts() {

		var data = {}
		data.category = 0

		axios.post(NFANSHOST + '/api/getposts',
			data
		).then(res => {
			if (res.status == 200) {
				this.setState({ posts: res.data.data })
				return
			}
		}).catch(res => {
			if (res.response != undefined && res.response.data != undefined) {
			} else {
			}
		})

	}

	render() {
		var posts = []

		this.state.posts.map((post, index) => {
			posts.push(
				<li className="start">
					<Post data={post} />
				</li>
			)
		})
		return (
			<ul >
				{posts}
			</ul>
		)
	}
}


class HomePage extends React.Component {
	render() {
		var content = SetContentCSS()
		var root = document.getElementById("root")
		root.setAttribute("class", content)
		content += " NFans vertical"
		return (
			<div className={content}>
				<Header />
				<Banner />
				<PostList />
				<Footer />
			</div>
		)
	}

}

class Home extends React.Component {
	render() {
		var content = SetContentCSS()
		var root = document.getElementById("root")
		root.setAttribute("class", content)
		content += " NFans vertical"
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={HomePage}></Route>
					<Route path="/login" component={Login}></Route>
					<Route path="/signup" component={SignUp}></Route>
					<Route path="/submit" component={CreatePost}></Route>
					<Route path="/post/:postid" component={PostPage}></Route>
					<Route path="/u/:id" component={UserPage}></Route>
					<Route path="*" component={NotFoundPage}></Route>
				</Switch>
			</BrowserRouter>
		)
	}
}


class NFans extends React.Component {
	render() {
		var content = SetContentCSS()
		var root = document.getElementById("root")
		root.setAttribute("class", content)
		content += " NFans vertical"

		return (

			<Home />
		)
	}
}




ReactDOM.render(
	(
		<NFans />
	),
	document.getElementById('root')
);
