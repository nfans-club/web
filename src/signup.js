import axios from 'axios';
import React from 'react';
import './index.css';
import { SHA256, MD5 } from 'crypto-js';
import { data } from 'vfile';
import { Header, Banner, Footer } from './header'
import { SetContentCSS } from '.';

class SignForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			username: '',
			pwd: '',
			pwdConfirm: '',
			Note: '',
		};

		this.handleUserNameChange = this.handleUserNameChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this)
		this.handlePasswordChange = this.handlePasswordChange.bind(this)
		this.handlePasswordConfirm = this.handlePasswordConfirm.bind(this)
	}

	handleEmailChange(event) {
		this.setState({ email: event.target.value })
	}

	handleUserNameChange(event) {
		this.setState({ username: event.target.value });
	}

	handlePasswordChange(event) {
		this.setState({ pwd: event.target.value });
	}

	handlePasswordConfirm(event) {
		this.setState({ pwdConfirm: event.target.value })
	}

	getpwd(pwd) {
		const hashDigest = SHA256(pwd).toString()
		const md5str = MD5(hashDigest).toString()
		return md5str
	}

	handleSubmit(event) {
		event.preventDefault()
		var data = {}
		data.pwd = this.state.pwd
		data.pwdConfirm = this.state.pwdConfirm
		data.nick = this.state.username
		data.email = this.state.email

		if (data.pwd.length < 6) {
			this.setState({ Note: "密码长度不够" })
			return
		}

		data.pwd = this.getpwd(data.pwd)
		data.pwdConfirm = this.getpwd(data.pwdConfirm)

		if (data.pwdConfirm != data.pwd) {
			this.setState({ Note: "两次密码不相同" })
			return
		}
		axios.post('/api/signup',
			data
		).then(res => {
			if (res.status == 200) {
				this.setState({ Note: "注册成功" })
				return
			}
		}).catch(res => {
			console.log(res)
			console.log(res.response)
			if (res.response != undefined && res.response.data != undefined) {
				this.setState({ Note: res.response.data.msg })
			} else {
				this.setState({ Note: "网络错误" })
			}
		})
	}



	render() {
		return (
			<div className="vertical log_sign_div">
				<div>
					<span id="note" >{this.state.Note}</span>
				</div>
				<form className="vertical" method="post" onSubmit={this.handleSubmit}>
					<label>
						<input type='text' name="Email" placeholder="邮箱" value={this.state.email} onChange={this.handleEmailChange} />
					</label>
					<label>
						<input type='text' name="username" placeholder="用户名" value={this.state.username} onChange={this.handleUserNameChange} />
					</label>
					<label>
						<input type='password' name="password" placeholder="密码" value={this.state.pwd} onChange={this.handlePasswordChange} />
					</label>
					<label>
						<input type='password' name="password" placeholder="密码确认" value={this.state.pwdConfirm} onChange={this.handlePasswordConfirm} />
					</label>
					<input type="submit" value="注册" />
				</form>

				<div>
					<p className="autop">
						已有账号？<a href="/login">去登录</a>
					</p>
				</div>

			</div>
		)
	}
}


export class SignUp extends React.Component {
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
					<SignForm />
				</div>
				<Footer />
			</div>
		)
	}
}
