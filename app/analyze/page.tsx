'use client';

import React from 'react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Input } from '@/components/ui/input';

import { useLoading } from '@/hooks/useLoading';

import { generateText as generateTextSimple } from '@/lib/api';
import { generateImage as generateImageSimple } from '@/lib/api';

export default function AnalyzeImagePage() {
  // State variables for image and generated text
  const [image, setImage] = useState<File | null>(null);
  const [generateText, loading] = useLoading(generateTextSimple);
  const [generatedText, setGeneratedText] = useState('');
  const [style, setStyle] = useState('');

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [generateImage, imageLoading] = useLoading(generateImageSimple);

  // Function to handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.target.files && event.target.files.length) {
      setImage(event.target.files[0]);
      setGeneratedText('');
    }
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = async () => {
        if (reader.result && typeof reader.result === 'string') {
          const result = await generateText(reader.result, style);
          setGeneratedText(
            result
          );
          const imageUrl = await generateImage(
            JSON.parse(result)["outfit_image_prompt"]
          );
          setImageUrls([...imageUrls, imageUrl]);
        }
      };
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Analyze Image</h1>
      </div>
      <div>
      <Input
          type="text"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          placeholder="What's your desired style?"
          className="px-4 py-2 border rounded-md flex-grow"
        />
      </div>
      <div>
        <div className="w-full flex items-center mb-5">
          {/* Input field for image upload */}
          <Input id="picture" type="file" onChange={handleImageUpload} />
          {/* Button to trigger text generation */}
          <Button
            type="button"
            className="ml-3 py-2 bg-blue-500 text-white rounded-md"
            disabled={loading || image === null}
            onClick={handleSubmit}
          >
            Analyze
          </Button>
        </div>
        <div className="flex gap-6">
          {/* Display uploaded image */}
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Uploaded image"
              className="max-w-64"
            />
          )}
          {/* Display loading spinner or generated text */}
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
      </div>
        {/* Grid to display generated images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Map over image URLs and display images */}
        {imageUrls.map((url, index) => (
          <div key={index} className="w-full mb-4 text-center relative">
            <img
              src={url}
              alt={`Generated ${index + 1}`}
              className="border rounded-sm border-input"
            />
          </div>
        ))}
        {/* Display loading spinner while generating images */}
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
    </main>
  );
}
