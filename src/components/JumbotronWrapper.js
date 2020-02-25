import React from 'react';
import PropTypes from 'prop-types';
import { Container, Jumbotron } from 'react-bootstrap';

const JumbotronWrapper = (props) => {
	return (
		<Container>
			<Jumbotron style={{ marginTop: '50px' }}>
				<h1>{props.title}</h1>
				<div>{props.children}</div>
				<p>{props.description}</p>
			</Jumbotron>
		</Container>
	);
};

JumbotronWrapper.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string
};

JumbotronWrapper.defaultProps = {
	description: `Page Not Found`
};

export default JumbotronWrapper;