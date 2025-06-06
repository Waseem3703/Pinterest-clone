import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserData } from "./context/UserContext";
import { Loading } from "./components/Loading";
import NavBar from "./components/NavBar";
import PinPage from "./pages/PinPage";
import Create  from "./pages/Create";
import Account from "./pages/Account";
import UserProfile from "./pages/UserProfile";
import Admin from "./pages/Admin";

function App() {
    const { loading, isAuth, user } = UserData();

    if (loading) {
        return <Loading />;
    }

    return (
        <Router>
            {isAuth && <NavBar user={user} />}
            <Routes>
                <Route path="/" element={isAuth ? <Home /> : <Login />} />
                <Route path="/create" element={ <Create />} />
                <Route path="/account" element={isAuth ? <Account user={user}/> : <Login/>} />
                <Route path="/user/:id" element={isAuth ? <UserProfile user={user}/> : <Login/>} />
                <Route path="/pin/:id" element={isAuth ? <PinPage user={user} /> : <Login />} />
                <Route path="/login" element={isAuth ? <Home /> : <Login />} />
                <Route path="/register" element={isAuth ? <Home /> : <Register />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </Router>
    );
}

export default App;
