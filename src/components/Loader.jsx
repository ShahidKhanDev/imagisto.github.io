import React from "react";

const Loader = ({ loadedImages, totalImages }) => {
  const loadedPercentage = `${((loadedImages + 1) / totalImages) * 100 || 0}%`;

  return (
    <div
      className="fixed z-50 top-0 left-0 w-full h-screen flex flex-col items-center justify-center
    backdrop-blur backdrop-filter bg-white supports-backdrop-blur:bg-white/60 dark:bg-transparent bg-opacity-0"
    >
      <div className="mb-4 text-center">
        <p className="text-4xl font-semibold text-[var(--bg-black-clr)] dark:text-indigo-400 text-center">
          Preparing your images
        </p>
        <p className="hidden mt-2 font-inter dark:text-white">
          {loadedImages === totalImages - 1 ? (
            "almost finished..."
          ) : (
            <>
              loaded images{" "}
              <span className="font-inter font-semibold text-sm dark:text-indigo-400">
                {loadedImages}
              </span>{" "}
              of{" "}
              <span className="font-inter font-semibold text-sm dark:text-indigo-400">
                {totalImages}
              </span>
            </>
          )}
        </p>
      </div>
      <div className="hidden w-8 h-8 bg-transparent border-4 border-t-transparent animate-spin rounded-full border-[var(--bg-black-clr)] dark:border-t-transparent dark:border-indigo-600"></div>

      <div className="mt-4 max-w-sm w-full h-10 bg-white dark:bg-[var(--bg-primary-clr)] flex items-center justify-center p-7 px-6 rounded-full [box-shadow:var(--shadow-1)]">
        <div className="relative w-full mt-2">
          <p className="font-inter mb-1 dark:text-white">
            {loadedImages === totalImages - 1 ? (
              "Almost finished..."
            ) : (
              <>
                Loading images{" "}
                <span className="font-semibold">{loadedImages}</span> of{" "}
                <span className="font-semibold">{totalImages}</span>
              </>
            )}
          </p>
          <div className="relative bg-slate-200 rounded-full overflow-hidden mb-3 w-full">
            <div
              className="h-2 rounded-full bg-[var(--bg-primary-clr)] dark:bg-indigo-600"
              style={{ width: loadedPercentage }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
