import Image from 'next/image'
import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci';
import { FaRegUser } from 'react-icons/fa6';

export default function NavBar(
  { navLinksData, activePage } : {
    navLinksData: { name: string, tag: string }[];
    activePage: string
  }
) {

  const [searchText, setSearchText] = useState<string>("");

  const navLinksEl = navLinksData.map((navLink, key) => {
    return (
      <li
        key={key}
        className={
          "w-auto h-10 text-center cursor-pointer hover:underline " +
          (activePage === navLink.tag ? "underline" : "")
        }
      >
        <span>{navLink.name}</span>
      </li>
    );
  });

  return (
    <nav className='shadow-sm p-5'>
      {/* Top Bar */}
      <div className='flex justify-between'>
        {/* Logo */}
        <img
          src="https://marketplace.canva.com/EAFpeiTrl4c/2/0/1600w/canva-abstract-chef-cooking-restaurant-free-logo-a1RYzvS1EFo.jpg"
          alt='logo'
          width={50}
          height={50}
          className='rounded-full'
        />

        {/* Category */}
        <ul className="hidden md:flex items-center gap-10">{navLinksEl}</ul>

        {/* Search Bar */}
        <form
          action=""
          method="GET"
          className="flex items-center bg-[#f5f5f5] px-5 gap-5 rounded"
        >
          <CiSearch size={20} className="hidden md:flex h-10 " />
          {/* Fix size of search bar in mobile view */}
          <input
            className="w-15 md:w-auto h-10 focus:outline-none"
            placeholder="Search..."
            type="text"
            name="serachInput"
            id="searchInput"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
        </form>
        
        {/* Profile logos - desktop */}
        <ul className="hidden md:flex items-center gap-10">
          {/* <li className="relative">
            <FiShoppingCart size={25} />
            {cartCount > 0 && (
              <div className="absolute -bottom-2 -right-3 bg-red-500 text-white text-[14px] h-[20px] min-w-[20px] flex items-center justify-center rounded-full px-1">
                {cartCount}
              </div>
            )}
          </li> */}
          <li>
            <FaRegUser size={25} />
          </li>
        </ul>
        
      </div>
    </nav>
  )
}
