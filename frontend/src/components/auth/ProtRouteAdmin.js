import { useEffect } from "react"
import AdminSignIn from "../Admin/LoginPage"
import { AuthUser } from "../AuthRouter"

export const ProtRouteAdmin = ({ children }) => {
    const auth = AuthUser()
    useEffect(() => {
        auth.checkAdmin()
    }, [])

    if (!auth.admin) {
        return <AdminSignIn />
    }
    return children
}
