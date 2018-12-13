import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Pagination extends Component {
	render() {
		const { config, load } = this.props;
		const renderedPages = [];
		if (config.current_page > 1)
			renderedPages.push(
				<li key={0} className="prev">
					<Link
						to="/"
						onClick={e => {
							load(config.current_page - 1);
							e.preventDefault();
						}}
					>
						<i className="ic-back" />
					</Link>
				</li>
			);

		for (var i = 0; i < config.total_pages; i++) {
			const page = i + 1;
			if (page === config.current_page) {
				renderedPages.push(
					<li key={i} className="active">
						<Link
							to="/"
							onClick={e => {
								load(page);
								e.preventDefault();
							}}
						>
							{page}
						</Link>
					</li>
				);
			} else {
				renderedPages.push(
					<li key={i}>
						<Link
							to="/"
							onClick={e => {
								load(page);
								e.preventDefault();
							}}
						>
							{page}
						</Link>
					</li>
				);
			}
		}

		if (config.current_page < config.total_pages)
			renderedPages.push(
				<li key={config.current_page + 1} className="next">
					<Link
						to="/"
						onClick={e => {
							load(config.current_page + 1);
							e.preventDefault();
						}}
					>
						<i className="ic-right" />
					</Link>
				</li>
			);
		return (
			<div align="center">
				<ul className="pagination">{renderedPages}</ul>
			</div>
		);
	}
}