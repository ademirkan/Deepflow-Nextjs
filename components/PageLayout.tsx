import Link from "next/link";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import TextButton from "./Buttons/TextButton";
import styles from "../styles/PageLayout.module.css";
import { useTheme } from "../hooks/useTheme";
import { useMediaQuery } from "../hooks/useMediaQuery";
import ThemeConfigModal from "./Modals/ThemeConfigModal";

interface IProps {
    isTimerActive?: boolean;
    actionArea?: ReactElement;
    children: ReactNode;
}

export default function PageLayout(props: IProps) {
    const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
    const handleThemeModalRequestClose = () => {
        setIsThemeModalOpen(false);
    };
    const handleThemeClick = () => {
        setIsThemeModalOpen(true);
    };

    return (
        <>
            <header>
                <div className="flex flex-row gap-6">
                    <Logo isTimerActive={props.isTimerActive} />
                    <NavMenu isTimerActive={!props.isTimerActive} />
                </div>
                {props.actionArea}
            </header>

            {props.children}

            <footer
                className={`flex justify-between text-sm text-sub ${
                    props.isTimerActive ? "animated-hidden" : "animated-visible"
                }`}
            >
                <div className="flex gap-5">
                    <TextButton
                        icon={
                            <i className="fa-solid fa-info-circle pr-[3px]"></i>
                        }
                    >
                        About
                    </TextButton>

                    <a href="mailto:ademirkan@ucsd.edu">
                        <TextButton
                            icon={
                                <i className="fa-solid fa-envelope pr-[3px]"></i>
                            }
                        >
                            Contact
                        </TextButton>
                    </a>

                    <a
                        href="https://github.com/ademirkan/Deep-Flow"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <TextButton
                            icon={
                                <i className="fa-sharp fa-solid fa-code pr-[3px]"></i>
                            }
                        >
                            Github
                        </TextButton>
                    </a>
                </div>

                <div className="flex gap-5">
                    <TextButton
                        icon={
                            <i className="fa-solid fa-compact-disc pr-[3px]"></i>
                        }
                    >
                        Ambience
                    </TextButton>

                    <TextButton
                        onClick={handleThemeClick}
                        icon={<i className="fa-solid fa-palette pr-[3px]"></i>}
                    >
                        theme
                    </TextButton>
                    <ThemeConfigModal
                        isOpen={isThemeModalOpen}
                        onRequestClose={handleThemeModalRequestClose}
                    ></ThemeConfigModal>
                </div>
            </footer>
        </>
    );
}

