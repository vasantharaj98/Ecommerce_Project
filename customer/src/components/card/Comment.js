import React, { useState } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { deepOrange, deepPurple } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';

const useStyles = styled((theme) => ({
  inline: {
    display: 'inline',
  },
  avatar: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepPurple[500],
  },
  replyButton: {
    marginLeft: theme.spacing(4),
  },
}));

const CommentSection = () => {
  const classes = useStyles();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [likes, setLikes] = useState({});

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      if (replyTo !== null) {
        // If replying to a comment, add reply to that comment
        const updatedComments = comments.map(comment => {
          if (comment.id === replyTo) {
            return {
              ...comment,
              replies: [...(comment.replies || []), { content: newComment, postTime: new Date().toLocaleString() }]
            };
          }
          return comment;
        });
        setComments(updatedComments);
        setReplyTo(null);
      } else {
        // Otherwise, add as a regular comment
        setComments([...comments, { id: comments.length + 1, content: newComment, postTime: new Date().toLocaleString() }]);
      }
      setNewComment('');
    }
  };

  const handleReply = (commentId) => {
    // Set the commentId as the replyTo state
    setReplyTo(commentId);
  };

  const handleLike = (commentId) => {
    setLikes(prevLikes => ({
      ...prevLikes,
      [commentId]: (prevLikes[commentId] || 0) + 1
    }));
  };

  return (
    <Box>
      <List>
        {comments.map((comment) => (
          <React.Fragment key={comment.id}>
            <ListItem alignItems="flex-start" sx={{pl: 0}}>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>{comment.content.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                    <Typography
                      component="span"
                      variant="h5"
                      className={classes.inline}
                      color="text.main"
                      sx={{fontWeight:'bold'}}
                    >
                      Ahmad
                    </Typography>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      component="h6"
                      variant="body1"
                      color="text.light"
                      sx={{mt: 0.5}}
                    >
                    {comment.postTime}
                    </Typography>
                    <Typography
                      component="h6"
                      variant="h6"
                      color="text.main"
                      sx={{my: 1}}
                    >
                      {comment.content}
                    </Typography>
                    <IconButton
                      color="text"
                      aria-label="like"
                      onClick={() => handleLike(comment.id)}
                    >
                      <FavoriteIcon color={likes[comment.id] ? 'secondary' : '#000'} sx={{mr: 1}}/>
                      {likes[comment.id] || 0}
                    </IconButton>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => handleReply(comment.id)}
                    >
                      Reply
                    </Button>
                  </React.Fragment>
                }
              />
            </ListItem>
            {comment.replies && (
              <List component="div" disablePadding sx={{borderLeft:'1px solid', borderColor:'primary.light',  marginLeft: 2}}>
                {comment.replies.map((reply, index) => (
                  <ListItem key={index} alignItems="flex-start" style={{ paddingLeft: '3rem' }}>
                    <ListItemAvatar>
                      <Avatar className={classes.avatar}>{reply.content.charAt(0)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                    <Typography
                      component="span"
                      variant="h5"
                      className={classes.inline}
                      color="text.main"
                      sx={{fontWeight:'bold'}}
                    >
                      Ahmad
                    </Typography>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      component="h6"
                      variant="body1"
                      color="text.light"
                      sx={{mt: 0.5}}
                    >
                    {reply.postTime}
                    </Typography>
                    <Typography
                      component="h6"
                      variant="h6"
                      color="text.main"
                      sx={{my: 1}}
                    >
                      {reply.content}
                    </Typography>
                    <IconButton
                      className={classes.likeButton}
                      color="text"
                      aria-label="like"
                      onClick={() => handleLike(reply.id)}
                    >
                      <FavoriteIcon color={likes[reply.id] ? 'secondary' : '#000'} sx={{mr: 1}}/>
                      {likes[reply.id] || 0}
                    </IconButton>
                  </React.Fragment>
                }
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </React.Fragment>
        ))}
      </List>
      {comments.length > 0 &&
      <Divider sx={{bgcolor:'primary.light', mb: 3}} />    
      }
      <TextField color='text' fullWidth id="input-with-sx" placeholder={replyTo ? `Reply to @${replyTo}` : 'Add a Comment'}
 variant="outlined"
       value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        inputProps={{
          sx:{
            fontSize: 18,
            color:'text.main'
          }
        }}
         sx={{
        "& .MuiInput-root": {
          color: "text.light",
          // Bottom border
          "&:before": {
            borderColor: "#2e2e2e",
            borderWidth: "2px",
          },
          // Border on focus
          "&:after": {
            borderColor: "secondary.main",
            borderWidth: "3px",
          },
          ":hover:not(.Mui-focused)": {
            "&:before": {
              borderColor: "#e7e7e7",
              borderWidth: "2px",
            },
          },
        },
      }}/>
      <Button sx={{mt: 2}} size='large' variant="contained" color="secondary" onClick={handleAddComment}>
        {replyTo ? `Reply to @${replyTo}` : 'Add Comment'}
      </Button>
    </Box>
  );
};

export default CommentSection;
