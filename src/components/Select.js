import React, { Component } from 'react';
var SelectFx = require ('periodicjs.component.selectfx');

export default class Select extends Component  {
	render() {
		const mappedOptions = this.props.options.map((item) => (
			<option value={item.value} key={item.value}>{ item.title }</option>
		));
		return (
		  	<div className="select">
		  		<select className={`cs-select default ${this.props.classNames}`} id={this.props.name} name={this.props.name}>
		  			{ mappedOptions }
		  		</select>
		  	</div>
	  	);
	}

  	componentDidMount() {
  		var self = this;
  		new SelectFx(document.querySelector("#"+this.props.name), {
  			onChange : function(value) {
  				self.props.onChange(value);
  			}
  		});
  	}
}