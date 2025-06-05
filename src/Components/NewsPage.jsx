import React from 'react';

const dummyNews = [
  {
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
    title: 'Berita 1',
    description: 'Deskripsi singkat untuk berita pertama.'
  },
  {
    photo: 'https://randomuser.me/api/portraits/women/2.jpg',
    title: 'Berita 2',
    description: 'Deskripsi singkat untuk berita kedua.'
  },
  {
    photo: 'https://randomuser.me/api/portraits/men/3.jpg',
    title: 'Berita 3',
    description: 'Deskripsi singkat untuk berita ketiga.'
  },
  {
    photo: 'https://randomuser.me/api/portraits/women/4.jpg',
    title: 'Berita 4',
    description: 'Deskripsi singkat untuk berita keempat.'
  },
  {
    photo: 'https://randomuser.me/api/portraits/men/5.jpg',
    title: 'Berita 5',
    description: 'Deskripsi singkat untuk berita kelima.'
  },
  {
    photo: 'https://randomuser.me/api/portraits/women/6.jpg',
    title: 'Berita 6',
    description: 'Deskripsi singkat untuk berita keenam.'
  },
  {
    photo: 'https://randomuser.me/api/portraits/men/7.jpg',
    title: 'Berita 7',
    description: 'Deskripsi singkat untuk berita ketujuh.'
  },
];

const NewsPage = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Daftar Berita</h1>
      <div className="space-y-4">
        {dummyNews.map((news, index) => (
          <div
            key={index}
            className="flex bg-white rounded-lg shadow p-4 items-start"
          >
            <img
              src={news.photo}
              alt={news.title}
              className="w-20 h-20 object-cover rounded mr-4"
            />
            <div>
              <h2 className="text-lg font-semibold">{news.title}</h2>
              <p className="text-gray-600">{news.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
