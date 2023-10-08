import { useState } from "react";

export default function Analyze() {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleTabSelect = (index) => {
    setSelectedIndex(index);
  };


  const tabs = [
    {
      "id": 1,
      "tabName": "FIRMS",
      "detail": "FIRMS- senses thermal anomalies to detect potential wildfires. Historical wildlife data can predict future wildfire outbreaks",
      "src": "https://ee-rajatxmathew.projects.earthengine.app/view/apppp"
    },
    {
      "id": 2,
      "tabName": "NDVI",
      "detail": "NDVI- Analyses IR spectrum to determine the presence and condition of vegetation",
      "src": "https://ee-rajatxmathew.projects.earthengine.app/view/ndvi"
    },
    {
      "id": 3,
      "tabName": "Surface Temperature Map",
      "detail": "Surface temperature map, higher the temperature, higher the probability of forest fire",
      "src": "https://ee-rajatxmathew.projects.earthengine.app/view/temperature-map"
    },
    
  ]

  return (
    <div>
      <h2 className="text-xl ml-3 font-bold mt-3 ">Analyze satellite data</h2>
      <div className="flex  ml-3 my-5">
        {tabs.map((tab, index) => (
          <button key={index} className={` ${selectedIndex === index ? "bg-teal-500  border-b-4 border-teal-600 text-white ": "bg-teal-50  border-b-4 border-teal-100 "} p-3 px-5   hover:bg-teal-200 duration-100 `} onClick={() => handleTabSelect(index)}>{tab.tabName}</button>
          
        ))}
         {/* <button className="p-3 px-5 text-teal-800 bg-teal-50 border-b-2 border-teal-600 hover:bg-teal-200 " onClick={() => handleTabSelect(1)}>Tab 2</button>
         <button className="p-3 px-5 text-teal-800 bg-teal-50 border-b-2 border-teal-600 hover:bg-teal-200 " onClick={() => handleTabSelect(2)}>Tab 3</button>
         <button className="p-3 px-5 text-teal-800 bg-teal-50 border-b-2 border-teal-600 hover:bg-teal-200 " onClick={() => handleTabSelect(3)}>Tab 4</button>
     */}
      </div>


      {tabs.map((tab, index) => (
        <div key={tab.id} style={{ display: selectedIndex === index ? "block" : "none" }}>
          <h2 className="ml-3 text-xl font-bold">About {tab.tabName}</h2>
          <p className="ml-3 mb-5">{tab.detail}</p>
          <iframe
            src={tab.src}
            title={tab.tabName}
            style={{ width: "100%", height: "calc(100vh - 40px)" }}
          ></iframe>
        </div>
      ))}

      {selectedIndex === 0 && (
      
        <iframe
          src="https://ee-rajatxmathew.projects.earthengine.app/view/apppp"
          title="My App"
          style={{ width: "100%", height: "calc(100vh - 40px)" }}
        ></iframe>
      )}
      {selectedIndex === 1 && (
        <iframe
          src="https://ee-rajatxmathew.projects.earthengine.app/view/apppp"
          title="My App"
          style={{ width: "100%", height: "calc(100vh - 40px)" }}
        ></iframe>
      )}
      {selectedIndex === 2 && (
        <iframe
          src="https://ee-rajatxmathew.projects.earthengine.app/view/apppp"
          title="My App"
          style={{ width: "100%", height: "calc(100vh - 40px)" }}
        ></iframe>
      )}
      {selectedIndex === 3 && (
        <iframe
          src="https://ee-rajatxmathew.projects.earthengine.app/view/apppp"
          title="My App"
          style={{ width: "100%", height: "calc(100vh - 40px)" }}
        ></iframe>
      )}
    </div>
  );
}