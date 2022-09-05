import React, { useState , useRef } from 'react';
import { Typography, Button, TextField } from '@material-ui/core';

import {commentPost} from '../../actions/posts'
import useStyles from './styles';
import { useDispatch } from 'react-redux';
const CommentSection = ({ post }) => {
    //console.log(post);
    const classes = useStyles();
    const dispatch = useDispatch();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));
    const commentsRef = useRef();

    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${comment}`;

      const newComments = await dispatch(commentPost(finalComment, post._id));

      setComments(newComments);
      setComment('');

      commentsRef.current.scrollIntoView({ behavior : "smooth"});
    }

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant='h6'>Comments</Typography>
                    {comments.map((c, i) => (
                        <Typography variant='subtitle1' gutterBottom key={i}>
                            <strong>{c.split(': ')[0]}</strong>
                            {c.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef}/>
                </div>
                {user?.result?.name && (
                <div style={{ width: '70%' }}>
                    <Typography gutterBottom variant='h6'>Write a comment</Typography>
                    <TextField
                        fullWidth
                        multiline
                        minRows={4}
                        variant="outlined"
                        label="Comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Button style={{marginTop: '10px'}} fullWidth color='primary' variant='contained' disabled={!comment} onClick={handleClick}>
                        comment
                    </Button>

                </div>
                )}

            </div>

        </div>
    );
}

export default CommentSection;