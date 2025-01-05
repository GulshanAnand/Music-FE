import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Navbar = () => {

    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
    
    const logout = () => { 
        setCookies("access_token", "", { path: "/" });
        navigate("/login");
    }

    const redirectHome = () => {
        navigate("/");
    };

    return (
        <div className="navbar">
            <h2 className="navhead" onClick={redirectHome}>Music Playa</h2>
            <div className="navdivend">
                {!cookies.access_token ? (<Link to="/login">Login</Link>):
                (<>
                    <button onClick={() => navigate("/playlist")}>My Playlist</button>
                    <button onClick={logout}>Logout</button>
                </>)}
            </div>
        </div>
    );
}