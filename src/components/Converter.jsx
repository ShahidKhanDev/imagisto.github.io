import React, { useEffect, useRef, useState } from "react";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";
import ImageViewer from "./ImageViewer";
import Loader from "./Loader";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageListView, ImageGridView } from "./";
import { AlignJustify, LayoutGrid } from "lucide-react";
import { formatFileSize } from "@/utils";

const Converter = ({ files, imageFormats, convertType, convertExt }) => {
  const [imageData, setImageData] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState({
    type: convertType,
    extension: convertExt,
  });
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [totalImageSize, setTotalImageSize] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);
  const [selectedFormats, setSelectedFormats] = useState([]);
  const [activeBtn, setActiveBtn] = useState(1);
  const progressRef = useRef(null);

  useEffect(() => {
    const loadImageData = async () => {
      const imageDataArray = [];
      let loadedImagesCount = 0;

      const handleImageLoad = () => {
        loadedImagesCount++;
        setLoadedImagesCount(loadedImagesCount);

        if (loadedImagesCount === files.length) {
          const totalFileSize = imageDataArray.reduce(
            (accumulator, value) => accumulator + value.fileSize,
            0
          );

          setImageData(imageDataArray);
          setTotalImageSize(totalFileSize);
          setLoaded(true);
        }
      };

      for (const file of files) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        const image = new Image();

        await new Promise((resolve) => {
          reader.onload = (e) => {
            const dataUrl = e.target.result;
            const fileName = file.name;
            const fileType = file.type;
            const fileSize = file.size;

            imageDataArray.push({
              dataUrl,
              fileName,
              fileType,
              fileSize,
              selectedExtension: convertExt,
            });

            image.onload = handleImageLoad;
            image.src = dataUrl;

            resolve();
          };
        });
      }
    };

    document.body.style.overflowY = "auto";
    loadImageData();
  }, [files, convertExt]);

  // setting up default format for all the images later on it can be changed
  useEffect(() => {
    for (let i = 0; i < files.length; i++) {
      setSelectedFormats((prevFormat) => [...prevFormat, convertExt]);
    }
  }, []);

  // handle the conversion and downloading of image
  const handleConvert = (imageId) => {
    const file = imageData[imageId].dataUrl;
    const currFileType = imageFormats.find((image) => {
      return image.extension === selectedFormats[imageId];
    });

    fetch(file)
      .then((res) => res.blob())
      .then((blob) => {
        const blobUrl = new Blob([blob], {
          type: selectedFormats.length <= 0 ? convertType : currFileType.type,
        });

        const a = document.createElement("a");

        a.href = URL.createObjectURL(blobUrl);
        a.download =
          selectedFormat.type === "image/jpg" ? "converted.jpg" : "converted";
        document.body.appendChild(a);
        a.click();
        a.remove();

        URL.revokeObjectURL(blobUrl);
      });
  };

  const handleFormatChange = (type, imageId) => {
    // const selectedExtension = event.target.value;
    const selectedExtension = type;

    setSelectedFormats((prevFormats) => {
      const newFormats = [...prevFormats];
      newFormats[imageId] = selectedExtension;
      return newFormats; // This line was commented out; it should be uncommented
    });

    const currFileType = imageFormats.find((image) => {
      return image.extension === selectedExtension;
    });
    setSelectedFormat(currFileType);
  };

  // useEffect(() => {
  //   if (loadedImagesCount >= files.length) {
  //     progressRef.current.style.display = "none";
  //   } else {
  //     progressRef.current.style.display = "block";
  //     progressRef.current.style.width =
  //       (loadedImagesCount / files.length) * 100 + "%";
  //   }
  // }, [loadedImagesCount]);

  return (
    <div className="relative w-full">
      <div
        ref={progressRef}
        className="hidden fixed top-0 left-0 h-[3px] rounded-full bg-indigo-500 z-20"
      ></div>
      <div className="relative convert-main max-w-[1024px] mx-auto py-12 min-h-[90vh]">
        {loaded ? (
          <div className="px-4 lg:px-0">
            <div className="top-section max-h-[16vh] pb-4 flex items-center justify-between">
              <div className="flex">
                <p className="text-[var(--bg-black-clr)] dark:text-indigo-400 text-sm font-semibold font-inter">
                  images: {files.length}
                  <span className="px-2">•</span>
                </p>
                <p className="text-[var(--bg-black-clr)] dark:text-indigo-400 text-sm font-semibold font-inter">
                  Size: {formatFileSize(totalImageSize)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className={`${
                    activeBtn === 1 ? "border border-2 border-indigo-400" : ""
                  }`}
                  onClick={() => setActiveBtn(1)}
                >
                  <AlignJustify
                    size={40}
                    className="w-5 h-5 dark:text-white active"
                    strokeWidth={2}
                  />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className={`${
                    activeBtn === 2 ? "border border-2 border-indigo-400" : ""
                  }`}
                  onClick={() => setActiveBtn(2)}
                >
                  <LayoutGrid
                    size={40}
                    className="w-5 h-5 dark:text-white"
                    strokeWidth={2}
                  />
                </Button>
              </div>
            </div>

            <ImageListView
              imageData={imageData}
              handleConvert={handleConvert}
              handleFormatChange={handleFormatChange}
              selectedFormat={selectedFormat}
              setSelectedFormat={setSelectedFormat}
              selectedFormats={selectedFormats}
              setSelectedFormats={setSelectedFormats}
              activeBtn={activeBtn}
              setActiveBtn={setActiveBtn}
            />
          </div>
        ) : (
          <Loader loadedImages={loadedImagesCount} totalImages={files.length} />
        )}
      </div>

      <ImageViewer
        imageViewerOpen={imageViewerOpen}
        setImageViewerOpen={imageViewerOpen}
      />
    </div>
  );
};

export default Converter;
