import DataContext from "./Context/DataContext";
import { useContext } from "react";
import {Route, Routes } from 'react-router-dom';
import Home from "./Components/Home";
import Cards from "./Components/Cards";
import Decks from "./Components/Decks";
import Layout from "./Components/Layout";
import NotFound from './Components/NotFound';

function App() {
  const dataContext = useContext(DataContext);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <Layout dataContext={dataContext} />} >
          <Route path={dataContext.HOME_LINK} index element={
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
            } 
          />
          <Route path={dataContext.CARDS_LINK} element={
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
            } 
          />
          <Route path={dataContext.DECKS_LINK} element={
              <Decks 
                deckLists= { dataContext.DECKS_LISTS } 
                tipPosition={dataContext.tipPosition}
                width={dataContext.width}
                narrowScreenWidth={dataContext.NARROW_SCREEN_WIDTH}
                scrollPosition={dataContext.scrollPosition}
              />
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
