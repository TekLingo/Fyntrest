import React from "react";
import { IoMdClose } from "react-icons/io";

const NotificationPanel = ({ onClose }) => {
  const notifications = [
    {
      title: "Title / Task / Any update or important activity",
      description: "Small description / updated by whom",
    },
    {
      title: "Title / Task / Any update or important activity",
      description: "Small description / updated by whom",
    },
    {
      title: "Title / Task / Any update or important activity",
      description: "Small description / updated by whom",
    },
    {
      title: "Title / Task / Any update or important activity",
      description: "Small description / updated by whom",
    },
  ];

  return (
    <div className="absolute top-16 right-4 w-96 bg-[#392B63] text-white rounded-xl shadow-xl z-50">
      <div className="flex justify-between items-center px-4 py-3 border-b border-purple-300">
        <h2 className="text-xl font-semibold">Notification</h2>
        <IoMdClose
          size={24}
          onClick={onClose}
          className="cursor-pointer hover:scale-110 transition"
        />
      </div>

      <div className="p-4 space-y-4">
        {notifications.map((item, index) => (
          <div key={index} className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-[#2B1E4A]" />
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-purple-200">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPanel;
