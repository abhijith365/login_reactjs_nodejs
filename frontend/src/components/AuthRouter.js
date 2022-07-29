import axios from 'axios'
import { useContext, createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const authContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [admin, setAdmin] = useState(null)
  const [errMeg, setErrMeg] = useState(null)
  const navigate = useNavigate()



  const login = (data) => {
    localStorage.setItem('userConfig', data.data[0].token);
    setUser(data)
  }

  const signUp = (data) => {
    localStorage.setItem('userConfig', data.data[0].token);
    setUser(data)
  }

  const adminLogin = (data) => {
    let token = data.data
    localStorage.setItem('adminConfig', token[0].token);
    setAdmin(data.data)

  }

  const checkAdmin = async () => {
    let token = localStorage.getItem('adminConfig')

    if (token) {
      let header = { headers: { "Authorization": `Bearer ${token}` } }
      let { data } = await axios.get('http://127.0.0.1:8080/admin', header)
      if (data.data) {
        setAdmin(data)
      } else {
        setAdmin(null)
      }
    }
  }

  const checkUser = async () => {
    let token = localStorage.getItem('userConfig')

    if (token) {
      let header = { headers: { "Authorization": `Bearer ${token}` } }
      let { data } = await axios.get('http://127.0.0.1:8080/user', header)
      if (data.data) {
        setUser(data)
      } else {
        setUser(null)
      }
    }
  }

  const logOut = () => {
    localStorage.removeItem('userConfig')
    setUser(null)
    navigate('/', { replace: true })
  }
  const AdminLogOut = () => {
    localStorage.removeItem('adminConfig')
    setAdmin(null)
    navigate('/admin', { replace: true })
  }

  //exporting prop list
  const propList = {
    login,
    user,
    errMeg,
    setErrMeg,
    signUp,
    checkUser,
    logOut,
    admin,
    adminLogin,
    checkAdmin,
    AdminLogOut
  }

  return (
    <authContext.Provider value={propList}>
      {children}
    </authContext.Provider>
  )
}

export const AuthUser = () => {
  return useContext(authContext)
}

