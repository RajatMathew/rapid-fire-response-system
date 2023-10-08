import time
import picamera
import requests

# Initialize the camera
camera = picamera.PiCamera()

# URL where you want to send the POST request
post_url = 'http://192.168.186.7:8000/recv'  # Replace with your server URL

try:
    while True:
        # Get the current timestamp as a string
        timestamp = time.strftime("%Y-%m-%d_%H-%M-%S")

        # Define the filename with the timestamp
        filename = f"image_{timestamp}.jpg"

        # Capture and save the image
        camera.capture(filename)

        print(f"Image captured and saved as {filename}")

        # Send the image as a POST request
        with open(filename, 'rb') as image_file:
            files = {'file': image_file}
            response = requests.post(post_url, files=files)

        print(f"Image sent to server with status code: {response.status_code}")

        # Wait for 10 seconds
        time.sleep(4)
except KeyboardInterrupt:
    # Handle Ctrl+C gracefully by closing the camera
    camera.close()