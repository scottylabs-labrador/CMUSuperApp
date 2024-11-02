"use client";
import { useUser } from "@clerk/nextjs";
import RootLayout from "/node_modules/cmumap/src/app/layout";
import { useEffect, useRef, useState } from "react";
import { Photo } from "~/types";
import { useRouter } from "next/navigation";

export default function MapsPage({ params }: { params: { slug: string } }) {
  return (
      <RootLayout params={params} searchParams={{userAgent: "desktop"}}/>
  );
}
