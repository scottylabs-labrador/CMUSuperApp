import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import AppIcon from "./AppIcon";
import { getFavorites } from "~/lib/api/favorites";
import { type AppInfo } from "~/types";

function FavoritesBar() {
    const { user } = useUser();
    const { data } = useQuery({ queryKey: ['favorites', user?.id], queryFn: () => getFavorites(user?.id) });
    const favorites = data ?? [];
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
        },
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
        }, { 
        name: "PandaNotes",
        description: "Access your course materials.",
        icon: "/assets/pandanotes.png",
        url: "https://www.pandanotes.org/",
     }];

    const underDevelopmentAppInfo: AppInfo[] = [
      {
        name: "Research @ CMU",
        description: "Find the best research opportunities on campus.",
        url: "https://www.youtube.com/shorts/SXHMnicI6Pg",
        icon: "/assets/research.png",
      }, {
        name: "Study Group Finder",
        description: "Find the best study groups on campus",
        url: "https://www.youtube.com/shorts/SXHMnicI6Pg",
        icon: "/assets/study_group_finder.png",
      }, {
        name: "Cooking with AI",
        description: "Find the best recipes on campus.",
        url: "https://www.youtube.com/shorts/SXHMnicI6Pg",
        icon: "/assets/cooking_with_AI.png",
      }, {
        name: "CMUGPT",
        description: "Find the best GPT on campus.",
        url: "https://www.youtube.com/shorts/SXHMnicI6Pg",
        icon: "/assets/CMUGPT.png",
      }, {
        name: "Comm[you]nity",
        description: "Find the best community on campus.",
        url: "https://www.youtube.com/shorts/SXHMnicI6Pg",
        icon: "/assets/comm_you_nity.png",
      }, {
        name: "CMU Shuttles",
        description: "Make the most of CMU Transportation!",
        url: "https://www.youtube.com/shorts/SXHMnicI6Pg",
        icon: "/assets/CMU_Shuttles.png",
      },
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