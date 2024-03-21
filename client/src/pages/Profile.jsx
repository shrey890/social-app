import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Button } from "@mui/material";
// import Link from '@mui/material/Link';

const Profile = () => {
	let { id } = useParams();
	const [userData, setUserData] = useState(null);
	const [listOfPosts, setlistOfPosts] = useState([]);
	const navigate = useNavigate();
	const { authState } = useContext(AuthContext);
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3000/auth/basicInfo/${id}`
				);
				setUserData(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchUser();
		axios.get(`http://localhost:3000/posts/byuserId/${id}`).then((res) => {
			setlistOfPosts(res.data);
		});
	}, [id]);
	return (
		<div className="profilePageContainer">
			<div className="basicInfo">
				{userData ? (
					<div>
						<h1>{userData.username}</h1>
						<h3>since {userData.createdAt}</h3>
						{authState.username === userData.username && (
							<Link underline="hover" to='/changepass'>
                            <Button variant='contained'>change password</Button>
                            </Link>
						)}
					</div>
				) : (
					<p>Loading...</p>
				)}
			</div>
			<div className="listOfPosts">
				{listOfPosts &&
					listOfPosts.map((value) => (
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
							<span>likes - {value.Likes ? value.Likes.length : 0}</span>
						</div>
					))}
			</div>
		</div>
	);
};
export default Profile;
