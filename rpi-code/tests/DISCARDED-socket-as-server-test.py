


# This is to be run on the client machine (laptop in this case)



import socket

 

# Create a stream based socket(i.e, a TCP socket)

# operating on IPv4 addressing scheme

serverSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM);

 

# Bind and listen

serverSocket.bind(("0.0.0.0",9090));

serverSocket.listen();

 

# Accept connections

while(True):

    (clientConnected, clientAddress) = serverSocket.accept();

    print("Accepted a connection request from %s:%s"%(clientAddress[0], clientAddress[1]));

    clientConnected.send("Hello Client!".encode());
   
    while True:
        dataFromClient = clientConnected.recv(1024)
        if not dataFromClient:
            break
        print(dataFromClient.decode());

    # Close the connection
    clientConnected.close()
    print("Connection closed")

 

    # Send some data back to the client


