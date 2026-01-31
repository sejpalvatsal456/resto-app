"use client";

import NavBar from "./_components/NavBar";

const navLinksData = [
  { name: "South Indian", tag: "south_indian" },
  { name: "Gujarati", tag: "gujarati" },
  { name: "Punjabi", tag: "punjabi" }
]

export default function Home() {

  return (
    <>
      <NavBar navLinksData={navLinksData} activePage="home" />
    </>
  );
}
