//Modules to implement popup
"use client";
import { useState } from "react";

//useClerk has been added to allow for re-toggling to sign out page
import { SignInButton, SignedIn, SignedOut, useClerk } from "@clerk/nextjs"; 
import { AppInfo } from "~/types";
import { FaSearch } from "react-icons/fa";

//Modules for carousel and autoplay
import { Swiper, SwiperSlide } from 'swiper/react'; 
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Pagination, Navigation, Scrollbar, Autoplay } from 'swiper/modules';

//Modules for implementing profile icon popup
import { useRef, useEffect } from "react";
import { AppBlock } from "~/components/AppBlock";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FavoriteButton from "~/components/FavoriteButton";
import FavoritesBar from "~/components/FavoritesBar";

//Homepage UI Codeblock
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
    }, { name: "PandaNotes",
       description: "Access your course materials.",
       icon: "/assets/pandanotes.png",
       url: "https://www.pandanotes.org/",
  }];

  const underDevelopmentAppInfo: AppInfo[] = [
    {
      name: "Research @ CMU",
      description: "Campus Research can be intimidating, but it doesn't have to be! Coming to you soon courtesy of ScottyLabs is a new platform making it easier to connect with professors and fellow researchers to pursue your reserach aspirations!",
      url: "https://www.youtube.com/shorts/SXHMnicI6Pg",
      icon: "/assets/research.png",
    }, {
      name: "Study Group Finder",
      description: "Ever felt you couldn't study alone but can't seem to find the right group? This is going to be the place for you, as we bring a platform to connect fellow students who wish to study similar content",
      url: "https://www.youtube.com/shorts/SXHMnicI6Pg",
      icon: "/assets/study_group_finder.png",
    }, {
      name: "Cooking with AI",
      description: "Find the best recipes on campus.",
      url: "https://www.youtube.com/shorts/SXHMnicI6Pg",
      icon: "/assets/cooking_with_AI.png",
    }, {
      name: "CMUGPT",
      description: "CMU is its own world, and with constant course chatter and CMU-lingo, we aim to create a search engine specially tailored towards all things CMU",
      url: "https://www.youtube.com/shorts/SXHMnicI6Pg",
      icon: "/assets/CMUGPT.png",
    }, {
      name: "Comm[you]nity",
      description: "Finding frinds is tough! New place and new environment can have us feeling lost, but not to worry, with comm[you]nit, you can find other students on campus with your same interests!",
      url: "https://www.youtube.com/shorts/SXHMnicI6Pg",
      icon: "/assets/comm_you_nity.png",
    }, {
      name: "CMU Shuttles",
      description: "Make the most of CMU Transportation!",
      url: "https://www.youtube.com/shorts/SXHMnicI6Pg",
      icon: "/assets/CMU_Shuttles.png",
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


  //State variables for profile icon popup
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Dark mode state, allows for toggling of dark/light mode
  const [darkMode, setDarkMode] = useState(true);

  // using Clerk module for sign out button
  const { signOut } = useClerk();

  //Profile dropdown toggle function
  const toggleProfileDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setProfileDropdownOpen(!profileDropdownOpen);
  };
  
  // Toggle dark/light mode function
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // State variables for Background and text colors based on dark/light mode
  const bgColor = darkMode ? "bg-black" : "bg-white";
  const textColor = darkMode ? "text-white" : "text-black";
  const iconFilter = darkMode ? "filter invert" : "";

  // Theme icon changes based on dark/light mode
  const themeIcon = darkMode ? "/assets/logo_dark.png" : "/assets/logo_light.png";

  //Implementing the dropdown- closing upon clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const queryClient = new QueryClient();
  // Refs for scroll containers
  const academicScrollRef = useRef<HTMLDivElement | null>(null);
  const underDevScrollRef = useRef<HTMLDivElement | null>(null);

  // Scroll handler function to show/hide scrollbar after 1s inactivity
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    container.classList.add("scrolling");

    // Clear existing timeout and set new one
    clearTimeout((container as any)._scrollTimeout);
    (container as any)._scrollTimeout = setTimeout(() => {
      container.classList.remove("scrolling");
    }, 1000);
  };
  return (
    <QueryClientProvider client={queryClient}>
    <main className={`flex min-h-screen flex-col items-center ${darkMode ? "bg-black dark-scrollbar" : "bg-white light-scrollbar"}`} onClick={closePopup}>
      {/*Implement the Top Bar*/}
      <div className={`flex flex-row justify-between text-3xl font-bold ${bgColor} ${textColor} w-full h-14 px-4 py-2`}> 
        {/* Theme toggle button */}
        <div className="flex items-center">
          <button 
            onClick={toggleDarkMode} 
            className="mr-4 flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-700"
          >
          <img 
            key={themeIcon} // This forces re-render when the source changes
            src={themeIcon}
            alt="Toggle Theme" 
            className="h-6 w-6"
          />
          </button>
            <div>
              CMU Hive
            </div>
        </div>
        
        <form action="https://scotty.lol/search" method="get" name="searchform" target="_blank" className="flex rounded-full pl-2 bg-blue">
          <input name="sitesearch" type="hidden" value=""></input>
          <input autoComplete="on" name="q" placeholder="Scotty Search" required={true} className="relative bg-transparent top-0"  type="text"></input>
          <button type="submit" className="justify-self-end"><FaSearch className="pr-1" /></button>
        </form>
        
        {/* Profile Icon with Dropdown Menu */}
        <div className="relative" ref={dropdownRef}>
          <img 
            src="/assets/profile.svg" 
            alt="Account" 
            className={`h-10 w-10 cursor-pointer ${iconFilter}`}
            onClick={toggleProfileDropdown}
          />
          
          {/* Dropdown Menu */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
              <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
              <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
              <a href="/help" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Help</a>
              <div className="border-t border-gray-100"></div>
              <button 
                onClick={() => signOut()}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
  <style>{`
    .custom-scroll-container::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      background: transparent;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }
  
    .custom-scroll-container.scrolling::-webkit-scrollbar {
      opacity: 1;
      pointer-events: auto;
    }
  
    .custom-scroll-container::-webkit-scrollbar-thumb {
      background-color: #000000};
      border-radius: 4px;
    }
  
    .custom-scroll-container {
      scrollbar-width: none; /* Firefox hides scrollbar track by default */
    }
  
    .custom-scroll-container.scrolling {
      scrollbar-width: thin;
    }
  `}</style>
  <div className="container flex flex-col gap-12 px-4 py-16 pb-32">
    <SignedOut>
      <h1 className={`text-5xl font-extrabold tracking-tight ${textColor} sm:text-[5rem]`}>
        Welcome!
      </h1>
      <SignInButton mode="modal">
        <button className="bg-blue-500 rounded-lg p-4 text-2xl border-2 border-black">Login</button>
      </SignInButton>
    </SignedOut>
    <SignedIn>
      {/* Swiper top bar */}
      <div className="w-full h-[35vh] flex justify-center items-center bg-[#b5e48c] rounded-lg">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}  // Enables infinite loop
        autoplay={{ delay: 5000, disableOnInteraction: false }} //Enables Autoplay
        pagination={{ clickable: false }}
        navigation={true}
        scrollbar={{ draggable: true }}
        grabCursor={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="w-full h-full flex items-center"
      >
      {mainAppInfo.map((app, index) => (
      <SwiperSlide key={index}>
        {/* Centered widgets */}
        <div className="flex flex-row items-center justify-center w-full px-12 gap-12 h-full">
        
          {/* Left Side - Clickable Icon Widget */}
          <div className="flex-none w-60 h-60 bg-white rounded-2xl shadow-lg hover:scale-105 transition-transform">
            <a href={app.url} className="relative block w-full h-full rounded-2xl overflow-hidden">            
              <div className="flex items-center justify-center w-full h-full">
                <img src={app.icon} alt={app.name} className="w-48 h-48 object-contain" />
              </div>
            </a>
          </div>

          {/* Right Side - Transparent Text Widget */}
          <div className="flex-1 p-6 border-2 border-black rounded-2xl shadow-lg w-3/5 h-60 flex flex-col justify-center text-black bg-transparent">
          {/* Heart Icon */}
          <div className="absolute top-2 right-2 z-10">
            <FavoriteButton app={app} />
          </div>
            <h2 className="text-4xl font-bold text-black">{app.name}</h2>
            <p className="text-lg mt-2">{app.description}</p>
          </div>
        </div>
      </SwiperSlide>
  ))}
  </Swiper>
  </div>
  <FavoritesBar/>
    {/* Academic Links Section */}
    <div className="flex flex-col gap-6">
      <h2 className={`text-2xl font-bold ${textColor}`}>Academic Links</h2>
      <div className={`relative ${bgColor} rounded-lg p-2 overflow-x-auto shadow-none custom-scroll-container`} onScroll={handleScroll} ref={academicScrollRef}>
        <div className="flex flex-nowrap flex-row gap-4">
          {academicAppInfo.map((app) => (
          <div key={app.name} className="relative">
            <FavoriteButton app={app} />
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-none bg-gradient-to-b from-indigo-200 via-indigo-400 to-slate-900 p-6 rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col items-center justify-center w-72 h-48 border-2 border-black"
              >
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
      <h2 className={`text-2xl font-bold ${textColor}`}>Under Development</h2>
      <div className={`relative ${bgColor} rounded-lg p-2 overflow-x-auto shadow-none custom-scroll-container`} onScroll={handleScroll} ref={underDevScrollRef}>
        <div className="flex flex-nowrap flex-row gap-4">
          {underDevelopmentAppInfo.map((app, index) => (
            <div key={index} className="relative">
              <FavoriteButton app={app} />
                {/* Clickable Box */}
                <div onClick={(e) => {e.stopPropagation(); togglePopup(index); }} 
                    className="flex-none bg-gradient-to-b from-indigo-200 via-indigo-400 to-slate-900 p-6 rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col items-center justify-center w-72 h-48 border-2 border-black cursor-pointer hover:bg-slate-500 transition-all">
                  <img
                    src={app.icon || "/assets/placeholder.png"}
                    alt={app.name}
                    className="w-20 h-20 mb-2 object-contain"
                  />
                  <span className="font-medium text-white text-lg">{app.name}</span>
                </div>

                {/* Popup */}
                {activePopup === index && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white p-4 rounded-lg shadow-lg border-2 border-black w-64 z-50">
                    <h3 className="text-xl font-bold text-black text-center mb-2">{app.name}</h3>
                    <p className="text-sm text-gray-700 text-center">{app.description}</p>
                  </div>
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
    {activePopup !== null && (
    <div>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center" onClick={closePopup}></div>
      <div className="fixed top-[12.5vh] left-[12.5vw] bg-white w-[75vw] h-[75vh] p-6 rounded-lg shadow-lg border-2 border-black z-[199]" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-3xl font-bold text-black mb-4 text-center">
          {underDevelopmentAppInfo[activePopup]?.name}
        </h2>
        <p className="text-lg text-gray-700 text-center">
          {underDevelopmentAppInfo[activePopup]?.description}
        </p>
      </div>
    </div>
    )}
    </SignedIn>
    </div>
    </main>
    </QueryClientProvider>
  );
}