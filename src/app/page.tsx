'use client';
import { useState } from 'react';
import type { MouseEventHandler } from 'react';
import { random } from 'lodash';

import { LazyImage } from '@/components/LazyImage';

const myRandom = () => random(1, 123);
const generatedId = (): string => crypto.randomUUID();

export default function Home() {
  const [images, setImages] = useState<IImageItem[]>([]);

  const addNewFox: MouseEventHandler<HTMLButtonElement> = (event) => {
    const newImage: IImageItem = {
      id: generatedId(),
      url: `https://randomfox.ca/images/${myRandom()}.jpg`,
    };

    setImages([...images, newImage]);
  };

  const handleLazyLoad = (node: HTMLImageElement): void => {
    console.log('La imagen se ha carado y el nodo es:');
    console.log(node);
  };

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1 className='text-3xl font-bold underline'>Hello Platzi</h1>

      <button onClick={addNewFox}>Add new Fox</button>

      {images.map((item) => (
        <div key={item.id} className='p-4'>
          <LazyImage
            alt='Fox'
            src={item.url}
            width={320}
            height='auto'
            className='rounded bg-gray-300'
            onLazyLoad={handleLazyLoad}
          />
        </div>
      ))}
    </main>
  );
}
