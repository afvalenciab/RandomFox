const random = (): number => Math.floor(Math.random() * 123) + 1;

export const RandomFox = (): JSX.Element => {
  const image: string = `https://randomfox.ca/images/${random()}.jpg`;

  return (
    <img alt='Fox' src={image} width={320} height='auto' className='rounded' />
  );
};
