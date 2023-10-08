import socket



# Create a client socket

clientSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM);



# Connect to the server

clientSocket.connect(("192.168.0.113",9090));

while True:

    dataFromServer = clientSocket.recv(1024);



    # Print to the console

    print(dataFromServer.decode());
