import React, { useState } from "react";
import { IoMdNotificationsOutline, IoMdNotifications } from "react-icons/io";

const AdminNavbar = () => {
  const [isnoti, setnoti] = useState(false);

  const noti = () => {
    setnoti(!isnoti);
  };

  return (
    <div className=" h-14 text-text-g">
      {/* navbar content */}
      <div className=" w-2/5 h-full place-self-end font-body">
        {/* navbar content */}
        <div className="flex items-center w-full h-full gap-8">
          <input
            type="text"
            className="border-none focus:outline-none rounded-full bg-primary_p px-4 w-2/3 h-8"
            placeholder="Search student, school, course, quiz etc.."
          />
          <div>
            {isnoti ? (
              <IoMdNotificationsOutline size={30} className="cursor-pointer" />
            ) : (
              <IoMdNotifications size={30} className="cursor-pointer" />
            )}
          </div>
          <div className="bg-secondary-dt h-7 w-7 flex items-center justify-center rounded-full">
            <p className="text-xl">S</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
