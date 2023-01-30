import { useEffect, useRef, useState } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';

import { canvasPreview } from './canvas-preview';

import type { Crop, PixelCrop } from 'react-image-crop';

import 'react-image-crop/dist/ReactCrop.css';

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}

const CoverImage = () => {
  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState<Crop>();
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [aspect, setAspect] = useState<number | undefined>(16 / 9);

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''));
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  useEffect(() => {
    if (completedCrop?.width && completedCrop?.height && imgRef.current && previewCanvasRef.current) {
      // We use canvasPreview as it's much faster than imgPreview.
      canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
    }
  }, [completedCrop]);

  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={onSelectFile}
      />

      {!!imgSrc && (
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={aspect}
        >
          <img
            ref={imgRef}
            alt="Crop me"
            src={imgSrc}
            onLoad={onImageLoad}
          />
        </ReactCrop>
      )}

      <div>
        {!!completedCrop && (
          <canvas
            ref={previewCanvasRef}
            style={{
              border: '1px solid black',
              objectFit: 'contain',
              width: completedCrop.width,
              height: completedCrop.height,
            }}
          />
        )}
      </div>
    </>
  );
};

export default CoverImage;
