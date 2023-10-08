import { useState, useEffect } from "react";

export default function VerifyData() {
  
      const [videoMetaData, setVideoMetaData] = useState([]);
        const [validVideoMetaData, setValidVideoMetaData] = useState([]);
  

      const [selectedIndex, setSelectedIndex] = useState(0);

  const handleTabSelect = (index) => {
    setSelectedIndex(index);
  };


  const tabs = [
    {
      "id": 1,
      "tabName": "Pending",
      "detail": "View pending data to be checked here...",
    },
    {
      "id": 2,
      "tabName": "Valid",
      "detail": "View validated data here..",
    },
    
    
  ]



  const handleReportValid = (id) => {
    fetch(`http://localhost:3001/v1/videos/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "id": id, "status": true }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(() => alert("Reported as valid. Sending message to the rescue team."))
      .catch((error) => console.error(error));
  };



      useEffect(() => {
          const intervalId = setInterval(() => {
              fetch('http://localhost:3001/v1/videos/all')
                  .then(response => response.json())
                  .then(data => setVideoMetaData(data.filter((video) => video.status === false)))
                  .catch(error => console.error(error));
          }, 5000);


          const intervalId2 = setInterval(() => {
            fetch('http://localhost:3001/v1/videos/valid')
                .then(response => response.json())
                .then(data => setValidVideoMetaData(data))
                .catch(error => console.error(error));
        }, 5000);
  
          return () => {
            clearInterval(intervalId);
            clearInterval(intervalId2);
          };
      }, []);
  return (

    <div className="bg-gray-50">
      <h2 className="ml-3 mt-5 text-3xl font-bold">Verify data </h2>

      <div className="flex  ml-3 my-5">
        {tabs.map((tab, index) => (
          <button key={index} className={` ${selectedIndex === index ? "bg-teal-500  border-b-4 border-teal-600 text-white ": "bg-teal-50  border-b-4 border-teal-100 "} p-3 px-5   hover:bg-teal-200 duration-100 `} onClick={() => handleTabSelect(index)}>{tab.tabName}</button>
          
        ))}
         {/* <button className="p-3 px-5 text-teal-800 bg-teal-50 border-b-2 border-teal-600 hover:bg-teal-200 " onClick={() => handleTabSelect(1)}>Tab 2</button>
         <button className="p-3 px-5 text-teal-800 bg-teal-50 border-b-2 border-teal-600 hover:bg-teal-200 " onClick={() => handleTabSelect(2)}>Tab 3</button>
         <button className="p-3 px-5 text-teal-800 bg-teal-50 border-b-2 border-teal-600 hover:bg-teal-200 " onClick={() => handleTabSelect(3)}>Tab 4</button>
     */}
      </div>

      {/* {JSON.stringify(videoMetaData)} */}
{selectedIndex === 0 && (
    <>
          <h2 className="mb-3 font-bold text-2xl ml-3 ">Reported fires (pending)</h2> 
    <div className="container mx-auto flex flex-wrap   gap-3">
            {videoMetaData && videoMetaData.map((video) => (
                <div className="w-[500px] p-2 shadow-lg bg-white border rounded-md" key={video.id}>
                    <p>{video.status}</p>

                    <p>{video.checked}</p>

                    <img src={"http://localhost:3001/v1/videos/fetch/" + video.name} alt="NOT FOUND" />
                    {/* <p className="">{video.name}</p> */}
                    <p>{"Time: " + video.createdAt}</p>
                    <button onClick={() => handleReportValid(video.id)} className="bg-teal-700 hover:bg-teal-800 text-white font-lg w-full rounded-md py-3">Report as Valid</button>
                    <button className="mt-1 bg-red-600 hover:bg-red-700 text-white font-lg w-full rounded-md py-3">Report as False Positive</button>

                </div>
            )
            )}
            </div>
            </>
)}



{selectedIndex === 1 && (
    <>
        
        <div className="container mx-auto flex justify-center flex-col gap-3">
            <h2 className="font-bold text-2xl">Reported fires (valid)</h2> 
            {validVideoMetaData && validVideoMetaData.map((video) => (
                    
                <div className="max-w-lg p-2 shadow-lg bg-white border rounded-md" key={video.id}>
                    <p>{video.status}</p>

                    <p>{video.checked}</p>

                    <img src={"http://localhost:3001/v1/videos/fetch/" + video.name} alt="NOT FOUND" />
                    {/* <h2 className="text-2xl">{video.name}</h2> */}
                    <p>{"Created at: " + video.createdAt}</p>
                    <p>Reported as Valid</p>
                </div>
                    
            )
            )}
            </div>
    </>

)}

    </div>
  )
}
