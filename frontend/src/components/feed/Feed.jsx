import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // in this case i used useeffect to ensure that the feed is only rendered once upon loading 
    // i tried initalyl with fetch (Vs axios) but realised axios better KEKW 
    // realised cant use async at the start zzz  
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("posts/timeline/" + user._id);
      // fo fetch the posts from the various users 
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
    // the array here is the dependency so whenever the username/id changes, the useeffect runs 
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
    {/* cant see share if the username  */}
        {posts.map((p) => (
          // esssentially mapping the posts
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
