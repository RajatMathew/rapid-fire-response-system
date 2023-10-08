import { useState, useEffect } from "react";

export default function VerifyData() {
  
      const [videoMetaData, setVideoMetaData] = useState([]);
  
      useEffect(() => {
          const intervalId = setInterval(() => {
              fetch('http://localhost:3001/v1/videos/all')
                  .then(response => response.json())
                  .then(data => setVideoMetaData(data))
                  .catch(error => console.error(error));
          }, 5000);
  
          return () => clearInterval(intervalId);
      }, []);
  return (

    <div>
      Verify data

      <div className="container mx-auto flex justify-center flex-col gap-3">
            <h2 className="font-bold text-2xl">Reported fires</h2> 
            {videoMetaData.map((video) => (
                <div className="max-w-lg p-2 bg-gray-200" key={video.id}>
                    <p>{video.status}</p>

                    <p>{video.checked}</p>

                    <img src={"http://localhost:3001/v1/videos/fetch/" + video.name} alt="NOT FOUND" />
                    <h2 className="text-2xl">{video.name}</h2>
                    <p>{video.createdAt}</p>
                </div>
            )
            )}
            </div>
    </div>
  )
}
