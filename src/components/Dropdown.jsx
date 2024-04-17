import React, { useEffect, useState } from "react";

const Dropdown = ({
  isDroppedDown,
  setIsDroppedDown,
  dropDownItems,
  setConvertType,
  setConvertExt,
}) => {
  const [selectedType, setSelectedType] = useState(null);

  const handleDropdownClick = (event) => {
    event.stopPropagation();
    setIsDroppedDown(!isDroppedDown);
  };

  const handleMenuItemClick = (item) => {
    setConvertType(item.type);
    setSelectedType(item.extension);
    setConvertExt(item.extension);
  };

  return (
    <div className="bg-slate-800">
      <div className="relative w-fit text-left float-right">
        <button
          id="dropdown-button"
          className="inline-flex justify-center w-full px-4 py-3 text-sm font-medium text-white bg-slate-800 rounded-md shadow-sm outline outline-1 outline-gray-600 font-ibm"
          onClick={handleDropdownClick}
        >
          Convert to
          <span className="uppercase">
            &nbsp;{selectedType?.replace(".", "")}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 ml-2 -mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div
          id="dropdown-menu"
          className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-slate-800 ring-1 ring-black ring-opacity-5  ${
            isDroppedDown ? "flex" : "hidden"
          } outline outline-1 outline-gray-600`}
        >
          <div
            className="py-2 p-2 w-full"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="dropdown-button"
          >
            {dropDownItems?.map((item, i) => (
              <p
                key={i}
                onClick={() => handleMenuItemClick(item)}
                className={`dropdown-item block rounded-md px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 active:bg-slate-700 cursor-pointer uppercase font-ibm mb-1 ${
                  selectedType === item.extension ? "dropdown-item-active" : ""
                }`}
                role="menuitem"
              >
                {item.extension.replace(".", "")}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
