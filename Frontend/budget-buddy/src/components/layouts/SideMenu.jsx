import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../../components/Cards/CharAvatar";
const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  const handleClick = (route) => {
    if (route === "/logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {user?.profileImageUrl ? (
  <img
    src={user.profileImageUrl}
    alt="Profile"
    className="w-20 h-20 rounded-full object-cover"
  />
) : (
  <CharAvatar
    fullName={user?.fullName}
    width="w-20"
    height="h-20"
    style="text-xl"
  />
)}


        <h5 className="text-gray-950 font-medium leading-6">
          {user?.fullName || ""}
        </h5>
      </div>

 
      {SIDE_MENU_DATA.map((item) => (
        <button
          key={item.id}
          className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3
            ${
              activeMenu === item.name
                ? "text-white bg-gradient-to-r from-indigo-600 via-rose-500 to-orange-500"
  : "text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:via-rose-50 hover:to-orange-50"
            }`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
