import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { imageFormats } from "@/utils";
import { FiDownload } from "react-icons/fi";
import { Button } from "./ui/button";
import { formatFileSize } from "@/utils";

const ImageListView = ({
  imageData,
  handleConvert,
  handleFormatChange,
  selectedFormat,
  selectedFormats,
  activeBtn,
  setActiveBtn,
}) => {
  useEffect(() => {
    console.log(selectedFormats);
  });
  return (
    <div
      className={`${
        activeBtn === 1
          ? "convert"
          : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      }`}
    >
      {imageData?.map((data, i) =>
        activeBtn === 1 ? (
          <div
            key={i}
            className="convert-card [box-shadow:var(--shadow-2)] mb-2 select-none bg-white dark:bg-[var(--bg-primary-clr)] p-2  rounded-lg"
          >
            <div className="flex flex-col justify-normal md:flex-row md:items-center md:justify-between pl-0 p-2">
              <div className="convert-card-left flex items-center w-full md:w-[70%] gap-4">
                <div className="hidden md:flex relative w-[70px] h-[60px] rounded-[10%] outline outline-1 outline-slate-200 dark:outline-slate-600 hover:outline-2 hover:outline-slate-300 dark:hover:outline-slate-600 hover:outline-offset-2 overflow-hidden">
                  <img
                    src={data?.dataUrl}
                    alt="converted"
                    className="absolute top-0 left-0 max-w-full max-h-full w-full h-full object-cover aspect-square bg-slate-200 cursor-pointer"
                  />
                </div>

                <div className="w-full border-b border-b-slate-200 md:border-b-0 pb-2 flex flex-col gap-1 border-0">
                  <p className="text-base font-inter font-semibold text-primary dark:text-white truncate text-ellipsis max-w-[70%]">
                    {data?.fileName}
                  </p>
                  <div className="flex gap-2 items-center">
                    <p className="bg-slate-200 px-2 py-1 rounded-[0.2rem] text-xs font-inter font-semibold text-gray-500 uppercase">
                      {data?.fileType.split("/")[1]}
                    </p>
                    <span className="text-sm font-inter text-gray-500">
                      {formatFileSize(data?.fileSize)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="convert-card-right mt-4 md:mt-0  w-full rounded-md overflow-hidden md:w-[30%]">
                <div className="flex gap-2 justify-end">
                  <Select
                    defaultValue={
                      selectedFormats.length === 0
                        ? selectedFormat.extension
                        : selectedFormats[i]
                    }
                    // onChange={(e) => handleFormatChange(e, i)}
                    onValueChange={(type) => handleFormatChange(type, i)}
                  >
                    <SelectTrigger className="w-[115px] focus:ring-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {imageFormats.map((opt, i) => (
                        <SelectItem key={i} value={opt.extension}>
                          {opt.extension}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button onClick={() => handleConvert(i)}>
                    Download
                    <FiDownload
                      color="#fff"
                      size={18}
                      strokeWidth={2}
                      className="ml-2"
                    />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            key={i}
            className="card__body [box-shadow:var(--shadow-2)] mb-2 select-none bg-white dark:bg-[var(--bg-primary-clr)] p-2  rounded-lg"
          >
            <div className="image__item-preview w-full h-[156px] sm:h-[244px] mx-auto text-center max-w-full max-h-full bg-slate-200 flex items-center justify-center overflow-hidden p-2">
              <img
                src={data?.dataUrl}
                className="object-contain align-middle max-w-full max-h-full"
              />
            </div>

            <div className="flex items-center gap-2"></div>
          </div>
        )
      )}
    </div>
  );
};

export default ImageListView;
