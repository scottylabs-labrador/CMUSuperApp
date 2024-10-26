import "~/styles/globals.css";

import NavBar from "~/components/NavBar";
import React from "react";

export const metadata = {
  title: "BoilerGram",
  description: "Your new favorite social media platform.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex h-screen w-screen">
      <div className="relative bg-purple-900 w-[15vw] left-[-13vw] flex-none h-full 
                      ease-in duration-150 hover:left-0 hover:bg-black z-10"
      >
        <NavBar />
      </div>
      <div className="flex-initial w-[85vw]">
        <div className="flex justify-center">
              {children}
        </div>
      </div> 
    </div>
  );
}
