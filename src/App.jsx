import LaunchTable from "./components/Table";
import Logo from "./assets/logo.png";

function App() {
  return (
    <div className="   w-[100%]  flex flex-col  items-center  h-screen">
      <div className=" pt-[10px] pb-[10px] shadow-lg w-full flex items-center justify-center mb-20">
        <img src={Logo} />
      </div>
      <div className=" w-full bg-black">
        <LaunchTable />
      </div>
    </div>
  );
}

export default App;
