import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { findChat } from "../../api/chat/get";
import { COMPANY_ADMIN_SIDEBAR_LINKS } from "../../constants/Company-admin-sidebar";
import { USER_SIDEBAR_LINKS } from "../../constants/User-sideBar";
import { currentCompanyAdmin } from "../../redux/company-admin/CompanyAdminAuthSlicer";
import { currentUser } from "../../redux/user/userAuthSlicer";
import { messageStore } from "../../zustand";
import SideBarWithoutText from "../Common/companyAdmin-user/SideBarWithoutText";
import ChatScreen from "./ChatScreen";
import LargeScreenSideBar from "./LargeScreenSideBar";

function UserMessage({type}:{type:string}) {
  const socket = messageStore((state) => state.socket);
  const chat = messageStore((state) => state.chat);
  const setChat = messageStore((state) => state.setChat); 
  const onlineUsers = messageStore((state) => state.onlineUsers);
  const setOnlineUsers = messageStore((state) => state.setOnlineUsers); 
  const sendMessage = messageStore((state) => state.sendMessage);
  const setSendMessage = messageStore((state) => state.setSendMessage);
  const receiveMessages = messageStore((state) => state.receiveMessages);
  const setReceiveMessages = messageStore((state) => state.setReceiveMessages);
  const router = useRouter();
  const user = useSelector(currentUser);
  const companyAdmin = useSelector(currentCompanyAdmin)
  const {senderId, receiverId} = router.query

  async function getChat() {
    if(senderId && receiverId){
      const result = await findChat(senderId.toString(), receiverId.toString())
      setChat(result[0])
    }
  }

  useEffect(()=>{
    getChat()
  },[])



  useEffect(()=>{
    if(socket){
      socket.emit("new-user-add", user.userId ? user.userId : companyAdmin.companyAdminId);
    }
  },[socket])

  useEffect(() => {
    if(socket){
      socket.on("get-user", (users) => {
        setOnlineUsers(users);
      });
    }
  }, [user ? user : companyAdmin, socket]);

  useEffect(() => {
    if (sendMessage !== null && socket) {
      socket.emit("send-message", sendMessage);
    }
  }, [sendMessage, socket]);

  useEffect(() => {
    if(socket){
      socket.on("receive-message", (data) => {
        setReceiveMessages(data);
      });
    }
  }, [socket]);

  return (
    <div className="pt-20  mb-14 fixed w-full">
      <div className="flex  antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="md:mr-14 sm:ml-2 sm:mr-20">
            <SideBarWithoutText links={type == 'user' ? USER_SIDEBAR_LINKS : COMPANY_ADMIN_SIDEBAR_LINKS} href={'/user/inbox'} />
          </div>
          <LargeScreenSideBar setChat={setChat} onlineUsers={onlineUsers} />
          {chat ? (
            <ChatScreen chat={chat} setSentMessage={setSendMessage}
              receiveMessages={receiveMessages} />
          ) :
            (
              <div className="w-full min-h-[100vh] p-8">
                <div className='flex w-full items-center justify-center h-[84vh] rounded-lg from-purple-500 via-indigo-500 to-pink-400 bg-gradient-to-br'>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default UserMessage;
