const Banlist = ({ banlist, width, smallScreenWidth, tipPosition, banlistData }) => {
    return (
        <section id={banlist} className='Home-banlist'>
            <h1>Ban List</h1>
            <ul className="bannedCardsList">
                {banlistData.map((card) => (
                    <li className="cardBanned" key={card.multiverseid} id ={card.multiverseid}>
                        {width > smallScreenWidth && <a href={card.href} target='_blank' rel='noopener noreferrer'><img loading="lazy" className="cardImage" src={card.imageUrl} alt={card.name} title={card.name} /></a>}
                        {width <= smallScreenWidth && (
                            <div>
                                <a className="cardTip" card-Tip="" multiverseid={card.multiverseid} href={card.href} target='_blank' rel='noopener noreferrer' onMouseUp={e => e.currentTarget.blur()}>
                                    <span className='binding'>{card.name}</span>
                                </a>
                                <img className='cardTipImage' loading='lazy' src={card.imageUrl} alt={card.name} style={tipPosition} />
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Banlist;