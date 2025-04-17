"use client";

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
