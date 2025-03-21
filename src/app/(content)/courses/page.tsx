"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";

export default function CoursesPage() {
  return (
    <iframe
      className="w-[98vw] h-full fixed top-0 left-[2vw] z-0"
      src="https://courses.scottylabs.org"
      tabIndex={0}
      onLoad={(e) => (e.target as HTMLIFrameElement).contentWindow?.focus()}
    />
  );
}
