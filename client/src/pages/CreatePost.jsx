import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
const CreatePost = () => {
	const navigate = useNavigate();
	const { authState } = useContext(AuthContext);
	useEffect(() => {
		if (!localStorage.getItem('accessToken')) {
			navigate("/login");
		}
	}, []);
	const initialValue = {
		title: "",
		postText: "",
	};
	const validationSchema = Yup.object().shape({
		title: Yup.string().required(),
		postText: Yup.string().required(),
	});
	const onSubmit = async (data) => {
		await axios.post("http://localhost:3000/posts", data, {
			headers: { accessToken: localStorage.getItem("accessToken") },
		});
		navigate("/");
	};
	return (
		<div className="createPostPage">
			<Formik
				initialValues={initialValue}
				onSubmit={onSubmit}
				validationSchema={validationSchema}
			>
				<Form className="formContainer">
					<label htmlFor="">title</label>
					<ErrorMessage name="title" component="span" />
					<Field id="inputCreatePost" name="title" placeholder="title" />
					<label htmlFor="">Post</label>
					<ErrorMessage name="postText" component="span" />
					<Field id="inputCreatePost" name="postText" placeholder="Post" />
					<button type="submit">Submit</button>
				</Form>
			</Formik>
		</div>
	);
};
export default CreatePost;
