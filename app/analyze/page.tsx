'use client';

import React, { useState } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { Input } from '@/components/ui/input';
import { useLoading } from '@/hooks/useLoading';
import { generateText as generateTextSimple } from '@/lib/api';
import { generateImage as generateImageSimple } from '@/lib/api';
import questions from './formQuestions';

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
        questions.find((q) => q.id === parseInt(id))?.text ?? 'Unknown Question',
        value
      ])
    );
    onSubmit(formattedAnswers);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      {questions.map((question) => (
        <div key={question.id} className="mb-6">
          <label className="block mb-2">{question.text}</label>
          {question.type === 'dropdown' && question.options ? (
            <div className="flex flex-wrap -mx-2">
              {question.options.map((option, index) => (
                <div className="flex-1 px-2 mb-4 sm:mb-3 sm:flex-none sm:w-1/2 lg:w-1/4 xl:w-1/4">
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
                    {option.icon && <span className="icon text-xl">{option.icon}</span>}
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
      <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
        Submit
      </button>
    </form>
  );
};

export default function CombinedPage() {
  const [image, setImage] = useState<File | null>(null);
  const [generateText, loading] = useLoading(generateTextSimple);
  const [generatedText, setGeneratedText] = useState('');

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [generateImage, imageLoading] = useLoading(generateImageSimple);

  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.target.files && event.target.files.length) {
      setImage(event.target.files[0]);
      setGeneratedText('');
    }
  };

  const handleSubmit = async () => {
    let result;
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = async () => {
        if (reader.result && typeof reader.result === 'string') {
          result = await generateText(reader.result, JSON.stringify(answers));
          setGeneratedText(result);
          const imageUrl = await generateImage(JSON.parse(result)["outfit_image_prompt"]);
          setImageUrls([...imageUrls, imageUrl]);
        }
      };
    } else {
      result = await generateText(null, answers);
      setGeneratedText(result);
      const imageUrl = await generateImage(JSON.parse(result)["outfit_image_prompt"]);
      setImageUrls([...imageUrls, imageUrl]);

    }

  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Analyze Image</h1>
      </div>
      <div>
        <div className="w-full flex items-center mb-5 max-w-3xl mx-auto">
        {image && <img src={URL.createObjectURL(image)} alt="Uploaded image" className="max-w-32 p-4" />}
        <Input id="picture" type="file" onChange={handleImageUpload} />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <Questions questions={questions} onSubmit={(answers) => {setAnswers(answers); handleSubmit()}} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {imageUrls.map((url, index) => (
          <div key={index} className="w-full mb-4 text-center relative">
            <img src={url} alt={`Generated ${index + 1}`} className="border rounded-sm border-input" />
          </div>
        ))}
        {imageLoading && (
          <div className="w-full mb-4 text-center relative">
            <div className="border border-input rounded-sm w-64 h-64 relative">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Spinner />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-6">
          {loading ? (
            <div className="w-full mb-4 text-center relative">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Spinner />
              </div>
            </div>
          ) : (
            generatedText && <p className="mt-4">{generatedText}</p>
          )}
        </div>
    </main>
  );
}