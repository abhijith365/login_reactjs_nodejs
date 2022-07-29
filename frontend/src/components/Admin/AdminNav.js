import { useNavigate } from 'react-router-dom'
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core'

import useStyle from './style'
import { AuthUser } from '../AuthRouter'

export default function AdminNav() {
    let auth = AuthUser()
    let user = (auth.admin) ? JSON.stringify(auth.admin) : false
    const navigate = useNavigate();


    const classes = useStyle()
    return (
        <AppBar className={classes.appBar} position="static" color='inherit'>
            <div className={classes.brandContainer}>
                <Typography className={classes.heading} variant="h2" align='center'>Admin</Typography>
                {/* <img className={classes.image} src={''} alt='icon' height='60' /> */}
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Typography className={classes.userName} varient="h6"></Typography>
                        <Button variant='contained' onClick={() => { auth.AdminLogOut() }} color="secondary">Log Out</Button>
                    </div>

                ) :
                    <Button onClick={() => { navigate('/login') }} variant='contained' color='primary'>Log in</Button>
                }
            </Toolbar>
        </AppBar>
    )
}

