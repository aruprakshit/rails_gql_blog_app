import React, { useMemo, useCallback } from 'react';
import { Box, Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

import DisplayAlert from '../Utils/DisplayAlert';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    '& .MuiBox-root': {
      margin: 2,
      display: 'inline-flex',
      alignItems: 'center',
    },
  },
}));

const RATE_A_COMMENT = gql`
  mutation voteToPost($commentId: ID!, $category: RatingCategory!) {
    addRatingToComment(category: $category, commentId: $commentId) {
      errors
      rating {
        category
        weight
      }
    }
  }
`;

export default function RateComment({ commentId, ratings }) {
  const classes = useStyles();
  const [addRatingToComment, { data, loading, error }] = useMutation(
    RATE_A_COMMENT
  );

  const upVote = category => e => {
    addRatingToComment({ variables: { commentId, category } });
  };
  const downVote = category => e => {
    addRatingToComment({ variables: { commentId, category } });
  };

  const computeVoteCount = useCallback(
    category => {
      if (category === 'UPVOTE') {
        return ratings
          .filter(rating => rating.category === category)
          .reduce((memo, rating) => memo + rating.weight, 0);
      }

      if (category === 'DOWNVOTE') {
        return ratings
          .filter(rating => rating.category === category)
          .reduce((memo, rating) => memo + Math.abs(rating.weight), 0);
      }
    },
    [ratings]
  );

  const upVoteCount = useMemo(() => computeVoteCount('UPVOTE'), [
    computeVoteCount,
  ]);

  const downVoteCount = useMemo(() => computeVoteCount('DOWNVOTE'), [
    computeVoteCount,
  ]);

  return (
    <Box className={classes.root}>
      <Box>
        <Icon
          style={{ color: green[600], fontSize: 25 }}
          onClick={upVote('UPVOTE')}>
          thumb_up_alt
        </Icon>
        <Box component='span'>+ {upVoteCount}</Box>
      </Box>
      <Box>
        <Icon
          style={{ color: red[600], fontSize: 25 }}
          onClick={downVote('DOWNVOTE')}>
          thumb_down_alt
        </Icon>
        <Box component='span'>- {downVoteCount}</Box>
      </Box>
      <DisplayAlert
        loading={loading}
        error={error}
        data={data?.addRatingToPost}
      />
    </Box>
  );
}
