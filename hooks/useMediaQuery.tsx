import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        media.addEventListener("change", (e) => setMatches(e.matches));
        return () =>
            media.removeEventListener("change", (e) => setMatches(e.matches));
    }, [matches, query]);

    return [matches, setMatches];
}
