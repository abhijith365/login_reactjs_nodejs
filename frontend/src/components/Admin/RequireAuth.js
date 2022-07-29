import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { AuthUser } from "../AuthRouter"


export const RequireAuth = ({ children }) => {
    const auth = AuthUser()
    console.log(auth.admin)
    useEffect(() => {
        if (auth.admin) { }
    }, [auth.admin])

    if (!auth.admin) {
        return <Navigate to={'/admin/login'} />
    } else {
        return (
            children
        )
    }

}
