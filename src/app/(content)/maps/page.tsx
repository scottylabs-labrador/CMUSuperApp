"use client";

import React from "react";

export default function MapsPage() {
  return (
    <iframe
      className="w-[98vw] h-full fixed top-0 left-[2vw] z-0"
      src="https://cmumaps.com"
      tabIndex={0} /* Make iframe focusable */
      // eslint-disable-next-line
      onLoad={(e: any) => e.target.contentWindow.focus()} /* Set focus on load */
    />
  );
}
