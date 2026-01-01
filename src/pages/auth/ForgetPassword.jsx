import React, { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { supabase } from "../../config";

export default function ForgetPassword() {
  const [formField, setFormField] = useState({
    email: "",
  });
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
      if (!formField.email) {
        toast.error("Email field is empty");
        return;
      }
      const { error } = await supabase.auth.resetPasswordForEmail(formField.email,{
        redirectTo:process.env.REACT_APP_URL
      });
      if (error) {
        throw error;
      }

      setFormField({
        email: "",
      });

      navigate("/update-password");
      toast.success("Email Confirm, Please Change the password");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const navigate = useNavigate();
  return (
    <section className="bg-black h-screen w-full flex items-center justify-center">
      <div className="bg-white px-10 py-5 backdrop-blur-2xl text-black rounded-lg">
        <h1 className="my-2 text-center font-bold text-2xl">Forget Password</h1>
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
          <button
            type="submit"
            className="py-2 bg-black text-white w-full cursor-pointer hover:border hover:text-black hover:bg-white"
          >
            Confirm
          </button>
        </form>
      </div>
    </section>
  );
}
