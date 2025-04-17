"use client";

import { Fragment, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function NavBar() {
  const pathname = usePathname();
  const page = pathname.split("/")[1];

  // Dark mode state
  const [darkMode, setDarkMode] = useState(true);

  // Sync with global dark mode on initial load and when it changes
  useEffect(() => {
    // Check for dark mode preference in localStorage
    const getDarkMode = () => {
      const savedMode = localStorage.getItem("darkMode");
      return savedMode !== null ? savedMode === "true" : true;
    };

    setDarkMode(getDarkMode());

    // Listen for changes to darkMode in localStorage
    const handleStorageChange = () => {
      setDarkMode(getDarkMode());
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", String(newMode));

    // Dispatch a custom event to notify other components
    window.dispatchEvent(new Event("storage"));
  };

  // Theme icon based on dark/light mode
  const themeIcon = darkMode ? "/assets/logo_light.png" : "/assets/sun.png";

  return (
    <Fragment>
      <div
        className={`flex h-full flex-col overflow-y-auto rounded-lg ${darkMode ? "bg-black text-white" : "bg-slate-100"} px-3 py-4 shadow-md transition-colors`}
      >
        <div className="mb-6 flex items-center justify-between">
          <a
            href="/"
            className={`flex items-center gap-2 px-2 text-lg font-bold ${darkMode ? "text-white" : "text-slate-900"}`}
          >
            <Image
              src="/assets/hive.png"
              width={28}
              height={28}
              alt="Hive icon"
            />
            Hive
          </a>

          <button
            onClick={toggleDarkMode}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-700"
          >
            <Image src={themeIcon} width={24} height={24} alt="Toggle Theme" />
          </button>
        </div>

        <div className="flex flex-col gap-y-3">
          {/* Internal links */}
          <div className="mb-4">
            <a
              href="/eats"
              className={`flex items-center gap-2 rounded-md p-2 transition-colors ${
                page === "eats"
                  ? "bg-slate-700 font-medium text-white"
                  : `${darkMode ? "text-white hover:bg-slate-800" : "text-slate-700 hover:bg-slate-200"}`
              }`}
            >
              <Image
                src="/assets/eats.png"
                width={22}
                height={22}
                alt="CMUEats icon"
              />
              CMUEats
            </a>
            <a
              href="/maps"
              className={`flex items-center gap-2 rounded-md p-2 transition-colors ${
                page === "maps"
                  ? "bg-slate-700 font-medium text-white"
                  : `${darkMode ? "text-white hover:bg-slate-800" : "text-slate-700 hover:bg-slate-200"}`
              }`}
            >
              <Image
                src="/assets/maps.png"
                width={22}
                height={22}
                alt="CMUMaps icon"
              />
              CMUMaps
            </a>
            <a
              href="/courses"
              className={`flex items-center gap-2 rounded-md p-2 transition-colors ${
                page === "courses"
                  ? "bg-slate-700 font-medium text-white"
                  : `${darkMode ? "text-white hover:bg-slate-800" : "text-slate-700 hover:bg-slate-200"}`
              }`}
            >
              <Image
                src="/assets/courses.png"
                width={22}
                height={22}
                alt="CMUCourses icon"
              />
              CMUCourses
            </a>
          </div>

          {/* External links */}
          <div
            className={`border-t ${darkMode ? "border-slate-700" : "border-slate-200"} pt-2`}
          >
            <h3
              className={`mb-2 px-2 text-xs font-semibold uppercase ${darkMode ? "text-gray-400" : "text-slate-500"}`}
            >
              External Resources
            </h3>
            <a
              href="https://canvas.cmu.edu"
              target="_blank"
              className={`flex items-center gap-2 rounded-md p-2 ${darkMode ? "text-white hover:bg-slate-800" : "text-slate-700 hover:bg-slate-200"} transition-colors`}
            >
              <Image
                src="/assets/canvas.png"
                width={22}
                height={22}
                alt="Canvas icon"
              />
              Canvas
            </a>
            <a
              href="https://piazza.com"
              target="_blank"
              className={`flex items-center gap-2 rounded-md p-2 ${darkMode ? "text-white hover:bg-slate-800" : "text-slate-700 hover:bg-slate-200"} transition-colors`}
            >
              <Image
                src="/assets/piazza.png"
                width={22}
                height={22}
                alt="Piazza icon"
              />
              Piazza
            </a>
            <a
              href="https://edstem.org/us/dashboard"
              target="_blank"
              className={`flex items-center gap-2 rounded-md p-2 ${darkMode ? "text-white hover:bg-slate-800" : "text-slate-700 hover:bg-slate-200"} transition-colors`}
            >
              <Image
                src="/assets/ed.png"
                width={22}
                height={22}
                alt="Ed icon"
              />
              Ed
            </a>
            <a
              href="https://s3.andrew.cmu.edu/sio/mpa/"
              target="_blank"
              className={`flex items-center gap-2 rounded-md p-2 ${darkMode ? "text-white hover:bg-slate-800" : "text-slate-700 hover:bg-slate-200"} transition-colors`}
            >
              <Image
                src="/assets/sio.png"
                width={22}
                height={22}
                alt="SIO icon"
              />
              SIO
            </a>
            <a
              href="https://myoie.andrew.cmu.edu/"
              target="_blank"
              className={`flex items-center gap-2 rounded-md p-2 ${darkMode ? "text-white hover:bg-slate-800" : "text-slate-700 hover:bg-slate-200"} transition-colors`}
            >
              <Image
                src="/assets/oie.png"
                width={22}
                height={22}
                alt="OIE Portal icon"
              />
              OIE Portal
            </a>
            <a
              href="https://academicaudit.andrew.cmu.edu/"
              target="_blank"
              className={`flex items-center gap-2 rounded-md p-2 ${darkMode ? "text-white hover:bg-slate-800" : "text-slate-700 hover:bg-slate-200"} transition-colors`}
            >
              <Image
                src="/assets/stellic.png"
                width={22}
                height={22}
                alt="Stellic icon"
              />
              Stellic
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
