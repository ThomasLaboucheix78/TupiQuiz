import './App.css';
import { useEffect, useState } from "react";
import liste_question from "./questions_reponse.json";

function App() {
  const [questions, setQuestions] = useState([0]);
  const [choixReponse, setChoixReponse] = useState(-1);
  const [index, setIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [fin, setFin] = useState(false);
  const [highlightCorrect, setHighlightCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10); 
  const [buttonLabel, setButtonLabel] = useState("Valider sa réponse");
  const [showTimer, setShowTimer] = useState(true); 

  const generateRandNum = () => {
    const newQuestions = [];
    while (newQuestions.length !== 10) {
      const randomNumber = Math.floor(Math.random() * liste_question.liste.length);
      if (!newQuestions.includes(randomNumber)) {
        newQuestions.push(randomNumber);
      }
    }
    setQuestions(newQuestions);
  };

  useEffect(() => {
    generateRandNum();
  }, []);

  useEffect(() => {
    if (fin || !showTimer) return; 

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          handleValidation(); 
          setButtonLabel("Question suivante");
          return 10; 
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); 
  }, [index, fin, choixReponse, showTimer]);

  const handleValidation = () => {
    setHighlightCorrect(true);
    setShowTimer(false); 
    if (choixReponse !== -1 && liste_question.liste[questions[index]].choix[choixReponse] === liste_question.liste[questions[index]].réponse) {
      setPoints(points + 1);
    }
    setButtonLabel("Question suivante");
  };

  const handleNext = () => {
    if (index < 9) {
      setIndex(index + 1);
      setChoixReponse(-1);
      setHighlightCorrect(false);
      setTimeLeft(10); 
      setShowTimer(true); 
      setButtonLabel("Valider sa réponse");
    } else {
      setFin(true);
    }
  };

  const handleButtonClick = () => {
    if (buttonLabel === "Valider sa réponse") {
      handleValidation();
    } else {
      handleNext();
    }
  };

  const getFinalMessage = () => {
    if (points < 5) {
      return { text: "Petit poussin 🐣", gif: "https://media.giphy.com/media/26tPplGWjN0xLybiU/giphy.gif" };
    } else if (points < 7) {
      return { text: "Pigeon de combat 🕊️", gif: "https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif" };
    } else if (points < 9) {
      return { text: "Grand aigle 🦅", gif: "https://media.giphy.com/media/26FLdmIp6wJr91JAI/giphy.gif" };
    } else {
      return { text: "Pigargue majestueux 🦅👑", gif: "https://media.giphy.com/media/l2JehQ2GitHGdVG9y/giphy.gif" };
    }
  };

  return (
    <div className="container">
      {fin ? (
        <div className="final-box">
          <div className='score'>Bravo votre score est : {points} / 10</div>
          <div className="final-message">{getFinalMessage().text}</div>
          <img src={getFinalMessage().gif} alt="GIF rigolo" className="final-gif" />
        </div>
      ) : (
        <div>
          <div className='question'>{liste_question.liste[questions[index]].question}</div>
          <div className='reponses'>
            {liste_question.liste[questions[index]].choix.map((choix, i) => (
              <div
                key={i}
                className={`reponse ${
                  choixReponse === i ? "selected" : ""
                } ${
                  highlightCorrect && choix === liste_question.liste[questions[index]].réponse
                    ? "correct"
                    : ""
                } ${
                  highlightCorrect && choixReponse === i && choix !== liste_question.liste[questions[index]].réponse
                    ? "incorrect"
                    : ""
                }`}
                onClick={() => !highlightCorrect && setChoixReponse(i)}
              >
                {choix}
              </div>
            ))}
          </div>
          {showTimer && (
            <div className="timer-bar">
              <div className="timer-fill" style={{ width: `${(timeLeft / 10) * 100}%` }}></div>
            </div>
          )}
          <button className='action-button' onClick={handleButtonClick}>{buttonLabel}</button>
        </div>
      )}
      <div className="tupi-text">Tupi</div>
    </div>
  );
}

export default App;
