"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Page() {
  const [url, setUrl] = useState("");
  const [consent, setConsent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url && consent) {
      console.log("Starting pentest for:", url);
      // Add your pentest logic here
    } else {
      alert("Please enter a URL and agree to the terms and conditions.");
    }
  };

  return (
    <main className="bg-custom-gradient-dark min-h-screen flex flex-col items-center justify-center p-4">
      <div className="content text-center mb-12">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-custom-gradient mb-3">
          Welcome to BreakSeek
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
              Enter your website URL for pentesting:
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-3 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-[#5976F9] focus:border-transparent bg-gray-700 text-white placeholder-gray-400 transition duration-300"
              required
            />
          </div>

          {/* addtional notes field */}
          <div>
            <label
              htmlFor="notes"
              className="block text-lg font-medium text-white mb-2"
            >
              Additional notes:
            </label>
            <textarea
              id="notes"
              placeholder="Any additional notes for the pentest?"
              className="w-full px-4 py-3 border-2 border-gray-700 rounded-lg focus:ring-2 
              focus:ring-[#5976F9] focus:border-transparent bg-gray-700 text-white
               placeholder-gray-400 transition duration-300 resize-none"
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

          <Link href="/chat">
            <button
              type="submit"
              className="w-full mt-4 bg-custom-gradient hover:opacity-90 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#5976F9] focus:ring-opacity-50"
            >
              Start Pentest
            </button>
          </Link>
        </div>

        <small className="mt-8 text-xs text-center text-gray-400">
          BreakSeek - Secure your digital assets with AI-driven insights
        </small>
      </form>
    </main>
  );
}
