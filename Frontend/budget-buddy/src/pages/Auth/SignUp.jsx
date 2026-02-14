import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Input/Input";
import ProfilePhotoSelector from "../../components/Input/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import { API_PATHS } from "../../utils/apiPaths";
import {UserContext} from "../../context/userContext";
import axiosInstance from "../../utils/axiosinstance";
import { useContext } from "react";
import { uploadImage } from "../../utils/uploadImage";


const SignUp = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState(null);
  const {updateUser}=useContext(UserContext);


  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileImageUrl="";
    if(!fullName){
      setError("Please enter your name");
      return;
    }
    if (!validateEmail(email)) {
          setError("Please enter a valid email address");
          return;
    }
    
    if (!password) {
          setError("Please enter the password");
          return;
    }
    setError("");

    try{
          
       if(profilePic){
        const imgUploadRes=await uploadImage(profilePic);
        profileImageUrl=imgUploadRes.imageUrl || "";
       }

      const response= await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        fullName,
        email,
        password,
        profileImageUrl
      });
      const {token,user}=response.data;
      if(token){
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    }catch(err){
      setError(err.response?.data?.message || "Sign Up failed. Please try again.");
    }


  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] md:w-[90%] w-full h-3/4 md:h-full mx-auto flex flex-col justify-center">

        <h3 className="text-xl font-semibold text-black text-center">
          Create an Account
        </h3>

        <p className="text-xs text-slate-700 mt-1 mb-6 text-center">
          Join us today by entering your details below.
        </p>

        <form
          onSubmit={handleSignUp}
        >
          <ProfilePhotoSelector
            image={profilePic}
            setImage={setProfilePic}
          />
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            label="Full Name"
            placeholder="John"
            type="text"
          />

          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />
          </div>

          <div className="md:col-span-2">
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="Min 8 characters"
              type="password"
            />
          </div>
          

          {error && (
            <p className="text-red-500 text-xs pb-2.5">{error}</p>
          )}

          <button type="submit" className="btn-primary">
            SignUp
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an Account?{" "}
            <Link
              className="font-medium text-primary underline"
              to="/login"
            >
              Login
            </Link>
          </p>
        </form>

  

      </div>
    </AuthLayout>
  );
};

export default SignUp;
