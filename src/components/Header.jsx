import { useState, useEffect } from 'react';
import myLogo from '../assets/my_logo.png'
import profileIcon from '../assets/profile_icon.png'
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseSetup'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice.js'
import { toggleGptSearch } from '../utils/gptSlice.js';
import { supportedLanguages } from '../utils/langConstants.js';
import { changeLanguage } from '../utils/configSlice.js';

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, photoURL, displayName } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse")
      } else {
        navigate("/")
        dispatch(removeUser())
      }
    });
    return () => unsubscribe()
  }, [])

  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigate("/"))
      .catch((error) => console.error(error));
  }

  const handleGptToggle = () => {
    dispatch(toggleGptSearch())
  }

  const handleLanguage = (e) => {
    dispatch(changeLanguage(e.target.value))
  }

  return (
    <div className="absolute top-0 left-0 w-full flex justify-between items-center px-10 pt-4 z-20">

      {/* Logo */}
      <img src={myLogo} alt="Netflix logo" className="w-[180px]" />

      {/* Hamburger for mobile */}
      <div className="sm:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Menu items */}
      {auth.currentUser && (
        <div className={`flex-col sm:flex-row sm:flex items-center gap-4 absolute sm:static top-full left-0 w-full sm:w-auto transition-all ${menuOpen ? "flex" : "hidden"} sm:flex p-4 sm:p-0`}>

          <select onChange={handleLanguage} className="border rounded-md bg-black text-white w-28 h-10 mb-2 sm:mb-0">
            {supportedLanguages?.map(language => (
              <option key={language.identifier} value={language.identifier}>
                {language.name}
              </option>
            ))}
          </select>

          <button type="button" className="btn btn-outline-danger mb-2 sm:mb-0" onClick={handleGptToggle}>GPT Search</button>
          <button type="button" className="btn btn-outline-dark mb-2 sm:mb-0" onClick={handleSignOut}>Sign Out</button>
          <img src={profileIcon} alt="profile icon" className="h-[35px]" />
        </div>
      )}
    </div>
  );
};

export default Header;
