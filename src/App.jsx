import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { FaSync } from "react-icons/fa";

function App() {
  
  const handleRefresh = () => {
    // Logic to refresh data or component state goes here
    console.log("Data refreshed!");
    setPassword(passwordGenerator());
  };

  //    const copytoclipboardCase = () => {
  //   if (!password || password.length === 0) return;

  //   navigator.clipboard.writeText(password)
  //     .then(() => {
  //       settoastrenderStatus({
  //         status: true,
  //         message: 'Text Copied',
  //         type: 'success'
  //       });
  //     });
  // };
  const passwordInput = useRef(null);

  const copytoclipboardCase = () => {
    if (!password || password.length === 0) return;

    // Highlight the text inside the input
    passwordInput.current.select();
    passwordInput.current.setSelectionRange(0, password.length); // mobile compatibility

    navigator.clipboard.writeText(password).then(() => {});
  };
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [includecase, setIncludecase] = useState(false);
  const [password, setPassword] = useState("");

  // The password generator function
  const passwordGenerator = useCallback(() => {
    let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) {
      characters += "0123456789";
    }
    if (includeSymbols) {
      characters += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    }

    let generatedPassword = "";

    // --- FIRST CHARACTER MUST BE ALPHABET AND CAPITAL ---
    if (includecase) {
      const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const firstChar =
        alphabet[Math.floor(Math.random() * alphabet.length)].toUpperCase();

      generatedPassword += firstChar; // set first letter
    }

    // --- GENERATE REMAINING CHARACTERS ---
    const startIndex = includecase ? 1 : 0;
    for (let i = startIndex; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }

    return generatedPassword;
  }, [length, includeNumbers, includeSymbols, includecase]);

  // UseEffect that calls the passwordGenerator and sets the password when dependencies change
  useEffect(() => {
    const newPassword = passwordGenerator();
    setPassword(newPassword); // Set the generated password
  }, [passwordGenerator]);
  return (
    <>
     <div className="w-full max-w-md mx-auto my-10 p-6 rounded-2xl 
  bg-white/10 backdrop-blur-lg border border-white/20 
  shadow-xl text-orange-400">

  <h2 className="text-2xl font-bold text-center text-black mb-6">
    🔐 Password Generator
  </h2>

  {/* Password Display */}
  <div className="flex items-center rounded-xl overflow-hidden shadow-md mb-6">
    <input
      type="text"
      readOnly
      value={password}
      ref={passwordInput}
      placeholder="Generate password"
      className="flex-1 px-4 py-3 text-black bg-white focus:outline-none"
    />

    <button
      onClick={handleRefresh}
      className="bg-white px-3 py-4 hover:bg-gray-200 transition"
    >
      <FaSync className="text-gray-700 hover:rotate-180 transition-transform duration-500" />
    </button>

    <button
      onClick={copytoclipboardCase}
      className="bg-green-700 text-white px-4 py-3 font-semibold 
      hover:bg-green-600 transition"
    >
      Copy
    </button>
  </div>

  {/* Length */}
  <div className="mb-5">
    <label className="flex justify-between text-black mb-2">
      <span>Password Length</span>
      <span className="font-semibold">{length}</span>
    </label>
    <input
      type="range"
      min={8}
      max={20}
      value={length}
      onChange={(e) => setLength(e.target.value)}
      className="w-full accent-grey-500 cursor-pointer"
    />
  </div>

  {/* Options */}
  <div className="space-y-4 text-black">
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        checked={includeNumbers}
        onChange={() => setIncludeNumbers(prev => !prev)}
        className="accent-orange-500"
      />
      Include Numbers
    </label>

    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        checked={includeSymbols}
        onChange={() => setIncludeSymbols(prev => !prev)}
        className="accent-orange-500"
      />
      Include Symbols
    </label>

    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        checked={includecase}
        onChange={() => setIncludecase(prev => !prev)}
        className="accent-orange-500"
      />
      First Letter Uppercase
    </label>
  </div>
</div>

    </>
  );
}
export default App;
