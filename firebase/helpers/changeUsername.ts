import { ref, set, remove, get } from "firebase/database";
import { db } from "../clientApp";

async function changeUsername(googleId: string, newUsername: string) {
    try {
        // Check if the new username is already taken
        const newUsernameRef = ref(db, `usernames/${newUsername}`);
        const newUsernameSnapshot = await get(newUsernameRef);

        if (newUsernameSnapshot.exists()) {
            console.error("The new username is already taken.");
            return;
        }

        // Get the current user
        const currentUserRef = ref(db, `users/${googleId}`);
        const currentUserSnapshot = await get(currentUserRef);
        const currentUser = currentUserSnapshot.val();

        // Update the user's username in the 'users' table
        await set(ref(db, `users/${googleId}/username`), newUsername);

        // Remove the old username from the 'usernames' table
        await remove(ref(db, `usernames/${currentUser.username}`));

        // Add the new username to the 'usernames' table with the googleId
        await set(newUsernameRef, { googleId });

        console.log("Username changed successfully.");
    } catch (error) {
        console.error("Error changing username:", error);
    }
}

export default changeUsername;
