import { getAuth, onAuthStateChanged, type User, GoogleAuthProvider, signInWithPopup, type AuthError, signOut } from "firebase/auth"

const provider = new GoogleAuthProvider();

export const useAuth = () => {
    const auth = getAuth();
    
    const observeLogin =  (
        loginCallback?: (user: User) => void,
        notLoginCallback?: () => void
    ) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if( loginCallback ) loginCallback(user)
            } else {
                if( notLoginCallback ) notLoginCallback()
            }
        });
    }

    const logout = async () => {
        await signOut(auth)
            .then(() => {
                const router = useRouter()
                router.push("/")
            })
            .catch((error) => {
                throw new Error(error)
            })
    }

    const login = async () => {
        await signInWithPopup(auth, provider)
            .catch((error: AuthError) => {
                throw new Error(error.message)
            });
    }

    return { observeLogin, auth, login, logout }
}