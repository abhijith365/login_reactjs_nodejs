import { useNavigate } from 'react-router-dom'
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core'

import useStyle from './style'
import { AuthUser } from '../AuthRouter'
import Swal from "sweetalert2";


export default function Navbar() {
    let auth = AuthUser()
    let user = (auth.user) ? auth.user.data.name : false
    const navigate = useNavigate();

    const logout = () => {
        try {
            Swal.fire({
                title: "Do you Want to logout?",
                showDenyButton: true,
                confirmButtonText: "yes",
                denyButtonText: "No",
                customClass: {
                    actions: "my-actions",
                    confirmButton: "order-2",
                    denyButton: "order-3",
                },
            }).then(async (result) => {
                if (result.isConfirmed) {
                    auth.logOut()
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const classes = useStyle()
    return (
        <AppBar className={classes.appBar} position="static" color='inherit'>
            <div className={classes.brandContainer}>
                <Typography className={classes.heading} variant="h2" align='center'>Home page</Typography>
                {/* <img className={classes.image} src={''} alt='icon' height='60' /> */}
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Typography className={classes.userName} varient="h6"></Typography>
                        <Button variant='contained' onClick={logout} color="secondary">Log Out</Button>
                    </div>

                ) :
                    <Button onClick={() => { navigate('/login') }} variant='contained' color='primary'>Log in</Button>
                }
            </Toolbar>
        </AppBar>
    )
}

