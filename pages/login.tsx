import React from "react";
import { signInWithPopup, getAuth } from "firebase/auth";
import { googleAuthProvider } from "../firebase/clientApp";
import { useRouter } from "next/router";
import PageLayout from "../components/PageLayout";

const SignIn: React.FC = () => {
    const router = useRouter();

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

    return (
        <PageLayout isTimerActive={false} actionArea={<></>}>
            <div className="signin-page bg-pink-400">
                <h1>Sign In</h1>
                <button onClick={handleGoogleSignIn}>
                    Sign in with Google
                </button>
            </div>
        </PageLayout>
    );
};

export default SignIn;
