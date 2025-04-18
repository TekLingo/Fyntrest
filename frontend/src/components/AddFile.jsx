import React, { useState, useRef } from "react";
import { FiUploadCloud } from "react-icons/fi";

const AddExcelFile = () => {
  const [excelFiles, setExcelFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const validExcelFiles = selectedFiles.filter(
      (file) => file.name.endsWith(".xls") || file.name.endsWith(".xlsx")
    );
    setExcelFiles([...excelFiles, ...validExcelFiles]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    const validExcelFiles = droppedFiles.filter(
      (file) => file.name.endsWith(".xls") || file.name.endsWith(".xlsx")
    );
    setExcelFiles([...excelFiles, ...validExcelFiles]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="p-6 bg-primary-fp rounded-xl text-white w-full max-w-lg mx-auto flex flex-col gap-4">
      <div className="flex justify-center">
        <label
          className="h-10 w-1/3 bg-purple-500 hover:bg-purple-600 p-2 text-center text-lg rounded-lg cursor-pointer"
          onClick={triggerFileInput}
        >
          Browse
        </label>
      </div>
      <div
        className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-purple-500 rounded-lg cursor-pointer"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={triggerFileInput}
      >
        <FiUploadCloud size={24} />
        <span className="text-sm">or, drop Excel files here</span>
        <input
          type="file"
          multiple
          accept=".xls,.xlsx"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>

      <span className="text-base text-left">
        Files Uploaded: {excelFiles.length}
      </span>

      <ul className="list-disc list-inside text-left text-sm">
        {excelFiles.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AddExcelFile;
