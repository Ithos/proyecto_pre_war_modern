import Header from "./Components/Header";
import DataContext from "./Context/DataContext";
import { useContext } from "react";
import {Route, Routes } from 'react-router-dom';
import Home from "./Components/Home";
import Cards from "./Components/Cards";
import Decks from "./Components/Decks";
import Footer from "./Components/Footer";
import ScrollToAnchor from "./Hooks/ScrollToAnchor";
import NotFound from './Components/NotFound';

function App() {
  const dataContext = useContext(DataContext);
  return (
    <div className="App">
      <ScrollToAnchor />
      <Header 
        title={dataContext.APP_TITLE} 
        width={dataContext.width} 
        rules={dataContext.RULES} 
        legalSets={dataContext.LEGAL_SETS} 
        banList={dataContext.BAN_LIST} 
        cards={dataContext.CARDS} 
        decks={dataContext.DECKS} 
        smallScreenWidth={dataContext.SMALL_SCREEN_WIDTH}
        menuState={dataContext.menuState} 
        setMenuState={dataContext.setMenuState} 
        cardsLink={dataContext.CARDS_LINK}
        decksLink={dataContext.DECKS_LINK}
        homeLink={dataContext.HOME_LINK}
      />
      <Routes>
        <Route exact path={dataContext.HOME_LINK} element={
          <Home 
            banlist={dataContext.BAN_LIST} 
            rules={dataContext.RULES}
            legalSets={dataContext.LEGAL_SETS}
            decksLink={dataContext.DECKS_LINK} 
            width={dataContext.width} 
            smallScreenWidth={dataContext.SMALL_SCREEN_WIDTH}
            homeLink={dataContext.HOME_LINK}
            tipPosition={dataContext.tipPosition}
            banlistData={dataContext.BANLIST}
            setlistData={dataContext.SETLIST}
          />
        } />
        <Route exact path={dataContext.CARDS_LINK} element={
          <Cards 
            scrollPosition={dataContext.scrollPosition} 
            bannedCards={dataContext.BANLIST} 
            setlist={dataContext.SETLIST}
            cardTypes={dataContext.CARD_TYPES}
            supertypes={dataContext.SUPERTYPES}
            creatureTypes={dataContext.CREATURE_TYPES}
            artifactTypes={dataContext.ARTIFACT_TYPES}
            enchantmentTypes={dataContext.ENCHANTMENT_TYPES}
            landTypes={dataContext.LAND_TYPES}
            spellTypes={dataContext.SPELL_TYPES}
            planeswalkerTypes={dataContext.PLANESWALKER_TYPES}
          />
        } />
        <Route exact path={dataContext.DECKS_LINK} element={
          <Decks 
            deckLists= { dataContext.DECKS_LISTS } 
            tipPosition={dataContext.tipPosition}
            width={dataContext.width}
            narrowScreenWidth={dataContext.NARROW_SCREEN_WIDTH}
            scrollPosition={dataContext.scrollPosition}
          />
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
