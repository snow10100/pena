"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [consent, setConsent] = useState(false);
  const [task, setTask] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    if (task && consent) {
      const queryParams = {
        target: url,
        task: task,
      };
      router.push(`/chat?target=${queryParams.target}&task=${queryParams.task}`);
    }
  };

  return (
    <main className="bg-custom-gradient-dark min-h-screen flex flex-col items-center justify-center p-4">
      <div className="content text-center mb-12">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-custom-gradient mb-3">
          Welcome to BreachSeek
        </h1>
        <p className="text-xl text-white italic">AI-powered pentesting agent</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 bg-opacity-80 rounded-xl shadow-2xl p-10 max-w-md w-full backdrop-filter backdrop-blur-lg"
      >
        <div className="space-y-6">
          <div>
            <label
              htmlFor="url"
              className="block text-lg font-medium text-white mb-2"
            >
              Target
              <span className="text-gray-400 text-sm">{" (optional)"}</span>
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-3 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-[#5976F9] focus:border-transparent bg-gray-700 text-white placeholder-gray-400 transition duration-300"
            />
          </div>

          {/* addtional notes field */}
          <div>
            <label
              htmlFor="task"
              className="block text-lg font-medium text-white mb-2"
            >
              Task
              <span className="text-red-500">{" *"}</span>
            </label>
            <textarea
              id="task"
              placeholder="scan, test, exploit, report"
              className="w-full px-4 py-3 border-2 border-gray-700 rounded-lg focus:ring-2 
              focus:ring-[#5976F9] focus:border-transparent bg-gray-700 text-white
               placeholder-gray-400 transition duration-300 resize-none"
              onChange={(e) => setTask(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="h-5 w-5 text-[#04A5D3] focus:ring-[#5976F9] border-gray-300 rounded"
              required
            />
            <label htmlFor="consent" className="ml-3 block text-sm text-white">
              I agree to the terms and conditions of usage
            </label>
          </div>
          <button
            type="submit"
            className="w-full mt-4 bg-custom-gradient hover:opacity-90 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#5976F9] focus:ring-opacity-50"
          >
            Start Pentest
          </button>
        </div>

        <small className="mt-8 text-xs text-center text-gray-400">
          BreakSeek - Secure your digital assets with AI-driven insights
        </small>
      </form>
    </main>
  );
}
