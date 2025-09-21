import myLogo from '../assets/my_logo.png'
import profileIcon from '../assets/profile_icon.png'
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseSetup'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { addUser, removeUser } from '../utils/userSlice.js'

const Header = () => {
  const dispatch = useDispatch()
  useEffect(() => {
   const unsubscribe =  onAuthStateChanged(auth, (user) => {
      if (user) {

        const { uid, email,  photoURL, displayName } = user;
        dispatch(addUser(
          {
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL
          }));

        navigate("/browse")
      } else {
        // User is signed out
        navigate("/")
        dispatch(removeUser())

      }
    });
    return () => unsubscribe()
  }, [])

  const navigate = useNavigate()
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/")
      })
      .catch((error) => {
        // An error happened.
      });
  }

  return (
    <div className="absolute top-0 left-0 w-full flex justify-between items-center px-20 pt-4 z-10">

      <img
        src={myLogo}
        alt="Netflix logo"
        className="w-[180px]"
      />


      {auth.currentUser && <div className="flex items-center gap-4">
        <img
          src={profileIcon}
          alt="profile icon"
          className="h-[35px]"
        />
        <button className="border-2 border-solid h-8 w-20 rounded-md bg-gray-100 cursor-pointer" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>}
    </div>
  );
};

export default Header;
