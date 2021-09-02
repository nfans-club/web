import React from 'react';
import cookie from 'react-cookies'
import { BrowserRouter, Switch, Route, withRouter, Link } from 'react-router-dom';

function dateFormat(fmt, date) {
	let ret;
	const opt = {
		"Y+": date.getFullYear().toString(),        // 年
		"m+": (date.getMonth() + 1).toString(),     // 月
		"d+": date.getDate().toString(),            // 日
		"H+": date.getHours().toString(),           // 时
		"M+": date.getMinutes().toString(),         // 分
		"S+": date.getSeconds().toString()          // 秒
	};
	for (let k in opt) {
		ret = new RegExp("(" + k + ")").exec(fmt);
		if (ret) {
			fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
		};
	};
	return fmt;
}


class ToolsHeader extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isLogin: false,
			usrUrl: "/login",
			usrName: "登录",
		}
	}

	componentDidMount() {
		if (!this.state.isLogin) {
			var token = cookie.load("usr_token")
			var info = cookie.load("usr_info")
			if (token != undefined && info != undefined) {
				console.log("LOGIN")
				this.setState({
					isLogin: true,
					usrUrl: "/u/" + info.username,
					usrName: info.username,
				})
			}
		}

	}
	render() {
		return (
			<div className="Horizontal End">
				<Link to="/notification">通知</Link>
				<Link to="/submit">创建</Link>
				<Link to={this.state.usrUrl}>{this.state.usrName}</Link>
			</div>
		)
	}
}


export class Header extends React.Component {
	render() {
		return (
			<div className="Header Horizontal">
				<Link to="/">NFans.Club</Link>
				<ToolsHeader />
			</div>
		)
	}
}


export class Banner extends React.Component {

	render() {
		return (
			<div className="vertical Content grayAround BannerCtx" >
				<img className="Banner" src="/banner.jpg" />
				<h1>NFans.Club</h1>
			</div>
		)
	}

}

export class Footer extends React.Component {
	render() {
		var now = dateFormat("YYYY", new Date())
		return (
			<div className="Horizontal">
				<span>NFans.Club-{now}</span>
			</div>
		)
	}
}
