import React from "react"
import { Header, Banner, Footer } from './header'
import { SetContentCSS } from '.'

export class NotFoundPage extends React.Component {
	render() {
		var content = SetContentCSS()
		var root = document.getElementById("root")
		root.setAttribute("class", content)
		content += " NFans vertical"
		return (
			<div className={content}>
				<Header />
				<Banner />
				<div>
					<h1>Not Found</h1>
				</div>
				<Footer />
			</div>
		)
	}
}