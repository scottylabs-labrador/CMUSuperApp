"use client";

import React from "react";

export default function MapsPage({ params }: { params: { slug: string } }) {
  return (
    <iframe
      className="w-[98vw] h-full fixed top-0 left-[2vw] z-0"
      src="http://localhost:3001"
      tabIndex={0} /* Make iframe focusable */
      onLoad={(e) => e.target.contentWindow.focus()} /* Set focus on load */
    />
  );
}
