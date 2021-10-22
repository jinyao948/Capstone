import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  // i use the contextapi here is becasue i dont need to pass down the props manually at every level
  // so ah, i can use the auth to passdown to things like post, share etc was doing manually at first KEKW 
 // could have used Redux too because with Redux, because the current user can just be fetched from the redux state
  // conceptually i felt that it was the same 
  // Proj 3 we used Redux (context api not really state management) 

  useEffect(() => {
    // i needed to ensure that the likes on one post did not trasnfer to the likes of another post zzzzzzz 
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  // THIs uses the same concept as the feed stuff 

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);
  // the user effect dependcy stuff is quite burden but it is needed if not got the warinng zz 

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            {/* you click on the profile icon it will link you to the persons profiel page  */}
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                  // in the case where teh fella has not profile picture, i mean i can techically use it as a UseState as a default 
                  // but this might be an easy workaround for the timebeing HAHAHAH
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
            {/* i use the timeago as a library that allows me to check when the the post was created at, it will look at my data base and be like ITS FROM THERE */}
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt="" />
          {/* the pf is to take fron teh env  */}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="LikeCount">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postComments">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
