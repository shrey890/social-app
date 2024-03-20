import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const Post = () => {
	let { id } = useParams();
	const [postObj, setPostObj] = useState({});
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState("");
	useEffect(() => {
		axios.get(`http://localhost:3000/posts/byId/${id}`).then((res) => {
			setPostObj(res.data);
		});
		axios.get(`http://localhost:3000/comments/${id}`).then((res) => {
			setComments(res.data);
		});
	}, []);
	const addComment = () => {
		axios.post(
				`http://localhost:3000/comments`,
				{
					commentBody: newComment,
					PostId: id,
				},
				{
					headers: {
						accessToken: sessionStorage.getItem("accessToken"),
					},
				}
			)
			.then((res) => {
				if (res.data.error) {
					console.log(res.data.error)
				} else {
					const commentToAdd = { commentBody: newComment };
					setComments([...comments, commentToAdd]);
					setNewComment("");
				}
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
							{comment.commentBody}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
export default Post;
