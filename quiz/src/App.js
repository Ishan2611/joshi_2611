// App.js
import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch('http://localhost:5000/api/questions');
      const data = await response.json();
      setQuestions(data);
    };
    fetchQuestions();
  }, []);

  const handleAnswer = (isCorrect) => {
    setSelectedAnswer(isCorrect);
    if (isCorrect) {
      setScore(score + 1);
    }
    setCorrectAnswer(isCorrect);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setCorrectAnswer(null);
    } else {
      setIsQuizFinished(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
      setCorrectAnswer(null);
    }
  };

  if (isQuizFinished) {
    return (
      <div className="results">
        <h1>Your Score: {score}/{questions.length}</h1>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      {questions.length > 0 && (
        <>
          <h2>{questions[currentQuestionIndex].question}</h2>
          <div>
            {questions[currentQuestionIndex].answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(answer.isCorrect)}
                className={selectedAnswer === null ? '' : answer.isCorrect ? 'correct' : 'wrong'}
              >
                {answer.text}
              </button>
            ))}
          </div>
          <div className="navigation">
            <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>Previous</button>
            <button onClick={handleNextQuestion} disabled={selectedAnswer === null}>{currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}</button>
          </div>
          {selectedAnswer !== null && (
            <div className="feedback">
              {selectedAnswer ? <p>Correct!</p> : <p>Wrong! The correct answer is: {questions[currentQuestionIndex].answers.find(answer => answer.isCorrect).text}</p>}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
