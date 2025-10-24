import React, { useEffect } from 'react';

const TrackScroll = () => {

    const [scrollPosition, setScrollPosition] = React.useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const winScroll =document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = winScroll / height;
            setScrollPosition(scrolled * 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return scrollPosition;
};

export default TrackScroll;