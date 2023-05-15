import classes from "./Header.module.scss";
import { useEffect, useState } from "react";
import NavLinks from "./NavLinks";
import SearchContainer from "../SearchBar/SearchContainer";

const Header = () => {
    //const [isIcon, setIsIcon] = useState<boolean>(false)
    const [y, setY] = useState<number>(window.scrollY);

    const handleNavigation = () => {
        const position = window.pageYOffset;

        setY(position);
    };

    useEffect(() => {
        window.addEventListener("scroll", () => handleNavigation());
    }, [y]);

    return (
        <header className={`${classes[`header-view`]} ${y > 0 ? classes[`dark-bg`] : ""}`}>
            <NavLinks  />
            <SearchContainer  />
        </header>
    );
};

export default Header;