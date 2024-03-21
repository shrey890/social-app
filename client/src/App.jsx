import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home.";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import axios from "axios";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
const App = () => {
	const [authState, setAuthState] = useState({
		username: "",
		id: 0,
		status: false,
	});
	useEffect(() => {
		axios
			.get("http://localhost:3000/auth/auth", {
				headers: {
					accessToken: localStorage.getItem("accessToken"),
				},
			})
			.then((res) => {
				if (res.data.error) {
					setAuthState({ ...authState, status: false });
				} else {
					setAuthState({
						username: res.data.username,
						id: res.data.id,
						status: true,
					});
				}
			});
	}, []);
	const logout = () => {
		localStorage.removeItem("accessToken");
		setAuthState({ username: "", id: 0, status: false });
	};
	return (
		<AuthContext.Provider value={{ authState, setAuthState }}>
			<Router>
				<div>
					<div className="navbar">
						<div className="links">
							{!authState.status ? (
								<>
									<Link to="/login"> Login</Link>
									<Link to="/registration"> Registration</Link>
								</>
							) : (
								<>
									<Link to="/"> Home</Link>
									<Link to="/createpost"> Create A Post</Link>
								</>
							)}
						</div>
						<div className="loggedInContainer">
							<h1>{authState.username} </h1>
							{authState.status && <button onClick={logout}> Logout</button>}
						</div>
					</div>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/createpost" element={<CreatePost />} />
						<Route path="/post/:id" element={<Post />} />
						<Route path="/login" element={<Login />} />
						<Route path="/registration" element={<Registration />} />
						<Route path="*" element={<PageNotFound />} />
						<Route path="/changepass" element={<ChangePassword/>} />
						<Route path="/profile/:id" element={<Profile />} />
					</Routes>
				</div>
			</Router>
		</AuthContext.Provider>
	);
};
export default App;
