import React from 'react';

const dummyNews = [
  { title: "Vikings conquer new lands", summary: "A great victory today..." },
  { title: "New ship design released", summary: "Modern vikings create..." },
];

export default function NewsSection() {
  return (
    <section className="p-8">
      <h3 className="text-2xl font-bold mb-4">Latest News</h3>
      <div className="space-y-4">
        {dummyNews.map((news, index) => (
          <div key={index} className="p-4 border rounded shadow">
            <h4 className="text-xl font-semibold">{news.title}</h4>
            <p className="text-gray-600">{news.summary}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
