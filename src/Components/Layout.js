import ScrollToAnchor from "../Hooks/ScrollToAnchor";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = ({dataContext}) => {
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
            <Outlet />
            <Footer />
        </div>
    );
};

export default Layout;