import Tab from "./Tab";
import tabs_data from "./tabs_data";

import { Outlet, useNavigation } from "react-router-dom";



export default function Sidebar() {

  const navigation = useNavigation();

  return (
    <>
      <section className="sidebar border-r fixed top-0 left-0 w-72 h-screen bg-white">
        <h1 className="m-3 text-xl font-bold tracking-tight"> <br /> Admin</h1>
        <div className="flex flex-col mt-10">
          {tabs_data.map((tab, key) => (
            <Tab key={key} title={tab.title} url={tab.url} icon={tab.icon} />
          ))}
        </div>
      </section>

      <div id="detail" 
       className={
        navigation.state === "loading" ? "loading" : ""
      }>
        <div className="ml-72 ">
          <Outlet />
        </div>
      </div>
    </>
  );
}

