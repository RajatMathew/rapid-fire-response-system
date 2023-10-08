from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from typing import List
import shutil
import os
import subprocess
import requests

app = FastAPI()

# Endpoint to receive images and run YOLOv4 inference
@app.post("/recv")
async def analyze_images(file: UploadFile =  File(...)):
    # print(file.files.filename)
    try:
        
        # Create a temporary directory to store the uploaded images
        temp_dir = "uploads"
        # shutil.rmtree(temp_dir, ignore_errors=True)
        # os.makedirs(temp_dir)

        # Save the uploaded images to the temporary directory
        image_path = f"{temp_dir}/{file.filename}"
        with open(image_path, "wb") as image:
            shutil.copyfileobj(file.file, image)

        nestUrl = "http://localhost:3001/v1/videos/upload"


        with open(image_path, "rb") as image:
            files = {"file": ("i.jpg", image, "image/jpeg")}
            response = requests.post(nestUrl, files=files)

        print(response.json())
        # Clean up temporary directory
        # shutil.rmtree(temp_dir, ignore_errors=True)

        return JSONResponse(content={"message": "Image analyzed successfully"})
    except Exception as e:
        return HTTPException(status_code=500, detail=str(e))


# Run the FastAPI app using Uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)