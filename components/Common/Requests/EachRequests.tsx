import React from 'react'
import useSWR from "swr";
import { getAllRequests } from '../../../api/Company/get';
import { getCompanyAdminRequests } from '../../../api/Company-Admin/get';
import { getUserNotifications } from '../../../api/User/Get/user';
import { Requests } from './Requests';
import Loader from '../skeleton/Loader';
import noNOtification from '../../../public/image/noNotification.webp'
import Image from 'next/image';

interface Props {
    type: string,
    id: string
}
interface Request {
    _id: string
    message: string
    company: {
        _id: string
        company: string
    }
    job: {
        _id: string
        job: string
        benefits: string
        jobDescription: string
    }
    applicant: {
        _id: string
        firstName: string
        lastName: string
        qualifications: Array<string>
        skills: Array<string>
    }
    admin: {
        _id: string
        name: string
    }
    accepted: boolean
    type: string
    createdAt: Date
    updatedAt: Date
    changeRequest: boolean
    reScheduled: boolean
    userAccepted: boolean
    companyApproved: boolean
    userRequestToChange: boolean
}

export function EachRequests({ type, id }: Props) {
    const fetcher = async () => {
        if (type == 'company') {
            const allCompanyRequests = await getAllRequests(id);
            return allCompanyRequests;
        } else if (type == 'companyAdmin') {
            const allCompanyRequests = await getCompanyAdminRequests(id)
            return allCompanyRequests
        } else if (type == 'user') {
            const allCompanyRequests = await getUserNotifications(id)
            return allCompanyRequests
        }
    };
    const { data, error, isLoading } = useSWR("allCompanyRequests", fetcher);
    if (error) return <div>Error....</div>
    if (isLoading) return <div><Loader /></div>
    return (
        <>
            {
                data.map(function (request: Request) {
                    return (
                        <>
                            <Requests key={request._id} request={request} type={type} />
                        </>
                    )
                })
            }
            {
                data.length == 0 &&
                (
                    <Image alt="" src={noNOtification} className="rounded-md"/>
                )
            }
        </>
    )
}
