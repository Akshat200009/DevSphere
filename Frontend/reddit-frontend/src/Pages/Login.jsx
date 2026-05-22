import { useState } from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import API from "../Services/Api";

function Login() {

    const navigate = useNavigate();

    // STATES

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    // LOGIN

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                const response =
                    await API.post(
                        "/auth/login",
                        {
                            email,
                            password
                        }
                    );

                // SAVE TOKEN

                localStorage.setItem(
                    "token",
                    response.data.token
                );

                // SAVE USER INFO

                localStorage.setItem(
                    "username",
                    response.data.username
                    || "Akshat"
                );

                localStorage.setItem(
                    "email",
                    email
                );

                alert(
                    "Login Successful 🚀"
                );

                navigate("/");

            } catch (error) {

                console.log(error);

                alert(
                    "Invalid Credentials"
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

            {/* LOGIN CARD */}

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

                {/* HEADER */}

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

                        Welcome Back 👋

                    </h1>

                    <p className="
                        text-gray-500
                        text-lg
                    ">

                        Login to continue your
                        DevSphere journey

                    </p>

                </div>

                {/* FORM */}

                <form
                    onSubmit={
                        handleSubmit
                    }
                >

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
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
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
                                placeholder:text-gray-400
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
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
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
                                placeholder:text-gray-400
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

                        Login

                    </button>

                </form>

                {/* FOOTER */}

                <p className="
                    text-center
                    text-gray-500
                    mt-8
                ">

                    Don’t have an account?

                    <Link
                        to="/register"
                        className="
                            text-orange-500
                            ml-2
                            font-semibold
                            hover:underline
                        "
                    >

                        Register

                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Login;