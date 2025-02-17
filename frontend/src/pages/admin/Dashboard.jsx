import React from "react";
import AdminNavbar from "../../components/AdminNavbar";
import AdminSidebar from "../../components/AdminSidebar";

const Dashboard = () => {
  return (
    <div className="flex text-text-g">
      <AdminSidebar />
      <div className="w-full flex flex-col">
        <AdminNavbar />
        <div className="bg-[#362856] h-full flex p-4 gap-8">
          {/* left content */}
          <div className="w-2/3 h-full flex flex-col gap-8">
            <div className="flex h-1/2 gap-8">
              <div className="w-1/2 bg-primary_p h-full rounded-xl p-8">
                {/* left-most card content */}
                <div>
                  <div className="flex justify-between items-center">
                    <h2 className="font-body font-bold text-2xl">
                      Schools onboard
                    </h2>
                    <select
                      name="time_period"
                      id="tp"
                      className="bg-[#362856] font-body h-8 focus:outline-none rounded-md px-2"
                    >
                      <option value="year">Yearly</option>
                      <option value="month">Monthly</option>
                      <option value="daily">Daily</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="w-1/2 bg-primary_p h-full rounded-xl p-8">
                {/* right card content */}
                <div>
                  <div className="flex justify-between items-center">
                    <h2 className="font-body font-bold text-2xl">
                      Students enrolled
                    </h2>
                    <select
                      name="time_period"
                      id="tp"
                      className="bg-[#362856] font-body h-8 focus:outline-none rounded-md px-2"
                    >
                      <option value="year">Yearly</option>
                      <option value="month">Monthly</option>
                      <option value="daily">Daily</option>
                    </select>
                  </div>
                  <h2 className="font-title text-5xl place-self-center">359+</h2>
                </div>
              </div>
            </div>
            <div className="bg-primary_p h-1/2 rounded-xl p-4 w-full">hi</div>
          </div>
          {/* right content */}
          <div className="w-1/3 bg-primary_p h-full rounded-xl p-4">
            <div>hi</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
