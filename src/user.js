import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router';
import { SetContentCSS } from '.';
import './index.css';
import { Header, Banner, Footer } from './header'

class InfoBox extends React.Component {
	render() {
		return (
			<div className="vertical ProfileSetting">
				<span>用户：</span>
				<div className="Horizontal ItemBaseLine">
					<span>邮箱：</span>
					<button className="ButtonNone">验证</button>
				</div>
				<span>卢比：</span>
				<input placeholder="最近状态怎么样"></input>
			</div>
		)
	}
}


class AvatarSetting extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			select: undefined
		}
		this.onfileselect = this.onfileselect.bind(this)
	}

	onfileselect(e) {
		console.log(e.target.files)
		this.setState({ select: e.target.files[0] })
	}

	render() {
		return (
			<div className="vertical AvatarSetting">
				<img src="/test.png" className="UserBigImg">
				</img>
				<input type="file" accept="image/*" onChange={this.onfileselect} className="FileSelect"></input>
				<img file={this.state.select}></img>
			</div>
		)
	}

}

class User extends React.Component {
	render() {
		return (
			<div className="vertical Content ">
				<span className="vdot"></span>
				<div className="grayAround Content">
					<div className="Content Start ContentMargin Horizontal UserSetting">
						<AvatarSetting />
						<InfoBox />
					</div>
				</div>
			</div>
		)
	}

}


export class UserPage extends React.Component {

	render() {
		var id = this.props.match.params.id
		var content = SetContentCSS()
		var root = document.getElementById("root")
		root.setAttribute("class", content)
		content += " NFans vertical"
		return (
			<div className={content}>
				<Header />
				<Banner />
				<div className="Content ContentMargin grayAround">
					<User />
				</div>
				<Footer />
			</div>
		)
	}

}