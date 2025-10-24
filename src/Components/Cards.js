import { useState } from "react";
import Select, { components } from "react-select";
import axios from "axios";
import CardSearchResults from "./SearchResults";

const Cards = ({ scrollPosition, bannedCards, setlist, cardTypes, supertypes, creatureTypes, 
    artifactTypes, enchantmentTypes, landTypes, spellTypes, planeswalkerTypes }) => {

    const URL_EXACT = "%3D";
    const URL_INCLUDE = "%3E%3D";
    const URL_AT_MOST = "%3C%3D";
    const BANNED_CARDS = bannedCards.map(card => card.name);
    const BASE_URL = "https://api.scryfall.com/cards/search?q=%28game%3Apaper%29";
    const FULL_SETS_URL = "+%28set%3Arna+OR+set%3Agrn+OR+set%3Adom+OR+set%3Arix+OR+set%3Axln+OR+set%3Ahou+OR+set%3Aakh+OR+set%3Aaer+OR+set%3Akld+OR+set%3Aemn+OR+set%3Asoi+OR+set%3Aogw+OR+set%3Abfz+OR+set%3Adtk+OR+set%3Afrf+OR+set%3Aktk+OR+set%3Ajou+OR+set%3Abng+OR+set%3Aths+OR+set%3Adgm+OR+set%3Agtc+OR+set%3Artr+OR+set%3Aavr+OR+set%3Adka+OR+set%3Aisd+OR+set%3Anph+OR+set%3Ambs+OR+set%3Asom+OR+set%3Aroe+OR+set%3Awwk+OR+set%3Azen+OR+set%3Aarb+OR+set%3Acon+OR+set%3Aeve+OR+set%3Ashm+OR+set%3Amor+OR+set%3Alrw+OR+set%3Afut+OR+set%3Aplc+OR+set%3Atsp+OR+set%3Atsb+OR+set%3Acsp+OR+set%3Adis+OR+set%3Agpt+OR+set%3Arav+OR+set%3Asok+OR+set%3Abok+OR+set%3Achk+OR+set%3A5dn+OR+set%3Adst+OR+set%3Amrd+OR+set%3Am19+OR+set%3Aori+OR+set%3Am15+OR+set%3Am14+OR+set%3Am13+OR+set%3Am12+OR+set%3Am11+OR+set%3Am10+OR+set%3A10e+OR+set%3A9ed+OR+set%3A8ed%29+";
    const URL_ADD_OR_CONDITION = "+OR+";
    const URL_OPEN_PARENTHESIS = "%28";
    const URL_CLOSE_PARENTHESIS = "%29";
    const URL_ORACLE = "oracle%3A";
    const URL_TYPE = "type%3A";
    const URL_WHITE = "W";
    const URL_BLUE = "U";
    const URL_BLACK = "B";
    const URL_RED = "R";
    const URL_GREEN = "G";
    const URL_COLORLESS = "C";
    const URL_IDENTITY = "commander%3A";
    const URL_MIN_MANA_COST = "+cmc%3E%3D";
    const URL_MAX_MANA_COST = "+cmc%3C%3D";
    const URL_ADD_CONDITION = "+";
    const URL_ADD_SET = "set%3A";
    const URL_COLOR = "color";
    const CARDS_PER_PAGE = 175;

    const [isHovering, setIsHovering] = useState(false);

    const [cardName, setCardName] = useState("");
    const [cardSets, setCardSets] = useState(null);
    const [cardType, setCardType] = useState(null);
    const [cardText, setCardText] = useState("");
    const [cardColors, setCardColors] = useState([]);
    const [cardColorStates, setCardColorStates] = useState([false, false, false, false, false, false]);
    const [cardColorLogic, setCardColorLogic] = useState(URL_EXACT);
    const [cardColorIdentity, setCardColorIdentity] = useState([]);
    const [cardColorIdentityStates, setCardColorIdentityStates] = useState([false, false, false, false, false, false]);
    const [cardMinCost, setCardMinCost] = useState("");
    const [cardMaxCost, setCardMaxCost] = useState("");
    const [allowPartialTypeMatches, setAllowPartialTypeMatches] = useState("");
    const [cardSearchObject, setCardSearchObject] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [attemptedSearch, setAttemptedSearch] = useState(false);
    const [error, setError] = useState(null);
    

    const setsOptions = [
        ...setlist.map(set => ({
            value: set.code,
            label: set.label,
            icon: set.icon + " smallSetIcon"
        }))
    ];

    const { Option } = components;
    const IconOption = props => (
        <Option {...props}>
            <i className={props.data.icon}></i>
            {props.data.label}
        </Option>
    );

const groupedOptions = [
        {
            label: "Card Types",
            options: cardTypes
        },
        {
            label: "Supertypes",
            options: supertypes
        },
        {
            label: "Creature Types",
            options: creatureTypes
        },
        {
            label: "Artifact Types",
            options: artifactTypes
        },
        {
            label: "Enchantment Types",
            options: enchantmentTypes
        },
        { 
            label: "Land Types",
            options: landTypes
        },
        { 
            label: "Spell Types",
            options: spellTypes
        },
        { 
            label: "Planeswalker Types",
            options: planeswalkerTypes
        }
    ];

    return (
        <main className="cardSearch" id="cardSearch">
           <h1>Search cards</h1>
           <form className="cardSearchForm" onSubmit={(e) => e.preventDefault()} action="https://scryfall.com/search" method="get" target="_blank" rel="noopener noreferrer">
               <label className="cardName" htmlFor="cardName">
                        <p>Card Name:</p>
                    <input className="cardNameInput" id="cardName" type="text" value={cardName} onChange={(e) => setCardName(e.target.value)} />
               </label>
               <label className="cardText" htmlFor="cardText">
                   <p>Text:</p>
                   <input className="cardTextInput" id="cardText" type="text" value={cardText} onChange={(e) => setCardText(e.target.value)} />
               </label>
               <label className="cardType" htmlFor="cardType">
                        <p>Type:</p>
                        <div className="typeSelector">
                            <Select id="cardType" name="cardType" options={groupedOptions} isMulti placeholder="Select types..." className="basic-multi-select" classNamePrefix="select" value={cardType} onChange={(selected) => setCardType(selected)} />
                            <div id="cardType" className="cardTypeLogic">
                                <input id="cardType" className="cardTypeCheckbox" type="checkbox" text="Allow partial type matches" value={allowPartialTypeMatches === "OR"} onChange={() => setAllowPartialTypeMatches(allowPartialTypeMatches === "OR" ? "" : "OR")} />
                                <p className="cardTypeCheckboxText">Allow partial type matches</p>
                            </div>
                        </div>
               </label>
               <label className="cardColor" htmlFor="cardColor" onClick={(e) => { if (!isHovering) e.preventDefault(); }}>
                        <p>Colors:</p>
                        <div className="colorOptions">
                            <ul className="colorList">
                                <li>
                                    <i class="ms ms-w wIcon"></i>
                                    <input id="cardColorW" className="colorCheckbox" type="checkbox" text={URL_WHITE} checked={cardColorStates[0]} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} onFocus={() => setIsHovering(true)} onBlur={() => setIsHovering(false)} onClick={(e) => { if (!isHovering) return; }} onChange={() => {
                                        const newStates = [...cardColorStates];
                                        newStates[0] = !newStates[0];
                                        newStates[5] = false;
                                        setCardColorStates(newStates);
                                        setCardColors(prev => newStates[0] ? [...prev.filter(c => c !== URL_COLORLESS), URL_WHITE] : prev.filter(c => c !== URL_WHITE));
                                    }} />
                                </li>
                                <li>
                                    <i class="ms ms-u uIcon"></i>
                                    <input id="cardColorU" className="colorCheckbox" type="checkbox" text={URL_BLUE} checked={cardColorStates[1]} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} onFocus={() => setIsHovering(true)} onBlur={() => setIsHovering(false)} onClick={(e) => { if (!isHovering) return; }} onChange={() => {
                                        const newStates = [...cardColorStates];
                                        newStates[1] = !newStates[1];
                                        newStates[5] = false;
                                        setCardColorStates(newStates);
                                        setCardColors(prev => newStates[1] ? [...prev.filter(c => c !== URL_COLORLESS), URL_BLUE] : prev.filter(c => c !== URL_BLUE));
                                    }} />
                                </li>
                                <li>
                                    <i class="ms ms-b bIcon"></i>
                                    <input id="cardColorB" className="colorCheckbox" type="checkbox" text={URL_BLACK} checked={cardColorStates[2]} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} onFocus={() => setIsHovering(true)} onBlur={() => setIsHovering(false)} onClick={(e) => { if (!isHovering) return; }} onChange={() => {
                                        const newStates = [...cardColorStates];
                                        newStates[2] = !newStates[2];
                                        newStates[5] = false;
                                        setCardColorStates(newStates);
                                        setCardColors(prev => newStates[2] ? [...prev.filter(c => c !== URL_COLORLESS), URL_BLACK] : prev.filter(c => c !== URL_BLACK));
                                    }} />
                                </li>
                                <li>
                                    <i class="ms ms-r rIcon"></i>
                                    <input id="cardColorR" className="colorCheckbox" type="checkbox" text={URL_RED} checked={cardColorStates[3]} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} onFocus={() => setIsHovering(true)} onBlur={() => setIsHovering(false)} onClick={(e) => { if (!isHovering) return; }} onChange={() => {
                                        const newStates = [...cardColorStates];
                                        newStates[3] = !newStates[3];
                                        newStates[5] = false;
                                        setCardColorStates(newStates);
                                        setCardColors(prev => newStates[3] ? [...prev.filter(c => c !== URL_COLORLESS), URL_RED] : prev.filter(c => c !== URL_RED));
                                    }} />
                                </li>
                                <li>
                                    <i class="ms ms-g gIcon"></i>
                                    <input id="cardColorG" className="colorCheckbox" type="checkbox" text={URL_GREEN} checked={cardColorStates[4]} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} onFocus={() => setIsHovering(true)} onBlur={() => setIsHovering(false)} onClick={(e) => { if (!isHovering) return; }} onChange={() => {
                                        const newStates = [...cardColorStates];
                                        newStates[4] = !newStates[4];
                                        newStates[5] = false;
                                        setCardColorStates(newStates);
                                        setCardColors(prev => newStates[4] ? [...prev.filter(c => c !== URL_COLORLESS), URL_GREEN] : prev.filter(c => c !== URL_GREEN));
                                    }} />
                                </li>
                                <li>
                                    <i class="ms ms-c cIcon"></i>
                                    <input id="cardColorC" className="colorCheckbox" type="checkbox" text={URL_COLORLESS} checked={cardColorStates[5]} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} onFocus={() => setIsHovering(true)} onBlur={() => setIsHovering(false)} onClick={(e) => { if (!isHovering) return; }} onChange={() => {
                                        const newStates = [false, false, false, false, false, cardColorStates[5]];
                                        newStates[5] = !newStates[5];
                                        setCardColorStates(newStates);
                                        setCardColors(prev => newStates[5] ? [URL_COLORLESS] : []);
                                    }} />
                                </li>
                            </ul>
                            <select id="colorLogic" className="colorLogicSelect" name="colorLogic" defaultValue={URL_EXACT} value={cardColorLogic} onChange={(e) => setCardColorLogic(e.target.value)}>
                                <option value={URL_EXACT}>Exactly these colors</option>
                                <option value={URL_INCLUDE}>Including these colors</option>
                                <option value={URL_AT_MOST}>At most these colors</option>
                            </select>
                        </div>
               </label>

               <label className="colorIdentity" htmlFor="colorIdentity" onClick={(e) => { if (!isHovering) e.preventDefault(); }}>
                        <p>Color Identity:</p>
                        <ul className="colorList">
                            <li>
                                <i class="ms ms-w wIcon"></i>
                                <input id="colorIdentityW" className="colorCheckbox" type="checkbox" text={URL_WHITE} checked={cardColorIdentityStates[0]} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} onFocus={() => setIsHovering(true)} onBlur={() => setIsHovering(false)} onClick={(e) => { if (!isHovering) return; }} onChange={() => {
                                    const newStates = [...cardColorIdentityStates];
                                    newStates[0] = !newStates[0];
                                    newStates[5] = false;
                                    setCardColorIdentityStates(newStates);
                                    setCardColorIdentity(prev => newStates[0] ? [...prev.filter(c => c !== URL_COLORLESS), URL_WHITE] : prev.filter(c => c !== URL_WHITE));
                                }} />
                            </li>
                            <li>
                                <i class="ms ms-u uIcon"></i>
                                <input id="colorIdentityU" className="colorCheckbox" type="checkbox" text={URL_BLUE} checked={cardColorIdentityStates[1]} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} onFocus={() => setIsHovering(true)} onBlur={() => setIsHovering(false)} onClick={(e) => { if (!isHovering) return; }} onChange={() => {
                                    const newStates = [...cardColorIdentityStates];
                                    newStates[1] = !newStates[1];
                                    newStates[5] = false;
                                    setCardColorIdentityStates(newStates);
                                    setCardColorIdentity(prev => newStates[1] ? [...prev.filter(c => c !== URL_COLORLESS), URL_BLUE] : prev.filter(c => c !== URL_BLUE));
                                }} />
                            </li>
                            <li>
                                <i class="ms ms-b bIcon"></i>
                                <input id="colorIdentityB" className="colorCheckbox" type="checkbox" text={URL_BLACK} checked={cardColorIdentityStates[2]} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} onFocus={() => setIsHovering(true)} onBlur={() => setIsHovering(false)} onClick={(e) => { if (!isHovering) return; }} onChange={() => {
                                    const newStates = [...cardColorIdentityStates];
                                    newStates[2] = !newStates[2];
                                    newStates[5] = false;
                                    setCardColorIdentityStates(newStates);
                                    setCardColorIdentity(prev => newStates[2] ? [...prev.filter(c => c !== URL_COLORLESS), URL_BLACK] : prev.filter(c => c !== URL_BLACK));
                                }} />
                            </li>
                            <li>
                                <i class="ms ms-r rIcon"></i>
                                <input id="colorIdentityR" className="colorCheckbox" type="checkbox" text={URL_RED} checked={cardColorIdentityStates[3]} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} onFocus={() => setIsHovering(true)} onBlur={() => setIsHovering(false)} onClick={(e) => { if (!isHovering) return; }} onChange={() => {
                                    const newStates = [...cardColorIdentityStates];
                                    newStates[3] = !newStates[3];
                                    newStates[5] = false;
                                    setCardColorIdentityStates(newStates);
                                    setCardColorIdentity(prev => newStates[3] ? [...prev.filter(c => c !== URL_COLORLESS), URL_RED] : prev.filter(c => c !== URL_RED));
                                }} />
                            </li>
                            <li>
                                <i class="ms ms-g gIcon"></i>
                                <input id="colorIdentityG" className="colorCheckbox" type="checkbox" text={URL_GREEN} checked={cardColorIdentityStates[4]} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} onFocus={() => setIsHovering(true)} onBlur={() => setIsHovering(false)} onClick={(e) => { if (!isHovering) return; }} onChange={() => {
                                    const newStates = [...cardColorIdentityStates];
                                    newStates[4] = !newStates[4];
                                    newStates[5] = false;
                                    setCardColorIdentityStates(newStates);
                                    setCardColorIdentity(prev => newStates[4] ? [...prev.filter(c => c !== URL_COLORLESS), URL_GREEN] : prev.filter(c => c !== URL_GREEN));
                                }} />
                            </li>
                            <li>
                                <i class="ms ms-c cIcon"></i>
                                <input id="colorIdentityC" className="colorCheckbox" type="checkbox" text={URL_COLORLESS} checked={cardColorIdentityStates[5]} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} onFocus={() => setIsHovering(true)} onBlur={() => setIsHovering(false)} onClick={(e) => { if (!isHovering) return; }} onChange={() => {
                                    const newStates = [false, false, false, false, false, cardColorIdentityStates[5]];
                                    newStates[5] = !newStates[5];
                                    setCardColorIdentityStates(newStates);
                                    setCardColorIdentity(prev => newStates[5] ? [URL_COLORLESS] : []);
                                }} />
                            </li>
                        </ul>
                </label>
               <label className="manaCost" htmlFor="manaCost">
                   <p>Mana Cost:</p>
                   <div id="manaCost" className="manaCostInputs">
                       <label id="manaCostMin" htmlFor="minManaCost"> <p className="minManaCostText">Min</p>
                            <input id="manaCostMin" className="minManaCostInput" type="number" min={0} value={cardMinCost} onChange={(e) => setCardMinCost(e.target.value)} />
                       </label>
                       <label id="manaCostMax" htmlFor="maxManaCost"> <p className="maxManaCostText">Max</p>
                            <input id="manaCostMax" className="maxManaCostInput" type="number" min={0} value={cardMaxCost} onChange={(e) => setCardMaxCost(e.target.value)} />
                       </label>
                   </div>
               </label>
               <label className="sets" htmlFor="sets">
                    <p>Sets:</p>
                    <Select id="sets" name="sets" options={setsOptions} components={{ Option: IconOption }} isMulti placeholder="Select sets..."  className="basic-multi-select" classNamePrefix="select" value={cardSets} onChange={ (selected) => setCardSets(selected)}/>
                </label>
                <section className="buttonsSection">
                    <button type="reset" className="resetButton" onClick={() => {
                        setCardName('');
                        setCardColors([]);
                        setCardMinCost("");
                        setCardMaxCost("");
                        setCardSets([]);
                        setCardType([]);
                        setCardText('');
                        setCardColorLogic(URL_EXACT);
                        setCardColorIdentity([]);
                        setCardSearchObject(null);
                        setAttemptedSearch(false);
                        setError(null);
                    }}>Reset</button>
                    <button type="submit" className="searchButton" onClick={ async() => {
                        setIsLoading(true);
                        setError(null);
                        setCardSearchObject(null);
                        let scryfallSearch = BASE_URL;

                        const cardNameTokens = cardName.split(' ').filter( c => c !== ' ' && c !== '');
                        let cardNameString = '';
                        if (cardNameTokens.length > 0) cardNameString += URL_ADD_CONDITION + cardNameTokens.map( t => `${t}`).join(URL_ADD_CONDITION);

                        scryfallSearch += cardNameString;

                        const cardTextTokens = cardText.split(' ').filter( c => c !== ' ' && c !== '');
                        let cardTextString = '';
                        if (cardTextTokens.length > 0) cardTextString += URL_ADD_CONDITION + cardTextTokens.map( t => `${URL_ORACLE}${t}`).join(URL_ADD_CONDITION);

                        scryfallSearch += cardTextString;

                        let cardTypeString = '';
                        if (cardType !== null && cardType.length > 0) 
                            cardTypeString += URL_ADD_CONDITION + URL_OPEN_PARENTHESIS + 
                                cardType.map( t => `${URL_TYPE}${t.value}`).join( allowPartialTypeMatches === "OR" ? 
                                    URL_ADD_OR_CONDITION : URL_ADD_CONDITION) + URL_CLOSE_PARENTHESIS;

                        scryfallSearch += cardTypeString;

                        let cardColorString = '';
                        if (cardColors.length > 0) 
                            cardColorString += URL_ADD_CONDITION + URL_COLOR + cardColorLogic + cardColors.join('');

                        scryfallSearch += cardColorString;

                        let cardColorIdentityString = '';
                        if (cardColorIdentity.length > 0) 
                            cardColorIdentityString += URL_ADD_CONDITION + URL_IDENTITY + cardColorIdentity.join('');

                        scryfallSearch += cardColorIdentityString;

                        let cardManaCostString = '';
                        if (cardMinCost !== '')
                        {
                            cardManaCostString += URL_MIN_MANA_COST + `${cardMinCost}`;
                        }
                        if(cardMaxCost !== '')
                        {
                            cardManaCostString += URL_MAX_MANA_COST + `${cardMaxCost}`;
                        }

                        scryfallSearch += cardManaCostString;

                        let cardSetsString = FULL_SETS_URL;
                        if (cardSets !== null && cardSets.length > 0)
                         cardSetsString = URL_ADD_CONDITION + URL_OPEN_PARENTHESIS +  cardSets.map( s => `${URL_ADD_SET}${s.value}`).join(URL_ADD_OR_CONDITION) + URL_CLOSE_PARENTHESIS;

                        scryfallSearch += cardSetsString;

                        let result = await axios.get(scryfallSearch).catch( err => err.status !== 404 ? setError(err) : setError(null) ).then( res => (res && res.data) ? res.data : null );


                        setCardSearchObject( result );

                        setIsLoading(false);
                        setAttemptedSearch(true);
                    }}>Search</button>
                </section>
           </form>
        { cardSearchObject && !isLoading && <CardSearchResults cardSearchObject={cardSearchObject} bannedCards={BANNED_CARDS} cardsPerPage={CARDS_PER_PAGE} scrollPosition={scrollPosition} /> }
        { isLoading && <section>
                            <div className="loading">Searching...</div>
                            <div className="dots-loading" aria-label="Loading" role="status">
                                <span className="dot"></span>
                                <span className="dot"></span>
                                <span className="dot"></span>
                            </div>
                        </section>
        }
        { !isLoading && attemptedSearch && !error && cardSearchObject === null && <div className="noResults">No results found. Try different search parameters.</div> }
        { !isLoading && error && <div className="error" style={{ color: 'red' } }>An error occurred while fetching data. Please try again later.</div> }
        </main>
    );
};

export default Cards;