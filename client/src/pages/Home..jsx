import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ThumbUpRounded from "@mui/icons-material/ThumbUpRounded";
import { AuthContext } from "../context/AuthContext";
const Home = () => {
	const [postsList, setPostsList] = useState([]);
	const [likedPosts, setLikedPosts] = useState([]);
	const { authState } = useContext(AuthContext);
	const navigate = useNavigate();
	useEffect(() => {
		if  (!localStorage.getItem('accessToken')) {
			navigate("/login");
		} else {
			const fetchPosts = async () => {
				try {
					const res = await axios.get("http://localhost:3000/posts", {
						headers: { accessToken: localStorage.getItem("accessToken") },
					});
					setPostsList(res.data.postsList);
					setLikedPosts(
						res.data.likedPosts.map((like) => {
							return like.PostId;
						})
					);
				} catch (error) {
					console.error("Error fetching posts:", error);
				}
			};
			fetchPosts();
		}
	}, [authState, navigate]);
	const likeAPost = (postId) => {
		axios
			.post(
				"http://localhost:3000/like",
				{ PostId: postId },
				{ headers: { accessToken: localStorage.getItem("accessToken") } }
			)
			.then((response) => {
				setPostsList((prevPostsList) =>
					prevPostsList.map((post) => {
						if (post.id === postId) {
							if (response.data.liked) {
								return { ...post, Likes: [...post.Likes, 0] };
							} else {
								const likeArray = post.Likes;
								likeArray.pop();
								return { ...post, Likes: likeArray };
							}
						} else {
							return post;
						}
					})
				);
				setLikedPosts((prevLikedPosts) =>
					response.data.liked
						? [...prevLikedPosts, postId]
						: prevLikedPosts.filter((id) => id !== postId)
				);
			})
			.catch((error) => {
				console.error("Error liking post:", error);
			});
	};
	return (
		<div className="App">
			{postsList &&
				postsList.map((value) => (
					<div key={value.id}>
						<div
							className="post"
							onClick={() => {
								navigate(`post/${value.id}`);
							}}
						>
							<h2 className="title"> {value.title}</h2>
							<div className="body">{value.postText}</div>
						</div>
						<Link
						to={`/profile/${value.UserId}`} className="usernameLink">
                                    {value.username}
                                </Link>

						<ThumbUpRounded
							className={
								likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"
							}
							onClick={() => likeAPost(value.id)}
						/>
						<span>{value.Likes ? value.Likes.length : 0}</span>
					</div>
				))}
		</div>
	);
};
export default Home;
