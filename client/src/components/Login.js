import React, { useState } from 'react'
import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';
import { Toaster } from "react-hot-toast"
import axios from 'axios';

const Login = () => {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);
        console.log(username, password);
        if (!username || !password) {
            setLoading(false);
            return;
        }
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                "http://localhost:5531/api/v1/login",
                {
                    username,
                    password,
                },
                config
            );
            console.log("here", data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/todos");
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        // <div className="">
        <Card color="#0f172a" shadow={false} className="items-center p-10">
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <Typography variant="h4" className='text-center' color="blue-gray">
                Sign In
            </Typography>
            <Typography color="gray" className="mt-1 text-center font-normal">
                Welcome Back !!!
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
                <div className="mb-1 flex flex-col gap-5">
                    <Input
                        size="lg"
                        placeholder="JohnDoe"
                        label='Username'
                        onChange={(e) => {
                            setUserName(e.target.value)
                        }}
                        value={username}
                    />
                    <Input
                        type="password"
                        size="lg"
                        placeholder="********"
                        label='Password'
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        value={password}
                    />
                </div>
                <Button type='submit' className="mt-6 hover:bg-indigo-500" fullWidth disabled={loading}>
                    Sign In
                </Button>
                <Typography color="gray" className="mt-4 text-center font-normal">
                    Not a member ?{" "}
                    <Link to="/signup" className="font-medium text-indigo-600">
                        Sign Up
                    </Link>
                </Typography>
            </form>
        </Card>
        // </div>
    )
}

export default Login