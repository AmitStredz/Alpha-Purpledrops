import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import { FiMail, FiPhone, FiCreditCard } from "react-icons/fi";
import { SiBinance } from "react-icons/si";

const DashboardHeader = ({ sideBarIsOpen }) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const profileRef = useRef(null);

  const { logout } = useAuth();

  const navigate = useNavigate();

  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfilePopup(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileRef]);

  // const toggleNavbar = () => {
  //   setIsOpen(!isOpen);
  // };

  const handleLogout = () => {
    navigate("/");
    logout();
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div>
      <div className="border-slate-400 bg-white border-b-[1px] font-poppins">
        <header className="flex justify-between items-center p-3 sm:p-5 sm:px-10 ">
          <div className="text-xl md:text-2xl inline text-alphaGreen font-semibold">
            <span
              className="cursor-pointer mr-4 text-black"
              onClick={sideBarIsOpen}
            >
              {"☰"}
            </span>
            <h1 className="inline text-[#8601FF] text-[16px] sm:text-[20px]">
            Purpledrops AI
            </h1>
          </div>
          <div className="text-black">
            <div className="flex justify-between gap-5 items-center font-semibold">
              {/* <TbMoonFilled className="inline text-3xl cursor-pointer" />
              <FaUserAlt className="inline text-3xl cursor-pointer" />
              <FaDiscord className="inline text-3xl cursor-pointer" /> */}
              {/* <span
                className="hidden md:inline-block cursor-pointer border bg-[#8601FF] text-white rounded-lg p-2 px-4"
                onClick={() => handleLogout()}
              >
                Logout
              </span> */}
              <div className="relative" ref={profileRef}>
                <div 
                  className="flex items-center justify-center gap-2 cursor-pointer rounded-md p-1 hover:bg-gray-100"
                  onClick={() => setShowProfilePopup(!showProfilePopup)}
                >
                  <img src="avatar.png" alt="avatar" className="w-8 sm:w-10" />
                  <span className="text-[12px] sm:text-[14px]">
                    {userData?.username}
                  </span>
                </div>
                
                {/* User Profile Popup */}
                {showProfilePopup && (
                  <div className="absolute right-0 mt-2 w-64 sm:w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <img src="avatar.png" alt="avatar" className="w-12 h-12" />
                        <div>
                          <h3 className="font-semibold text-sm sm:text-base">{userData?.username}</h3>
                          <p className="text-xs text-gray-500">ID: {userData?.user_id}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <FiMail className="text-gray-500" />
                        <div className="flex flex-col items-start">
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="text-xs sm:text-sm">{userData?.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm">
                        <FiPhone className="text-gray-500" />
                        <div className="flex flex-col items-start">
                          <p className="text-xs text-gray-500">Phone</p>
                          <p className="text-xs sm:text-sm">{userData?.phone_number}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm">
                        <SiBinance className="text-gray-500" />
                        <div className="flex flex-col items-start">
                          <p className="text-xs text-gray-500">Binance Connection</p>
                          <p className="text-xs sm:text-sm">
                            {userData?.binance_connected ? (
                              <span className="text-green-400">Connected</span>
                            ) : (
                              <span className="text-red-500">Not Connected</span>
                            )}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm">
                        <FiCreditCard className="text-gray-500" />
                        <div className="flex flex-col items-start">
                          <p className="text-xs text-gray-500">Subscription Plan</p>
                          <p className="text-xs sm:text-sm">
                            {userData?.plan ? userData.plan : "No Active Plan"}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border-t border-gray-100">
                      <button 
                        onClick={handleLogout}
                        className="w-full py-2 bg-[#8601FF] hover:bg-opacity-80 text-white rounded-lg text-sm transition"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Sidebar */}
      {/* <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleNavbar}
      ></div> */}
    </div>
  );
};

export default DashboardHeader;
