"use client";

import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { setIsModalOpen } from "~/lib/features/uiSlice";
import { usePathname } from "next/navigation";
import { useAppSelector } from "~/lib/hooks";
import Image from "next/image";

export default function NavBar() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const page = pathname.split("/")[1];
  const isModalOpen = useAppSelector((state) => state.ui.isModalOpen);

  return (
    <Fragment>
      <div className="flex h-full flex-col overflow-y-auto rounded-lg bg-slate-100 px-3 py-4 shadow-md">
        <a
          href="/"
          className="mb-6 flex items-center gap-2 px-2 text-lg font-bold text-slate-900"
        >
          <Image
            src="/assets/hive.png"
            width={28}
            height={28}
            alt="Hive icon"
          />
          Hive
        </a>

        <div className="flex flex-col gap-y-3">
          {/* Internal links */}
          <div className="mb-4">
            <a
              href="/eats"
              className={`flex items-center gap-2 rounded-md p-2 transition-colors ${
                page === "eats"
                  ? "bg-slate-700 font-medium text-white"
                  : "text-slate-700 hover:bg-slate-200"
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
                  : "text-slate-700 hover:bg-slate-200"
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
                  : "text-slate-700 hover:bg-slate-200"
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
          <div className="border-t border-slate-200 pt-2">
            <h3 className="mb-2 px-2 text-xs font-semibold uppercase text-slate-500">
              External Resources
            </h3>
            <a
              href="https://canvas.cmu.edu"
              target="_blank"
              className="flex items-center gap-2 rounded-md p-2 text-slate-700 transition-colors hover:bg-slate-200"
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
              className="flex items-center gap-2 rounded-md p-2 text-slate-700 transition-colors hover:bg-slate-200"
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
              className="flex items-center gap-2 rounded-md p-2 text-slate-700 transition-colors hover:bg-slate-200"
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
              className="flex items-center gap-2 rounded-md p-2 text-slate-700 transition-colors hover:bg-slate-200"
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
              className="flex items-center gap-2 rounded-md p-2 text-slate-700 transition-colors hover:bg-slate-200"
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
              className="flex items-center gap-2 rounded-md p-2 text-slate-700 transition-colors hover:bg-slate-200"
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
