'use client';

import React, { useState } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { Input } from '@/components/ui/input';
import { useLoading } from '@/hooks/useLoading';
import { generateText as generateTextSimple } from '@/lib/api';
import { generateImage as generateImageSimple } from '@/lib/api';
import questions, { Question } from './formQuestions';

interface QuestionsProps {
  questions: Question[];
  onSubmit: (answers: Record<number, string>) => void;
}

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
        questions.find((q) => q.id === parseInt(id))?.text ??
          'Unknown Question',
        value
      ])
    );
    onSubmit(formattedAnswers);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
      {questions.map((question) => (
        <div key={question.id} className="mb-8">
          <label className="block mb-4 text-lg font-semibold text-teal-700">
            {question.text}
          </label>
          {question.type === 'dropdown' && question.options ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {question.options.map((option, index) => (
                <label
                  key={index}
                  className={`flex flex-col items-center space-y-2 p-3 rounded-lg cursor-pointer transition-colors duration-300 ${
                    answers[question.id] === option.label
                      ? 'bg-orange-500 text-white'
                      : 'bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-100'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option.label}
                    checked={answers[question.id] === option.label}
                    onChange={(e) => handleChange(question.id, e.target.value)}
                    className="hidden"
                  />
                  {option.icon && (
                    <span className="text-2xl">{option.icon}</span>
                  )}
                  <span className="text-sm font-medium">{option.label}</span>
                </label>
              ))}
            </div>
          ) : (
            <textarea
              value={answers[question.id] || ''}
              onChange={(e) => handleChange(question.id, e.target.value)}
              placeholder="Your answer"
              className="block w-full border-2 border-teal-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        className="bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 hover:bg-purple-700"
      >
        Submit
      </button>
    </form>
  );
};

export default function CombinedPage() {
  const [image, setImage] = useState<File | null>(null);
  const [generateText, loading] = useLoading(generateTextSimple);
  const [generatedText, setGeneratedText] = useState('');

  const [generateImage, imageLoading] = useLoading(generateImageSimple);
  const [imageUrl, setImageUrl] = useState('');

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showForm, setShowForm] = useState(true);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.target.files && event.target.files.length) {
      setImage(event.target.files[0]);
      setGeneratedText('');
      setImageUrl('');
    }
  };

  const handleSubmit = async (answers: any) => {
    setShowForm(false);
  
    const processResult = async (imageData: any) => {
      const result = await generateText(imageData, JSON.stringify(answers));
      setGeneratedText(result);
      console.log(answers);
      // @ts-ignore
      const gender = answers["What is your gender?"];
      const imagePrompt = JSON.parse(result)['outfit_image_prompt'];
      const imageUrl = await generateImage(`${imagePrompt}. Use a ${gender} model for the image.`);
      console.log(`${imagePrompt}\n Use a ${gender} model for the image.`);
      setImageUrl(imageUrl);
    };
  
    if (image) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          processResult(reader.result);
        }
      };
      reader.readAsDataURL(image);
    } else {
      processResult(null);
    }
  };
  

  const handleBack = () => {
    setShowForm(true);
    setGeneratedText('');
    setImageUrl('');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-200 to-teal-300">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-purple-800 mb-4">
            Find Your Perfect Look
          </h1>
          <p className="text-xl text-teal-700">
            Answer a few questions and let us help you find the perfect outfit!
          </p>
        </div>
        {showForm && (
          <div>
            <div className="mb-8">
              <label
                htmlFor="picture"
                className="block mb-2 text-lg font-semibold text-teal-700"
              >
                Upload an image (optional)
              </label>
              <div className="flex items-center">
                {image && (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Uploaded image"
                    className="w-32 h-32 object-cover rounded-lg mr-4"
                  />
                )}
                <Input id="picture" type="file" onChange={handleImageUpload} />
              </div>
            </div>
            <Questions
              questions={questions}
              onSubmit={(answers) => {
                setAnswers(answers);
                handleSubmit(answers);
              }}
            />
          </div>
        )}
        {!showForm && (
          <div className="text-center mb-8">
            <button
              onClick={handleBack}
              className="bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 hover:bg-orange-600"
            >
              Back
            </button>
          </div>
        )}
        {loading && (
          <div className="flex justify-center mb-8">
            <Spinner />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {imageUrl && (
            <div className="relative">
              <img
                src={imageUrl}
                alt="Generated outfit"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          )}
          {imageLoading && (
            <div className="flex justify-center items-center">
              <Spinner />
            </div>
          )}
          {generatedText && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-purple-800 mb-4">
                Outfit Details
              </h2>
              <table className="w-full">
                <tbody>
                  {Object.entries(JSON.parse(generatedText)).map(
                    ([key, value]) => (
                      <tr key={key} className="border-b border-purple-200">
                        <td className="py-2 font-semibold text-teal-700">
                          {key}
                        </td>
                        <td className="py-2 text-purple-600">{'' + value}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
