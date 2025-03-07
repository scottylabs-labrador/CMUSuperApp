// New Modules to implement popup
"use client";
import { useState } from "react";

import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { AppInfo } from "~/types";
import { FaSearch } from "react-icons/fa";
import { AppBlock } from "~/components/AppBlock";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FavoriteButton from "~/components/FavoriteButton";
import FavoritesBar from "~/components/FavoritesBar";

export default function HomePage() {
    const mainAppInfo: AppInfo[] = [
      {
        name: "CMUEats",
        description: "Find the best food on campus.",
        icon: "/assets/eats.png",
        url: "/eats",
      }, {
        name: "CMUCourses",
        description: "Find the best classes on campus",
        icon: "/assets/courses.png",
        url: "/courses",
      }, {
        name: "CMUMaps",
        description: "Find where your next class is on campus.",
        icon: "/assets/maps.png",
        url: "/maps",
      }, {
        name: "Lost and Found",
        description: "Find your lost items",
        icon: "/assets/lostandfound.png",
        url: "/lostandfound",
      }
    ];

    const academicAppInfo: AppInfo[] = [
      {
        name: "Canvas",
        description: "Access your course materials.",
        icon: "/assets/canvas.png",
        url: "https://canvas.cmu.edu",
      }, {
        name: "Piazza",
        description: "Ask questions and collaborate with classmates.",
        icon: "/assets/piazza.png",
        url: "https://piazza.com/cmu",
      }, {
        name: "Gradescope",
        description: "Submit and grade assignments.",
        icon: "/assets/gradescope.png",
        url: "https://www.gradescope.com",
      }, {
        name: "SIO",
        description: "Manage your course schedule.",
        icon: "/assets/sio.png",
        url: "https://s3.andrew.cmu.edu/sio",
      }, {
        name: "Ed",
        description: "Access your course materials.",
        icon: "/assets/ed.png",
        url: "https://edstem.org",
      }
    ];

    const underDevelopmentAppInfo: AppInfo[] = [
      {
        name: "Research @ CMU",
        description: "Find the best research opportunities on campus.",
        icon: "/assets/research.png",
        url: "/research",
      }, {
        name: "Study Group Finder",
        description: "Find the best study groups on campus",
        icon: "/assets/studygroup.png",
        url: "/studygroup",
      }, {
        name: "Cooking with AI",
        description: "Find the best recipes on campus.",
        icon: "/assets/cooking.png",
        url: "/cooking",
      }, {
        name: "CMUGPT",
        description: "Find the best GPT on campus.",
        icon: "/assets/gpt.png",
        url: "/gpt",
      }, {
        name: "Comm[you]nity",
        description: "Find the best community on campus.",
        icon: "/assets/community.png",
        url: "/community",
      }
    ];

    //Modules to implement popup
    const [activePopup, setActivePopup] = useState<number | null>(null);

    const togglePopup = (index: number) => {
        setActivePopup(activePopup === index ? null : index);
    };

    const closePopup = () => {
        setActivePopup(null);
    };

    const queryClient = new QueryClient()


    return (
      <QueryClientProvider client={queryClient}>
      <main className="flex min-h-screen flex-col items-center bg-slate-300" onClick={closePopup}>
        {/*Implement the Top Bar*/}
        <div className="flex flex-row justify-between text-3xl text-black font-bold bg-white w-full h-14 px-4 py-2"> 
          <div>
            CMU Hive
          </div>
          <form action="https://scotty.lol/search" method="get" name="searchform" target="_blank" className="flex rounded-full pl-2 bg-gray-100">
            <input name="sitesearch" type="hidden" value=""></input>
            <input autoComplete="on" name="q" placeholder="Search Google" required={true} className="relative bg-transparent top-0"  type="text"></input>
            <button type="submit" className="justify-self-end"><FaSearch className="pr-1" /></button>
          </form>
          <img src="/assets/profile.svg" alt="Account" className="h-10 w-10 cursor-pointer" />
        </div>
        <style>{`
        ::-webkit-scrollbar {
          background: #cbd5e1;
        }
        ::-webkit-scrollbar-thumb {
          background: #94a3b8;
        }
          .app-button:hover {
          cursor: pointer;
        }
      `}</style>
        <div className="container flex flex-col gap-12 px-4 py-16 pb-32">
          <SignedOut>
            <h1 className="text-5xl font-extrabold tracking-tight text-black sm:text-[5rem]">
              Welcome!
            </h1>
            <SignInButton mode="modal">
              <button className="bg-blue-500 rounded-lg p-4 text-2xl border-2 border-black">Login</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
          <FavoritesBar />
          <div className="relative bg-gradient-to-b from-indigo-200 via-indigo-400 to-slate-900 rounded-lg p-6 shadow-md flex justify-center">
              <div className="flex flex-nowrap flex-row gap-4">
                  {
                    mainAppInfo.map((app) => (
                      <AppBlock key={app.name} app={app}/>
                    ))
                  }
              </div>
            </div>

            {/* Academic Links Section */}
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-bold text-slate-800">Academic Links</h2>
              <div className="relative bg-slate-300 rounded-lg p-2 overflow-x-auto shadow-none">
                <div className="flex flex-nowrap flex-row gap-4">
                  {academicAppInfo.map((app) => (
                    <div key={app.name} className="relative">
                      <FavoriteButton app={app} />
                    <a href={app.url} key={app.name} className="flex-none bg-gradient-to-b from-indigo-200 via-indigo-400 to-slate-900 p-6 rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col items-center justify-center w-72 h-48 border-2 border-black">
                      <img src={app.icon} alt={app.name} className="w-32 h-32 mb-2 object-contain"/>
                      <span className="font-medium text-white text-lg">{app.name}</span>
                    </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Under Development Section */}
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-bold text-slate-800">Under Development</h2>
              <div className="relative bg-slate-300 rounded-lg p-2 overflow-x-auto shadow-none">
                <div className="flex flex-nowrap flex-row gap-4">
                  {underDevelopmentAppInfo.map((app, index) => (
                      <div key={index} className="relative">
                        <FavoriteButton app={app} />
                        {/* Clickable Box */}
                        <div onClick={(e) => {e.stopPropagation(); togglePopup(index); }} 
                            className="flex-none bg-slate-400 p-6 rounded-xl shadow-md flex flex-col items-center justify-center w-72 h-48 border-2 border-black cursor-pointer hover:bg-slate-500 transition-all">
                          <div className="w-32 h-32 mb-2 bg-slate-500 rounded-full"></div>
                          <span className="font-medium text-gray-800 text-lg">{app.name}</span>
                        </div>

                        {/* Popup */}
                        {activePopup === index && (
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white p-4 rounded-lg shadow-lg border-2 border-black w-64">
                            <p className="text-black text-center font-medium">This feature is under development.</p>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
            {activePopup !== null && (
              <div>
              <div 
                className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center"
                onClick={closePopup} // Close when clicking outside
              >
                
              </div>
              <div 
              className="fixed top-[12.5vh] left-[12.5vw] bg-white w-[75vw] h-[75vh] p-6 rounded-lg shadow-lg border-2 border-black"
              onClick={(e) => e.stopPropagation()} // Prevent click inside box from closing popup
          >
              <p className="text-black text-lg font-medium"> Coming soon!</p>
            </div>
            </div>
            )}
          </SignedIn>
        </div>
      </main>
      </QueryClientProvider>
    );
}