import React, { PropTypes } from 'react';

import ReviewProfile from './ReviewProfile';
import Comment from './Comment';

const Review = props => (
  <div className="review">
    <ReviewProfile
      facebook_id={props.facebook_id}
      first_name={props.first_name}
      last_name={props.last_name}
      photo_url={props.photo_url}
    />
    <Comment comment={props.comment} />
  </div>
);

Review.propTypes = {
  rating: PropTypes.number.isRequired,
  facebook_id: PropTypes.number.isRequired,
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  photo_url: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  Post_created_at: PropTypes.string.isRequired,
  upc: PropTypes.number.isRequired,
  likesCache: PropTypes.number.isRequired
};

export default Review;
