"use client";

import RestaurantHeader from '@/app/_components/RestaurantHeader'
import UserLogin from '@/app/_components/userAuthComponents/UserLogin'
import UserSignUp from '@/app/_components/userAuthComponents/UserSignUp';
import React, { useState } from 'react'

export default function Home() {

  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <>
      <RestaurantHeader isLogin={true} />  { /* Temparary using restaurant header */ }
      {
        isLogin
        ? <UserLogin setIsLogin={setIsLogin} />
        : <UserSignUp setIsLogin={setIsLogin} />
      }
    </>
  )
}
