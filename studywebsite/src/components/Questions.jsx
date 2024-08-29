import { useState } from "react";
import "./Questions.css"; // Ensure this path is correct

export default function Questions() {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null); // Track the correct answer
  const [selectedAnswers, setSelectedAnswers] = useState([]); // Track selected answers by users
  const [score, setScore] = useState(null); // Store the calculated score

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    if (question.trim() && answers.length > 0 && correctAnswer !== null) {
      setQuestions([...questions, { text: question, answers, correctAnswer }]);
      setQuestion(""); // Clear the question input
      setAnswers([]); // Clear answers after submission
      setCorrectAnswer(null); // Reset correct answer
    }
  };

  const handleAddAnswer = () => {
    if (answers.length < 4) {
      setAnswers([...answers, ""]); // Add a new empty answer
    }
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleRemoveAnswer = (index) => {
    const newAnswers = answers.filter((_, i) => i !== index);
    setAnswers(newAnswers);
  };

  const handleSelectCorrectAnswer = (index) => {
    setCorrectAnswer(index); // Set the correct answer
  };

  const handleSelectUserAnswer = (qIndex, aIndex) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[qIndex] = aIndex; // Set selected answer for the question
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleCheckScore = () => {
    let newScore = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        newScore++;
      }
    });
    setScore(newScore); // Calculate the score based on correct answers
  };

  return (
    <div className="questions-container">
      <h1 className="text-2xl font-bold mb-4 text-center">Question Form</h1>
      <form onSubmit={handleQuestionSubmit} className="question-form">
        <input
          onChange={(e) => setQuestion(e.target.value)}
          value={question}
          type="text"
          className="question-input"
          placeholder="Enter your question"
        />
        <div>
          <h2 className="text-lg font-semibold mt-4">Answers:</h2>
          {answers.map((answer, index) => (
            <div key={index} className="flex items-center">
              <input
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                value={answer}
                type="text"
                className="question-input mt-2"
                placeholder={`Answer ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => handleRemoveAnswer(index)}
                className="remove-answer-button"
              >
                ✖
              </button>
              <button
                type="button"
                onClick={() => handleSelectCorrectAnswer(index)}
                className={`select-correct-answer-button ${
                  correctAnswer === index ? "selected" : ""
                }`}
              >
                {correctAnswer === index ? "✔" : "Mark Correct"}
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddAnswer}
            className="add-answer-button"
          >
            Add Answer
          </button>
        </div>
        <button type="submit" className="add-question-button">
          Add Question
        </button>
      </form>
      <ul className="question-list">
        {questions.map((q, qIndex) => (
          <li key={qIndex} className="question-item">
            <strong>{q.text}</strong>
            <ul>
              {q.answers.map((answer, aIndex) => (
                <li
                  key={aIndex}
                  className={`answer-option ${
                    selectedAnswers[qIndex] === aIndex ? "selected" : ""
                  }`}
                  onClick={() => handleSelectUserAnswer(qIndex, aIndex)}
                >
                  {answer}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <button onClick={handleCheckScore} className="check-score-button">
        Check Score
      </button>
      {score !== null && (
        <div className="score-display">
          Your score: {score}/{questions.length}
        </div>
      )}
    </div>
  );
}
