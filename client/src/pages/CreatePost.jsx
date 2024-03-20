import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
const CreatePost = () => {
	const navigate=  useNavigate()
	const initialValue = {
		title: "",
		postText: "",
		username: "",
	};
	
	const validationSchema = Yup.object().shape({
		title: Yup.string().required(),
		postText: Yup.string().required(),
		username: Yup.string().min(3).max(25).required(),
	});
	const onSubmit = async(data) => {
        const res = await axios.post("http://localhost:3000/posts",data);
        console.log(res.data);
		navigate('/')
	};
	return (
		<div className="createPostPage">
			<Link to="/">Home</Link>
			<Formik
				initialValues={initialValue}
				onSubmit={onSubmit}
				validationSchema={validationSchema}
			>                                 
				<Form className="formContainer">
					<label htmlFor="">title</label>
                    <ErrorMessage name='title' component='span'/>
					<Field id="inputCreatePost" name="title" placeholder="title" />
					<label htmlFor="">Post</label>
                    <ErrorMessage name='postText' component='span'/>

					<Field id="inputCreatePost" name="postText" placeholder="Post" />
					<label htmlFor="">username</label>
                    <ErrorMessage name='username' component='span'/>

					<Field id="inputCreatePost" name="username" placeholder="username" />
					<button type="submit">Submit</button>
				</Form>
			</Formik>
		</div>
	);
};
export default CreatePost;
