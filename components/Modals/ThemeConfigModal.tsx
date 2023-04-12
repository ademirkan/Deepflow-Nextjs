import React, { useState } from "react";
import ReactModal from "react-modal";
import _theme_index from "../../styles/themes/_theme_index.json";
import styles from "../../styles/ThemeConfigModal.module.css";
import { useTheme } from "../../hooks/useTheme";

export default function ThemeConfigModal(props: any) {
    const [searchInput, setSearchInput] = useState("");
    const [themeName, setThemeByName] = useTheme();

    const filteredThemes = _theme_index.filter((themeName) =>
        themeName.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <ReactModal {...props}>
            <div className="flex flex-col gap-4 h-[70vh]">
                <input
                    type="text"
                    className="border border-none bg-transparent rounded p-2 placeholder-text transition-colors focus:outline-none text-lg"
                    placeholder="Type to search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    autoFocus
                />

                <div
                    className={`flex flex-col gap-2 overflow-y-auto flex-grow ${styles.customScrollbar}`}
                >
                    {filteredThemes.map((themeName) => (
                        <div
                            key={themeName}
                            className="leading-tight hover:bg-sub p-1 rounded"
                            onClick={() => {
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
