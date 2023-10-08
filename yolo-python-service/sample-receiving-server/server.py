import socket
import sys
import cv2
import pickle
import numpy as np
import struct ## new
import zlib

import os

import shutil

if os.path.exists("uploads"):
    shutil.rmtree("uploads")

if not os.path.exists("uploads"):
    os.makedirs("uploads")


HOST=''
PORT=8000

s=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
print('Socket created')

s.bind((HOST,PORT))
print('Socket bind complete')
s.listen(10)
print('Socket now listening')

conn,addr=s.accept()

data = b""
payload_size = struct.calcsize(">L")
print("payload_size: {}".format(payload_size))

count = 0
while True:
    while len(data) < payload_size:
        print("Recv: {}".format(len(data)))
        data += conn.recv(4096)

    print("Done Recv: {}".format(len(data)))
    packed_msg_size = data[:payload_size]
    data = data[payload_size:]
    msg_size = struct.unpack(">L", packed_msg_size)[0]
    print("msg_size: {}".format(msg_size))
    while len(data) < msg_size:
        data += conn.recv(4096)
    frame_data = data[:msg_size]
    data = data[msg_size:]

    frame=pickle.loads(frame_data, fix_imports=True, encoding="bytes")
    frame = cv2.imdecode(frame, cv2.IMREAD_COLOR)
    filename = "uploads/frame_%d.jpg" % count
    cv2.imwrite(filename, frame)
    count += 1
    # cv2.imshow('ImageWindow',frame)
    cv2.waitKey(1)