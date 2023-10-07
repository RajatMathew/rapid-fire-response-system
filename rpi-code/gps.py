import serial
import pynmea2


import socket

 

# Create a stream based socket(i.e, a TCP socket)

# operating on IPv4 addressing scheme

serverSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM);

 

# Bind and listen

serverSocket.bind(("0.0.0.0",9090));

serverSocket.listen();



# Accept connections


(clientConnected, clientAddress) = serverSocket.accept();

print("Accepted a connection request from %s:%s"%(clientAddress[0], clientAddress[1]));

clientConnected.send("Hello Client!".encode());


def sendViaSocket(msg):
    clientConnected.send(msg.encode());





# Define the serial port and baud rate (adjust based on your setup)
serial_port = "/dev/ttyAMA0"  # Default Raspberry Pi UART
baud_rate = 9600

try:
    # Open the serial port in binary mode
    ser = serial.Serial(serial_port, baud_rate, timeout=1)

    while True:
        # Read a line from the serial port as bytes
        line_bytes = ser.readline()
        
        # Convert bytes to a string (assuming ASCII encoding)
        line = line_bytes.decode('ascii', errors='ignore')
        
        # Check if the line contains NMEA data
        if line.startswith('$GPGGA'):
            try:
                # Parse the NMEA sentence
                msg = pynmea2.parse(line)
                
                # Extract latitude and longitude
                latitude = msg.latitude
                longitude = msg.longitude

                latLng = str(msg.latitude) + "," + str(msg.longitude)
                print(latLng)
                # print(type(latLng))
                
                # Print the coordinates
                # print(f"Latitude: {latitude}, Longitude: {longitude}")
                sendViaSocket(str(latLng))
            except pynmea2.ParseError:
                pass  # Ignore invalid NMEA sentences

except KeyboardInterrupt:
    print("Serial reader stopped")

finally:
    ser.close()  # Close the serial port when done
