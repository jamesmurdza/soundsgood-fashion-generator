'use client';
import React, { useState } from 'react';
import Questions from '../../components/ui/question';
// Adjust the path if necessary

const QuestionsPage: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const questions: Question[] = [
    {
      id: 1,
      type: 'dropdown',
      text: 'What is your age?',
      options: ['Under 18', '18-25', '26-35', '36-45', ' 46-55', 'Over 55']
    },
    {
      id: 2,
      type: 'dropdown',
      text: 'What is your gender?',
      options: ['Female', 'Male', ' Non-binary/Other']
    },
    {
      id: 3,
      type: 'dropdown',
      text: 'What is your height?',
      options: [
        'Under 5\'4" (162 cm)',
        '5\'4" - 5\'7" (162-170 cm)',
        ' Over 5\'7" (170 cm)'
      ]
    },
    {
      id: 4,
      type: 'dropdown',
      text: 'What is your natural hair color?',
      options: [
        'Light blonde',
        'Dark blonde to light brown',
        'Medium to dark brown',
        'Black',
        'Red or strawberry blonde'
      ]
    },
    ,
    {
      id: 5,
      type: 'dropdown',
      text: 'What is your eye color?',
      options: [
        'Light blue or green',
        'Hazel or light brown',
        'Dark brown',
        'Blue-grey or deep green'
      ]
    },
    {
      id: 6,
      type: 'dropdown',
      text: 'What is your skin tone?',
      options: ['Very Fair', 'Fair', 'Medium', 'Olive', 'Dark']
    },
    {
      id: 7,
      type: 'dropdown',
      text: 'Which colors do you feel most comfortable and confident wearing?',
      options: [
        'Bright, bold colors (like red, cobalt blue)',
        'Earthy, warm tones (like olive green, mustard)',
        'Soft, muted shades (like dusty pink, lavender)',
        'Cool, icy colors (like light blue, mint green)'
      ]
    },
    {
      id: 8,
      type: 'dropdown',
      text: 'How would you describe your bone structure?',
      options: ['Delicate and small', 'Average', 'Large and broad']
    },
    {
      id: 9,
      type: 'dropdown',
      text: 'What best describes your overall body shape?',
      options: [
        'Hourglass (well-defined waist, balanced bust and hips)',
        'Pear (wider hips, narrower shoulders)',
        'Apple (fuller midsection, slimmer legs)',
        'Rectangle (straight, less defined waist)',
        'Inverted Triangle (broader shoulders, narrower hips)'
      ]
    },
    {
      id: 10,
      type: 'textarea',
      text: 'How do you want to feel in your clothes? (Example: confident, creative)'
    },
    {
      id: 11,
      type: 'textarea',
      text: 'How do you want others to see you? (Example: serious, approachable, professional)'
    },
    {
      id: 12,
      type: 'dropdown',
      text: 'Which of these quotes resonates most with you?',
      options: [
        '"Creativity takes courage."',
        '"The only way to do great work is to love what you do."',
        '"Life is either a daring adventure or nothing at all."',
        '"Simplicity is the ultimate sophistication."'
      ]
    },
    {
      id: 13,
      type: 'dropdown',
      text: 'What type of fashion icons or celebrities do you admire most?',
      options: [
        'Classic and timeless (e.g., Audrey Hepburn, David Beckham)',
        'Bold and expressive (e.g., Lady Gaga, Harry Styles)',
        'Free-spirited and relaxed (e.g., Vanessa Hudgens, Johnny Depp)',
        'Trend-setting and fashion-forward (e.g., Zendaya, Timothée Chalamet)'
      ]
    },
    {
      id: 14,
      type: 'dropdown',
      text: 'If you could describe your ideal style in one word, what would it be?',
      options: ['Timeless', 'Unique', 'Comfortable', 'Sophisticated']
    },
    {
      id: 15,
      type: 'dropdown',
      text: 'Which of these best describes your daily routine?',
      options: [
        'Office-based, professional',
        'Creative work environment',
        'Stay-at-home or casual',
        'Active and on-the-go',
        'Social and event-focused'
      ]
    }
  ];

  const handleSubmit = (answers: Record<number, string>) => {
    console.log('Submitted answers:', answers);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-4 text-3xl">Answer the following questions</h1>
      <Questions questions={questions} onSubmit={handleSubmit} />
    </div>
  );
};

export default QuestionsPage;
