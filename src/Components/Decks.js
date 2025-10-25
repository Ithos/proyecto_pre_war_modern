import React from 'react';

const Decks = ({deckLists, tipPosition, narrowScreenWidth, width, scrollPosition}) => {
    function generateDeckText(deck) {       
        let deckText = `Deck: ${deck.name}\n\n`;
        deckText += 'Main Deck:\n';
        deck.cards.forEach( (cardData) => {
            deckText += `- ${cardData.name} x${cardData.quantity}\n`;
        });
        deckText += '\nSideboard:\n';
        deck.sideboard.forEach( (cardData) => {
            deckText += `- ${cardData.name} x${cardData.quantity}\n`;
        });
        return deckText;
    }

    return (
        <main className='Decks'>
            <section className='Decks-description'>
                <h1>Decks</h1>
                <h3>A few examples of decks</h3>
            </section>
            <section className='Decklists'>
                {deckLists.map((deck) => (
                    <section className='Deck' key={deck.name}>
                        <section className='DeckHeader'>
                            <h2 key={deck.name}> {deck.name}</h2>
                            <button className='ms ms-tap downloadText' title='Download deck as text' onClick={ () => {
                                const element = document.createElement("a");
                                const file = new Blob( [generateDeckText(deck)], {type: 'text/plain'});

                                element.href = URL.createObjectURL(file);
                                element.download = `${deck.name}.txt`;
                                document.body.appendChild(element);
                                element.click();
                                document.body.removeChild(element);
                            }}/>
                        </section>
                        <section className='DeckBody'>
                            <ul className='DeckBodyList'>
                                {deck.cards.map( (cardData) =>
                                    { 

                                        const elements = [];
                                        const cardName = cardData.name;
                                        const quantity = cardData.quantity;
                                        if( width >= narrowScreenWidth )
                                        {
                                            for(let i = 0; i < quantity; ++i)
                                            {
                                                elements.push(
                                                    <li className="DeckCard" key= { cardName + "_" + i} id ={ cardName + "_" + i}>
                                                        <div className="CardContainer">
                                                            <a className='cardReference' href={cardData.url} target='_blank' rel='noopener noreferrer' onMouseUp={e => e.currentTarget.blur()}><img loading="lazy" src={cardData.image} alt={cardName}/></a>
                                                            <img className='cardTipImage' loading='lazy' src={cardData.image} alt={cardName} style={tipPosition} />
                                                        </div>
                                                    </li>
                                                )
                                            }
                                        }
                                        else
                                        {
                                            elements.push(
                                                <li className="DeckEntry" key= { cardName } id ={ cardName }>
                                                    <div>
                                                        <a className="EntryLink" card-Tip="" href={cardData.url} target='_blank' rel='noopener noreferrer' onMouseUp={e => e.currentTarget.blur()}>
                                                            <span className='EntryText'>{ quantity + 'x' + cardName }</span>
                                                        </a>
                                                        <img className='cardTipImage' loading='lazy' src={cardData.image} alt={cardName} style={tipPosition} />
                                                    </div>
                                                </li>
                                            )
                                        }
                                        return elements;
                                    }
                                )}
                            </ul>
                        </section>
                        <section className='Sideboard'>
                            <section className='SideboardHeader'>
                                <h2 className='SideboardTitle'>Sideboard</h2>
                            </section>
                            <ul className='SideboardList'>
                                {deck.sideboard.map( (cardData) =>
                                    { 
                                        const elements = [];
                                        const cardName = cardData.name;
                                        const quantity = cardData.quantity;
                                        if( width >= narrowScreenWidth )
                                        {
                                            for(let i = 0; i < quantity; ++i)
                                            {
                                                elements.push(
                                                    <li className="DeckCard" key= { cardName + "_" + i} id ={ cardName + "_" + i}>
                                                        <div className="CardContainer">
                                                            <a className='cardReference' href={cardData.url} target='_blank' rel='noopener noreferrer' onMouseUp={e => e.currentTarget.blur()}><img loading="lazy" className="DeckCardImage" target='_blank' rel='noopener noreferrer' src={cardData.image} alt={cardName}/></a>
                                                            <img className='cardTipImage' loading='lazy' src={cardData.image} alt={cardName} style={tipPosition} />
                                                        </div>
                                                    </li>
                                                )
                                            }
                                        }
                                        else
                                        {
                                            elements.push(
                                                <li className="DeckEntry" key= { cardName } id ={ cardName }>
                                                    <div>
                                                        <a className="EntryLink" card-Tip="" href={cardData.url} target='_blank' rel='noopener noreferrer' onMouseUp={e => e.currentTarget.blur()}>
                                                            <span className='EntryText'>{ quantity + 'x' + cardName }</span>
                                                        </a>
                                                        <img className='cardTipImage' loading='lazy' src={cardData.image} alt={cardName} style={tipPosition} />
                                                    </div>
                                                </li>
                                            )
                                        }
                                    return elements;
                                }
                            )}
                            </ul>
                        </section>
                    </section>
                ) 
            )}
            { scrollPosition > 3 && <button className="ms ms-untap scrollToTop" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} title="Scroll to Top"></button> }
            </section>
        </main>
    );
};

export default Decks;