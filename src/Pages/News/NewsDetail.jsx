import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/news/${id}`)
      .then(res => res.text())
      .then(text => {
        const jsonString = text.replace(/^use\s+Illuminate\\Support\\Facades\\Route;\s*/, '');
        try {
          const data = JSON.parse(jsonString);
          setNews(data);
        } catch (err) {
          console.error('Gagal parse JSON:', err);
        }
      })
      .catch(err => console.error('Gagal fetch detail news:', err));
  }, [id]);

  if (!news) return <div className="text-center mt-10 text-white">Loading...</div>;

  return (
    <div className="bg-[#AC9364] justify-center py-8 min-h-screen">
      <div className="relative w-[1195px] mx-auto p-[2px] box-border rounded-lg gold-border">
        <div className="w-full h-full overflow-hidden relative rounded-lg">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-[400px] object-cover rounded-t-[15px]"
          />
          <div className="p-6 rounded-b-lg text-white">
            <h2 className="text-3xl font-bold mb-2">{news.title}</h2>
            <p className="text-lg whitespace-pre-line">{news.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
