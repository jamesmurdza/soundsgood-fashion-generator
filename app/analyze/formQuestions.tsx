interface Question {
    id: number;
    type: 'dropdown' | 'textarea';
    text: string;
    options?: { label: string; icon?: string }[];
  }
  

// Questions for QuestionsPage
const questions: Question[] = [
    {
      id: 1,
      type: 'dropdown',
      text: 'What is your age?',
      options: [
        { label: 'Under 18', icon: '👶' },
        { label: '18-25', icon: '🧑' },
        { label: '26-35', icon: '🧑‍💼' },
        { label: '36-45', icon: '🧔' },
        { label: '46-55', icon: '👵' },
        { label: 'Over 55', icon: '👴' }
      ]
    },
    {
      id: 2,
      type: 'dropdown',
      text: 'What is your gender?',
      options: [
        { label: 'Female' },
        { label: 'Male' },
        { label: 'Non-binary/Other' }
      ]
    },
    {
      id: 3,
      type: 'dropdown',
      text: 'What is your height?',
      options: [
        { label: 'Under 5\'4" (162 cm)' },
        { label: '5\'4" - 5\'7" (162-170 cm)' },
        { label: 'Over 5\'7" (170 cm)' }
      ]
    },
    {
      id: 4,
      type: 'dropdown',
      text: 'What is your natural hair color?',
      options: [
        { label: 'Light blonde', icon: '💁‍♀️' },
        { label: 'Dark blonde to light brown', icon: '💁‍♂️' },
        { label: 'Medium to dark brown', icon: '💇‍♀️' },
        { label: 'Black', icon: '💇‍♂️' },
        { label: 'Red or strawberry blonde', icon: '🧑‍🦰' }
      ]
    },
    {
      id: 5,
      type: 'dropdown',
      text: 'What is your eye color?',
      options: [
        { label: 'Light blue or green', icon: '👁️' },
        { label: 'Hazel or light brown', icon: '👀' },
        { label: 'Dark brown', icon: '👁️‍🗨️' },
        { label: 'Blue-grey or deep green', icon: '👓' }
      ]
    },
    {
      id: 6,
      type: 'dropdown',
      text: 'What is your skin tone?',
      options: [
        { label: 'Very Fair', icon: '👱🏻' },
        { label: 'Fair', icon: '👨🏼' },
        { label: 'Medium', icon: '👨🏽' },
        { label: 'Olive', icon: '👨🏾' },
        { label: 'Dark', icon: '👨🏿' }
      ]
    },
    {
      id: 7,
      type: 'dropdown',
      text: 'Which colors do you feel most comfortable and confident wearing?',
      options: [
        { label: 'Bright, bold colors (like red, cobalt blue)', icon: '🟥' },
        { label: 'Earthy, warm tones (like olive green, mustard)', icon: '🟫' },
        { label: 'Soft, muted shades (like dusty pink, lavender)', icon: '🟪' },
        { label: 'Cool, icy colors (like light blue, mint green)', icon: '🟦' }
      ]
    },
    {
      id: 8,
      type: 'dropdown',
      text: 'How would you describe your bone structure?',
      options: [
        { label: 'Delicate and small', icon: '🦴' },
        { label: 'Average', icon: '🦵' },
        { label: 'Large and broad', icon: '🦵' }
      ]
    },
    {
      id: 9,
      type: 'dropdown',
      text: 'What best describes your overall body shape?',
      options: [
        { label: 'Hourglass (well-defined waist, balanced bust and hips)', icon: '⏳' },
        { label: 'Pear (wider hips, narrower shoulders)', icon: '🍐' },
        { label: 'Apple (fuller midsection, slimmer legs)', icon: '🍎' },
        { label: 'Rectangle (straight, less defined waist)', icon: '▭' },
        { label: 'Inverted Triangle (broader shoulders, narrower hips)', icon: '🔻' }
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
        { label: '"Creativity takes courage."', icon: '🎨' },
        { label: '"The only way to do great work is to love what you do."', icon: '❤️' },
        { label: '"Life is either a daring adventure or nothing at all."', icon: '🌍' },
        { label: '"Simplicity is the ultimate sophistication."', icon: '✨' }
      ]
    },
    {
      id: 13,
      type: 'dropdown',
      text: 'What type of fashion icons or celebrities do you admire most?',
      options: [
        { label: 'Classic and timeless (e.g., Audrey Hepburn, David Beckham)', icon: '👗' },
        { label: 'Bold and expressive (e.g., Lady Gaga, Harry Styles)', icon: '👠' },
          { label: 'Free-spirited and relaxed (e.g., Vanessa Hudgens, Johnny Depp)', icon: '🧢' },
          { label: 'Trend-setting and fashion-forward (e.g., Zendaya, Timothée Chalamet)', icon: '🕶️' }
        ]
      },
      {
        id: 14,
        type: 'dropdown',
        text: 'If you could describe your ideal style in one word, what would it be?',
        options: [
          { label: 'Timeless', icon: '⌛' },
          { label: 'Unique', icon: '🌟' },
          { label: 'Comfortable', icon: '🛋️' },
          { label: 'Sophisticated', icon: '🎩' }
        ]
      },
      {
        id: 15,
        type: 'dropdown',
        text: 'Which of these best describes your daily routine?',
        options: [
          { label: 'Office-based, professional', icon: '💼' },
          { label: 'Creative work environment', icon: '🎨' },
          { label: 'Stay-at-home or casual', icon: '🏠' },
          { label: 'Active and on-the-go', icon: '🏃' },
          { label: 'Social and event-focused', icon: '🎉' }
        ]
      }
    ];

    export default questions;