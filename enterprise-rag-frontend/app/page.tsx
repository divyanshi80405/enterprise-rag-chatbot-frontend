"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const API = "http://127.0.0.1:8000";

  async function uploadPDF() {
    if (!file) {
      alert("Please choose a PDF first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      await axios.post(`${API}/upload`, formData);

      setUploadStatus("PDF uploaded successfully!");
    } catch (error) {
      console.error(error);
      setUploadStatus("Upload failed.");
    } finally {
      setLoading(false);
    }
  }

  async function askAI() {
    if (!question.trim()) return;

    try {
      setLoading(true);

      const res = await axios.post(`${API}/ask`, {
        question,
      });

      setAnswer(res.data.answer);
    } catch (error) {
      console.error(error);
      setAnswer("Upload failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex justify-center items-center p-8">
      <div className="w-full max-w-3xl bg-zinc-900 rounded-2xl shadow-xl p-8">

        <h1 className="text-4xl font-bold mb-8 text-center">
          Enterprise RAG Chatbot
        </h1>

        <div className="mb-8">
          <label className="block mb-3 text-lg">
            Upload PDF
          </label>

          <input
  type="file"
  accept=".pdf"
  className="mb-4 block"
  onChange={(e) => {
    const selectedFile = e.target.files?.[0] || null;
    console.log(selectedFile);
    setFile(selectedFile);
  }}
/>

          <button
            onClick={uploadPDF}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg"
          >
            Upload
          </button>

          <p className="mt-3">{uploadStatus}</p>
        </div>

        <div>
          <label className="block mb-3 text-lg">
            Ask a Question
          </label>

          <textarea
            rows={4}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full rounded-lg bg-zinc-800 p-4 outline-none"
            placeholder="Ask anything about the uploaded PDF..."
          />

          <button
            onClick={askAI}
            className="mt-4 bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg"
          >
            Ask AI
          </button>
        </div>

        {loading && (
  <div className="mt-6 flex items-center gap-3 text-blue-400">
    <div className="h-4 w-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin"></div>
    <p>AI is analyzing your document...</p>
  </div>
)}

        {answer && (
          <div className="mt-8 rounded-lg bg-zinc-800 p-5 whitespace-pre-wrap">
            <h2 className="font-semibold mb-3">Answer</h2>
            {answer}
          </div>
        )}
      </div>
    </main>
  );
}