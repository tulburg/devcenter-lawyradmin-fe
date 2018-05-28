import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends Component {
	state = { active : "" }
	render (){
		const { url, items } = this.props;
		var c=0, self=this;
		const Menu = items.map(function(item){
			c++;
			if(!item.separator) {
				return (<li className="navigation__item" key={c.toString()}>
				    <Link to={`${url}${item.url!=="" ? '/':''}${item.url}`} className={`navigation__link ${self.state.active===item.url ? 'active' : ''}`}
				    	onClick={() => self.setState({active: item.url}) }>
				      	<span className="navigation__link-icon">
				        	<i className={`fas ${item.icon}`} />
				      	</span>
				      	<span className="navigation__link-text">{item.title}</span>
				    </Link>
			  	</li>);
			}else {
			  	return (<li key={c.toString()}>
			  	  <hr className="hr" />
			  	</li>);
			}
		});
		return (
			<nav>
			  	{ Menu }
			</nav>
		)
	}
	componentDidMount() {
		var loc = window.location.href.split("/")
		if(loc.length > 4) this.setState({active : loc[loc.length-1]});
		else this.setState({active: ""});
	}
}

