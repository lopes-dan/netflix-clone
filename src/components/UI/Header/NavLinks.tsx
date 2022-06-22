import classes from "./Header.module.scss";
import { Link } from "react-router-dom";

const NavLinks = () => {

    return (
        <>

            <Link data-testid="home" to="/" className={classes["icon-logo"]}>
                <img
                    className={classes["logo"]}
                    alt="logo"
                    height="50"
                    width="92"
                    src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                />
            </Link>

            <ul className={classes["list-view"]}>
                <li className={classes["list-item"]}>
                    {" "}
                    <Link data-testid="movies" to="movies">Movies</Link>
                </li>
                <li className={classes["list-item"]}>
                    <Link data-testid="shows" to="shows">TV Shows</Link>
                </li>

            </ul>
        </>
    )
}

export default NavLinks;