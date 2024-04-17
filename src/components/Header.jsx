import React from "react";
import { ToggleMode } from "./ToggleMode";

const Header = () => {
  return (
    <div className="header sticky top-0 left-0 px-4 py-1 w-full z-10 backdrop-blur backdrop-filter bg-white supports-backdrop-blur:bg-white/60 dark:bg-transparent bg-opacity-0">
      <div className="h-[8vh] flex items-center justify-between max-w-[1024px] mx-auto">
        <a href="/">
          <p className="text-[var(--bg-black-clr)] dark:text-white font-ibm text-2xl font-semibold">
            imagisto.
          </p>
        </a>
        <ToggleMode />
      </div>
    </div>
  );
};

export default Header;
