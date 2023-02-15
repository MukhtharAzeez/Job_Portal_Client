import { Box } from "@mui/material";
import Head from "next/head";
import React from "react";
import { useSelector } from "react-redux";
import SideBar from "../../../components/Common/companyAdmin-user/SideBar";
import MobileBottom from "../../../components/Common/companyAdmin-user/MobileBottom/MobileBottom";
import NavBar from "../../../components/Common/companyAdmin-user/NavBar/NavBar";
import { currentTheme } from "../../../redux/user/ThemeSlice";
import { USER_SIDEBAR_LINKS } from "../../../constants/User-sideBar";
import UserProtectRouter from "../../../protectRoutes/protectRoutes";
import SideBarWithoutText from "../../../components/Common/companyAdmin-user/SideBarWithoutText";
import Schedules from "../../../components/Common/companyAdmin-user/Schedules";

function index() {
    const mode = useSelector(currentTheme);

    return (
        <UserProtectRouter>
            <Head>
                <title>Portal</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                {/* <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" /> */}
            </Head>
            <Box color={"text.primary"} className="bg-gray-200 min-h-[100vh]">
                <NavBar mode={mode} type={'user'} />
                <div className="border">
                    <div className="flex justify-around md:ml-14">
                        <div className="sm:w-2/12 mt-8">
                            <div className="hidden md:block">
                                <SideBar links={USER_SIDEBAR_LINKS} href={'/user/schedules'}/>
                            </div>
                            <div className="ml-6 md:hidden">
                                <SideBarWithoutText links={USER_SIDEBAR_LINKS} href={'/user/schedules'}/>
                            </div>
                        </div>
                        <div className="md:w-9/12 sm:w-9/12 w-full mt-28 mr-5 lg:ml-16 bg-white shadow-md rounded-md">
                            <Schedules/>
                        </div>
                    </div>
                </div>
                <div className="sm:hidden">
                    <MobileBottom />
                </div>
            </Box>
        </UserProtectRouter>
    );
}

export default index;
