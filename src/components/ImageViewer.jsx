import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ImageViewer = ({ imageViewerOpen, setImageViewerOpen, image }) => {
  return (
    <AlertDialog
      open={imageViewerOpen}
      onOpenChange={(state) => setImageViewerOpen(state)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="img-viewer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white max-w-[25rem] w-full max-h-[70vh] h-full rounded-md overflow-hidden">
            <img
              src="/converted.png"
              alt="fullscreen"
              className="w-full h-full object-cover aspect-square"
            />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Ok</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ImageViewer;
