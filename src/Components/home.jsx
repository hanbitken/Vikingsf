import React from 'react';

import Hero from './hero';
import NewsSection from './NewsSection';
import dashboard from '../assets/Picture/dashboard.png';

export default function Home() {
  return (
    <div>
      <section
        className="flex flex-col items-center justify-center bg-cover bg-top w-screen h-screen"
        style={{ backgroundImage: `url(${dashboard})` }}
      >
        <Hero />
        <NewsSection />
      </section>
    </div>
  );
}
