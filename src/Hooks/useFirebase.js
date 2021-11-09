import axios from "axios";
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { serverUrl } from "../Constants/Constants";
import initializeFirebase from '../Firebase/firebase.init';

initializeFirebase();

const useFirebase = () => {
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const gitHubProvider = new GithubAuthProvider();
    const [signupError, setSignupError] = useState("");
    const [signinError, setSigninError] = useState("");
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const upsertUserUrl = `${serverUrl}/user`;

    const saveUserInDB = (user) => {
        axios.put(upsertUserUrl, { ...user });
    }

    const handleGoogleSignIn = () => {
        return signInWithPopup(auth, googleProvider)
            .then(result => {
                const { displayName, email, photoURL, emailVerified } = result.user;
                const loggedInUser = {
                    name: displayName,
                    email: email,
                    photo: photoURL,
                    emailVerified: emailVerified
                };
                setSigninError("");
                saveUserInDB(loggedInUser);
                setUser(loggedInUser);
            })
            .catch(error => {
                setSigninError(error.code);
            })
            .finally(() => setIsLoading(false));
    }
    const handleGithubSignIn = () => {
        return signInWithPopup(auth, gitHubProvider)
            .then(result => {
                const { displayName, email, photoURL, emailVerified } = result.user;
                const loggedInUser = {
                    name: displayName,
                    email: email,
                    photo: photoURL,
                    emailVerified: emailVerified
                };
                setSigninError("");
                saveUserInDB(loggedInUser);
                setUser(loggedInUser);
            })
            .catch(error => {
                setSigninError(error.code);
            })
            .finally(() => setIsLoading(false));
    }

    const handleFirebaseEmailSignIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setUser(user);
                setSigninError("");
            })
            .catch((error) => {
                setSigninError(error.code);

            }).finally(() => setIsLoading(false));
    }

    const handleFirebaseEmailSignUp = (name, email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                    const loggedInUser = {
                        name: user.displayName,
                        email: user.email,
                        photo: user.photoURL,
                        emailVerified: user.emailVerified
                    };
                    setUser(loggedInUser);
                    saveUserInDB(loggedInUser);
                    setSignupError("");
                });
            })
            .catch((error) => {
                setSignupError(error.code);
            }).finally(() => setIsLoading(false));
    }

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                const { displayName, email, photoURL, emailVerified } = user;
                const loggedInUser = {
                    name: displayName,
                    email: email,
                    photo: photoURL,
                    emailVerified: emailVerified
                };
                setUser(loggedInUser);
            } else {
                setUser({});
            }
            setIsLoading(false);
        })
    }, [auth]);

    const logout = () => {
        signOut(auth)
            .then(() => {
                setUser({});
            })
            .finally(() => setIsLoading(false));
    }

    return {
        handleGoogleSignIn,
        handleGithubSignIn,
        handleFirebaseEmailSignIn,
        handleFirebaseEmailSignUp,
        signupError,
        signinError,
        user,
        isLoading,
        logout
    }
}

export default useFirebase;