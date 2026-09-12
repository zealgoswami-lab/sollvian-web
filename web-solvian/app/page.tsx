'use client';

import { useState } from 'react';
import Image from 'next/image';
import hero from '@/app/_lib/solvian_cover.jpeg';
import EmailModal from '@/app/_components/EmailModal';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* Main screen */}
      <div style={{ position: 'relative', width: '100vw', height: '100vh', background: 'rgb(0, 0, 0)' }}>
        <Image
          fill
          style={{ objectFit: 'contain' }}
          src={hero}
          alt="Sollvian Profile"
          priority
        />

        {/* Download Button */}
        <button
          onClick={() => {
            console.log('Download button clicked');
            setModalOpen(true)
          }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-black bg-cyan-500 hover:bg-cyan-400 px-10 py-3 rounded-full font-bold text-base tracking-wide shadow-lg transition-all"
        >
          Download
        </button>
      </div>

      {/* Email Modal */}
      {modalOpen && <EmailModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
