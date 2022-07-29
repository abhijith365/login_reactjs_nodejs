import React, { useEffect } from 'react'
import { AuthUser } from '../AuthRouter'
import Navbar from '../Navbar/Navbar'


export default function Home() {

  const auth = AuthUser()
  useEffect(() => {
    auth.checkUser()
  }, [])

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', 'justifyContent': 'center' }}>
        <h1 >User Name : {(auth.user) ? (auth.user.data.name) : "No User!"}</h1>
      </div>
    </div>
  )
}
