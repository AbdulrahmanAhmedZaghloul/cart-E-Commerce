import React, { useContext, useState } from "react";
import { Helmet } from 'react-helmet-async';
import iconimage from "../../image/avataaars.svg";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import imageLogin from "../../image/update.jpg"

function UpdateUser() {
    let { setUserLogin } = useContext(UserContext);
    let navigate = useNavigate("");
    const [api, setApi] = useState('');
    const [loading, setLoading] = useState(false);
    let validationSchema = yup.object().shape({
        name: yup.string().min(3, "Name min length is 3").max(20, "Name max length is 20").required("Name is required"),
        email: yup.string().email("Email is invalid").required("Email is required"),
        phone: yup.string().matches(/^01[0125][0-9]{8}$/, "Phone must be a valid Egyptian number").required("Phone is required"),
    });
    let formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: ""
        },
        validationSchema,
        onSubmit: handleLogin,
    });
    let headers = {
        token: localStorage.getItem("userToken")
    }
    async function handleLogin(values) {
        setLoading(true);
        try {
            const apiResponse = await axios.put(
                'https://ecommerce.routemisr.com/api/v1/users/updateMe/',
                values,
                { headers }
            );
            console.log(apiResponse);
            if (apiResponse?.data?.message === 'success') {
                localStorage.setItem("userToken", apiResponse?.data?.token);
                setUserLogin(apiResponse?.data?.token);
                navigate('/home');
            }
        }
        catch (error) {
            console.error("Request failed with status code:", error.response.status);
            console.error("Error response data:", error.response.data);
            setApi(error?.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <React.Fragment>
            <Helmet>
                <link rel="icon" href={iconimage} />
                <title>ChangePassword</title>
            </Helmet>
            <div className="bg-[#fff] container flex justify-center items-start mx-auto">
            <div className="md:w-1/2 md:flex justify-between items-center hidden">
                            <img className="w-10/12" src={imageLogin} alt="" />
                        </div>
                <form onSubmit={formik.handleSubmit} className=" w-[50%] md:w-1/2 relative py-5 mt-9 ">
                    {api ? <div className="absolute top-[50%] z-[35162776] right-0 p-4 my-1 text-sm w-1/5 mx-auto text-red-800 rounded-lg bg-red-100" role="alert">
                        <span className="font-extrabold mx-2">x</span>{api} <span className="mx-2 font-extrabold">x</span></div> : null}

                    <div className="relative z-0 w-11/12 mx-auto py-6 group">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="text-start block px-0 w-full text-sm font text-black-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                            placeholder=""
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                        <label
                            htmlFor="name"
                            className="peer-focus: absolute text-sm text-gray-500 duration-300 scale-75 top-1 -z-10 origin-[0] left-0 peer-focus:start-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                        >
                            User Name:
                        </label>
                        {formik.errors.name && formik.touched.name ? (
                            <div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
                                <span className="font-semibold text-start flex justify-start">{formik.errors.name}</span>
                            </div>
                        ) : null}
                    </div>

                    <div className="relative z-0 w-11/12 mx-auto py-6 group">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="text-start block px-0 w-full text-sm font text-black-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                            placeholder=""
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        <label
                            htmlFor="email"
                            className="peer-focus: absolute text-sm text-gray-500 duration-300 scale-75 top-1 -z-10 origin-[0] left-0 peer-focus:start-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                        >
                            Email:
                        </label>
                        {formik.errors.email && formik.touched.email ? (
                            <div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
                                <span className="font-semibold text-start flex justify-start">{formik.errors.email}</span>
                            </div>
                        ) : null}
                    </div>

                    <div className="relative z-0 w-11/12 mx-auto py-6 group">
                        <input
                            type="tel"
                            name="phone"
                            id="phone"
                            className="text-start block px-0 w-full text-sm font text-black-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                            placeholder=""
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.phone}
                        />
                        <label
                            htmlFor="phone"
                            className="peer-focus: absolute text-sm text-gray-500 duration-300 scale-75 top-1 -z-10 origin-[0] left-0 peer-focus:start-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                        >
                            Phone:
                        </label>
                        {formik.errors.phone && formik.touched.phone ? (
                            <div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
                                <span className="font-semibold text-start flex justify-start">{formik.errors.phone}</span>
                            </div>
                        ) : null}
                    </div>


                    <div className="flex items-center">
                        {loading ? <button className="bg-[#1ABC9C] font-normal text-white flex justify-center items-center my-5 px-4">
                            <i className="fas fa-spinner fa-spin mx-3"></i> <span className="font-bold">Please wait</span>
                        </button> : <button type="submit" className="bg-[#1ABC9C] font-normal text-white flex justify-center items-center px-3 py-1 my-5">
                            Submit
                        </button>}
                     
                    </div>
                </form>
            </div>


        </React.Fragment>
    );
}

export default UpdateUser