import { useRef } from "react";
import { Link } from 'react-router-dom';
import Nav from './Nav';
import MobileNav from './MobileNav';

const Header = ({title, width, rules, legalSets, banList, cards, decks, 
    cardsLink, decksLink, homeLink, smallScreenWidth, menuState, setMenuState}) => {
    const headerRef = useRef(null);

    const handleBlur = (e) => {
        // Only close if focus moves outside the container
        if (width <= smallScreenWidth && !headerRef.current.contains(e.relatedTarget)) {
            setMenuState('none');
        }
    };

    const handleClick = () => {
        if (width <= smallScreenWidth) {
            setMenuState('none');
        }
    };

    return (
        <header className='Header' ref={headerRef} onBlur={handleBlur}>
            <div className='Header-title-container'><Link  className='Header-title' to={homeLink} onClick={handleClick}> {title} </Link></div>
            {width <= smallScreenWidth && <MobileNav menuState={menuState} setMenuState={setMenuState} />}
            <Nav 
                rules={rules} 
                legalSets={legalSets} 
                banList={banList} 
                cards={cards} 
                decks={decks} 
                cardsLink={cardsLink}
                decksLink={decksLink}
                homeLink={homeLink}
                styleState={width > smallScreenWidth ? 'inline-block' : menuState} 
                handleClick={handleClick} 
            />
        </header>
    );
};

export default Header;
