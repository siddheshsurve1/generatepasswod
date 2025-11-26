import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";


function App() {



const passwordInput = useRef(null);

const copytoclipboardCase = () => {
  if (!password || password.length === 0) return;

  // Highlight the text inside the input
  passwordInput.current.select();
  passwordInput.current.setSelectionRange(0, password.length); // mobile compatibility

  navigator.clipboard.writeText(password).then(() => {
   
  });
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
  }, [length, includeNumbers, includeSymbols,includecase]);

  // UseEffect that calls the passwordGenerator and sets the password when dependencies change
  useEffect(() => {
    const newPassword = passwordGenerator();
    setPassword(newPassword);  // Set the generated password
  }, [passwordGenerator]);
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-500">
        <h2 className="text-4xl text-center text-white py-1">Password Generator</h2>
        <div className="flex shadow-md rounded-lg mb-4 overflow-hidden">
          <input
            type="text" id="input_text"
            readOnly
            value={password}
            ref={passwordInput}
            className="w-full px-3 py-1 focus:outline-none bg-white text-black"
            placeholder="Password"
          />
          <button className="bg-green-800 text-white py-1 px-2" onClick={copytoclipboardCase}>Copy</button>
        </div>
        <div>
          <div className="flex items-center mb-3">
            <input
              type="range"
              min={8}
              max={20}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="ml-2 text-white">Length: {length}</label>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="numbers"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers((prev)=>!prev)}
            />
            <label htmlFor="numbers" className="ml-2 text-white">
              Include Numbers
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="symbols"
              checked={includeSymbols}
               onChange={() => setIncludeSymbols((prev)=>!prev)}
            />
            <label htmlFor="symbols" className="ml-2 text-white">
              Include Symbols
            </label>
          </div>
           <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="uppercase"
              checked={includecase}
               onChange={() => setIncludecase((prev)=>!prev)}
            />
            <label  className="ml-2 text-white">
              First Letter Uppercase
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
