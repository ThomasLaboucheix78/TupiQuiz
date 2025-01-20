import logo from './logo.svg';
import './App.css';
import { use, useEffect, useState } from "react"
import liste_question from "./questions_reponse.json"

function App() {

  const [questions, setQuestions] = useState([0]);
  const [choixReponse, setChoixReponse] = useState(-1);
  const [index, setIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [fin, setFin] = useState(false);
  const [labonne, setLaBonne] = useState("");


  const generateRandNum = () => {
    const newQuestions = []
    while (newQuestions.length != 10) {
      const randomNumber = Math.floor(Math.random() * liste_question.liste.length);
      if (!newQuestions.includes(randomNumber)) {
        newQuestions.push(randomNumber)
      }
    }
    setQuestions(newQuestions);
  }

  useEffect(() => {
    generateRandNum()
  }, []);

  return (
    <div>
      {fin ?
        <div>
          <div className='score'>Bravo votre score est : {points}</div>
          {labonne === "" ? null : <div className='labonne'>La bonne réponse était {labonne}</div>}
        </div>
        :
        <div>
          <div className='question'>{liste_question.liste[questions[index]].question}</div>
          <div className='reponses'>
            <div className='haut'>
              <div className='reponse1' onClick={() => setChoixReponse(0)}>
                {liste_question.liste[questions[index]].choix[0]}
                {
                  choixReponse === 0 ? <img className='tupi' src={require('./tupi.png')} alt="React Logo" /> : null
                }
              </div>
              <div className='reponse2' onClick={() => setChoixReponse(1)}>
                {liste_question.liste[questions[index]].choix[1]}
                {
                  choixReponse === 1 ? <img className='tupi' src={require('./tupi.png')} alt="React Logo" /> : null
                }
              </div>
            </div>
            <div className='bas'>
              <div className='reponse3' onClick={() => setChoixReponse(2)}>
                {liste_question.liste[questions[index]].choix[2]}
                {
                  choixReponse === 2 ? <img className='tupi' src={require('./tupi.png')} alt="React Logo" /> : null
                }
              </div>
              <div className='reponse4' onClick={() => setChoixReponse(3)}>
                {liste_question.liste[questions[index]].choix[3]}
                {
                  choixReponse === 3 ? <img className='tupi' src={require('./tupi.png')} alt="React Logo" /> : null
                }
              </div>
            </div>
          </div>
          {
            choixReponse !== -1 ?
              <button className='suivant' onClick={() => {
                if (liste_question.liste[questions[index]].choix[choixReponse] === liste_question.liste[questions[index]].réponse) {
                  setPoints(points + 1)
                }
                else {
                  setFin(true)
                  setLaBonne(liste_question.liste[questions[index]].réponse)
                }
                if (index < 9) {
                  setIndex(index + 1);
                  setChoixReponse(-1)
                }
                else
                  setFin(true)
              }}>Question suivante</button>
              :
              null
          }
        </div>}

    </div>
  );
}

export default App;
