import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
const Registration = () => {
	const navigate = useNavigate();
	const initialValue = {
		username: "",
		password: "",
	};
	const validationSchema = Yup.object().shape({
		username: Yup.string().min(3).max(25).required(),
		password: Yup.string().min(4).max(25).required(),
	});
	const onSubmit = (data) => {
            axios.post(`http://localhost:3000/auth`, data).the(()=>{
                console.log(data)
                navigate('/login')
            })
    };
	return (
		<div className="createPostPage">
			<Formik
				initialValues={initialValue}
				onSubmit={onSubmit}
				validationSchema={validationSchema}
			>
				<Form className="formContainer">
					<label htmlFor="">username</label>
					<ErrorMessage name="username" component="span" />
					<Field id="inputCreatePost" name="username" placeholder="username" />
					<label htmlFor="">password</label>
					<ErrorMessage name="password" component="span" />
					<Field id="inputCreatePost" type='password' name="password" placeholder="password" />
					<button type="submit">Register</button>
				</Form>
			</Formik>
		</div>
	);
};
export default Registration;
