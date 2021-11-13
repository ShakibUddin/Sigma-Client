import axios from "axios";
import { createUserWithEmailAndPassword, getAuth, getIdToken, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
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
    const [token, setToken] = useState("");
    const [role, setRole] = useState("Unauthorized");
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const upsertUserUrl = `${serverUrl}/user`;
    const getUserRoleUrl = `${serverUrl}/user`;//add email 

    const saveUserInDB = (user) => {
        axios.put(upsertUserUrl, { ...user });
    }

    useEffect(() => {
        axios.get(`${getUserRoleUrl}/${user.email}`)
            .then(response => {
                if (response.status === 200) {
                    setRole(response.data);
                }
            })
            .catch(error => {
                setSigninError(error.code);
            });


    }, [getUserRoleUrl, user?.email])

    const handleGoogleSignIn = () => {
        setIsLoading(true);
        return signInWithPopup(auth, googleProvider)
            .then(result => {
                const { displayName, email, photoURL, emailVerified } = result.user;
                const loggedInUser = {
                    name: displayName,
                    email: email,
                    photo: photoURL,
                    emailVerified: emailVerified,
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
        setIsLoading(true);
        return signInWithPopup(auth, gitHubProvider)
            .then(result => {
                const { displayName, email, photoURL, emailVerified } = result.user;
                const loggedInUser = {
                    name: displayName,
                    email: email,
                    photo: photoURL,
                    emailVerified: emailVerified,
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
        setIsLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                const { displayName, email, photoURL, emailVerified } = user;
                const loggedInUser = {
                    name: displayName,
                    email: email,
                    photo: photoURL,
                    emailVerified: emailVerified,
                };
                setUser(loggedInUser);
                setSigninError("");
            })
            .catch((error) => {
                setSigninError(error.code);

            }).finally(() => setIsLoading(false));
    }

    const handleFirebaseEmailSignUp = (name, email, password) => {
        setIsLoading(true);
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
                        emailVerified: user.emailVerified,
                        role: "USER"
                    };
                    setUser(loggedInUser);
                    saveUserInDB(loggedInUser);
                    setRole("USER");
                    setSignupError("");
                });
            })
            .catch((error) => {
                setSignupError(error.code);
            }).finally(() => setIsLoading(false));
    }

    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                const loggedInUser = {
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL,
                    emailVerified: user.emailVerified
                };
                setUser(loggedInUser);
                getIdToken(user)
                    .then(idToken => {
                        setToken(idToken);
                    });
            } else {
                setUser({});
                setRole("Unauthorized");
            }
            setIsLoading(false);
        });
        return () => unsubscribed;
    }, [auth])

    const logout = () => {
        setIsLoading(true);
        signOut(auth)
            .then(() => {
                setUser({});
                setRole("Unauthorized");
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
        token,
        role,
        isLoading,
        logout
    }
}

export default useFirebase;