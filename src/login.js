import React from 'react';
import './index.css';
import { SHA256, MD5 } from 'crypto-js';
import { Redirect } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookies'
import { Header, Banner, Footer } from './header'
import { SetContentCSS } from '.';
import { Link } from 'react-router-dom';
import { NFANSHOST } from './cfg';


class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			username: '',
			pwd: '',
			pwdConfirm: '',
			Note: '',
			redirectToHome: false,
		};

		this.handleEmailChange = this.handleEmailChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this)
	}

	handleEmailChange(event) {
		this.setState({ email: event.target.value })
	}

	handlePasswordChange(event) {
		this.setState({ pwd: event.target.value });
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
		data.email = this.state.email

		data.pwd = this.getpwd(data.pwd)

		axios.post(NFANSHOST + '/api/login',
			data
		).then(res => {
			if (res.status == 200) {
				this.setState({ Note: "登录成功" })
				cookie.save('usr_token', res.data.data.token)
				cookie.save('usr_info', res.data.data.info)
				this.setState({ redirectToHome: true })
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
		const redirectToHome = this.state.redirectToHome;
		if (redirectToHome) {
			window.location = "/"
			return
		}

		return (
			<div className="vertical log_sign_div">
				<div>
					<span >{this.state.Note}</span>
				</div>
				<form method="post" className="AnimatedForm_field vertical" onSubmit={this.handleSubmit}>
					<label>
						<input type='text' name="邮箱" value={this.state.email} onChange={this.handleEmailChange} placeholder="email" />
					</label>
					<label>
						<input type='password' name="密码" value={this.state.pwd} onChange={this.handlePasswordChange} placeholder="password" />
					</label>
					<input type='submit' value="登录" />
				</form>

				<p>
					没有账号？<Link className="apoint" to="/signup">去注册</Link>
				</p>

			</div>
		)
	}
}

export class Login extends React.Component {
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
					<LoginForm />
				</div>
				<Footer />
			</div>
		)
	}
}

