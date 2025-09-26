import myLogo from '../assets/my_logo.png'
import profileIcon from '../assets/profile_icon.png'
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseSetup'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { addUser, removeUser } from '../utils/userSlice.js'
import { toggleGptSearch } from '../utils/gptSlice.js';
import { supportedLanguages } from '../utils/langConstants.js';
import { changeLanguage } from '../utils/configSlice.js';

const Header = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {

        const { uid, email, photoURL, displayName } = user;
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

  const handleGptToggle = () => {
    dispatch(toggleGptSearch())

  }

  const handleLanguage = (e) => {
   dispatch(changeLanguage(e.target.value))
  }

  return (

    <div className="absolute top-0 left-0 w-full flex justify-between items-center px-10 pt-4 z-20 ">

      <img
        src={myLogo}
        alt="Netflix logo"
        className="w-[180px]"
      />


      {auth.currentUser && <div className="flex items-center gap-4">
        {<select onChange={handleLanguage} className="relative z-50 border-1 rounded-md bg-black text-white w-20 h-10">

          {supportedLanguages?.map(language => (
            <option key={language.identifier} value={language.identifier}>
              {language.name}
            </option>
          ))}
        </select>}

        <button type="button" class="btn btn-outline-danger" onClick={handleGptToggle}>GPT Search</button>
        <button type="button" class="btn btn-outline-dark" onClick={handleSignOut}>Sign Out</button>
        <img
          src={profileIcon}
          alt="profile icon"
          className="h-[35px]"
        />
      </div>}
    </div>

  );
};

export default Header;
