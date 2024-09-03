import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { UserRecord } from "firebase-admin/lib/auth";

admin.initializeApp();

exports.onCreateUser = functions.auth.user().onCreate((user: UserRecord) => {
    const googleId = user.uid;

    import("nanoid").then(({ nanoid }) => {
        const timerId = nanoid();

        const email = user.email;
        const initialUsername = email ? email.split("@")[0] : googleId;

        const newUser = {
            googleId,
            username: initialUsername,
            timerId,
        };

        admin.database().ref(`users/${googleId}`).set(newUser);

        admin.database().ref(`usernames/${initialUsername}`).set({ googleId });
    });
});
