import React from 'react';
import ReactDOM from 'react-dom';
import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';

const PROD_ENV = process.env.NODE_ENV;
const localesFiles = process.env.LOCALE_FILES;
console.log(PROD_ENV, localesFiles);


class Div extends React.PureComponent {
	state = {
		fetching: false,
	}

	componentDidMount(){

	}

	render() {
		const {fetching} = this.state;

		return <div>{`${fetching}`}</div>
	}
}

ReactDOM.render(
	<div>hey</div>,
	document.getElementById('app')
);