import React, { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { supabase } from "../../config";

function Login() {
  const [formField, setFormField] = useState({
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormField(() => {
      return {
        ...formField,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formField);
    try {
      if (!formField.email || !formField.password) {
        toast.error("Email or password field are empty");
        return;
      }
      const {error } = await supabase.auth.signInWithPassword({
        email: formField.email,
        password: formField.password,
      });
      if (error) {
        throw error;
      }

      setFormField({
        name: "",
        email: "",
        password: "",
      });

      navigate("/");
      toast.success("User Login Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const navigate = useNavigate();
  return (
    <section className="bg-black h-screen w-full flex items-center justify-center">
      <div className="bg-white px-10 py-5 backdrop-blur-2xl text-black rounded-lg">
        <h1 className="my-2 text-center font-bold text-2xl">Login</h1>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="email" className="flex flex-col ">
            Email
            <input
              type="text"
              id="email"
              name="email"
              value={formField.email}
              onChange={onChangeInput}
              className="outline-none border py-1 px-2 my-2 "
            />
          </label>
          <div className="relative">
            <label htmlFor="password" className="flex flex-col">
              password
              <input
                type={showPass ? "text" : "password"}
                name="password"
                value={formField.password}
                onChange={onChangeInput}
                className="outline-none border py-1 px-2 mt-2 "
              />
            </label>
            <div className="absolute top-10 right-1 cursor-pointer">
              {showPass ? (
                <IoMdEyeOff onClick={() => setShowPass(!showPass)} />
              ) : (
                <IoMdEye onClick={() => setShowPass(!showPass)} />
              )}
            </div>
          </div>
          <p className="text-xs my-2" onClick={()=>navigate("/forget-password")}>Forget Password?</p>
          <button
            type="submit"
            className="py-2 bg-black text-white w-full cursor-pointer hover:border hover:text-black hover:bg-white"
          >
            Login
          </button>
        </form>
        <p className="text-xs mt-2">
          you don't have an account?
          <span
            className="hover:underline cursor-pointer"
            onClick={() => navigate("/Register")}
          >
            Register here
          </span>
        </p>
      </div>
    </section>
  );
}

export default Login;
