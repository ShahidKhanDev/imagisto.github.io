import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { imageFormats } from "@/utils";

const ImageGridView = ({
  imageData,
  handleConvert,
  handleFormatChange,
  selectedFormat,
  selectedFormats,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {imageData?.map((data, i) => (
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
      ))}
    </div>
  );
};

export default ImageGridView;
