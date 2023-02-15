import React from "react";
import Head from "next/head";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { currentTheme } from "../../../redux/user/ThemeSlice";
import NavBar from "../../../components/Common/companyAdmin-user/NavBar/NavBar";
import dynamic from "next/dynamic";
import SideBar from "../../../components/Common/companyAdmin-user/SideBar";
import { COMPANY_ADMIN_SIDEBAR_LINKS } from "../../../constants/Company-admin-sidebar";
import SideBarWithoutText from "../../../components/Common/companyAdmin-user/SideBarWithoutText";
import CompanyAdminProtectRoute from "../../../protectRoutes/companyAdminProtectRoute";
import Schedules from "../../../components/Common/companyAdmin-user/Schedules";
const BottomBar = dynamic(
    () => import("../../../components/Common/companyAdmin-user/MobileBottom/MobileBottom")
);


/**
 * Home Page of the Application
 * @return {JSX.Element}
 */

export default function Home({ req }: { req: any }) {

    // const dispatch = useDispatch()
    const mode = useSelector(currentTheme);

    // const {data:session} =
    useSession();

    const theme = createTheme({
        palette: {
            mode: mode == "light" ? "light" : "dark",
        },
    });

    return (
        <CompanyAdminProtectRoute>
            <ThemeProvider theme={theme}>
                <Head>
                    <title>Portal</title>
                    <meta name="description" content="Generated by create next app" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                    {/* <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" /> */}
                </Head>
                <Box color={"text.primary"} className="bg-gray-200 min-h-[100vh]">
                    <NavBar mode={mode} type={'company-admin'} />
                    <div className="border">
                        <div className="flex justify-around">
                            <div className="sm:w-2/12 mt-12">
                                <div className="hidden md:block">
                                    <SideBar links={COMPANY_ADMIN_SIDEBAR_LINKS} href={'/company-admin/schedules'}/>
                                </div>
                                <div className="ml-6 md:hidden">
                                    <SideBarWithoutText links={COMPANY_ADMIN_SIDEBAR_LINKS} href={'/company-admin/schedules'}/>
                                </div>
                            </div>
                            <div className="md:w-9/12 sm:w-9/12 w-11/12 mt-32 mr-5 lg:ml-16 bg-white shadow-md rounded-md">
                                <Schedules />
                            </div>
                        </div>
                    </div>
                    <div className="sm:hidden">
                        <BottomBar />
                    </div>
                </Box>
            </ThemeProvider>
        </CompanyAdminProtectRoute>
    );
}