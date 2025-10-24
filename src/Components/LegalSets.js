const LegalSets = ({ legalSets, setlistData }) => {
    return (
        <section id={legalSets} className='Home-sets'>
            <h1>Legal Sets</h1>
            <ul className='Home-sets-list'>
                {
                    setlistData.map((set) => (
                        <li key={set.code}>
                            <a href={set.href} target='_blank' rel='noopener noreferrer' onMouseUp={e => {e.currentTarget.blur(); }}>
                                <i className={set.icon}></i>
                                <p className="set-text">{set.name}</p>
                            </a>
                        </li>
                    ))
                }
            </ul>
        </section>
    );
};

export default LegalSets;