import { Link } from 'react-router-dom';

const Nav = ({rules, legalSets, banList, cards, decks, cardsLink, decksLink, homeLink, styleState, handleClick}) => {
    return (
        <nav className='Nav' style={{ display: styleState }}>
            <ul className='Nav-list' onClick={handleClick} >
                <li> <Link to={`${homeLink}#${rules}`}>{rules}</Link></li>
                <li> <Link to={`${homeLink}#${legalSets}`}>{legalSets}</Link></li>
                <li> <Link to={`${homeLink}#${banList}`}>{banList}</Link></li>
                <li> <Link to={cardsLink}>{cards}</Link></li>
                <li> <Link to={decksLink}>{decks}</Link></li>
            </ul>
        </nav>
    );
};

export default Nav;