import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState(null);
  const [message, setMessage] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const response = res.data;

      if (response.message === "User Login successfully") {
        setResponse(response.message);
        console.log(response.message);

        navigate("/user");
      } else if (response.message === "Admin Login successfully") {
        setMessage(response.message);
        console.log(response.message);
        navigate("/admin");
      } else if (response.status === 400) {
        setMessage("Invalid Credentials");
        ("Invalid Credentials");
      }
    } catch (error) {
      console.error(error);
      setMessage("Invalid Credentials");
    }
  };

  return (
    <>
      <div className="login">
        <div className="flex flex-col justify-center items-center h-dvh">
          <div className="border-2 p-5 rounded-2xl">
            <form onSubmit={handleLogin}>
              <div>
                <h1 className="!text-4xl font-bold text-center mb-3">
                  LoginPage
                </h1>
              </div>
              {message && (
                <div
                  className={`p-2 rounded-md text-center font-semibold ${
                    message.includes("successfully")
                      ? "bg-blue-300"
                      : "bg-red-300"
                  }`}
                >
                  {message}
                </div>
              )}

              <div className="flex flex-col mb-2">
                <label htmlFor="email">
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  value={email}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="border border-gray-300 rounded-md"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="password">
                  Password<span className="text-red-500">*</span>
                </label>
                <input
                  value={password}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your Password"
                  className="border border-gray-300 rounded-md"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="border border-gray-700 cursor-pointer w-full mt-2 rounded-md"
              >
                Submit
              </button>
              <div className="mt-2">
                <span>
                  Already Registered?{" "}
                  <Link to="/" className="text-blue-800">
                    Go to Register
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
