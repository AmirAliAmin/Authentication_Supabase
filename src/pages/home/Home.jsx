import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { supabase } from '../../config';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [loading, setLoading] = useState(true);
  const [user,setUser] = useState(null)
  const navigate = useNavigate()
  const fetchUser = async () => {
    try {
      const {data:{user},error} = await supabase.auth.getUser();
      if (error) {
        toast.error("Please Login First")
        navigate("/Login")
      }
      setUser(user)
    } catch (error) {
      toast.error(error.message || "Server Error");
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser();
  }, [])
  if (loading) {
    return <div>Loading...</div>
  }

  const logout = async () => {
    try {
      const {error} = await supabase.auth.signOut();
      if (error) {
        throw error
      }
      navigate("/Login")
    } catch (error) {
      toast.error(error.message || "Server Error");
    }
  }
  return (
    <>
    {/* {JSON.stringify(user)} */}
    <div>
        <h1>Name:{user.user_metadata.full_name}</h1>
        <h2>Email:{user.email}</h2>
        <button className='px-4 py-1 bg-black text-white' onClick={logout}>Logout</button>
    </div>
    </>
  )
}

export default Home