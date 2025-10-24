import { Link } from 'react-router-dom';
import LegalSets from './LegalSets';
import Banlist from './Banlist';

const Home = ({rules, legalSets, banlist, decksLink, homeLink, width, smallScreenWidth, tipPosition, banlistData, setlistData }) => {
    return (
        <main className='Home'>
            <section className='Home-description'>
                <h1>PreWAR Modern</h1>
                <h3>A community created modern format</h3>
            </section>
            <section className='Home-about'>
                <h1>About</h1>
                <p>PreWAR Modern is a community-created constructed format consisting of all modern tournament legal sets from Eighth Edition to Ravnica Allegiance. 
                    The cardpool intends to preserve the classic modern feeling giving players a place to play with iconic modern cards from the 2012 - 2018 era that are not played anywhere else
                    ( e.g. <a className='cardTip' href='https://scryfall.com/card/fut/153/tarmogoyf' target='_blank' rel='noopener noreferrer' onMouseUp={e => {e.currentTarget.blur(); }}>Tarmogoyf</a> 
                            <img className='cardTipImage' loading='lazy' src= "https://cards.scryfall.io/normal/front/b/6/b6876d9e-0908-43ac-8542-09c7aa02b5ba.jpg?1562931701" alt="Tarmogoyf" style={tipPosition} /> <span>, </span>
                    <a className='cardTip' href='https://scryfall.com/card/lrw/56/cryptic-command' target='_blank' rel='noopener noreferrer' onMouseUp={e => { e.currentTarget.blur(); }}>Cryptic Command</a> <img className='cardTipImage' loading='lazy' src="https://cards.scryfall.io/normal/front/8/2/829e3d6e-5d7c-4cc4-a7a6-7cbf5a7442ba.jpg?1562355759" alt="Cryptic Command" style={tipPosition} /> <span>, </span>
                    <a className='cardTip' href='https://scryfall.com/card/roe/165/splinter-twin' target='_blank' rel='noopener noreferrer' onMouseUp={e => {e.currentTarget.blur(); }}>Splinter Twin</a> <img className='cardTipImage' loading='lazy' src="https://cards.scryfall.io/normal/front/2/f/2f8f22fb-7291-4517-9b15-e98501f2856b.jpg?1562702491" alt="Splinter Twin" style={tipPosition} /> <span> ) </span>
                    This format is conceived as a closed format and is intended to have minimal changes in order to deliver a promise of "build your deck once and play it forever".
                </p>
                <p> 
                    You can find some suggestions for prefire decks <Link to={decksLink}>here</Link>.
                </p>
            </section>
            <section id={rules} className='Home-rules'>
                <h1>Rules</h1>
                <p>PreWar Modern is played with contemporary Magic: the Gathering in-game rules, also all reprints of legal cards are allowed. The format has its own ban list as you can see <span> </span>
                    <Link to={`${homeLink}#${banlist}`}>here</Link>.
                </p>
            </section>
            <LegalSets legalSets={legalSets} setlistData={setlistData} />
            <Banlist banlist={banlist} width={width} smallScreenWidth={smallScreenWidth} tipPosition={tipPosition} banlistData={banlistData} />
        </main>
    );
};

export default Home;