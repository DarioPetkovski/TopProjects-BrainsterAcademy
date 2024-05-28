import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../app/lib/firebaseConfig";
import { useGlobalContext } from "../context/Context";
import { useRouter } from "next/navigation";
import axios from "axios";
import { User } from "../Interfaces/Interfaces";

function SocialMediaBar() {
  const { user, data, setUser, setLastWatched } = useGlobalContext();
  const router = useRouter();
  const pathName = usePathname();

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const userEmail = result.user.email;
      const userUserName = result.user.displayName;
      const userPhoto = result.user.photoURL;
      const checkEmail = data?.users.find((item) => item.email === userEmail);
      if (checkEmail) {
        const updatedUser = {
          ...checkEmail,
          isLogged: true,
        };
        setUser(updatedUser);
        setLastWatched(checkEmail.lastWatched);
        await axios.put(
          `http://localhost:5001/users/${checkEmail.id}`,
          updatedUser
        );
      } else {
        if (userEmail !== null && userUserName !== null && userPhoto !== null) {
          const newUser: User = {
            ...user,
            email: userEmail,
            userName: userUserName,
            img: userPhoto,
          };
          setUser(newUser);
          router.push("/register/step1");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleFacebook = async () => {
    const provider = new FacebookAuthProvider();
    provider.addScope("public_profile");

    try {
      const result = await signInWithPopup(auth, provider);
      const userEmail = result.user.email;
      const userName = result.user.displayName;
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;

      const fetchFacebookProfilePicture = async (
        accessToken: string | undefined
      ) => {
        try {
          const response = await axios.get(
            `https://graph.facebook.com/me/picture?type=large&redirect=false&access_token=${accessToken}`
          );
          return response.data.data.url;
        } catch (err) {
          console.log(err);
        }
      };

      const userPhotoURL: string = await fetchFacebookProfilePicture(
        accessToken
      );

      const checkEmail = data?.users.find((item) => item.email === userEmail);

      if (checkEmail) {
        const updatedUser = {
          ...checkEmail,
          isLogged: true,
          img: userPhotoURL,
        };
        setUser(updatedUser);
        setLastWatched(checkEmail.lastWatched);
        await axios.put(
          `http://localhost:5001/users/${checkEmail.id}`,
          updatedUser
        );
      } else {
        if (userEmail !== null && userName !== null) {
          const newUser: User = {
            ...user,
            email: userEmail,
            userName: userName,
            img: userPhotoURL,
          };
          setUser(newUser);
          router.push("/register/step1");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-socialMedia w-75 mt-3">
      <div
        onClick={handleGoogle}
        className="social-media d-flex justify-content-start"
      >
        <img src="/assets/images/flat-color-icons_google.png" alt="" />
        <span className="social-media-content">Sign up with Google</span>
      </div>
      <div
        onClick={handleFacebook}
        className="social-media d-flex justify-content-start mt-3"
      >
        <img src="/assets/images/logos_facebook.png" alt="" />
        <span className="social-media-content">Sign up with Facebook</span>
      </div>
      {pathName === "/register" && (
        <div className="social-media d-flex justify-content-start mt-3">
          <img src="/assets/images/apple.png" alt="" />
          <span className="social-media-content">Sign up with Apple</span>
        </div>
      )}
      {pathName === "/login" && (
        <div className="d-flex justify-content-center mt-1">
          <small>
            <Link className="italic" href={"/register"}>
              <i>Create a new account</i>
            </Link>
          </small>
        </div>
      )}
    </div>
  );
}

export default SocialMediaBar;
