import React from 'react';
import line from '../assets/line full.png';

const DownloadSection = () => {
  const sections = [
    { id: 1, title: 'DOWNLOAD LINK 1' },
    { id: 2, title: 'DOWNLOAD LINK 2' },
    { id: 3, title: 'DOWNLOAD LINK 3' },
  ];

  // Tambahkan fileId dari Google Drive untuk setiap file
  const files = [
    { name: 'DOWNLOAD FILE 1', size: '2.0 GB', fileId: '16Ysj3OgpDFVagKW6zDicGEzLwjIodxGK' },
    { name: 'DOWNLOAD FILE 2', size: '2.0 GB', fileId: '16Ysj3OgpDFVagKW6zDicGEzLwjIodxGK' },
    { name: 'DOWNLOAD FILE 3', size: '2.0 GB', fileId: '16Ysj3OgpDFVagKW6zDicGEzLwjIodxGK' },
    { name: 'DOWNLOAD FILE 4', size: '2.0 GB', fileId: '16Ysj3OgpDFVagKW6zDicGEzLwjIodxGK' },
  ];

  const getDownloadLink = (fileId) =>
    `https://drive.google.com/uc?export=download&id=${fileId}`;

  return (
    <div className="bg-[#AC9364] justify-center py-8 min-h-screen">
      <div className="w-[1195px] mx-auto p-[2px] box-border rounded-lg gold-border bg-opacity-10">
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-6 text-white text-center mx-auto">DOWNLOAD</h2>
          <img src={line} alt="separator" className="w-full my-4" />

          {sections.map((section, idx) => (
            <div key={section.id} className="mb-10 px-8">
              {/* Section title */}
              <h3 className="text-lg font-semibold text-white mb-1">{section.title}</h3>
              <a className="text-sm text-white mb-4 cursor-pointer transition-colors duration-300 hover:text-yellow-400">
                README
              </a>

              {/* Divider line */}
              <img src={line} alt="separator" className="w-full my-4" />

              {/* File list */}
              {files.map((file, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-2 px-4 mb-2 bg-white/10 rounded"
                >
                  <span className="text-white">{file.name}</span>
                  <span className="text-white">{file.size}</span>
                  <a
                    href={getDownloadLink(file.fileId)}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-semibold px-4 py-1 transition-colors duration-300 hover:text-yellow-400"
                  >
                    DOWNLOAD
                  </a>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DownloadSection;
