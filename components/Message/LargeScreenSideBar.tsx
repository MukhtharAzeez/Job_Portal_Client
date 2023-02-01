import React from "react";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/user/userAuthSlicer";
import useSWR from "swr";
import { getCurrentUserDetails } from "../../api/User/Get/user";
import FriendsList from "./FriendsList";


function LargeScreenSideBar({setChat, onlineUsers}:any) {
  const { userId } = useSelector(currentUser)
  const fetcher = async () => {
    const user = await getCurrentUserDetails(userId);
    return user;
  };
  const { data, error, isLoading } = useSWR("user", fetcher);
  if (isLoading || error) return <div>Loading....</div>
  

  return (
    <>
      <div className="flex flex-col sm:py-8 sm:pl-6 sm:pr-2 w-16 sm:w-64 bg-white flex-shrink-0">
        <div className="hidden sm:flex flex-row items-center justify-center h-12 w-full">
          <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              ></path>
            </svg>
          </div>
          <div className="hidden sm:flex ml-2 font-bold text-2xl">QuickChat</div>
        </div>
        <div className="hidden sm:flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full  py-6 px-4 rounded-lg">
          <div className="h-20 w-20 rounded-full border overflow-hidden">
            <img
              src={data.image ? data.image : 'https://w7.pngwing.com/pngs/798/436/png-transparent-computer-icons-user-profile-avatar-profile-heroes-black-profile-thumbnail.png'}
              alt="Avatar"
              className="h-full w-full"
            />
          </div>
          <div className="xs:hidden md:block text-sm font-semibold mt-2">{data.firstName + " " + data.lastName}</div>
          <div className="flex flex-row items-center mt-3">
            <div className="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full">
              <div className="h-3 w-3 bg-white rounded-full self-end mr-1"></div>
            </div>
            <div className="leading-none ml-1 text-xs">Active</div>
          </div>
        </div>
        <FriendsList setChat={setChat} onlineUsers={onlineUsers}/>
      </div>
    </>
  );
}

export default LargeScreenSideBar;
