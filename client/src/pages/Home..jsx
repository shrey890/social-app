import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Home = () => {
	const [postsList, setPostsList] = useState([]);
	const navigate = useNavigate()
	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const res = await axios.get("http://localhost:3000/posts");
				setPostsList(res.data);
			} catch (error) {
				console.error("Error fetching posts:", error);
			}
		};
		fetchPosts();
	}, []);
	return (
		<div className="App">
			
			{postsList.map((value, key) => (
				<div className="post" key={value.id} onClick={()=>{navigate(`post/${value.id}`)}}>
					<h2 className="title"> {value.title}</h2>
					<div className="body">{value.postText}</div>
					<div className="footer">{value.username}</div>
				</div>
			))}
		</div>
	);
};
export default Home;
