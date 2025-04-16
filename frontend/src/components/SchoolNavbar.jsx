import React, { useState } from "react";
import { IoMdNotificationsOutline, IoMdNotifications } from "react-icons/io";
import SearchOpen from "./SearchOpen";
import NotificationPanel from "./NotificationPanel";
import { useNavigate } from "react-router-dom";

const TeacherNavbar = () => {
  const navigate = useNavigate();
  const [isNoti, setNoti] = useState(false);
  const toggleNoti = () => setNoti(!isNoti);

  const [isSearch, setSearch] = useState(false);
  const toggleSearch = () => setSearch(!isSearch);

  const [inputValue, setInputValue] = useState("");

  return (
    <div className="h-14 text-text-g relative z-50">
      <div className="w-2/5 h-full place-self-end font-body">
        <div className="flex items-center w-full h-full gap-8">
          <div
            className="border-none focus:outline-none rounded-xl bg-primary_p px-4 w-2/3 h-8 flex items-center cursor-pointer"
            onClick={toggleSearch}
          >
            <p>Search student, school, course, quiz etc..</p>
          </div>

          {isSearch && (
            <SearchOpen
              onClose={() => setSearch(false)}
              inputValue={inputValue}
              setInputValue={setInputValue}
            />
          )}

          <div onClick={toggleNoti} className="cursor-pointer">
            {isNoti ? (
              <IoMdNotificationsOutline size={30} />
            ) : (
              <IoMdNotifications size={30} />
            )}
          </div>

          {isNoti && <NotificationPanel onClose={() => setNoti(false)} />}

          <div
            className="bg-secondary-dt h-7 w-7 flex items-center justify-center rounded-full cursor-pointer"
            onClick={() => navigate("/school/profile")}
          >
            <p className="text-xl select-none">S</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherNavbar;
