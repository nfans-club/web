import React from 'react';
import './index.css';
import ReactMarkdown from 'react-markdown';
import { Comments, CommentArea } from './comment'

class Header extends React.Component {
	render() {
		return (
			<header className="Start TextContent Content">
				<div className="ContentMargin ">
					<a href="c/nintendo">
						<div>
							<img src="/favicon.ico" className="BIMG Small"></img>
							<span className="hdot"></span>
							c/nintendo
						</div>
					</a>
					<span className="hdot">·</span>
					<span>Posted by </span>
					<span className="hdot"></span>
					<a href="u/FgoDt">
						u/Fgodt
					</a>
					<span className="hdot"></span>
					<span>2021.7.5</span>
				</div>
			</header>
		)
	}
}



class Title extends React.Component {
	render() {
		return (
			<div className="vertical Start ContentMargin">
				<span className="Start PostTitle">Title title title lkjlkj title title, title title title title title title title title</span>
			</div>
		)
	}
}

class Content extends React.Component {
	render() {
		var test = "Hello, *world* 以小写字母开头的元素代表一个 HTML 内置组件，比如 <div> 或者 <span> 会生成相应的字符串 'div' 或者 'span' 传递给 React.createElement（作为参数）。大写字母开头的元素则对应着在 JavaScript 引入或自定义的组件，如 <Foo /> 会编译为 React.createElement(Foo)。 sdjf; ajfd;adjf; akljdfa; lsdjfka; skdjfa; sdjkfa; skdjfas; ljdfkas;kdfjas;fjas; lkdjfsa;ldkfja;slkdfjas;lkfja;slkdjfa;slkjfdljflajfka;lskjdfa;lskdjf;lkjl!\r\n\r\n![Image of Yaktocat](/logo192.png)\r\n\r\n![Image of test](/test.png)\r\n\r\n this is my first post check out"
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
			<footer className="Start TextContent">
				<div className="Horizontal ContentMargin Start ">
					<div className="Horizontal">
						<i className="icofont-comment icon"></i>
						<span className="iconnote">169</span>
					</div>
					<div className="Horizontal">
						<i className="icofont-eye-alt icon"></i>
						<span className="iconnote">1620</span>
					</div>
					<div className="Horizontal">
						<i className="icofont-gift icon"></i>
						<span className="iconnote"> 打赏 </span>
					</div>
				</div>
			</footer>
		)
	}
}



class PostContent extends React.Component {
	render() {
		return (
			<div className="Content vertical ">
				<div className="Content vertical grayAround">
					<Header />
					<Title />
					<Content />
					<Footer />
				</div>
				<span className="vdot"></span>
				<div className="Content grayAround">
					<CommentArea />
				</div>
			</div>
		)
	}

}

export class PostPage extends React.Component {
	render() {
		return (
			<div className="Content vertical">
				<span className="vdot"></span>
				<div>
					<PostContent />
				</div>
				<span className="vdot"></span>
				<div className="Content">
					<ul >
						<li>
							<Comments />
						</li>
					</ul>
				</div>
			</div>
		)
	}
}

