import React, { useRef, FormEvent } from "react";
import { signInWithPopup, getAuth } from "firebase/auth";
import { auth, googleAuthProvider } from "../firebase/clientApp";
import { useRouter } from "next/router";
import PageLayout from "../components/PageLayout";
import { getGoogleId } from "../firebase/helpers/getGoogleId";
import changeUsername from "../firebase/helpers/changeUsername";

const SignIn: React.FC = () => {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleGoogleSignIn = async () => {
        try {
            const provider = googleAuthProvider;
            const authInstance = getAuth();
            await signInWithPopup(authInstance, provider);
            router.push("/");
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!auth.currentUser) {
            console.error("No user is currently authenticated.");
            return;
        }

        const googleId = auth.currentUser.uid;
        if (inputRef.current) {
            try {
                await changeUsername(googleId, inputRef.current.value);
                console.log("Username changed successfully.");
            } catch (error) {
                console.error("Error changing username:", error);
            }
        }
    };

    return (
        <PageLayout isTimerActive={false} actionArea={<></>}>
            <div className="signin-page bg-pink-400">
                <div>
                    <h1>Sign In</h1>
                    <button onClick={handleGoogleSignIn}>
                        Sign in with Google
                    </button>
                    <p>{getGoogleId()}</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="newUsername"
                        name="newUsername"
                        ref={inputRef}
                        className="placeholder-black text-black"
                    ></input>
                    <button type="submit">Change Username</button>
                </form>
            </div>
        </PageLayout>
    );
};

export default SignIn;
