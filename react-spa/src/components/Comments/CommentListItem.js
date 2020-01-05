import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  inline: {
    display: 'inline',
  },
}));

export default function CommentListItem({ id, body, owner }) {
  const classes = useStyles();

  return (
    <ListItem alignItems='flex-start' divider>
      <ListItemText
        secondary={
          <React.Fragment>
            <Typography
              component='span'
              variant='body2'
              className={classes.inline}
              color='textPrimary'>
              {owner.username}
            </Typography>
            {` — ${body}`}
          </React.Fragment>
        }
      />
    </ListItem>
  );
}
