import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import AddFile from "./AddFile";

const AddEntityPopUp = ({ onClose, role }) => {
  const [activeEntity, setActiveEntity] = useState(role === "admin" ? "school" : "student");
  const [activeSubEntity, setActiveSubEntity] = useState("school");
  const [activeGrades, setActiveGrades] = useState([]);
  const [activePayment, setActivePayment] = useState("1yr");
  const [isPrincipal, setIsPrincipal] = useState(true);

  const entities = {
    admin: ["school", "student", "admin"],
    school: ["student", "admin"],
    teacher: ["student"],
  }[role] || [];

  const adminSubEntities = role === "school" ? ["school"] : ["school", "fyntrest"];

  const toggleClass = (isActive) =>
    `text-lg px-4 py-1 rounded-full ${
      isActive ? "text-primary_p bg-secondary-lt" : "text-text-g border border-secondary-lt"
    }`;

  const InputField = ({ label, type, placeholder, pattern, maxLength, fullWidth }) => (
    <div className={fullWidth ? "w-full" : "w-1/2"}>
      <label className="text-base">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        pattern={pattern}
        maxLength={maxLength}
        className="p-2 rounded-lg w-full bg-primary-fp outline-none text-lg"
      />
    </div>
  );

  const CredentialFields = (type) => (
    <div className="flex flex-col gap-3">
      <p className="text-lg">Set Credentials</p>
      <div className="flex gap-5">
        <InputField label={`${type} Username`} type="text" placeholder="School Name" />
        <InputField label={`${type} Password`} type="password" placeholder="Set Password" />
      </div>
    </div>
  );

  const ContactFields = () => (
    <div className="flex flex-col gap-3">
      <p className="text-lg">Contact Details</p>
      <div className="flex gap-5">
        <InputField label="Email Address" type="email" placeholder="abc@gmail.com" />
        <InputField
          label="Phone Number"
          type="tel"
          placeholder="Your number"
          pattern="[0-9]{10}"
          maxLength={10}
        />
      </div>
    </div>
  );

  const ToggleButton = ({ label, value, active, onClick, px = 4 }) => (
    <button
      className={`text-lg px-${px} py-1 rounded-full ${toggleClass(active === value)}`}
      onClick={() => onClick(value)}
    >
      {label}
    </button>
  );

  return (
    <div className="fixed top-14 inset-0 bg-black bg-opacity-40 z-50 flex justify-end overflow-y-auto font-body">
      <div className="w-5/12 p-4 rounded-l-lg shadow-lg relative text-text-g flex flex-col gap-8 max-h-screen overflow-y-auto h-full bg-primary_p">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">Add</h1>
          <IoIosClose size={40} onClick={onClose} className="cursor-pointer" />
        </div>
        <div className="flex gap-4">
          {["school", "student", "admin"].map(
            (e) =>
              entities.includes(e) && (
                <ToggleButton
                  key={e}
                  label={e.charAt(0).toUpperCase() + e.slice(1)}
                  value={e}
                  active={activeEntity}
                  onClick={setActiveEntity}
                />
              )
          )}
        </div>
        <div className="text-lg">
          {activeEntity === "school" && (
            <div className="flex flex-col gap-8">
              <div className="flex gap-5">
                <InputField label="School Name" type="text" placeholder="School Name" />
                <InputField label="School Code" type="text" placeholder="ABC-0X" />
              </div>
              <div className="flex gap-20 items-center">
                <p>Grades</p>
                <div className="flex gap-4">
                  {["8th", "9th", "10th"].map((g) => (
                    <ToggleButton
                      key={g}
                      label={g}
                      value={g}
                      active={activeGrades.includes(g) ? g : null}
                      onClick={() =>
                        setActiveGrades((prev) =>
                          prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
                        )
                      }
                      px={6}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-20 items-center">
                <p>Payment Plan</p>
                <div className="flex gap-4">
                  {["1yr", "2yr", "3yr"].map((p) => (
                    <ToggleButton
                      key={p}
                      label={p.replace("yr", " year")}
                      value={p}
                      active={activePayment}
                      onClick={setActivePayment}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p>Add Student List</p>
                <AddFile />
              </div>
              <CredentialFields type="Student" />
              <CredentialFields type="Admin" />
              <ContactFields />
            </div>
          )}
          {activeEntity === "student" && (
            <div className="flex flex-col gap-10">
              <div className="flex gap-8">
                <InputField label="School Name" type="text" placeholder="School Name" />
                <InputField label="School Code" type="text" placeholder="SCH-03" />
              </div>
              <InputField
                label="Student Name"
                type="text"
                placeholder="Student Name"
                fullWidth
              />
              <div className="flex flex-col gap-2">
                <p>Add Student List</p>
                <AddFile />
              </div>
              <div className="flex gap-8">
                <div className="w-1/2">
                  <label className="text-base">Grade</label>
                  <select className="p-2 rounded-lg w-full bg-primary-fp outline-none text-lg">
                    {["8th", "9th", "10th"].map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
                <InputField label="Section" type="text" placeholder="Section" />
              </div>
              <div className="flex gap-20 items-center">
                <p>Payment Plan</p>
                <div className="flex gap-4">
                  {["1yr", "2yr", "3yr"].map((p) => (
                    <ToggleButton
                      key={p}
                      label={p.replace("yr", " year")}
                      value={p}
                      active={activePayment}
                      onClick={setActivePayment}
                    />
                  ))}
                </div>
              </div>
              <CredentialFields type="Student" />
              <ContactFields />
            </div>
          )}
          {activeEntity === "admin" && (
            <div className="flex flex-col gap-5">
              <InputField
                label="Admin Name"
                type="text"
                placeholder="Enter here name"
                fullWidth
              />
              <div className="flex gap-4">
                {adminSubEntities.map((e) => (
                  <ToggleButton
                    key={e}
                    label={e.charAt(0).toUpperCase() + e.slice(1)}
                    value={e}
                    active={activeSubEntity}
                    onClick={setActiveSubEntity}
                  />
                ))}
              </div>
              {activeSubEntity === "school" && (
                <div className="flex flex-col gap-5">
                  <div className="flex gap-5">
                    <InputField label="School Name" type="text" placeholder="Enter name here" />
                    <InputField label="School Code" type="text" placeholder="Enter Code" />
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className={isPrincipal ? "text-white" : "text-gray-400"}>
                      Principal
                    </span>
                    <div
                      className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer border transition-all duration-300 ${
                        isPrincipal ? "justify-start" : "justify-end"
                      } border-white`}
                      onClick={() => setIsPrincipal(!isPrincipal)}
                    >
                      <div className="w-6 h-6 bg-secondary-lt rounded-full transition-all duration-300" />
                    </div>
                    <span className={!isPrincipal ? "text-white" : "text-gray-400"}>Teacher</span>
                  </div>
                  <CredentialFields type="Admin" />
                  <ContactFields />
                </div>
              )}
              {activeSubEntity === "fyntrest" && adminSubEntities.includes("fyntrest") && (
                <div className="flex flex-col gap-8">
                  <CredentialFields type="Admin" />
                  <ContactFields />
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex justify-center">
          <button className="bg-secondary-d px-4 py-1 rounded text-text-d">Add</button>
        </div>
        <div className="h-40" />
      </div>
    </div>
  );
};

export default AddEntityPopUp;