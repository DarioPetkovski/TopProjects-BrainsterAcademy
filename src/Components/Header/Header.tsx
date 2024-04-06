import { useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../GlobalContext/Context";

function Header() {
    const [activeLink, setActiveLink] = useState<string>("feed");
    const { darkMode,appMode } = useGlobalContext()

    const handleClick = (link: string) => {
        setActiveLink(link);
    };
    return (
        <div className="container d-flex justify-content-between align-items-center px-5 py-2 pt-3">
            <div className="d-flex">

                <Link onClick={() => handleClick("feed")} className={`mb-0 ${activeLink === "feed" ? "link-active" : ""} ${darkMode === true ? "link-dark":"link"}`} to="/">Feed</Link>

                <Link onClick={() => handleClick("create")} className={`ml-5 mb-0  ${activeLink === "create" ? "link-active" : ""} ${darkMode === true ? "link-dark":"link"}`} to="/create">Create</Link>

            </div>
            <div>
            {!darkMode === true ? <i onClick={appMode} className="fa-solid fa-moon"></i>:<i onClick={appMode} className="fa-solid fa-sun"></i>}
            </div>
        </div>
    );
}
export default Header;