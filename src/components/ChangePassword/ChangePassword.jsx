import React, { useContext, useState } from "react";
import { Helmet } from 'react-helmet-async';
import iconimage from "../../image/avataaars.svg";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
// import {Confetti} from"react-confetti";
import imageLogin from "../../image/register (2).jpg"

export default function ChangePassword() {
    let { setUserLogin } = useContext(UserContext);
    let navigate = useNavigate("");
    const [api, setApi] = useState('');
    const [lodeing, setLodeing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    let validationSchema = yup.object().shape({
        currentPassword: yup.string().matches(/^(?=.*[a-zA-Z])(?=.*\d{1,4})[a-zA-Z\d]{8,12}$/, "Password must start with an uppercase letter and be 8-12 characters long").required("Current password is required"),
        password: yup.string().matches(/^(?=.*[a-zA-Z])(?=.*\d{1,4})[a-zA-Z\d]{8,12}$/, "Password must start with an uppercase letter and be 8-12 characters long").required("New password is required"),
        rePassword: yup.string().oneOf([yup.ref("password")], "Password and confirmation must match").required("Confirmation password is required"),
    });

    let formik = useFormik({
        initialValues: {
            currentPassword: "",
            password: "",
            rePassword: ""
        },
        validationSchema,
        onSubmit: handleLogin,
    });
    let headers = {
        token: localStorage.getItem("userToken")
    }
    async function handleLogin(values) {
        setLodeing(true);


        try {
            const apiResponse = await axios.put(
                'https://ecommerce.routemisr.com/api/v1/users/changeMyPassword',
                values,
                { headers }
            );
            console.log(apiResponse);
            if (apiResponse?.data?.message === 'success') {
                localStorage.setItem("userToken", apiResponse?.data?.token);
                setUserLogin(apiResponse?.data?.token);
                // setShowConfetti(true);  // Show confetti on successsetTimeout(() => {

                setTimeout(() => {
                    navigate('/home');
                }, 2000);
            }
        }
        catch (error) {
            console.error("Request failed with status code:", error.response.status);
            console.error("Error response data:", error.response.data);
            setApi(error?.response?.data?.
                errors.msg
                || "Something went wrong.");
            // navigate('/login');

        } finally {
            setLodeing(false);
        }
    }

    return (
        <React.Fragment>
            <Helmet>
                <link rel="icon" href={iconimage} />
                <title>ChangePassword</title>
            </Helmet>
            <div className="bg-[#fff] container flex flex-col justify-start items-center mt-5 w-full mx-auto">
                <div className="container flex justify-center items-center py-6">
                    <div className="md:w-1/2 md:flex justify-between items-center hidden">
                        <img className="w-10/12" src={imageLogin} alt="" />
                    </div>
                    <form onSubmit={formik.handleSubmit} className="md:w-1/2 w-full relative px-6 md:py-0 py-9">
                        {api && <div className="fixed top-[20%] right-0 p-4 my-1 text-sm w-1/3 z-50 mx-auto text-red-800 rounded-lg bg-red-100" role="alert">
                            <span className="font-extrabold mx-2"></span>{api} <span className="mx-2 font-extrabold">x</span>
                        </div>}
                        {/* Current Password */}
                        <div className="relative z-0 mx-auto py-7 group">
                            <div className="relative">
                                <input
                                    type="password"
                                    name="currentPassword"
                                    id="currentPassword"
                                    className="text-start block px-0 w-full text-sm font text-black-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                                    placeholder=""
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.currentPassword}
                                />

                            </div>
                            <label
                                htmlFor="currentPassword"
                                className="peer-focus: absolute text-sm text-gray-500 duration-300 scale-75 top-1 -z-10 origin-[0] left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                            >
                                Current Password:
                            </label>
                            {formik.errors.currentPassword && formik.touched.currentPassword && (
                                <div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
                                    <span className="font-semibold text-start flex justify-start">{formik.errors.currentPassword}</span>
                                </div>
                            )}
                        </div>

                        {/* New Password */}
                        <div className="relative z-0 mx-auto py-7 group">
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    className="text-start block px-0 w-full text-sm font text-black-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                                    placeholder=""
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                />
                                <span
                                    className="absolute right-0 bottom-1 cursor-pointer text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                                </span>
                            </div>
                            <label
                                htmlFor="password"
                                className="peer-focus: absolute text-sm text-gray-500 duration-300 scale-75 top-1 -z-10 origin-[0] left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                            >
                                New Password:
                            </label>
                            {formik.errors.password && formik.touched.password && (
                                <div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
                                    <span className="font-semibold text-start flex justify-start">{formik.errors.password}</span>
                                </div>
                            )}
                        </div>

                        {/* Confirm New Password */}
                        <div className="relative z-0 mx-auto py-7 group">
                            <div className="relative">
                                <input
                                    type="password"
                                    name="rePassword"
                                    id="rePassword"
                                    className="text-start block px-0 w-full text-sm font text-black-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                                    placeholder=""
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.rePassword}
                                />

                            </div>
                            <label
                                htmlFor="rePassword"
                                className="peer-focus: absolute text-sm text-gray-500 duration-300 scale-75 top-1 -z-10 origin-[0] left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                            >
                                Confirm New Password:
                            </label>
                            {formik.errors.rePassword && formik.touched.rePassword && (
                                <div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
                                    <span className="font-semibold text-start flex justify-start">{formik.errors.rePassword}</span>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={lodeing}
                            className="text-white mt-6 bg-green-600 w-fit mx-auto block focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            {lodeing ? <i className="fas fa-spinner fa-spin"></i> : "Change Password"}
                        </button>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
}
