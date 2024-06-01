'use client';
import React, { useState } from 'react';

// Define the type for a single question
interface Question {
  id: number;
  type: 'dropdown' | 'textarea';
  text: string;
  options?: string[]; // Only for dropdown questions
}

// Define the props type
interface QuestionsProps {
  questions: Question[];
  onSubmit: (answers: Record<number, string>) => void;
}

// Functional component using the props
const Questions: React.FC<QuestionsProps> = ({ questions, onSubmit }) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleChange = (id: number, value: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: value
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(answers);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      {questions.map((question) => (
        <div key={question.id} className="mb-6">
          <label className="block mb-2">{question.text}</label>
          {question.type === 'dropdown' && question.options ? (
            <select
              value={answers[question.id] || ''}
              onChange={(e) => handleChange(question.id, e.target.value)}
              className="block w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="" disabled>
                Select an option
              </option>
              {question.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <textarea
              value={answers[question.id] || ''}
              onChange={(e) => handleChange(question.id, e.target.value)}
              placeholder="Your answer"
              className="block w-full border border-gray-300 rounded px-3 py-2"
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default Questions;
