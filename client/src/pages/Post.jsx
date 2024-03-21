import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import DeleteRounded from "@mui/icons-material/DeleteRounded";
const Post = () => {
	let { id } = useParams();
	const [postObj, setPostObj] = useState({});
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState("");
	const { authState } = useContext(AuthContext);
	const navigate = useNavigate();
	useEffect(() => {
		axios.get(`http://localhost:3000/posts/byId/${id}`).then((res) => {
			setPostObj(res.data);
		});
		axios.get(`http://localhost:3000/comments/${id}`).then((res) => {
			setComments(res.data);
		});
	}, [id]);
	const addComment = () => {
		axios
			.post(
				`http://localhost:3000/comments`,
				{
					commentBody: newComment,
					PostId: id,
				},
				{
					headers: {
						accessToken: localStorage.getItem("accessToken"),
					},
				}
			)
			.then((res) => {
				if (res.data.error) {
					console.log(res.data.error);
				} else {
					const commentToAdd = {
						commentBody: newComment,
						username: res.data.username,
					};
					setComments([...comments, commentToAdd]);
					setNewComment("");
				}
			});
	};
	const deleteComment = (id) => {
		axios
			.delete(`http://localhost:3000/comments/${id}`, {
				headers: {
					accessToken: localStorage.getItem("accessToken"),
				},
			})
			.then(() => {
				setComments(
					comments.filter((val) => {
						return val.id !== id;
					})
				);
			})
			.catch((error) => {
				console.error("Error deleting comment:", error);
				alert("Failed to delete comment. Please try again later.");
			});
	};
	const deletePost = (id) => {
		try {
			axios.delete(`http://localhost:3000/posts/${id}`, {
				headers: {
					accessToken: localStorage.getItem("accessToken"),
				},
			});
			navigate("/");
			alert("post deleted successfully");
		} catch (error) {
			console.log("error deleting post:", error);
		}
	};
	const editPost = (option) => {
		if (option === "title") {
			let newTitle = prompt("Enter new title");
			axios.put(
				`http://localhost:3000/posts/title`,
				{
					newTitle: newTitle,
					id: id
				},
				{
					headers: {
						accessToken: localStorage.getItem("accessToken")
					}
				}
			)
			.then(() => {
				setPostObj({ ...postObj, title: newTitle });
			})
			.catch((error) => {
				console.error("Error updating title:", error);
				alert("Failed to update title. Please try again later.");
			});
		} else if (option === "postText") { 
			let newText = prompt("Enter new post text");
			axios.put(
				'http://localhost:3000/posts/postText',
				{
					postText: newText,
					id: id
				},
				{
					headers: {
						accessToken: localStorage.getItem("accessToken")
					}
				}
			)
			.then(() => {
				setPostObj({ ...postObj, postText: newText });
			})
			.catch((error) => {
				console.error("Error updating post text:", error);
				alert("Failed to update post text. Please try again later.");
			});
		}
	};
	
	
	return (
		<div className="postPage">
			<div className="leftSide">
				<div className="post" id="individual">
					<h2
						onClick={() => {
							if (authState.username === postObj.username) {
								editPost("title");
							}
						}}
						className="title"
					>
						{postObj.title}
					</h2>
					<p 	onClick={() => {
							if (authState.username === postObj.username) {
								editPost("postText");
							}
						}} className="body">
						{postObj.postText}
					</p>
					<p className="footer">{postObj.username}</p>
					{authState.username === postObj.username && (
						<DeleteRounded onClick={() => deletePost(postObj.id)} />
					)}
				</div>
			</div>
			<div className="rightSide">
				<div className="addCommentContainer">
					<input
						type="text"
						autoComplete="off"
						value={newComment}
						onChange={(e) => setNewComment(e.target.value)}
						placeholder="comments"
					/>
					<button onClick={addComment}>Add Comments</button>
				</div>
				<div className="listOfComments">
					{comments.map((comment, key) => (
						<div className="comment" key={key}>
							<label htmlFor="">
								<b>{comment.username} - </b>
							</label>
							{comment.commentBody}
							<span>
								{authState.username === comment.username && (
									<button onClick={() => deleteComment(comment.id)}>❌</button>
								)}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
export default Post;
