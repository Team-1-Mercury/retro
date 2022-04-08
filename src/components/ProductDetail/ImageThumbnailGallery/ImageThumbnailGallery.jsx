import React from 'react';
import {
  AiFillUpCircle,
  AiFillDownCircle,
} from 'react-icons/ai';
import { detailStore } from '../../../stores.js';
import './ImageThumbnailGallery.scss';

function ImageThumbnailGallery({ shownThumbnails }) {
  // const imageZoomed = detailStore((state) => state.imageZoomed);
  const selectedStyle = detailStore((state) => state.selectedStyle);
  const startingThumbnailIndex = detailStore((state) => state.startingThumbnailIndex);
  const setStartingThumbnailIndex = detailStore((state) => state.setStartingThumbnailIndex);

  return (
    <div className="image-thumbnail-gallery-container">
      {startingThumbnailIndex > 0 ? (
        <AiFillUpCircle
          className="image-tg-arrow"
          onClick={() => {
            setStartingThumbnailIndex(startingThumbnailIndex - 1);
          }}
        />
      )
        : <div className="ig-spacer" />}
      <div className="image-thumbnail-gallery">
        {shownThumbnails}
      </div>
      {startingThumbnailIndex < selectedStyle.photos.length - 7 ? (
        <AiFillDownCircle
          className="image-tg-arrow"
          onClick={() => {
            setStartingThumbnailIndex(startingThumbnailIndex + 1);
          }}
        />
      )
        : <div className="ig-spacer" />}
    </div>
  );
}

export default ImageThumbnailGallery;