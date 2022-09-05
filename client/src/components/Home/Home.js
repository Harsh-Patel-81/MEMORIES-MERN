import React, {  useState } from 'react'
import { Container, Grid, Grow, Paper, AppBar, TextField, Button } from '@material-ui/core'
import { useNavigate, useLocation } from 'react-router-dom'
import ChipInput from 'material-ui-chip-input'
import { useDispatch } from 'react-redux'
import { getPostsBySearch } from '../../actions/posts'
import Pagination from '../Pagination'
import Form from '../Form/Form'
import Posts from '../Posts/Posts'
import useStyles from './styles'

function useQuery() {// gives info about on which page we are currently on and what we are searching
    return new URLSearchParams(useLocation().search)
}//allows us to use it as hook


const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1;// query.get('page')  ey jose ke url ma page namno parameter chhe ke nai
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);


    const searchPost = () =>{
        // .trim() ey string mathi badhi spaces ne remove kari de chhe
        //console.log(tags)
        if(search.trim() || tags){
            // dispatch -> fetch search post
            dispatch(getPostsBySearch({search, tags: tags.join(',')}))// [sea,seadiving] ==> 'sea,seadiving'
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        }else{
            navigate('/');
        }
    } 

    const handleKeyPress = (e) => {
        //search on 'enter' key pressed
        if (e.keyCode === 13) {
            //search a post
            searchPost();
        }
    }

    const handleAdd = (tag) => setTags([...tags, tag]);

    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete))

    


    return (
        <div>
            <Grow in>
                <Container>
                    <Grid className={classes.gridContainer} container justifyContent='space-between' alignItems='stretch' spacing={3}>
                        <Grid item xs={12} sm={6} md={9}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                                <TextField
                                    name='search'
                                    variant='outlined'
                                    fullWidth
                                    label="Search Memories"
                                    value={search}
                                    onKeyPress={handleKeyPress}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <ChipInput
                                    style={{ margin: '10px 0' }}
                                    value={tags}
                                    onAdd={handleAdd}
                                    onDelete={handleDelete}
                                    variant='outlined'
                                    label='Search Tags'
                                />
                                <Button  className={classes.searchButton} onClick={searchPost} variant='contained' color='primary'>Search</Button>


                            </AppBar>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                            {(!searchQuery && !tags.length) && (

                            <Paper className={classes.pagination} elevation={6}>
                                <Pagination page={page} />
                            </Paper>
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </div>
    )
}

export default Home