function Logo({ isTimerActive }: any) {
    const [isMobile, setIsMobile] = useMediaQuery("(max-width: 768px)");

    const fill = isTimerActive ? "fill-sub" : "fill-main";
    const stroke = isTimerActive ? "stroke-sub" : "stroke-main";
    const text = isTimerActive ? "text-sub" : "text-text";
    return (
        <Link href="/">
            <div className="flex flex-row items-center gap-3 h-10">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 1000 1000"
                >
                    <path
                        id="f"
                        className={fill + " transition-colors"}
                        d="M568.754,551.858H648.5c8.05,0,24.707-2.438,29.99,1.4q-0.341,115.359-.682,230.74l-109.734-.7Q568.412,667.589,568.754,551.858Z"
                    />
                    <path
                        id="d"
                        className={fill + " transition-colors"}
                        d="M798.278,417.916v2.009c-6.024,2.957-16.892,19.094-21.9,24.78-10.8,12.267-22.623,23.615-32.518,36.836-4.673,6.243-11.9,11.153-16.592,17.413-5.244,7-12.146,12.6-17.254,19.422-1.968,2.627-5.039,8.719-7.964,10.046h-21.9c-3.053,1.688-13.762.67-19.909,0.67H619.1l-13.273-.67c-4.884.666-16.168-.928-21.236-1.339-11.918-.967-23.756,1.358-35.173-1.34h-7.3q-0.333-.669-0.664-1.339l-7.964.67c-12.023-2.773-22.72-1.078-34.509-4.019-7.766-1.937-16.762-1.645-25.218-4.018-21.931-6.154-45.03-9-67.692-14.734-5.731-1.452-10.5.037-16.591-1.34-36.274-8.194-74.462,9.386-88.264,28.8-20.367,28.647-18.671,95.648,1.327,123.9,8.444,11.929,19.569,16.435,35.173,21.431,5.822,1.865,26.155,5,35.173,2.679,14.534-3.739,27.773-7.272,37.164-16.073,23.128-21.674,23.343-63.77,23.228-109.167H540.785c1.54,113.569-22.625,187.317-92.246,231.059-9.491,5.963-21.552,10.9-32.518,14.734-6.276,2.195-14.89,3.1-19.246,4.688-9.824,3.59-43.183,4.638-54.418,2.009-10.432-2.441-19.72-1.115-29.2-4.018-30.427-9.316-53.322-23-73-42.863l-9.291-8.707c-9.733-13.01-19.475-26.559-27.209-41.524-7.4-14.323-11.66-31.136-16.591-47.551-6.29-20.934-7.86-51.46-7.3-74.34,0.28-11.434-2.245-24.687.663-36.836,4.106-17.15,4.569-35,9.955-50.9,18.735-55.307,45.276-99.648,98.883-119.883,18.039-6.809,57.532-15.285,82.955-9.376h16.591c8.327,1.886,18.491.3,27.209,2.679,3.262,0.89,8.144,1.332,11.945,2.679,2.546,0.9,4.582,3.114,7.3,4.018V196.233c8.544-2.84,23.234-.669,33.182-0.669h72.336V401.842c9.429,2.216,17.313,7.836,27.21,9.377-2.236-108.836,49.675-183.162,128.746-210.3,31.165-10.695,82.107-6.7,122.774-6.7,2.924,8.97.663,28.667,0.663,39.515V320.8c-6.245,2.081-17.051.67-24.555,0.67H742.532c-2.29,1.377-7.988,1.127-9.954.67-7.309,2.606-16.263,4.172-22.564,8.036-25.97,15.928-34.715,44.307-34.509,87.066,8.743,2.9,27.907.67,38.491,0.67h84.282Z"
                    />
                    <path
                        style={{ strokeWidth: "100px", fill: "none" }}
                        className={stroke + " transition-colors"}
                        d="M53.17,47.845H946.83v904.31H53.17V47.845Z"
                    />
                </svg>
                {!isMobile && (
                    <div
                        id={styles.logo}
                        className={`${text} transition-colors`}
                    >
                        deepflow
                    </div>
                )}
            </div>
        </Link>
    );
}

function NavMenu({ isTimerActive }: any) {
    return (
        <nav
            className={`${
                isTimerActive ? "animated-visible" : "animated-hidden"
            } flex items-center`}
        >
            <ul className="flex">
                <li>
                    <Link href="/">
                        <TextButton
                            icon={
                                <i className="fa-regular fa-clock fa-lg px-2 py-4"></i>
                            }
                        ></TextButton>
                    </Link>
                </li>
                <li>
                    <Link href="/oops">
                        <TextButton
                            icon={
                                <i className="fa-solid fa-chart-simple fa-lg px-3 py-4"></i>
                            }
                        ></TextButton>
                    </Link>
                </li>
                <li>
                    <Link href="/oops">
                        <TextButton
                            icon={
                                <i className="fa-solid fa-gear fa-lg px-3 py-4"></i>
                            }
                        ></TextButton>
                    </Link>
                </li>
                <li>
                    <Link href="/oops">
                        <TextButton
                            icon={
                                <i className="fa-solid fa-link fa-lg px-[0.6rem] py-4"></i>
                            }
                        ></TextButton>
                    </Link>
                </li>
                <li>
                    <Link href="/login">
                        <TextButton
                            icon={
                                <i className="fa-solid fa-user fa-lg px-3 py-4"></i>
                            }
                        ></TextButton>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
