import React from "react";
import useSWR from "swr";
import Head from "next/head";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { currentTheme } from "../../../../../redux/user/ThemeSlice";
import NavBar from "../../../../../components/Common/companyAdmin-user/NavBar/NavBar";
import RightBar from "../../../../../components/Common/companyAdmin-user/RightBar";
import dynamic from "next/dynamic";
import SideBar from "../../../../../components/Common/companyAdmin-user/SideBar";
import { COMPANY_ADMIN_SIDEBAR_LINKS } from "../../../../../constants/Company-admin-sidebar";
import SideBarWithoutText from "../../../../../components/Common/companyAdmin-user/SideBarWithoutText";
import CompanyAdminProtectRoute from "../../../../../protectRoutes/companyAdminProtectRoute";
import SchedulesStepper from "../../../../../components/Common/companyAdmin-user/SchedulesStepper";
import { useRouter } from "next/router";
import { getAnApplicantSchedules } from "../../../../../api/Company-Admin/get";
const BottomBar = dynamic(
    () => import("../../../../../components/Common/companyAdmin-user/MobileBottom/MobileBottom")
);

export default function Index({ req }: { req: any }) {
    const mode = useSelector(currentTheme);
    const router = useRouter();
    const jobId = router.query.jobId;
    const applicantId = router.query.applicantId;
    const theme = createTheme({
        palette: {
            mode: mode == "light" ? "light" : "dark",
        },
    });

    const fetcher = async () => {
        const applicantSchedules = await getAnApplicantSchedules(jobId, applicantId)
        return applicantSchedules.data
    };
    const { data, error, isLoading } = useSWR("applicantSchedules", fetcher);
    if (error) return <div>Error....</div>
    if (isLoading) return <div>Loading....</div>

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
                    <NavBar mode={mode} type={'company-admin'}/>
                    <div className="border">
                        <div className="flex justify-around">
                            <div className="sm:w-2/12 mt-12">
                                <div className="hidden md:block">
                                    <SideBar links={COMPANY_ADMIN_SIDEBAR_LINKS} href={'/company-admin/jobs'}/>
                                </div>
                                <div className="ml-6 md:hidden">
                                    <SideBarWithoutText links={COMPANY_ADMIN_SIDEBAR_LINKS} href={'/company-admin/jobs'}/>
                                </div>
                            </div>
                            <div className="md:w-6/12 sm:w-9/12 w-full mt-32 mr-5 lg:ml-16">
                                    <SchedulesStepper data={data}/>
                            </div>
                            <div className="w-2/12 mt-8 hidden lg:block mr-20">
                                <RightBar />
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
