import React, { useEffect, useRef, useState } from "react";
import ReactModal from "react-modal";
import _theme_index from "../../styles/themes/_theme_index.json";
import styles from "../../styles/ThemeConfigModal.module.css";
import { useTheme } from "../../hooks/useTheme";

export default function ThemeConfigModal(props: any) {
    const [searchInput, setSearchInput] = useState("");
    const [themeName, setThemeByName] = useTheme();
    const [themeConfirmed, setThemeConfirmed] = useState(false);
    const initialTheme = useRef(themeName);

    const filteredThemes = _theme_index.filter((themeName) =>
        themeName.toLowerCase().includes(searchInput.toLowerCase())
    );

    const handleClose = () => {
        if (!themeConfirmed) {
            setThemeByName(initialTheme.current);
        }
        props.onRequestClose();
    };

    useEffect(() => {
        if (!props.isOpen) {
            if (!themeConfirmed) {
                setThemeByName(initialTheme.current);
            } else {
                initialTheme.current = themeName;
            }
            setThemeConfirmed(false);
        }
    }, [props.isOpen]);

    return (
        <ReactModal isOpen={props.isOpen} onRequestClose={handleClose}>
            <div className="flex flex-col gap-4 h-[70vh]">
                <div>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input
                        type="text"
                        className="border border-none bg-transparent rounded p-2 placeholder-text transition-colors focus:outline-none text-lg"
                        placeholder="Type to search"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        autoFocus
                    />
                </div>

                <div
                    className={`flex flex-col gap-2 overflow-y-auto flex-grow ${styles.customScrollbar}`}
                >
                    {filteredThemes.map((themeName) => (
                        <div
                            key={themeName}
                            className="leading-tight hover:bg-sub p-1 rounded"
                            onClick={() => {
                                setThemeConfirmed(true);
                                setThemeByName(themeName);
                                setSearchInput("");
                                props.onRequestClose();
                            }}
                            onMouseOver={(e) => {
                                setThemeByName(themeName);
                            }}
                        >
                            <p className="text-sm">{themeName}</p>
                        </div>
                    ))}
                </div>
            </div>
        </ReactModal>
    );
}
