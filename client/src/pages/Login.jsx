import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const Login = () => {
  const {setAuthState} = useContext(AuthContext);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setError] = useState("");
	const navigate = useNavigate();
  const login = () => {
    const data = { username: username, password: password };
    axios.post(`http://localhost:3000/auth/login`, data)
        .then((res) => {
            if (res.data.error) {
                setError(res.data.error);
            } else {
                localStorage.setItem("accessToken", res.data.token);
                setAuthState({
                  username:username,
                  id:res.data.id,
                  status:true
                })
                navigate("/"); 
            }
        })
        .catch((error) => {
            console.error("An error occurred during login:", error);
            setError("An error occurred. Please try again later.");
        });
};

	return (
		<div className="createPostPage">
			<input
				onChange={(e) => setUsername(e.target.value)}
				type="text"
				placeholder="username"
			/>
			<input
				onChange={(e) => setPassword(e.target.value)}
				type="password"
				placeholder="password"
			/>
			<button onClick={login}>submit</button>
		</div>
	);
};
export default Login;
