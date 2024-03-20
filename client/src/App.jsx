import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home.";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
const App = () => {
	return (
		<Router>
			<div>
				<div className="navbar">
					<Link to="/"> Home Page</Link>
					<Link to="/createpost"> Create A Post</Link>
					<Link to="/login">login</Link>
					<Link to="/registration">registration</Link>
				</div>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/createpost" element={<CreatePost />} />
					<Route path="/post/:id" element={<Post />} />
					<Route path="/login" element={<Login />} />
					<Route path="/registration" element={<Registration />} />
				</Routes>
			</div>
		</Router>
	);
};
export default App;
