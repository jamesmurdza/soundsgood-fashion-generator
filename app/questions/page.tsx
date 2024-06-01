import React from 'react';
import Questions from '../../components/ui/question'; // Adjust the path if necessary

const QuestionsPage: React.FC = () => {
  const questions: Question[] = [
    {
      id: 1,
      type: 'dropdown',
      text: 'What is your favorite color?',
      options: ['Red', 'Blue', 'Green', 'Yellow', 'Other']
    },
    {
      id: 2,
      type: 'dropdown',
      text: 'What is your preferred mode of transportation?',
      options: ['Car', 'Bicycle', 'Public Transit', 'Walking', 'Other']
    },
    { id: 3, type: 'textarea', text: 'Why do you like programming?' },
    { id: 4, type: 'textarea', text: 'Describe your ideal vacation.' },
    {
      id: 5,
      type: 'dropdown',
      text: 'What is your highest level of education?',
      options: [
        'High School',
        'Associate Degree',
        "Bachelor's Degree",
        "Master's Degree",
        'Doctorate'
      ]
    },
    {
      id: 6,
      type: 'textarea',
      text: 'What are your career goals for the next 5 years?'
    }
  ];

  const handleSubmit = (answers: Record<number, string>) => {
    console.log('Submitted answers:', answers);
  };

  return (
    <div>
      <h1>Survey</h1>
      <Questions questions={questions} onSubmit={handleSubmit} />
    </div>
  );
};

export default QuestionsPage;
