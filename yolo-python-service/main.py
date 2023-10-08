from ultralytics import YOLO
import cv2
import numpy as np
import os
import shutil
import requests
import asyncio

import struct
import socket
import pickle


def sendViaSocket(size, data):
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client_socket.connect(('127.0.0.1', 8000))
    connection = client_socket.makefile('wb')
    client_socket.sendall(struct.pack(">L", size) + data)

async def main():
    model = YOLO('models/yolov8n.pt')
    print("before stream read")


    # Sample local rtsp stream
    # cap = cv2.VideoCapture('rtsp://admin:admin@192.168.29.252:1935')

    # cap = cv2.VideoCapture('rtsp://192.168.29.151:8554/stream')
    cap = cv2.VideoCapture('http://pendelcam.kip.uni-heidelberg.de/mjpg/video.mjpg')

    # cap = cv2.VideoCapture('http://192.168.0.101:5000/')


    print("=====stream read")

    count = 0

    img_counter = 0


    encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), 90]

    # Loop through the video frames
    while cap.isOpened():
        # Read a frame from the video
        success, frame = cap.read()

        if success:
            # Run YOLOv8 inference on the frame
            results = model(frame, conf=0.4, stream=True)

            for result in results:
            # Visualize the results on the frame
                annotated_frame = result.plot()
                # writer.write(result.plot())

                # Display the annotated frame
                # cv2.imshow("YOLOv8 Inference", annotated_frame)


                if result.boxes is not None and len(result.boxes) > 0:
                    name = "frames/frame_%d.jpg" % count
                    image = np.array(annotated_frame)
                    # cv2.imwrite(name, image)
                    model(source=image, save=True, project='./frames')
                    nvm, imgToBeSent = cv2.imencode('.jpg', annotated_frame, encode_param)
                    
                    print(type(frame))
                    # print(type(annotated_frame))
                    print(type(imgToBeSent))


                    while True:
                        data = pickle.dumps(imgToBeSent, 0)
                        size = len(data)
                        sendViaSocket(size, data)
                        img_counter += 1

                    # print("saved frame " + name)
                    # count += 1
                    # await post_image(name)





            # print(result.boxes)

            
            # if result.boxes is not None:
            #     annotated_frame = results[0].plot()
            #     name = "frames/frame_%d.jpg" % count
            #     image = np.array(annotated_frame)
            #     # print(image)
            #     cv2.imwrite(name, image)
            #     print("saved frame " + name)
            #     count += 1

            # Break the loop if 'q' is pressed
            if cv2.waitKey(1) & 0xFF == ord("q"):
                break
        else:
            # Break the loop if the end of the video is reached
            break

    # Release the video capture object and close the display window
    cap.release()
    cv2.destroyAllWindows()

    print("reached the end")



if __name__ == '__main__':
    asyncio.run(main())