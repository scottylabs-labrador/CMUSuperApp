"use client";

import { Fragment, use } from "react";
import { useDispatch } from "react-redux";
import { setIsModalOpen } from "~/lib/features/uiSlice";
import { usePathname } from "next/navigation";
import { useAppSelector } from "~/lib/hooks";

export default function NavBar() {
    const dispatch = useDispatch();
    const pathname = usePathname();
    const page = pathname.split("/")[1];
    const isModalOpen = useAppSelector(state => state.ui.isModalOpen);
    return (
        <Fragment>
                <div className="grid grid-rows-3 gap-y-6 px-4 pt-[50px] overflow-hidden text-white">
                    <a href="/" className="font-bold text-lg">
                        ScottyLabs
                    </a>
                    <a href="/eats" className={page == "feed" ? "font-bold" : ""}>
                        CMUEats
                    </a>
                    <a href="/maps" className={page == "profile" ? "font-bold" : ""}>
                        CMUMaps
                    </a>
                    <a href="/courses" className={page == "profile" ? "font-bold" : ""}>
                        CMUCourses
                    </a>
                    <a href="https://canvas.cmu.edu" target = "_blank" className={page == "profile" ? "font-bold" : ""}>
                        Canvas
                    </a>
                    <a href="https://piazza.com" target = "_blank" className={page == "profile" ? "font-bold" : ""}>
                        Piazza
                    </a>
                    <a href="https://edstem.org/us/dashboard" target = "_blank" className={page == "profile" ? "font-bold" : ""}>
                        Ed
                    </a>
                    <a href="https://s3.andrew.cmu.edu/sio/mpa/" target = "_blank" className={page == "profile" ? "font-bold" : ""}>
                        SIO
                    </a>
                    <a href="https://myoie.andrew.cmu.edu/" target = "_blank" className={page == "profile" ? "font-bold" : ""}>
                        OIE Portal
                    </a>
                    <a href="https://academicaudit.andrew.cmu.edu/" target = "_blank" className={page == "profile" ? "font-bold" : ""}>
                        Stellic
                    </a>
                </div>
        </Fragment>
    );
    }

