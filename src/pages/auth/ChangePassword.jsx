import React, { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { supabase } from "../../config";

function ChangePassword() {
  const [formField, setFormField] = useState({
    password: "",
    confirmPassword:"",
  });
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
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
      if (!formField.confirmPassword || !formField.password) {
        toast.error("password and confirmPassword field are empty");
        return;
      }
    //   if (formField.password === formField.confirmPassword) {
    //     toast.error("password and confirmPassword must be same");
    //     return;
    //   }
    //   const {error } = await supabase.auth.signInWithPassword({
    //     email: formField.email,
    //     password: formField.password,
    //   });
    //   if (error) {
    //     throw error;
    //   }

    const response = await supabase.auth.updateUser({password:formField.password})
      setFormField({
        password: "",
        confirmPassword:""
      });

      navigate("/Login");
      toast.success("Password Updated");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const navigate = useNavigate();
  return (
     <section className="bg-black h-screen w-full flex items-center justify-center">
          <div className="bg-white px-10 py-5 backdrop-blur-2xl text-black rounded-lg">
            <h1 className="my-2 text-center font-bold text-2xl">Change Password</h1>
            <form action="" onSubmit={handleSubmit}>
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
               <div className="relative">
                <label htmlFor="password" className="flex flex-col">
                  Confirm Password
                  <input
                    type={showPass2 ? "text" : "password"}
                    name="confirmPassword"
                    value={formField.confirmPassword}
                    onChange={onChangeInput}
                    className="outline-none border py-1 px-2 my-2 "
                  />
                </label>
                <div className="absolute top-10 right-1 cursor-pointer">
                  {showPass2 ? (
                    <IoMdEyeOff onClick={() => setShowPass2(!showPass2)} />
                  ) : (
                    <IoMdEye onClick={() => setShowPass2(!showPass2)} />
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="py-2 bg-black text-white w-full cursor-pointer hover:border hover:text-black hover:bg-white"
              >
                Change Password
              </button>
            </form>
          </div>
        </section>
  )
}

export default ChangePassword