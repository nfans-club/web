import React from 'react';
import { SetContentCSS } from '.';
import { Header, Banner, Footer } from './header'
import './index.css';
import './icofont.css';
import { data } from 'vfile';
import { throwStatement, tSThisType } from '@babel/types';
import axios from 'axios';
import cookie from 'react-cookies'
import { useHistory } from 'react-router';
import { NFANSHOST } from './cfg';



var content = SetContentCSS()
var HContent = content + " Horizontal"
var VContent = content + " vertical"

class Title extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			showSelect: false,
			category: [],
		};
		this.onFocus = this.onFocus.bind(this)
		this.selected = this.selected.bind(this)
		this.onChange = this.onChange.bind(this)

		this.getCategory()
	}

	selected(event, data) {
		this.setState({ showSelect: false })
		this.state.input.value = data
		var id = -1
		this.state.category.forEach((c) => {
			if (c.zhdesc == data) {
				id = c.id
			}
		})
		this.props.call({ data: data, id: id })
	}

	getCategory() {
		axios.get(NFANSHOST + "/api/getcategory")
			.then(res => {
				this.setState({ category: res.data.data })
			}).catch(res => {
				console.log(res)
			})
	}

	onFocus(event) {
		this.setState({ showSelect: true })
		this.setState({ input: event.target })
	}


	onChange(event) {
		console.log(event)
	}

	render() {

		var data = []
		var vis = this.state.showSelect
		this.state.category.forEach((c) => {
			data.push(
				c.zhdesc
			)
		})
		return (
			<div className={HContent + " Header"}>
				<h3>Create a post</h3>
				<div className={VContent + " Combobox"}>
					<input placeholder="选择一个主题" onFocus={this.onFocus} onChange={this.onChange} ></input>
					<Comboselect vis={vis} data={data} showc={this.selected} />
				</div>
			</div>
		)
	}
}

class Comboselect extends React.Component {

	render() {

		var options = []
		if (this.props.data.length == 0) {
			return (
				<ul ></ul>
			)
		}
		this.props.data.forEach(op => {
			options.push(
				<li>
					<p onClick={(e) => { this.props.showc(e, op) }} >{op}</p>
				</li>
			)
		});


		var classstr = "ComboboxSelect ComboboxSelectHide"
		if (this.props.vis) {
			classstr = "ComboboxSelect ComboboxSelectShow"
		}
		return (
			<ul className={classstr}>
				{options}
			</ul>
		)
	}

}


class TextContext extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			note: "",
			cansend: false,
			content: "",
			title: "",
			category: "",
			nsfw: false,
			spoiler: false,
		}
		this.onPostContentChange = this.onPostContentChange.bind(this)
		this.onTitleChange = this.onTitleChange.bind(this)
		this.onCategoryChange = this.onCategoryChange.bind(this)
		this.sendpost = this.sendpost.bind(this)

		this.nsfwClick = this.nsfwClick.bind(this)
		this.spoilerClick = this.spoilerClick.bind(this)
	}

	nsfwClick(event) {
		this.setState({ nsfw: !this.state.nsfw })
	}

	spoilerClick(event) {
		this.setState({ spoiler: !this.state.spoiler })
	}

	checkCanSend() {
		if (this.state.content.length > 5 &&
			this.state.title.length > 5 &&
			this.state.category.data.length > 0) {
			this.setState({ cansend: true })
			return true
		} else {
			this.setState({ cansend: false })
			return false
		}
	}

	onPostContentChange(event) {
		this.setState({ content: event.target.value })
		this.checkCanSend()
	}

	onTitleChange(event) {
		this.setState({ title: event.target.value })
		this.checkCanSend()
	}

	onCategoryChange(data) {
		this.setState({ category: data })
		this.checkCanSend()
	}

	sendpost() {
		if (!this.checkCanSend()) {
			this.setState({ note: "请检查帖子内容" })
			return
		}
		var token = cookie.load("usr_token")
		if (token == undefined) {
			this.setState({ note: "请登录" })
			return
		}
		var data = {
			title: this.state.title,
			token: token,
			content: this.state.content,
			category: this.state.category.id
		}
		axios.post(NFANSHOST + "/api/createpost", data)
			.then(res => {
				console.log(this)
				console.log("发送成功");
				this.props.history.push("/")
			}).catch(res => {
				this.setState({ note: res })
			})
	}

	render() {
		var sendClass = "inactiveButton"
		if (this.state.cansend) {
			sendClass = "activeButton"
		}
		var nsfwTag = "inactiveButton"
		if (this.state.nsfw) {
			nsfwTag = "activeButton"
		}
		var spoilerTag = "inactiveButton"
		if (this.state.spoiler) {
			spoilerTag = "activeButton"
		}
		var note = this.state.note
		return (
			<div className="Content ContentMargin vertical">
				<span>{note}</span>
				<Title call={this.onCategoryChange} />
				<div className={VContent}>
					<input placeholder='Title' className={content} onChange={this.onTitleChange}></input>
					<div className={VContent}>
						<span className={HContent}>Markdown</span>
						<textarea className={content} onChange={this.onPostContentChange}></textarea>
					</div>
					<div className="Start">
						<button className={"TagButton " + nsfwTag} onClick={this.nsfwClick}>NSFW</button>
						<button className={"TagButton " + spoilerTag} onClick={this.spoilerClick}>剧透</button>
					</div>
					<div className={HContent + " End"}>
						<button className={sendClass} onClick={this.sendpost}>发表</button>
					</div>
				</div>
			</div>
		)
	}
}



export class CreatePost extends React.Component {
	render() {

		var content = SetContentCSS()
		var root = document.getElementById("root")
		root.setAttribute("class", content)
		content += " NFans vertical"
		return (
			<div className={content}>
				<Header />
				<Banner />
				<div className="Content ContentMargin grayAround">
					<TextContext history={this.props.history} />
				</div>
				<Footer />
			</div>
		)

	}
}