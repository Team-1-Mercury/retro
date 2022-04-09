import React from 'react';
import uuid from 'react-uuid';
import { GoPrimitiveDot } from 'react-icons/go';
import { detailStore } from '../../../stores.js';
import './ImageIconDots.scss';

function ImageIconDots({ photos }) {
  const imgIdx = detailStore((state) => state.selectedImageIndex);
  const setImgIdx = detailStore((state) => state.setSelectedImageIndex);

  return (
    <div className="image-icon-dots">
      {photos.map((pic, i) => (
        <GoPrimitiveDot
          key={uuid()}
          className={`image-icon-dot${i === imgIdx ? ' selected' : ''}`}
          onClick={() => {
            setImgIdx(i);
          }}
        />
      ))}
    </div>
  );
}

export default ImageIconDots;
