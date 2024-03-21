import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ThumbUpRounded from "@mui/icons-material/ThumbUpRounded";
const Home = () => {
	const [postsList, setPostsList] = useState([]);
	const [likedPosts ,setLikedPosts] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const res = await axios.get("http://localhost:3000/posts",{
					headers: { accessToken: localStorage.getItem("accessToken") },
				});
				setPostsList(res.data.postsList);	
				setLikedPosts(res.data.likedPosts);
			} catch (error) {
				console.error("Error fetching posts:", error);
			}
		};
		fetchPosts();
	}, []);
	const likeAPost = (postId) => {
		axios
			.post(
				"http://localhost:3000/like",
				{
					PostId: postId,
				},
				{
					headers: { accessToken: localStorage.getItem("accessToken") },
				}
			)
			.then((response) => {
				setPostsList(
					postsList.map((post) => {
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
			});
	};
	return (
		<div className="App">
			{postsList.map((value) => (
				<div key={value.id}>
					<div
						className="post"
						onClick={() => {
							navigate(`post/${value.id}`);
						}}
					>
						<h2 className="title"> {value.title}</h2>
						<div className="body">{value.postText}</div>
						<div className="footer">{value.username}</div>
					</div>
					<ThumbUpRounded onClick={() => likeAPost(value.id)}/>

					<span>{value.Likes.length}</span>
				</div>
			))}
		</div>
	);
};
export default Home;
