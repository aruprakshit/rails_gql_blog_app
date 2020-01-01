import React, { useMemo } from 'react';
import { Grid, Box, Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

import DisplayAlert from '../Utils/DisplayAlert';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& .MuiBox-root': {
      marginLeft: 'auto',
      marginRight: 'auto',
      alignSelf: 'start',
      display: 'inline-flex',
    },
  },
}));

const RATE_A_POST = gql`
  mutation voteToPost($postId: ID!, $category: RatingCategory!) {
    addRatingToPost(category: $category, postId: $postId) {
      errors
      rating {
        id
        category
        weight
      }
    }
  }
`;

export default function RatePost({ postId, ratings }) {
  const classes = useStyles();
  const [addRatingToPost, { data, loading, error }] = useMutation(RATE_A_POST);

  const upVote = category => e => {
    addRatingToPost({ variables: { postId, category } });
  };
  const downVote = category => e => {
    addRatingToPost({ variables: { postId, category } });
  };
  const ratingIds = ratings.map(rating => rating.id);

  const computeVoteCount = category => {
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
  };

  const upVoteCount = useMemo(() => computeVoteCount('UPVOTE'), [...ratingIds]);

  const downVoteCount = useMemo(() => computeVoteCount('DOWNVOTE'), [
    ...ratingIds,
  ]);

  return (
    <Grid item xs={1} className={classes.root}>
      <Box>
        <Icon
          style={{ color: green[600], fontSize: 25 }}
          onClick={upVote('UPVOTE')}>
          arrow_upward
        </Icon>
        <Box component='span'>+ {upVoteCount}</Box>
      </Box>
      <Box>
        <Icon
          style={{ color: red[600], fontSize: 25 }}
          onClick={downVote('DOWNVOTE')}>
          arrow_downward
        </Icon>
        <Box component='span'>- {downVoteCount}</Box>
      </Box>
      <DisplayAlert
        loading={loading}
        error={error}
        data={data?.addRatingToPost}
      />
    </Grid>
  );
}
