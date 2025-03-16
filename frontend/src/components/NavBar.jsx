 import {Link} from "react-router-dom";
 
 const NavBar = ({user}) =>{
    return (
        <div className="bg-white shadow-sm">
            <div className="mx-auto px-4 py-2 flex justify-between items-center">
                <Link to="/" className="flex item-center mr-5">
                <img src="https://s.pinimg.com/webapp/logo_transparent_144x144-3da7a67b.png"
                alt="pinterest logo" 
                className="h-8 md: mr-1"
                />
                <span className="text-red-600 text-2xl font-bold">Pinterest</span>
                </Link>
                <div className="flex items-center space-x-4 w-[200px]">
                    <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
                    <Link to="/create" className="text-gray-700 hover:text-gray-900">Create</Link>
                    <Link to="/account" className="w-8 h-8 rounded-full bg-gray-300 flex items-center 
                    justify-center text-xl text-gray-700">{user?.name?.slice(0, 1).toUpperCase()}</Link>

                </div>
            </div>
        </div>
    )
}

export default NavBar;