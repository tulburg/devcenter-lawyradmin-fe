import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Nav extends Component {
	state = { active: "" };
	render() {
		const { url, items } = this.props;
		var c = 0,
			self = this;
		const Menu = items.map(function(item) {
			c++;
			if (!item.separator) {
				return (
					<li className="navigation__item" key={c.toString()}>
						<Link
							to={`${url}${item.url !== "" ? "/" : ""}${
								item.url
							}`}
							className={`navigation__link ${
								self.state.active === item.url ? "active" : ""
							}`}
							onClick={() => self.setState({ active: item.url })}
						>
							<span className="navigation__link-icon">
								<i className={`${item.icon}`} />
							</span>
							<span className="navigation__link-text">
								{item.title}
							</span>
						</Link>
					</li>
				);
			} else {
				return (
					<li key={c.toString()}>
						<hr className="hr" />
					</li>
				);
			}
		});
		return <nav>{Menu}</nav>;
	}
	componentDidMount() {
		var url = window.location.href.replace(window.location.origin, "");
		var route = url.split("/")[2];
		if (route) this.setState({ active: route });
		else {
			this.setState({ active: "" });
		}
	}
}
