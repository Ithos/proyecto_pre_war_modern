import { useState, useEffect } from "react";
import axios from "axios";

const SearchResults = ({ cardSearchObject, bannedCards, cardsPerPage, scrollPosition }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [pageUrl, setPageUrl] = useState(cardSearchObject.hasOwnProperty('next_page') ? cardSearchObject.next_page : null);
    const [filteredCards, setFilteredCards] = useState([...cardSearchObject.data.filter((card) => !bannedCards.includes(card.name))]);
    const [isLoading, setIsLoading] = useState(true);

    const maxPage = Math.ceil(cardSearchObject.total_cards / cardsPerPage);

    async function adjustPage() {
        setIsLoading(true);
        if (pageUrl) {
            const currentPageMatch = pageUrl.match(/&page=(\d+)/);
            if (currentPageMatch && currentPage > 0 && currentPage <= maxPage) {
                const tmpPage = pageUrl.replace(/&page=\d+/, `&page=${currentPage}`)
                    setPageUrl(tmpPage);
                    let result = await axios.get(tmpPage)
                        .catch(err => console.error(err))
                        .then(res => (res && res.data) ? res.data : null);
                    setFilteredCards([...result.data.filter((card) => !bannedCards.includes(card.name))]);
            }
        }
        setIsLoading(false);
    };

    useEffect(() => {
        setPageUrl(cardSearchObject.hasOwnProperty('next_page') ? cardSearchObject.next_page : null);
        setCurrentPage(1);
    }, [cardSearchObject]);

    
    useEffect(() => {
        adjustPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);


    return (
        <section className="searchResults" id="search-results">
            <section className="resultsHeader">
                <span> Page {currentPage} of {maxPage} &#9148; {maxPage > 1 ? cardSearchObject.total_cards : filteredCards.length - filteredCards.filter((card) => bannedCards.includes(card.name)).length} results found</span>
                <section className="resultsNavigation">
                    <button className= { currentPage > 1 ? "button firstPage" : "disabled firstPage" } onClick={() => { if (currentPage > 1) setCurrentPage(1) }} title="First Page"> &#11164;&#11164;</button>
                    <button className={ currentPage > 1 ? "button prevPage" : "disabled prevPage" } onClick={() => { if (currentPage > 1) setCurrentPage(currentPage - 1) }} title="Previous Page"> &#11164; Prev</button>
                    <button className={ currentPage < maxPage ? "button nextPage" : "disabled nextPage" } onClick={() => { if (currentPage < maxPage) setCurrentPage(currentPage + 1) }} title="Next Page">Next &#11166;</button>
                    <button className={ currentPage < maxPage ? "button lastPage" : "disabled lastPage" } onClick={() => { if (currentPage < maxPage) setCurrentPage(maxPage) }} title="Last Page"> &#11166;&#11166;</button>
                </section>
            </section>
            { scrollPosition > 3 && <button className="scrollToTop" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} title="Scroll to Top">&#11165;</button> }
            <section className="cardsContainer">
            { 
                !isLoading && filteredCards.map( (card) => (
                    <div className={`card`} key={card.id}>
                        <a className="cardImageLink" href={`https://scryfall.com/card/${card.id}`} target="_blank" rel="noopener noreferrer">
                            <img className="searchCardImage" src={card.image_uris ? card.image_uris.normal : ( card.card_faces ? card.card_faces[0].image_uris.normal : '' )} loading='lazy' alt={card.name} title={card.name} />
                        </a>
                    </div>
                ))
            }
            { isLoading && <section>
                                <div className="loading">Loading...</div>
                                <div className="dots-loading" aria-label="Loading" role="status">
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                </div>
                            </section> 
            }
            </section>
                <section className="resultsHeader">
                <span> Page {currentPage} of {maxPage} &#9148; {maxPage > 1 ? cardSearchObject.total_cards : filteredCards.length - filteredCards.filter((card) => bannedCards.includes(card.name)).length} results found</span>
                <section className="resultsNavigation">
                    <button className= { currentPage > 1 ? "button firstPage" : "disabled firstPage" } onClick={() => { if (currentPage > 1) setCurrentPage(1) } } title="First Page"> &#11164;&#11164;</button>
                    <button className={ currentPage > 1 ? "button prevPage" : "disabled prevPage" } onClick={() => { if (currentPage > 1) setCurrentPage(currentPage - 1) }} title="Previous Page"> &#11164; Prev</button>
                    <button className={ currentPage < maxPage ? "button nextPage" : "disabled nextPage" } onClick={() => { if (currentPage < maxPage) setCurrentPage(currentPage + 1) }} title="Next Page">Next &#11166;</button>
                    <button className={ currentPage < maxPage ? "button lastPage" : "disabled lastPage" } onClick={() => { if (currentPage < maxPage) setCurrentPage(maxPage) }} title="Last Page"> &#11166;&#11166;</button>
                </section>
            </section>
        </section>
    );
};

export default SearchResults;