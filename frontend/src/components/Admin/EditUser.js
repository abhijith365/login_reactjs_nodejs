import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Box,
    Typography,
    Container,
    createTheme,
    ThemeProvider,

} from '@material-ui/core';
import { AuthUser } from '../AuthRouter';


const theme = createTheme();

export default function EditUser() {

    let auth = AuthUser()
    const navigate = useNavigate()
    const { state } = useLocation()

    // const [initialUser, setInitialUser] = useState({})
    const initialUser = { name: "", "email": "", "password": "" }
    const [user, setUser] = useState(initialUser)
    const [isSubmit, setIsSubmit] = useState(false)
    const [formError, setFormError] = useState({})

    const token = localStorage.getItem("adminConfig");
    const header = { headers: { "Authorization": `Bearer ${token}` } }

    useEffect(() => {
        axios.post(`http://127.0.0.1:8080/admin/user/edit/`, { id: state._id }, header).then(res => setUser(res.data.data))

    }, [])

    useEffect(() => {

        if (Object.keys(formError).length === 0 && isSubmit) {
            // console.log(user)
        }

    }, [formError, isSubmit])

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSubmit(true)
        setFormError(validate(user))


        if (Object.keys(formError).length === 0 && isSubmit) {

            const userData = await axios.post('http://127.0.0.1:8080/admin/user/saveEdit/', user, header)
            const data = userData.data

            if (data.status === 201) {
                navigate('/admin', { replace: false })
            }
            else {
                setFormError({ "error": data.message })
                // console.log(data)
            }

        }
    };


    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    //form validation 
    const validate = (value) => {
        const error = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!value.name) {
            error.name = "Username is required"
        }
        if (!value.email) {
            error.email = "email is required"
        } else if (!regex.test(value.email)) {
            error.email = "Invalide email format"

        }
        // if (!value.password) {
        //     error.password = "password is required"
        // } else if (value.password.length < 5) {
        //     error.password = "password must be more than 4 characters"
        // } else if (value.password.length > 11) {
        //     error.password = "password must be with in 10 characters"
        // }

        return error
    }


    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />

                <Box
                    sx={{
                        marginTop: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Typography component="h1" variant="h4" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: '30px'
                    }}>
                        Edit User
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>


                        <TextField

                            value={user.name}
                            error={formError.name ? true : false}
                            helperText={formError.name ? formError.name : ''}
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Enter name"
                            name="name"
                            autoComplete="name"
                            onChange={handleChange}
                            autoFocus
                        />

                        <TextField
                            value={user.email}
                            error={formError.email ? true : false}
                            helperText={formError.email ? formError.email : ''}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={handleChange}
                            autoFocus
                        />
                        {/* <TextField
                            error={formError.password ? true : false}
                            helperText={formError.password ? formError.password : ''}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={handleChange}
                            autoComplete="current-password"
                        /> */}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            style={{ marginTop: "20px" }}
                        >
                            Save User
                        </Button>

                        {(formError.error) &&
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                style={{
                                    marginTop: "20px",
                                    backgroundColor: "red"
                                }}
                            >
                                {(formError.error) ? formError.error : ''}
                            </Button>
                        }
                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    );
}