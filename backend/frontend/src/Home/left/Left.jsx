

import React from "react";
import Search from "./Search";
import Users from "./Users";
import Logout from "./Logout";

function Left() {
  return (
    <div className="w-full bg-gray-300 text-gray-700 ">
      <Search />
      <div
        className=" overflow-y-auto custom-scroll"
        style={{ minHeight: "calc(84vh - 13vh)" }} // Adjust height if needed
      >
        <Users />
      </div>
      <Logout />
    </div>
  );
}

export default Left;
