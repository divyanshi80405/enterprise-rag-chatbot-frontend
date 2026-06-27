# Enterprise RAG Chatbot

An AI-powered Retrieval-Augmented Generation (RAG) chatbot that enables users to upload PDF documents and ask natural language questions about their content. The application combines semantic search with FAISS and Google Gemini to generate accurate, context-aware responses.

## Live Demo

**Frontend:**  
https://YOUR-VERCEL-URL.vercel.app

**Backend API:**  
https://YOUR-HF-SPACE.hf.space

## Features

- Upload and process PDF documents
- Semantic search using FAISS vector database
- Context-aware question answering with Google Gemini
- LangChain-powered Retrieval-Augmented Generation pipeline
- FastAPI backend
- Next.js frontend with Tailwind CSS
- Responsive and modern user interface

## Tech Stack

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- Axios

### Backend

- FastAPI
- LangChain
- FAISS
- HuggingFace Sentence Transformers
- Google Gemini API
- PyPDF
- Python

## Architecture

```text
User
   │
   ▼
Next.js Frontend
   │
   ▼
FastAPI Backend
   │
   ├── PDF Processing (PyPDF)
   ├── Text Chunking
   ├── HuggingFace Embeddings
   ├── FAISS Vector Search
   └── Google Gemini 2.5 Flash
```

## Installation

```bash
git clone https://github.com/divyanshi80405/enterprise-rag-chatbot.git
cd enterprise-rag-chatbot

python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt

python -m uvicorn app:app --reload
```

## Repositories

**Backend:**  
https://github.com/divyanshi80405/enterprise-rag-chatbot

**Frontend:**  
https://github.com/divyanshi80405/enterprise-rag-chatbot-frontend

## Author

**Divyanshi Negi**

GitHub: https://github.com/divyanshi80405

LinkedIn: https://www.linkedin.com/in/divyanshi-negi/
