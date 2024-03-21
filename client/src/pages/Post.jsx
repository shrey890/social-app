import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const Post = () => {
	let { id } = useParams();
	const [postObj, setPostObj] = useState({});
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState("");
	const { authState } = useContext(AuthContext);
	useEffect(() => {
		axios.get(`http://localhost:3000/posts/byId/${id}`).then((res) => {
			setPostObj(res.data);
		});
		axios.get(`http://localhost:3000/comments/${id}`).then((res) => {
			setComments(res.data);
		});
	}, []);
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
		
		axios.delete(`http://localhost:3000/comments/${id}`, {
				headers: {
					accessToken: localStorage.getItem("accessToken"),
				},
			})
			.then(() => {
				setComments(comments.filter((val)=>{
					return val.id!==id
				}));
			})
			.catch((error) => {
				console.error("Error deleting comment:", error);
				alert("Failed to delete comment. Please try again later.");
			});
	};
	return (
		<div className="postPage">
			<div className="leftSide">
				<div className="post" id="individual">
					<h2 className="title">{postObj.title}</h2>
					<p className="body">{postObj.postText}</p>
					<p className="footer">{postObj.username}</p>
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
