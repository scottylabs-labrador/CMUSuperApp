import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { AppBlock } from "~/components/AppBlock";
import { AppInfo } from "~/types";

export default async function HomePage() {
    const mainAppInfo: AppInfo[] = [
      {
        name: "CMUEats",
        description: "Find the best food on campus.",
        icon: "/assets/eats.png",
        url: "/eats",        // Keeping original internal route
      }, {
        name: "CMUCourses",
        description: "Find the best classes on campus",
        icon: "/assets/courses.png",
        url: "/courses",     // Keeping original internal route
      }, {
        name: "CMUMaps",
        description: "Find where your next class is on campus.",
        icon: "assets/maps.png",
        url: "/maps",        // Keeping original internal route
      }, {
        name: "Lost and Found",
        description: "Find your lost items",
        icon: "/assets/lostandfound.png",
        url: "/lostandfound", // Keeping original internal route
      }
    ];

    return (
      <main className="flex h-[95vh] flex-col items-center bg-slate-100">
        {/* Top bar */}
        <div className="flex flex-row justify-between text-3xl text-black font-bold bg-white w-full h-14 px-4 py-2"> 
          <div>
            {"Su" + "u".repeat(Math.floor(Math.random()*10)) + "perapp"}
          </div>
          <img src="/assets/profile.svg" alt="Account" className="h-10 w-10 cursor-pointer" />
        </div>
        <div className="container flex flex-col gap-12 px-4 py-16">
          <SignedOut>
            <h1 className="text-5xl font-extrabold tracking-tight text-black sm:text-[5rem]">
              Welcome!
            </h1>
            <SignInButton mode="modal">
              <button className="bg-blue-500 rounded-lg p-4 text-2xl">Login</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            {/* Original Apps Section - internal routes */}
            <div className="relative bg-gradient-to-b from-indigo-200 via-indigo-400 to-slate-900 rounded-lg p-2 overflow-x-auto h-96">
              <div className="flex flex-nowrap flex-row gap-4">
                {
                  mainAppInfo.map((app) => (
                    <AppBlock key={app.name} appInfo={app} cardType="l"></AppBlock>
                  ))
                }
              </div>
            </div>

            {/* Academic Links Section with heading */}
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-bold text-slate-800">Academic Links</h2>
              <div className="relative bg-slate-200 rounded-lg p-2 overflow-x-auto">
                <div className="flex flex-nowrap flex-row gap-4">
                  <a href="https://canvas.cmu.edu" target="_blank" rel="noopener noreferrer" 
                     className="flex-none bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col items-center justify-center w-64">
                    <img src="/assets/canvas.png" alt="Canvas" className="w-16 h-16 mb-2"/>
                    <span className="font-medium text-gray-800">Canvas</span>
                  </a>
                  
                  <a href="https://piazza.com/cmu" target="_blank" rel="noopener noreferrer"
                     className="flex-none bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col items-center justify-center w-64">
                    <img src="/assets/piazza.png" alt="Piazza" className="w-16 h-16 mb-2"/>
                    <span className="font-medium text-gray-800">Piazza</span>
                  </a>
                  
                  <a href="https://www.gradescope.com" target="_blank" rel="noopener noreferrer"
                     className="flex-none bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col items-center justify-center w-64">
                    <img src="/assets/gradescope.png" alt="Gradescope" className="w-16 h-16 mb-2"/>
                    <span className="font-medium text-gray-800">Gradescope</span>
                  </a>
                  
                  <a href="https://s3.andrew.cmu.edu/sio" target="_blank" rel="noopener noreferrer"
                     className="flex-none bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col items-center justify-center w-64">
                    <img src="/assets/sio.png" alt="SIO" className="w-16 h-16 mb-2"/>
                    <span className="font-medium text-gray-800">SIO</span>
                  </a>
                  
                  <a href="https://edstem.org" target="_blank" rel="noopener noreferrer"
                     className="flex-none bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col items-center justify-center w-64">
                    <img src="/assets/ed.png" alt="Ed" className="w-16 h-16 mb-2"/>
                    <span className="font-medium text-gray-800">Ed</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Under Development Section */}
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-bold text-slate-800">Under Development</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="aspect-square bg-slate-200 rounded-xl shadow-sm"></div>
                ))}
              </div>
            </div>

          </SignedIn>
        </div>
      </main>
    );
}