from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
from PIL import Image
import numpy as np
import tensorflow as tf
import uvicorn
import h5py

# Aplikasi FastAPI diinisialisasi untuk digunakan sebagai server web.
app = FastAPI()

# Middleware CORS ditambahkan ke aplikasi FastAPI untuk mengizinkan permintaan dari localhost dan localhost:3000.
origins = [
    "http://localhost",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model yang disimpan di file model-skin4-smote.h5 dimuat menggunakan TensorFlow.
MODEL = tf.keras.models.load_model(h5py.File('saved_model/model-skin4-smote.h5', 'r'))

# Daftar kelas prediksi disimpan dalam array CLASS_NAMES, yang berisi nama-nama penyakit kulit yang dapat diprediksi oleh model.
CLASS_NAMES = ['Actinic Keratoses', 'Basal Cell Carcinoma', 'Benign Keratosis-Like Lesions', 'Dermatofibroma', 'Melanoma', 'Melanocytic Nevi', 'Vascular Lesions']

# Fungsi read_file_as_image digunakan untuk memproses file gambar yang diunggah oleh pengguna.
def read_file_as_image(data) -> np.ndarray:
    image = Image.open(BytesIO(data)) # Gambar dibaca dari byte stream
    image = image.resize((120, 120))  # Mengubah ukuran gambar
    image = np.array(image)
    if image.shape[-1] == 4:  # Jika gambar memiliki kanal alpha, buang kanal alpha
        image = image[..., :3]
    image = image / 255.0  # Normalisasi nilai pixel
    return image

# Endpoint /predict digunakan untuk menerima permintaan POST yang berisi file gambar yang akan diprediksi.
@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):
    image = read_file_as_image(await file.read())
    img_batch = np.expand_dims(image, 0)

    # Melakukan prediksi pada gambar yang diberikan menggunakan model TensorFlow.
    # Fungsi predict() akan mengembalikan array yang berisi probabilitas untuk setiap kelas yang didefinisikan dalam model.
    predictions = MODEL.predict(img_batch)

    # Menentukan kelas yang memiliki probabilitas tertinggi berdasarkan hasil prediksi model.
    # Mengambil indeks dari nilai tertinggi (probabilitas terbesar) dalam array prediksi untuk gambar pertama (dan satu-satunya) dalam batch
    predicted_class = CLASS_NAMES[np.argmax(predictions[0])]

    # Menentukan tingkat kepercayaan (confidence) dari prediksi yang dilakukan oleh model.
    # Tingkat kepercayaan dihitung dengan mengambil nilai maksimum dari array prediksi untuk gambar pertama (dan satu-satunya) dalam batch. Misalnya, jika nilai tertinggi dalam array prediksi adalah 0.3, maka tingkat kepercayaan prediksi adalah 30%.
    confidence = np.max(predictions[0])

    # Mengembalikan hasil prediksi dalam bentuk JSON yang berisi kelas prediksi dan tingkat kepercayaan.
    return {
        'class': predicted_class,
        'confidence': float(confidence)
    }

# Fungsi main digunakan untuk menjalankan aplikasi FastAPI menggunakan server uvicorn di localhost pada port 8080.
if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8080)