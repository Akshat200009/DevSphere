import { useEffect, useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import API from "../Services/Api";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] =
        useState({
            name: "",
            email: "",
            password: ""
        });

    // AUTO REDIRECT

    useEffect(() => {

        const token =
            localStorage.getItem(
                "token"
            );

        if (token) {

            navigate("/");
        }

    }, []);

    // HANDLE CHANGE

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value
        });
    };

    // REGISTER

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                const response =
                    await API.post(
                        "/auth/register",
                        formData
                    );

                alert(response.data);

                navigate("/login");

            } catch (error) {

                console.log(error);

                alert(
                    "Registration failed"
                );
            }
        };

    return (

        <div className="
            min-h-screen
            bg-[#F6F7F8]
            flex
            justify-center
            items-center
            px-4
        ">

            {/* REGISTER CARD */}

            <div className="
                bg-white
                w-full
                max-w-md
                p-10
                rounded-3xl
                shadow-xl
                border
                border-gray-100
            ">

                {/* TITLE */}

                <div className="
                    text-center
                    mb-10
                ">

                    <h1 className="
                        text-5xl
                        font-bold
                        mb-4
                        text-gray-900
                    ">

                        Create Account 🚀

                    </h1>

                    <p className="
                        text-gray-500
                        text-lg
                    ">

                        Join DevSphere and
                        start exploring

                    </p>

                </div>

                {/* FORM */}

                <form
                    onSubmit={
                        handleSubmit
                    }
                >

                    {/* NAME */}

                    <div className="
                        mb-6
                    ">

                        <label className="
                            block
                            mb-2
                            font-semibold
                            text-gray-700
                            text-left
                        ">

                            Name

                        </label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter Name"
                            value={
                                formData.name
                            }
                            onChange={
                                handleChange
                            }
                            className="
                                w-full
                                border
                                border-gray-300
                                p-4
                                rounded-2xl
                                outline-none
                                focus:border-orange-500
                                text-left
                                placeholder:text-left
                            "
                        />

                    </div>

                    {/* EMAIL */}

                    <div className="
                        mb-6
                    ">

                        <label className="
                            block
                            mb-2
                            font-semibold
                            text-gray-700
                            text-left
                        ">

                            Email

                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            value={
                                formData.email
                            }
                            onChange={
                                handleChange
                            }
                            className="
                                w-full
                                border
                                border-gray-300
                                p-4
                                rounded-2xl
                                outline-none
                                focus:border-orange-500
                                text-left
                                placeholder:text-left
                            "
                        />

                    </div>

                    {/* PASSWORD */}

                    <div className="
                        mb-8
                    ">

                        <label className="
                            block
                            mb-2
                            font-semibold
                            text-gray-700
                            text-left
                        ">

                            Password

                        </label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={
                                formData.password
                            }
                            onChange={
                                handleChange
                            }
                            className="
                                w-full
                                border
                                border-gray-300
                                p-4
                                rounded-2xl
                                outline-none
                                focus:border-orange-500
                                text-left
                                placeholder:text-left
                            "
                        />

                    </div>

                    {/* BUTTON */}

                    <button
                        type="submit"
                        className="
                            w-full
                            bg-orange-500
                            hover:bg-orange-600
                            text-white
                            p-4
                            rounded-2xl
                            text-lg
                            font-semibold
                            transition
                        "
                    >

                        Register

                    </button>

                </form>

                {/* FOOTER */}

                <p className="
                    text-center
                    text-gray-500
                    mt-8
                ">

                    Already have an account?

                    <Link
                        to="/login"
                        className="
                            text-orange-500
                            ml-2
                            font-semibold
                            hover:underline
                        "
                    >

                        Login

                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Register;