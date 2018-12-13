import React, { Component } from "react";
var SelectFx = require("periodicjs.component.selectfx");

export default class Select extends Component {
	render() {
		var self = this;
		const mappedOptions = this.props.options.map(function(item) {
			if (self.props.selected === item.value)
				return (
					<option value={item.value} key={item.value} selected>
						{item.title}
					</option>
				);
			return (
				<option value={item.value} key={item.value}>
					{item.title}
				</option>
			);
		});
		return (
			<div className="select">
				<select
					className={`cs-select default ${this.props.classNames}`}
					id={this.props.name}
					name={this.props.name}
				>
					{mappedOptions}
				</select>
			</div>
		);
	}

	componentDidMount() {
		var self = this;
		new SelectFx(document.querySelector("#" + this.props.name), {
			onChange: function(value) {
				self.props.onChange(value);
			}
		});
	}
}
