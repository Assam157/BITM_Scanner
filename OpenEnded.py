import cv2
import torch
import base64
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS

# Flask
app = Flask(__name__)
CORS(app)

# YOLOv5 model
model = torch.hub.load("ultralytics/yolov5", "yolov5s", pretrained=True)

# Map YOLO classes → your categories
CLASS_MAP = {
    "cell phone": 1,  # Resistor
    "person": 0,      # Capacitor
    "mouse": 2        # Transducer
}

@app.route("/")
def home():
    return "Scanner YOLO backend"

@app.route("/detect_frame", methods=["POST"])
def detect_frame():
    data = request.json["frame"]

    # Remove data:image/png;base64,
    encoded = data.split(",")[1]

    # Decode base64 → image
    img_bytes = base64.b64decode(encoded)
    np_arr = np.frombuffer(img_bytes, np.uint8)
    frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    # YOLO detect
    results = model(frame)
    detections = results.pandas().xyxy[0]

    detected_value = -1
    box_list = []

    for _, row in detections.iterrows():
        name = row["name"]
        conf = float(row["confidence"])
        x1, y1 = float(row["xmin"]), float(row["ymin"])
        x2, y2 = float(row["xmax"]), float(row["ymax"])

        # Add box to list
        box_list.append({
            "class": name,
            "mapped": CLASS_MAP.get(name, -1),
            "conf": conf,
            "x1": x1,
            "y1": y1,
            "x2": x2,
            "y2": y2
        })

        # If class matches your map → choose detected_value
        if name in CLASS_MAP and detected_value == -1:
            detected_value = CLASS_MAP[name]

    return jsonify({
        "detected": detected_value,
        "boxes": box_list
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=False)
