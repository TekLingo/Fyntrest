import React from "react";

const Email = () => {
  return (
    <div className="flex flex-col">
      <label className="text-text-g text-lg">Email Address</label>
      <input
        className="pl-2 rounded w-[440px] h-16 font-base bg-secondary-lt text-text-g focus:bg-primary-b"
        type="email"
        placeholder=""
        id=""
      />
      <button>Verify</button>
    </div>
  );
};

export default Email;
