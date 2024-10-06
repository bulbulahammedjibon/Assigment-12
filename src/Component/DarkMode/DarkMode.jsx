import React from "react";
import { useState, useEffect } from "react";

const DarkMode = () => {
  const [mode, setMode] = useState("light");
  const storedMode = localStorage.getItem("mode");
  if (storedMode == null) {
    localStorage.setItem("mode", "light");
  }
  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", storedMode);
    document.getElementById("dark").classList.add(mode);
  }, [mode]);

  console.log(storedMode);

  const handleClick = () => {
    if (storedMode == "light" || storedMode === null) {
      localStorage.removeItem("mode");
      localStorage.setItem("mode", "synthwave");
      setMode("synthwave");
    } else {
      localStorage.removeItem("mode");
      localStorage.setItem("mode", "light");
      setMode("Light");
    }
  };
  //   return (
  //     <div className="home">
  //       <h2>{mode}</h2>
  //       <button className={`button-${mode}`} onClick={handleClick}>
  //         Click Me
  //       </button>
  //     </div>
  //   );
  // };
  return (
    <div onClick={handleClick}>
      <label className="flex cursor-pointer gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
        <input
          type="checkbox"
          value="synthwave"
          className="toggle theme-controller"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </label>
    </div>
  );
};

export default DarkMode;
