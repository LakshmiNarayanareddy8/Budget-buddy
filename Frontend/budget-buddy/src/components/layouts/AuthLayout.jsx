import React from "react";
import CARD_2 from "../../assets/images/card2.png";
import { LuTrendingUpDown } from "react-icons/lu";

const StatsInfoCard = ({ icon, label, value }) => {
  return (
    <div className="flex gap-6 bg-white p-4 rounded-xl shadow-lg shadow-indigo-500/20">
      <div
        className="w-12 h-12 flex items-center justify-center text-[26px] 
        text-white rounded-lg
        bg-gradient-to-r from-indigo-600 via-rose-500 to-orange-500"
      >
        {icon}
      </div>

      <div>
        <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
        <span className="text-[20px] font-semibold text-gray-800">
          {value}
        </span>
      </div>
    </div>
  );
};

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black">
          Budget Buddy
        </h2>
        {children}
      </div>

      <div
        className="hidden md:block w-[40vw] h-screen
        bg-gradient-to-br 
        from-indigo-600 
        via-rose-500 
        to-orange-500
        relative overflow-hidden"
      >
        <div className="w-48 h-48 rounded-[40px] 
            bg-gradient-to-r 
            from-indigo-600 
            via-rose-500 
            to-orange-500
            absolute -top-7 -left-5 
            shadow-lg shadow-indigo-500/20" />

        <div className="w-48 h-56 rounded-[40px] 
            border-[20px] 
            border-rose-500
            absolute top-[30%] -right-10 
            shadow-lg shadow-orange-500/20" />

        <div className="w-48 h-48 rounded-[40px] 
            bg-gradient-to-r 
            from-indigo-600 
            via-rose-500 
            to-orange-500
            absolute -bottom-7 -left-5 
            shadow-lg shadow-indigo-500/20" />

        <div className="relative z-20 flex flex-col justify-between h-full px-10 py-10">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Analyze Your Expenditure "
            value="Make the Savings Better...."
          />
<div className="text-center px-8">
  <p className="text-white text-xl lg:text-2xl italic font-serif font-medium leading-relaxed tracking-wide relative">
    
    <span className="text-5xl absolute -left-4 -top-6 opacity-30">
      “
    </span>

    Take control of your money today,
    <br />
    so your future stays secure tomorrow.
    <span className="text-5xl absolute -right-4 -bottom-6 opacity-30">
      ”
    </span>

  </p>
</div>


          <img
            src={CARD_2}
            alt="card"
            className="w-64 lg:w-[100%] mx-auto shadow-lg shadow-indigo-500/20"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
