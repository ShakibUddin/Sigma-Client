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
    const [role, setRole] = useState("");
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const upsertUserUrl = `${serverUrl}/user`;
    const getUserRoleUrl = `${serverUrl}/user/role`;//add email 

    const saveUserInDB = (user) => {
        axios.put(upsertUserUrl, { ...user });
    }

    useEffect(() => {
        user.name = user.displayName;
        axios.get(`${getUserRoleUrl}/${user.email}`).then(response => {
            if (response.status === 200) {
                setRole(response.data);
            }
        });
    }, [getUserRoleUrl, user, user.email])



    const handleGoogleSignIn = () => {
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
                setUser(user);
                getIdToken(user)
                    .then(idToken => {
                        setToken(idToken);
                    });
            } else {
                setUser({});
                setRole("");
            }
            setIsLoading(false);
        });
        return () => unsubscribed;
    }, [auth])

    const logout = () => {
        signOut(auth)
            .then(() => {
                setUser({});
                setRole("");
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