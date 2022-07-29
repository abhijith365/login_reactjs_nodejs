
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AdminHome from './components/Admin/AdminHome';
import AdminSignIn from './components/Admin/LoginPage';
import { RequireAuth } from './components/Admin/RequireAuth';
import { AuthProvider } from './components/AuthRouter';
import Home from './components/Home/Home';
import SignUp from './components/Home/SignUp/SignUpForm';
import SignIn from './components/LoginForm/LoginForm';


function App() {


  return (
    <AuthProvider>
      <Routes >

        <Route path='/' element={<Home />} />

        <Route path='/login' element={<SignIn />} />

        <Route path='/signup' element={<SignUp />} />

        <Route path='/admin' element={<AdminHome />} />

        <Route path='/admin/login' element={<AdminSignIn />} />

        <Route path='*' element={<h1>No page avialable</h1>} />

      </Routes>
    </AuthProvider>
  );
}

export default App;
