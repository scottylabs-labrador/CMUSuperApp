import { useUser } from "@clerk/nextjs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AppIcon from "./AppIcon";
import { getFavorites } from "~/lib/api/favorites";
import { AppInfo } from "~/types";

function FavoritesBar() {
    const {isSignedIn, user} = useUser();
    const queryClient = useQueryClient();
    const {status, data} = useQuery({ queryKey: ['favorites', user?.id], queryFn: () => getFavorites(user?.id) });
    const favorites = data || [];
    console.log("bar", favorites);
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
  return (
    <div className="fixed left-2 flex-col overflow-x-auto bg-slate-200 p-1 rounded-lg">
      {favorites.map((favorite) => {
        const app = mainAppInfo.concat(academicAppInfo).concat(underDevelopmentAppInfo).find((app) => app.name == favorite);
        if (!app)
            return null;
        return (<div className="p-1" key={app.name}> <AppIcon app={app} /> </div>);
        })}
    </div>
  );
}

export default FavoritesBar;