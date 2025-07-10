import LaunchTable from "./components/Table";
import Logo from "./assets/logo.png";
import { useState } from "react";

function App() {
  const [bgblur, setBgblur] = useState(false);

  return (
    <div className="relative bg-black w-full min-h-screen overflow-auto">
      {/* Background Content */}
      <div
        className={`${
          bgblur ? "opacity-50 pointer-events-none" : ""
        } transition-opacity bg-white duration-300 w-full`}
      >
        <div className="pt-2 pb-2 shadow-lg w-full flex items-center justify-center mb-20">
          <img src={Logo} />
        </div>
        <div className="w-full">
          <LaunchTable setBgblur={setBgblur} />
        </div>
      </div>
    </div>
  );
}

export default App;
