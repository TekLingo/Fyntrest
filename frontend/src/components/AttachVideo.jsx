import { useState, useRef } from "react";
import { FiUploadCloud } from "react-icons/fi";

export default function AttachVideo() {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const previewFiles = selectedFiles.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith("image") ? "image" : "video",
    }));
    setFiles([...files, ...previewFiles]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    const previewFiles = droppedFiles.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith("image") ? "image" : "video",
    }));
    setFiles([...files, ...previewFiles]);
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
        <FiUploadCloud />
        <span className="text-sm">or, drop files here</span>
        <input
          type="file"
          multiple
          accept="image/*, video/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>

      <span className="text-base text-left">
        Files Uploaded: {files.length}
      </span>

      <div className="flex gap-2">
        {files.map((file, index) => (
          <div key={index} className="w-20 h-20 overflow-hidden rounded-lg">
            {file.type === "image" ? (
              <img
                src={file.url}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                src={file.url}
                className="w-full h-full object-cover"
                muted
                autoPlay
                loop
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
