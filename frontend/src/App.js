
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddUser from './components/Admin/AddUser';
import AdminHome from './components/Admin/AdminHome';
import EditUser from './components/Admin/EditUser';
import AdminSignIn from './components/Admin/LoginPage';
import { ProtRouteAdmin } from './components/auth/ProtRouteAdmin';
import { ProtRouteUser } from './components/auth/ProtRouteUser';
import { AuthProvider } from './components/AuthRouter';
import Home from './components/Home/Home';
import SignUp from './components/Home/SignUp/SignUpForm';


function App() {


  return (
    <AuthProvider>
      <Routes >

        <Route path='/' element={<ProtRouteUser><Home /></ProtRouteUser>} />

        {/* <Route path='/login' element={<SignIn />} /> */}

        <Route path='/signup' element={<SignUp />} />

        <Route path='/admin' element={<ProtRouteAdmin><AdminHome /></ProtRouteAdmin>} />
        <Route path='/admin/addUser' element={<ProtRouteAdmin><AddUser /></ProtRouteAdmin>} />
        <Route path='/admin/editUser' element={<ProtRouteAdmin><EditUser /></ProtRouteAdmin>} />


        {/* <Route path='/admin/login' element={<AdminSignIn />} /> */}

        <Route path='*' element={<h1>No page avialable</h1>} />

      </Routes>
    </AuthProvider>
  );
}

export default App;
