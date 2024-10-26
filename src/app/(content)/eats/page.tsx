"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
import { Photo } from "~/types";

export default function EatsPage() {
  return (
    <main className="container relative overflow-scroll h-screen">
      <p className="text-4xl text-white font-bold pt-4 text-center">EATS</p>
    </main>
  );
}
