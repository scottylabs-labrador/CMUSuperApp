import { AppInfo } from "~/types";

interface AppIconProps {
  app: AppInfo;
}

function AppIcon({app}: AppIconProps) {
    // Looks like an apple app icon
    return (
        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center" onClick={() => window.open(app.url)}>
            <img src={app.icon} alt="logo" className="App-logo w-10 h-10" />
        </div>
    );
}

export default AppIcon;