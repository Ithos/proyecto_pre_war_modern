import { useRef } from "react";

const MobileNav = ({ menuState, setMenuState }) => {

    const buttonRef = useRef(null);

    const handleClick = () => {
        setMenuState(menuState === 'none' ? 'block' : 'none');
        // Remove focus after click
        if (menuState === 'block' && buttonRef.current) {
            buttonRef.current.blur();
        }
    };

    return (
        //Si se pulsa sobre el botón se cambia el estado del menú de navegación, si se pierde el foco se oculta el menú
        <button className="mobile-nav-button" onClick={handleClick} ref={buttonRef}>
            <div className="mobile-nav-icon"></div>
        </button>
    );
};

export default MobileNav;