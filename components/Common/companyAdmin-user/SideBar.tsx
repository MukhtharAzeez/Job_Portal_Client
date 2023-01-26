import { ListItemIcon } from "@mui/material";
import Link from "next/link";
import React from "react";

function SideBar({links}:any) {
  return (
    <div className="fixed w-1/5 mt-20  hidden sm:block">
      <div className="w-full py-4 px-2 text-gray-900 bg-white rounded-lg text-left capitalize font-medium shadow-2xl">
        <img
          src="https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png"
          alt="alt placeholder"
          className="w-8 h-8 mx-auto mb-5 "
        />
        {
          links.map(function(link:any){
            const Icon = link.icon
            return (
              <Link href={link.href} key={link.title} className="cursor-pointer px-2 py-1  hover:bg-gray-200 hover:text-gray-700 rounded flex">
                <span className="w-8 mb-5 relative">
                  <ListItemIcon className='text-gray-500 mx-4 group-hover:text-gray-800'>
                    <Icon className="text-black"/>
                  </ListItemIcon>
                  {/* <span className="absolute right-0 top-0 -mt-2 -mr-1 text-xs bg-yellow-500 text-black font-medium px-2 rounded-full">
                    3
                  </span> */}
                </span>
                <span className="mx-5">{link.title}</span>
              </Link>
            )
          })
        }
      </div>
    </div>
  );
}

export default SideBar;