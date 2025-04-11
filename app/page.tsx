"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

export default function Home() {
  const [review, setReview] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const userId = searchParams.get("user_id");

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch(
          `https://kpi-back-phi.vercel.app/api/google-sheets/review/valuemax?user_id=${userId}`
        );
        const data = await res.json();
        setReview(data.review_text);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    if (userId) {
      fetchReviews();
    }
  }, [userId]);

  const handleCopy = () => {
    if (review) {
      navigator.clipboard.writeText(review);
      toast.success("Text copied to clipboard!");
    } else {
      toast.error("No review to copy.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* Sticky nav */}
      <nav className="sticky top-0 z-50 bg-white w-full shadow px-6 py-2 flex items-center">
        <a
          href="https://valuemaxrentals.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image width={200} height={60} src="/logo.png" alt="Logo" />
        </a>
      </nav>

      {/* Main content with Tailwind background image */}
      <main className="flex flex-col items-center sm:items-start gap-8 p-6 sm:p-6 flex-grow w-full min-h-[80vh] bg-[url('/value-bg.webp')] bg-cover bg-center bg-no-repeat">
        <h1 className="text-6xl font-semibold text-[#543107] bg-white/80 px-4 py-2 rounded-md">
          Review Text
        </h1>

        <div className="w-full max-w-2xl space-y-4 bg-white/80 p-4 rounded-xl backdrop-blur-sm shadow-md">
          {/* Loader, Review, or Message */}
          {review === null ? (
            <div className="flex justify-center items-center py-10">
              <div className="h-8 w-8 border-4 border-[#f4b841] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : review ? (
            <div>
              <p>{review}</p>
            </div>
          ) : (
            <p className="italic text-gray-500">No review available.</p>
          )}

          {/* Action buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleCopy}
              className="px-2 py-2 w-40 text-sm bg-[#f4b841] text-black rounded transition duration-300 ease-in-out hover:bg-[#e2a92e] hover:shadow-md flex justify-center items-center cursor-pointer"
            >
              Copy
            </button>

            <a
              href="https://g.page/r/CRpiyKzLpkWvEBM/review"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-2 w-40 text-sm border border-[#f4b841] text-black rounded transition duration-300 ease-in-out hover:bg-[#f4b841] hover:text-white hover:shadow-md flex justify-center items-center"
            >
              Leave a Review
            </a>
          </div>
        </div>
      </main>

      <footer className="p-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Value Max Rentals
      </footer>
    </div>
  );
}
