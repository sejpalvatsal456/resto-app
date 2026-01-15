"use client";

import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export default function UserLogin(
  { setIsLogin } : { setIsLogin: (val: boolean) => void }
) {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [mainPasswordEye, setMainPasswordEye] = useState<boolean>(true);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async(e:FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMsg("");

    if (email === "" || password === "") {
      setMsg("Fill all fields.");
      setIsLoading(false);
      return;
    }

    const res = await fetch("/api/user/login", {
      method: 'POST',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify({ email: email, password: password })
    });

    const data = await res.json();

    if(!res.ok) {
      setMsg(data.msg);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    router.push("/");
  }

  return (
    <div>
      <form className="flex flex-col items-center">
        <h1 className="text-4xl font-semibold my-5">User Login</h1>
        <input
          type="email"
          className="border rounded mt-5 pl-4 py-2 text-xl w-70"
          placeholder="Email"
          name="userEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required={true}
          autoComplete="on"
        />
        <div className="password-group flex mt-5 w-70">
          <input
            type={mainPasswordEye ? "text" : "password"}
            className="w-60 border border-r-0 rounded rounded-r-none pl-4 h-11 text-xl focus:outline-none "
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
            autoComplete="on"
          />
          <div
            className="eye-logo cursor-pointer h-11 w-10 flex justify-center items-center border border-l-0 rounded rounded-l-none"
            onClick={(e: FormEvent) => {
              e.preventDefault();
              setMainPasswordEye(!mainPasswordEye);
            }}
          >
            {!mainPasswordEye ? <FaEye /> : <FaEyeSlash />}
          </div>
        </div>

        <input
          className="mt-5 w-70 disabled:cursor-not-allowed disabled:bg-cyan-700 disabled:text-gray-200 text-white bg-cyan-500 hover:bg-cyan-600 hover:cursor-pointer min-w-60 h-10 rounded text-xl "
          type="submit"
          value="Login"
          disabled={isLoading}
          onClick={handleSubmit}
        />
        <span className="mt-5 text-red-600">{msg}</span>

        <p>Don't have an account? <span className="ml-5 text-blue-500 cursor-pointer" onClick={e => setIsLogin(false)}>Sign Up</span></p>

      </form>
    </div>
  );
}
