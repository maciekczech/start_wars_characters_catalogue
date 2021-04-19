import React, { Component } from 'react';
import classes from './Layout.module.css';

export class Layout extends Component {
	render() {
		return <main className={classes.Layout}>{this.props.children}</main>;
	}
}

export default Layout;
