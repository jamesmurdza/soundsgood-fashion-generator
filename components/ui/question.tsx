'use client';
import React, { useState } from 'react';

// Define the type for a single question
export interface Question {
  id: number;
  type: 'dropdown' | 'textarea';
  text: string;
  options?: { label: string; icon?: string }[]; // Updated to include icons for dropdown options
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
    const formattedAnswers = Object.fromEntries(
      Object.entries(answers).map(([id, value]) => [
        questions.find((q) => q.id === parseInt(id))?.text ?? 'Unknown Question',
        value
      ])
    );
    onSubmit(formattedAnswers);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      {questions.map((question) => (
        <div key={question.id} className="mb-6">
          <label className="block mb-2">{question.text}</label>
          {question.type === 'dropdown' && question.options ? (
            <div className="flex flex-wrap -mx-2">
              {question.options.map((option, index) => (
                <div className="flex-1 px-2 mb-4 sm:mb-3 sm:flex-none sm:w-1/2 lg:w-1/3 xl:w-1/4">
                <label
                  key={index}
                  className={`w-full border p-2 rounded cursor-pointer ${
                    answers[question.id] === option.label ? 'bg-blue-100' : 'bg-white'
                  } flex flex-col items-center space-y-2`}
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option.label}
                    checked={answers[question.id] === option.label}
                    onChange={(e) => handleChange(question.id, e.target.value)}
                    className="hidden"
                  />
                  { option.icon && <span className="icon text-xl" >{option.icon}</span> }
                  <span className="pb-1 px-2">{option.label}</span>
                </label>
                </div>
              ))}
            </div>
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
