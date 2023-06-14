import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getPostsData} from '../../services/posts';
import PostCard from '../PostCard/PostCard';
import {addPosts,getPosts} from '../../store/slices/postSlice.js'
import SearchInput from '../SearchInput/SearchInput';
import { toast } from 'react-toastify';
import * as _ from 'lodash';

function Home() {
    const InitialPosts  = useSelector(getPosts);
    const dispatch = useDispatch();
    const [posts,setPosts] = useState(InitialPosts);
    const [searchInput, setSearchInput] = useState("");
    const [sortOrder,setSortOrder] = useState('asc');

    //Loads Posts Data
    const loadPosts = async () => {
        try{
            const _posts = await getPostsData();
            dispatch(addPosts(_posts));
            setPosts(_posts);
        }catch(err){
            toast.error("Something went wrong while fectching Posts", {
                position: "top-right",
                autoClose: 5000,
                theme: "dark",
            })
        }
    }

    //Handles Search Input Change
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
      };
    
    const sortByTitle = () => {
        const sortedPosts = _.orderBy(posts, "title",sortOrder);
        setPosts(sortedPosts);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    }

    const clearSearch = () => {
        setSearchInput('');
    }

    //Initial use effect to load data
    useEffect(() => {
        loadPosts();
    },[])

    useEffect(() => {
        const filteredPosts = InitialPosts.filter((post) => post.title.includes(searchInput) || post.body.includes(searchInput));
        setPosts(filteredPosts);
    },[searchInput])

  return (
    <>
        <div style={{display: 'flex'}}>
            <SearchInput searchInput={searchInput} handleChange={handleChange}/>
            <button onClick={sortByTitle}>Sort By Title</button>
            <button onClick={clearSearch}>Clear Search</button>
        </div>
        {posts.length === 0 ? <h3>No Posts</h3> : posts.map((post) => {
            return <PostCard key={post.id} title={post.title} body={post.body}/>
        })}
    </>
    
  )
}

export default Home