import { useState, useEffect } from "react";
import wordsList from "./words.json"

const WORDS = wordsList
const VALID_WORDS = wordsList

const ROWS = 6;
const COLS = 5;

export default function Termo() {
  const [word, setWord] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [status, setStatus] = useState("playing");
  const [message, setMessage] = useState("");

  // Palavra aleatória
  useEffect(() => {
    const random = WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
    setWord(random);
  }, []);

  // Capturar teclado físico
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();

      if (key === "BACKSPACE") {
        handleKey("⌫");
      } else if (key === "ENTER") {
        handleKey("⏎");
      } else if (/^[A-Z]$/.test(key) && key.length === 1) {
        handleKey(key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentGuess, guesses, word, status]);

  const handleKey = (key) => {
  if (status !== "playing") return;

  setMessage("");

  if (key === "⌫") {
    setCurrentGuess((prev) => prev.slice(0, -1));
    return;
  }

  if (key === "⏎") {
    if (currentGuess.length < COLS) {
      setMessage("Digite 5 letras");
      return;
    }

    if (!VALID_WORDS.includes(currentGuess.toLowerCase())) {
      setMessage("Palavra inválida");
      return;
    }

    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);

    if (currentGuess === word) {
      setStatus("won");
      setMessage("Você acertou! 🎉");
    } else if (newGuesses.length >= ROWS) {
      setStatus("lost");
      setMessage(`A palavra era ${word}`);
    }

    setCurrentGuess("");
    return;
  }

  if (currentGuess.length < COLS && /^[A-Z]$/.test(key)) {
    setCurrentGuess((prev) => prev + key);
  }
};

const getKeyboardColors = () => {
  const colorMap = {}; // Ex: { A: "bg-yellow-500", B: "bg-green-500" }

  guesses.forEach((guess) => {
    const solutionArray = word.split("");
    const guessArray = guess.split("");
    const matched = Array(COLS).fill(false);

    // Verdes primeiro
    guessArray.forEach((l, i) => {
      if (solutionArray[i] === l) {
        colorMap[l] = "bg-green-500";
        matched[i] = true;
      }
    });

    // Depois amarelos
    guessArray.forEach((l, i) => {
      if (colorMap[l] === "bg-green-500") return;
      const indexInSolution = solutionArray.findIndex((s, si) => s === l && !matched[si]);
      if (indexInSolution !== -1) {
        if (colorMap[l] !== "bg-yellow-500") {
          colorMap[l] = "bg-yellow-500";
          matched[indexInSolution] = true;
        }
      } else {
        if (!colorMap[l]) {
          colorMap[l] = "bg-slate-700";
        }
      }
    });
  });

  return colorMap;
};

  const getCellColor = (letter, index, guess) => {
    if (!guesses.includes(guess)) return "bg-slate-800";
    const solutionArray = word.split("");
    const guessArray = guess.split("");
    const colorArray = Array(COLS).fill("bg-slate-700");

  const matched = solutionArray.map((l, i) => {
    if (guessArray[i] === l) {
      colorArray[i] = "bg-green-500";
      return true;
    }
    return false;
  });

  guessArray.forEach((l, i) => {
    if (colorArray[i] !== "bg-green-500") {
      const indexInSolution = solutionArray.findIndex((s, si) => s === l && !matched[si]);
      if (indexInSolution !== -1) {
        colorArray[i] = "bg-yellow-500";
        matched[indexInSolution] = true;
      }
    }
  });

  return colorArray[index];
};


  const keyboardKeys = [
    ..."QWERTYUIOP",
    ..."ASDFGHJKL",
    ..."ZXCVBNM",
    "⌫",
    "⏎",
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-6">
      <header className="text-center mt-10">
        <h1 className="text-4xl font-bold">Termo</h1>
        <p className="text-gray-400 mt-2">Adivinhe a palavra de 5 letras</p>
      </header>

      <div className="grid grid-rows-6 gap-2 mt-10">
        {Array.from({ length: ROWS }).map((_, rowIndex) => {
          const guess = guesses[rowIndex] || (rowIndex === guesses.length ? currentGuess : "");
          return (
            <div key={rowIndex} className="grid grid-cols-5 gap-2">
              {Array.from({ length: COLS }).map((_, colIndex) => {
                const letter = guess[colIndex] || "";
                return (
                  <div
                    key={colIndex}
                    className={`w-14 h-14 border border-slate-600 rounded-md flex items-center justify-center text-2xl font-bold ${getCellColor(letter, colIndex, guess)}`}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {message && (
        <p className="mt-6 text-lg text-yellow-300">{message}</p>
      )}

      <div className="mt-10 grid grid-cols-10 gap-2 max-w-xl w-full">
        {keyboardKeys.map((key, i) => {
  const keyColors = getKeyboardColors();
  const isSpecial = key === "⌫" || key === "⏎";
  const color = isSpecial ? "bg-slate-700" : keyColors[key] || "bg-slate-700";

  return (
    <button
      key={i}
      onClick={() => handleKey(key)}
      className={`p-3 ${color} hover:brightness-110 rounded text-white font-bold text-sm`}
    >
      {key}
    </button>
  );
})}

      </div>

      {status !== "playing" && (
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white font-bold"
        >
          Jogar Novamente
        </button>
      )}
    </div>
  );
}