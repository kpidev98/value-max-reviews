import { Suspense } from "react";
import Home from "@/components/Home";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8 text-gray-500">Loading...</div>}>
      <Home />
    </Suspense>
  );
}
