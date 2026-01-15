"use client";

import { setCookies } from "@/libs/setCookies";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignUpComponent() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [restaurantName, setRestaurantName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [contact, setContact] = useState<number>(NaN);

  const [mainPasswordEye, setMainPasswordEye] = useState<boolean>(false);
  const [confirmPasswordEye, setConfirmPasswordEye] = useState<boolean>(false);
  const [isPasswordMissmatched, setIsPasswordMissmatched] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMsg("");

    if (
      restaurantName === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      city === "" ||
      address === "" ||
      isNaN(contact)
    ) {
      alert("Fill all the fields.");
      setIsLoading(false);
      return;
    }

    const newRest = {
      name: restaurantName,
      email: email,
      password: password,
      city: city,
      address: address,
      contact: contact,
    };

    const res = await fetch("/api/restaurants/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRest),
    });

    const data = await res.json();
    if (!res.ok) {
      setIsLoading(false);
      setMsg(data.msg);
      return;
    }
    router.push("/restaurant");
    setIsLoading(false);
  };

  useEffect(() => {
    if (password === "" || confirmPassword === "") {
      setIsPasswordMissmatched(false);
      return;
    }
    console.log(password !== confirmPassword);
    setIsPasswordMissmatched(password !== confirmPassword);
  }, [password, confirmPassword]);

  return (
    <form action="#" method="POST" className="flex flex-col items-center">
      <h1 className="text-3xl mb-5 font-semibold">Sign Up</h1>
      <input
        type="email"
        className="border rounded mt-5 pl-4 py-2 text-xl w-70"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required={true}
        autoComplete="on"
      />
      <div className="password-group flex mt-5 w-70">
        <input
          type={mainPasswordEye ? "text" : "password"}
          className={
            "border border-r-0 rounded rounded-r-none pl-4 h-11 text-xl focus:outline-none " +
            (isPasswordMissmatched ? " border-2 border-red-500" : "")
          }
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
          autoComplete="on"
        />
        <div
          className={
            "eye-logo cursor-pointer h-11 w-10 flex justify-center items-center border border-l-0 rounded rounded-l-none" +
            (isPasswordMissmatched ? " border-red-500 border-2" : "")
          }
          onClick={(e: FormEvent) => {
            e.preventDefault();
            setMainPasswordEye(!mainPasswordEye);
          }}
        >
          {!mainPasswordEye ? <FaEye /> : <FaEyeSlash />}
        </div>
      </div>
      <div className="password-group flex mt-5">
        <input
          type={confirmPasswordEye ? "text" : "password"}
          className={
            "border border-r-0 rounded rounded-r-none pl-4 h-11 text-xl focus:outline-none" +
            (isPasswordMissmatched ? " border-red-500 border-2" : "")
          }
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required={true}
          autoComplete="on"
        />
        <div
          className={
            "eye-logo cursor-pointer h-11 w-10 flex justify-center items-center border border-l-0 rounded rounded-l-none" +
            (isPasswordMissmatched ? " border-red-500 border-2" : "")
          }
          onClick={(e: FormEvent) => {
            e.preventDefault();
            setConfirmPasswordEye(!confirmPasswordEye);
          }}
        >
          {!confirmPasswordEye ? <FaEye /> : <FaEyeSlash />}
        </div>
      </div>
      <span className="text-red-600 mt-2">
        {isPasswordMissmatched ? "Password do not matched" : ""}
      </span>
      <input
        type="text"
        className="border rounded mt-5 pl-4 py-2 text-xl w-70"
        placeholder="Restaurant Name"
        value={restaurantName}
        onChange={(e) => setRestaurantName(e.target.value)}
        required={true}
      />
      <input
        type="text"
        className="border rounded mt-5 pl-4 py-2 text-xl w-70"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required={true}
      />
      <input
        type="text"
        className="border rounded mt-5 pl-4 py-2 text-xl w-70"
        placeholder="Full address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required={true}
      />
      <input
        type="number"
        className="border rounded mt-5 pl-4 py-2 text-xl w-70"
        placeholder="Contact No."
        value={Number.isNaN(contact) ? "" : contact}
        onChange={(e) => {
          let newContact = e.target.value;
          setContact(Number.isNaN(newContact) ? NaN : parseInt(newContact));
        }}
        required={true}
      />

      <button
        className="mt-5 w-70 disabled:cursor-not-allowed disabled:bg-cyan-700 disabled:text-gray-200 text-white bg-cyan-500 hover:bg-cyan-600 hover:cursor-pointer min-w-60 h-10 rounded text-xl "
        type="submit"
        onClick={handleSubmit}
        disabled={isLoading || isPasswordMissmatched}
      >
        Sign Up
      </button>

      <span className="mt-5 text-red-600">{msg}</span>
    </form>
  );
}
