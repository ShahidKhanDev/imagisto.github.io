import { ThemeProvider } from "@/components/ThemeProvider";
import { useEffect, useRef, useState } from "react";
import { Dropdown, Converter, Header } from "./components";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AlertDialog from "./components/Alert";
import Alert from "./components/Alert";
import { ToggleMode } from "@/components/ToggleMode";
import { imageFormats } from "./utils";

const App = () => {
  const [inputFile, setInputFile] = useState([]);
  const [fileSelected, setFileSelected] = useState(false);
  const [convertType, setConvertType] = useState(null);
  const [convertExt, setConvertExt] = useState(null);
  const [isDroppedDown, setIsDroppedDown] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [totalImages, setTotalImages] = useState(0);

  const inputRef = useRef(null);

  const handleInput = (event) => {
    if (convertType === null) {
      setAlertOpen(true);
      inputRef.current.value = "";
    } else {
      const selectedFiles = inputRef.current.files;

      for (let i = 0; i < selectedFiles.length; i++) {
        setInputFile((prevFiles) => [...prevFiles, selectedFiles[i]]);
      }
      setFileSelected(true);
      localStorage.setItem("convertExt", convertExt);
    }
    setTotalImages(inputRef.current.files.length);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (convertType === null) {
      // alert("select a conversion type");
      setAlertOpen(true);

      inputRef.current.value = "";
    } else {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setInputFile((prevFiles) => [...prevFiles, ...droppedFiles]);
      setFileSelected(true);
      localStorage.setItem("convertExt", convertExt);
    }
  };

  const handleSelectChange = (value) => {
    const currFileType = imageFormats.find((image) => {
      return image.extension === value;
    });
    setConvertType(currFileType.type);
    setConvertExt(currFileType.extension);
    localStorage.setItem("convertExt", convertExt);
  };

  useEffect(() => {
    document.body.style.overflowY = "hidden";
  }, []);

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="relative min-h-screen items-center justify-between z-10 bg-[#F3F4F5] dark:bg-[#020817]">
        <Header />

        <div className="hidden fixed top-0 z-[-2] h-screen w-screen bg-white dark:bg-[#020817] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

        {!fileSelected ? (
          <div className="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-4">
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="flex flex-col items-center justify-center w-full"
            >
              <div className="w-full">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-4 text-center text-[var(--bg-black-cl)] dark:text-white">
                  Convert images <br />{" "}
                  <span className="text-primary dark:text-indigo-400 font-semibold">
                    easily
                  </span>
                </h1>
                {/** dropdown to select file type to convert to */}
                <div className="max-w-[500px] mx-auto">
                  <div className="mb-4 w-full">
                    <Select
                      convertType={convertType}
                      setConvertType={setConvertType}
                      setConvertExt={setConvertExt}
                      onValueChange={(value) => handleSelectChange(value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Convert to" />
                      </SelectTrigger>
                      <SelectContent>
                        {imageFormats.map((opt, i) => (
                          <SelectItem key={i} value={opt.extension}>
                            {opt.extension}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white dark:bg-[var(--bg-primary-clr)]"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-inter font-semibold">
                          Click to upload
                        </span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {imageFormats.map((format, i) => {
                          return (
                            <span key={i} className="uppercase font-ibm">
                              {format.extension.replace(".", "")}
                              {i < imageFormats.length - 1 && ", "}
                            </span>
                          );
                        })}
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      multiple
                      ref={inputRef}
                      onChange={handleInput}
                      className="hidden"
                      accept="image/png, image/jpg, image/jpeg, image/webp"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Converter
            files={inputFile}
            imageFormats={imageFormats}
            convertType={convertType}
            setConvertType={setConvertType}
            convertExt={convertExt}
            totalImages={totalImages}
          />
        )}

        <Alert
          alertOpen={alertOpen}
          setAlertOpen={setAlertOpen}
          title="Please select a conversion type"
          description="For converting your images you need to select the conversion type"
        />
      </div>
    </ThemeProvider>
  );
};

export default App;
