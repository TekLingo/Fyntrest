import { useState, useRef } from "react";
import { FiUploadCloud } from "react-icons/fi";

export default function FlashcardUploader() {
  const [flashcards, setFlashcards] = useState([]);
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);

  const frontFileInputRef = useRef(null);
  const backFileInputRef = useRef(null);

  const handleImageUpload = (event, setImage) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleAddFlashcard = () => {
    if (frontImage && backImage) {
      setFlashcards([...flashcards, { front: frontImage, back: backImage }]);
      setFrontImage(null);
      setBackImage(null);
    }
  };

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

  const triggerFrontFileInput = () => frontFileInputRef.current.click();
  const triggerBackFileInput = () => backFileInputRef.current.click();

  return (
    <div className="text-white flex flex-col gap-8">
      <div className="flex gap-4">
        {flashcards.map((flashcard, index) => (
          <div key={index} className="relative w-40 h-40">
            <img
              src={flashcard.back}
              alt="Back"
              className="absolute w-full h-full rounded-lg opacity-70"
            />
            <img
              src={flashcard.front}
              alt="Front"
              className="absolute w-4/5 h-4/5 right-0 top-0 rounded-lg"
            />
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <div className="p-6 bg-primary-fp rounded-xl text-white w-full max-w-lg mx-auto flex flex-col gap-4">
          <div className="">
            <div className="flex justify-center">
              <label
                className="h-10 w-20 bg-purple-500 hover:bg-purple-600 p-2 text-center text-lg rounded-lg cursor-pointer"
                onClick={triggerFrontFileInput}
              >
                Browse
              </label>
            </div>
          </div>

          <div
            className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-purple-500 rounded-lg cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={triggerFrontFileInput}
          >
            <FiUploadCloud />
            <span className="text-sm">or, drop files here</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={frontFileInputRef}
              onChange={(e) => handleImageUpload(e, setFrontImage)}
            />
          </div>
          <p>Front</p>
          <div className="flex gap-2">
            {files.map((file, index) => (
              <div key={index} className="w-20 h-20 overflow-hidden rounded-lg">
                <img
                  src={file.url}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          {frontImage && (
            <img src={frontImage} alt="Front Preview" className="mt-2 w-32" />
          )}
        </div>
        <div className="p-6 bg-primary-fp rounded-xl text-white w-full max-w-lg mx-auto flex flex-col gap-4">
          <div className="">
            <div className="flex justify-center">
              <label
                className="h-10 w-20 bg-purple-500 hover:bg-purple-600 p-2 text-center text-lg rounded-lg cursor-pointer"
                onClick={triggerBackFileInput}
              >
                Browse
              </label>
            </div>
          </div>

          <div
            className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-purple-500 rounded-lg cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={triggerBackFileInput}
          >
            <FiUploadCloud />
            <span className="text-sm">or, drop files here</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={backFileInputRef}
              onChange={(e) => handleImageUpload(e, setBackImage)}
            />
          </div>
          <p>Back</p>
          <div className="flex gap-2">
            {files.map((file, index) => (
              <div key={index} className="w-20 h-20 overflow-hidden rounded-lg">
                <img
                  src={file.url}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          {backImage && (
            <img src={backImage} alt="Back Preview" className="w-32" />
          )}
        </div>
      </div>
      <div className="flex justify-center gap-2">
        <button
          onClick={handleAddFlashcard}
          className="p-2 w-56 border-2 border-secondary-lt text-xl rounded-md flex justify-center items-center"
        >
          Add Flashcard
        </button>
      </div>
    </div>
  );
}
