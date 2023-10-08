from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from typing import List
import shutil
import os
import subprocess
import requests
import uvicorn
from ultralytics import YOLO
import cv2
import numpy as np
import time


app = FastAPI()

model = YOLO('models/yolov8n.pt')


count = 0


def yoloFunction(image_path):
    # img = cv2.imread(image_path)
    print("here")
    results = model.predict(image_path)
    # annotated_frame = results.plot()
    boxes_detected = False
    
    name = "detected_frames/detected_frame_" + count +  ".jpg"

    for r in results:
        print(r.boxes)
        im_array = r.plot()  # plot a BGR numpy array of predictions
        im = np.array(im_array)
        # cv2.imshow("YOLOv8 Inference", im)

        
        if r.boxes is not None and len(r.boxes) > 0:
            cv2.imwrite(name, im)
            boxes_detected = True

    if boxes_detected:
        return {"detected": True, "image_path": name}
    else:
        return {"detected": False, "image_path": ""}




def echoo(msg):
    return msg;



# Endpoint to receive images and run YOLOv4 inference
@app.post("/recv")
async def analyze_images(file: UploadFile =  File(...)):
    # print(file.files.filename)
    try:
        
        nestUrl = "http://localhost:3001/v1/videos/upload"
        # Create a temporary directory to store the uploaded images
        temp_dir = "uploads"
        # shutil.rmtree(temp_dir, ignore_errors=True)
        # os.makedirs(temp_dir)

        # Save the uploaded images to the temporary directory
        image_path = f"{temp_dir}/{file.filename}"
        with open(image_path, "wb") as image:
            shutil.copyfileobj(file.file, image)


        print(image_path)

        # print("M1 " + image_path)
        # print(echoo("hiiiiii")) 
        yResult = yoloFunction(image_path)
        # print("m3")
        # print("m2" + str(yResult))
        # if yResult.detected == True:
        # with open(image_path, "rb") as image:
        #     files = {"file": ("i.jpg", image, "image/jpeg")}
        #     response = requests.post(nestUrl, files=files)
        #     print(response.json())

        requests.post(nestUrl, file=file)
        # if detectedOrNot == True:
        #     with open(image_path, "rb") as image:
        #         files = {"file": ("i.jpg", image, "image/jpeg")}
        #         response = requests.post(nestUrl, files=files)



        # print(response.json())
        # Clean up temporary directory
        # shutil.rmtree(temp_dir, ignore_errors=True)

        return JSONResponse(content={"message": "Image analyzed successfully"})
    except Exception as e:
        return HTTPException(status_code=500, detail=str(e))















# Run the FastAPI app using Uvicorn
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)