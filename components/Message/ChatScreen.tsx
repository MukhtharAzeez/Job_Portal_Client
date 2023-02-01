import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { getMessages, sendMessageToReceiver } from '../../api/User/Get/user';
import { currentUser } from '../../redux/user/userAuthSlicer';

function ChatScreen({ chat, setSentMessage, receiveMessages }: any) {
    const scroll = useRef<HTMLInputElement>();
    const [sendMessage, setSendMessage] = useState("")
    const { userId } = useSelector(currentUser)
    const [messages, setMessages] = useState([])

    useEffect(() => {
        if (receiveMessages !== null && receiveMessages.chatId === chat?._id) {
            setMessages([...messages, receiveMessages]);
        }
    }, [receiveMessages]);

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const data = await getMessages(chat._id);
                setMessages(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchMessage();
    }, [chat, userId]);

    useEffect(() => {
        scroll.current.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    async function sendMessages() {
        const messageAdd = {
            userId,
            chatId: chat._id,
            text:sendMessage,
        };
        setSendMessage("")
        const data = await sendMessageToReceiver(userId, chat._id, sendMessage)
        setMessages([...messages,data])
        const receiverId = chat.members.find((id: string) => id !== userId);
        setSentMessage({ ...messageAdd, receiverId });
    }

    return (
        <div className="flex flex-col flex-auto h-full md:p-6">
            <div className=" relative flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 md:mt-4 min-h-[82vh]  max-h-[82vh] " >
                <div className="" >
                    <div className="flex flex-col max-h-[82vh] " >
                        <div className="grid grid-cols-12 gap-y-2  mb-14 overflow-y-scroll" >
                            {
                                messages.map(function (message: any) {
                                    return (
                                        <>
                                            {message.senderId == userId ? (
                                                <div className="col-start-6 col-end-13 p-3 rounded-lg">
                                                    <div className="flex items-center justify-start flex-row-reverse">
                                                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                            A
                                                        </div>
                                                        <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                                            <div>
                                                                {message.text}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="col-start-1 col-end-8 p-3 rounded-lg">
                                                    <div className="flex flex-row items-center">
                                                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                            A
                                                        </div>
                                                        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                                            <div>{message.text}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )
                                })
                            }
                            <div ref={scroll}></div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row absolute items-center h-16 rounded-xl bg-white w-full px-4 bottom-0 border shadow-lg">
                    <div>
                        <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div className="flex-grow ml-4">
                        <div className="relative w-full">
                            <input
                                type="text"
                                onChange={(e) => setSendMessage(e.target.value)}
                                value={sendMessage}
                                className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                            />
                            <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
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
                                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="ml-4">
                        <button onClick={sendMessages} className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                            <span>Send</span>
                            <span className="ml-2">
                                <svg
                                    className="w-4 h-4 transform rotate-45 -mt-px"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                    ></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatScreen