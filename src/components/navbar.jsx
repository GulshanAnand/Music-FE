import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ReactComponent as PlaylistIcon } from '../assets/ic_playlist.svg';

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
                {!cookies.access_token ? (<Link to="/login">Login</Link>) :
                    (<>
                        <button className="btn-playlist" onClick={() => navigate("/playlist")}><PlaylistIcon className="icon" /> My Playlist</button>
                        <button className="btn-logout" onClick={logout}>Logout</button>
                    </>)}
            </div>
        </div>
    );
}