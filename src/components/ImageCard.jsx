import { formatFileSize, imageFormats } from "@/utils";
import { FiDownload } from "react-icons/fi";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ImageCard = ({
  data,
  selectedFormat,
  setSelectedFormat,
  selectedFormats,
  setSelectedFormats,
  handleConvert,
  handleFormatChange,
  index,
}) => {
  return (
    <div className="convert-card mb-2 select-none">
      <div className="flex flex-col justify-normal md:flex-row md:items-center md:justify-between pl-0 p-2 md:border-b md:border-b-slate-200 dark:md:border-slate-600">
        <div className="convert-card-left flex items-center w-full md:w-[70%] gap-4">
          <div className="hidden md:flex relative w-[70px] h-[60px] rounded-[10%] outline outline-1 outline-slate-200 dark:outline-slate-600 hover:outline-2 hover:outline-slate-300 dark:hover:outline-slate-600 hover:outline-offset-2 overflow-hidden">
            <img
              src={data?.dataUrl}
              alt="converted"
              loading="lazy"
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
                selectedFormats.length <= 0
                  ? selectedFormat.extension
                  : selectedFormats[index]
              }
              // onChange={(e) => handleFormatChange(e, i)}
              onValueChange={(type) => handleFormatChange(type, index)}
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

            <Button onClick={() => handleConvert(index)}>
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
  );
};

export default ImageCard;
