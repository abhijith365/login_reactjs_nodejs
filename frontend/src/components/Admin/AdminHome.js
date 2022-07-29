import { useEffect } from 'react'

import { AuthUser } from '../AuthRouter'
import AdminNav from './AdminNav'
import AdminSignIn from './LoginPage'
import UserDetails from './UserDetail'

export default function AdminHome() {
    const auth = AuthUser()

    useEffect(() => {
        auth.checkAdmin()
    }, [])

    if (auth.admin) {
        return (
            <div>
                <AdminNav />
                <UserDetails />
            </div>
        )
    } else {
        return <AdminSignIn />
    }
}
