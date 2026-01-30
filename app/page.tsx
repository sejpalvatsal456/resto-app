"use client";

import NavBar from "./_components/NavBar";

const navLinksData = [
  { name: "South Indian", tag: "south_indian" },
  { name: "Gujarati", tag: "gujarati" }
]

export default function Home() {

  return (
    <>
      <NavBar navLinksData={navLinksData} activePage="home" />
    </>
  );
}
