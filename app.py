from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import os

from rag import (
    extract_text_from_pdf,
    split_text,
    create_vector_store,
    get_answer
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

vectorstore = None


@app.get("/")
def home():
    return {"message": "Enterprise RAG API is running"}


@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    global vectorstore

    filepath = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(filepath, "wb") as f:
        f.write(await file.read())

    text = extract_text_from_pdf(filepath)
    chunks = split_text(text)
    vectorstore = create_vector_store(chunks)

    return {
        "message": "PDF uploaded successfully"
    }


@app.post("/ask")
async def ask(data: dict):

    global vectorstore

    if vectorstore is None:
        return {"answer": "Please upload a PDF first."}

    answer = get_answer(
        vectorstore,
        data["question"]
    )

    return {
        "answer": answer
    }