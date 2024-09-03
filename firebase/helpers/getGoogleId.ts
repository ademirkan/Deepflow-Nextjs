import { auth } from "../clientApp"; // Adjust the path according to your project structure

export function getGoogleId() {
    const user = auth.currentUser;

    if (user) {
        const googleId = user.uid; // This is the user's Google ID
        console.log("User's Google ID:", googleId);
        return googleId;
    } else {
        console.error("No user is currently authenticated.");
        return null;
    }
}
