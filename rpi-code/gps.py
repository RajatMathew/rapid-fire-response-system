import serial
import pynmea2
import pyrebase
import time

config = {
  "apiKey": "AIzaSyAxgFUnEC86-EV4vTdP2OF2PyZpqfezR3A",
  "authDomain": "nasa-d9822.firebaseapp.com",
  "databaseURL": "https://nasa-d9822-default-rtdb.firebaseio.com",
  "projectId": "nasa-d9822",
  "storageBucket": "nasa-d9822.appspot.com",
  "messagingSenderId": "803691422915",
  "appId": "1:803691422915:web:347015fb0c204e6b79ae76",
  "measurementId": "G-W8R1ZBYC3P"
}

firebase = pyrebase.initialize_app(config)

db = firebase.database()

# data = {"name": "Mortimer 'Morty' Smith"}

# db.child("users").child("Morty")

# db.child("users").push(data)


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

                latLng = str(msg.latitude) + ", " + str(msg.longitude)
                print(latLng)

                data = {"timestamp": time.time(), "location": latLng}

                db.child("gpsLocation").push(data)
                # print(type(latLng))
                
                # Print the coordinates
                # print(f"Latitude: {latitude}, Longitude: {longitude}")
                # sendViaSocket(str(latLng))
            except pynmea2.ParseError:
                pass  # Ignore invalid NMEA sentences

except KeyboardInterrupt:
    print("Serial reader stopped")

finally:
    ser.close()  # Close the serial port when done
