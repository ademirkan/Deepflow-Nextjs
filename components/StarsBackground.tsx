import React, { useEffect, useRef } from "react";
import styles from "../styles/nasa.module.css";

const StarsBackground: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const generateParticles = (number: number) => {
        const container = containerRef.current;
        if (!container) return;

        for (let i = 0; i < number; i += 1) {
            const particleElement = document.createElement("div");
            particleElement.setAttribute("class", styles.particle);
            particleElement.style.animationDuration = `${Math.random() * 3}s`;
            container.appendChild(particleElement);
            particleElement.style.top =
                Math.random() * container.offsetHeight -
                particleElement.offsetHeight +
                "px";
            particleElement.style.left =
                Math.random() * container.offsetWidth -
                particleElement.offsetWidth +
                "px";
            const randomSize = Math.random() * 3;
            particleElement.style.width = randomSize + "px";
            particleElement.style.height = randomSize + "px";
        }
    };

    useEffect(() => {
        generateParticles(300);

        return () => {
            if (containerRef.current) {
                containerRef.current
                    .querySelectorAll(`.${styles.particle}`)
                    .forEach((particle) => {
                        // @ts-ignore
                        containerRef.current.removeChild(particle);
                    });
            }
        };
    }, []);

    return <div ref={containerRef} className={styles.starsContainer}></div>;
};

export default StarsBackground;
