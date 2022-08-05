import { useEffect } from "react"
import { AuthUser } from "../AuthRouter"
import SignIn from "../LoginForm/LoginForm"

export const ProtRouteUser = ({ children }) => {
    const auth = AuthUser()
    useEffect(() => {
        auth.checkUser()
    }, [])

    if (!auth?.user) { return <SignIn /> }

    return children
}
