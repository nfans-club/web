import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router';
import './index.css';

class InfoBox extends React.Component {
	render() {
		return (
			<div className="vertical">
				<span>name</span>
				<div>
					<span>email</span>
					<button>验证</button>
				</div>
				<span>rupee</span>
			</div>
		)
	}
}


class AvatarSetting extends React.Component {

	render() {
		return (
			<div className="vertical AvatarSetting">
				<img src="/test.png">
				</img>
				<button>设置头像</button>
			</div>
		)
	}

}


export class UserPage extends React.Component {

	render() {
		var id = this.props.match.params.id
		return (
			<div className="vertical Content">
				<span className="vdot"></span>
				<div className="grayAround Content">
					<div className="Content Start ContentMargin Horizontal">
						<AvatarSetting />
						<InfoBox />
					</div>
				</div>
			</div>
		)
	}
}