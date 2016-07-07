import React, { PropTypes } from 'react';

const Username = props => (
  <p className="username">
    <a href={`/${props.facebook_id}`}>{`${props.first_name} ${props.last_name}`}</a>
  </p>
);

Username.propTypes = {
  facebook_id: PropTypes.number.isRequired,
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired
};

export default Username;