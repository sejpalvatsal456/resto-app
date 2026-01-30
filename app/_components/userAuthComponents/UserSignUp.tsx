"use client";

import { useRouter } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

export default function UserSignUp(
  { setIsLogin } : { setIsLogin: (val: boolean) => void }
) {

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [mainPasswordEye, setMainPasswordEye] = useState<boolean>(false);
    const [confirmPasswordEye, setConfirmPasswordEye] = useState<boolean>(false);
    const [city, setCity] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [contact, setContact] = useState<number>(NaN);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isPasswordMissmatched, setIsPasswordMissmatched] = useState<boolean>(false);
    const [msg, setMsg] = useState<string>("");
    const router = useRouter();

    const handleSubmit = async(e: FormEvent) => {

        e.preventDefault();
        setIsLoading(true);
        setMsg("");

        if (name === "" || email === "" || password  === "" || confirmPassword === "" || city === "" || address === "" || isNaN(contact)) {
            setMsg("Fill all Fields.");
            return;
        }

        const newUser = {name, email, password, city, address, contact};

        const res = await fetch("/api/user/", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
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

    useEffect(() => {
    if (password === "" || confirmPassword === "") {
        setIsPasswordMissmatched(false);
        return;
    }
    console.log(password !== confirmPassword);
    setIsPasswordMissmatched(password !== confirmPassword);
    }, [password, confirmPassword]);

  return (
    <div>
      <form className="flex flex-col items-center">
        <h1 className="text-4xl font-semibold my-5">User Sign Up</h1>
        <input
            type="text" 
            className='border rounded mt-5 pl-4 py-2 text-xl w-70'
            placeholder='Name'
            name="userName" 
            value={name}
            onChange={e => setName(e.target.value)}
            required={true}
            autoComplete='on'
        />
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
            className={
                "w-60 border border-r-0 rounded rounded-r-none pl-4 h-11 text-xl focus:outline-none " +
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

        <div className="password-group flex mt-5 w-70">
          <input
            type={confirmPasswordEye ? "text" : "password"}
            className={
                "w-60 border border-r-0 rounded rounded-r-none pl-4 h-11 text-xl focus:outline-none " +
                (isPasswordMissmatched ? " border-2 border-red-500" : "")
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

        <input
            type="text" 
            className='border rounded mt-5 pl-4 py-2 text-xl w-70'
            placeholder='City'
            name="userCity" 
            value={city}
            onChange={e => setCity(e.target.value)}
            required={true}
            autoComplete='on'
        />

        <input
            type="text" 
            className='border rounded mt-5 pl-4 py-2 text-xl w-70'
            placeholder='Address'
            name="userAddress" 
            value={address}
            onChange={e => setAddress(e.target.value)}
            required={true}
            autoComplete='on'
        />

        <input
            type="number" 
            className='border rounded mt-5 pl-4 py-2 text-xl w-70'
            placeholder='Contact No.'
            name="userContact" 
            value={!isNaN(contact) ? contact : ""}
            onChange={e => setContact(parseFloat(e.target.value))}
            required={true}
            autoComplete='on'
        />

        <input
          className="mt-5 w-70 disabled:cursor-not-allowed disabled:bg-cyan-700 disabled:text-gray-200 text-white bg-cyan-500 hover:bg-cyan-600 hover:cursor-pointer min-w-60 h-10 rounded text-xl "
          type="submit"
          value="Sign Up"
          disabled={isLoading}
          onClick={handleSubmit}
        />
        <span className="mt-5 text-red-600">{msg}</span>

        <p>Already have an account? <span className="ml-5 text-blue-500 cursor-pointer" onClick={e => setIsLogin(true)}>Login</span></p>

      </form>
    </div>
  );
}
