import React from 'react';

// Define the props type
interface QuestionProps {
  text: string;
  onAnswer: (answer: string) => void;
}

// Functional component using the props
const Question: React.FC<QuestionProps> = ({ text, onAnswer }) => {
  const [answer, setAnswer] = React.useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAnswer(answer);
    setAnswer('');
  };

  return (
    <div className="question-container">
      <p>{text}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Your answer"
        />
        <button type="submit">Submit now</button>
      </form>
    </div>
  );
};

export default Question;
