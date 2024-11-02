"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
import { Photo } from "~/types";

export default function CoursesPage() {
  return (
    <iframe
      className="w-[98vw] h-full fixed top-0 left-[2vw] z-0"
      src="https://courses.scottylabs.org"
      tabIndex={0} /* Make iframe focusable */
      onLoad={(e) => e.target.contentWindow.focus()} /* Set focus on load */
    />
  );
}
