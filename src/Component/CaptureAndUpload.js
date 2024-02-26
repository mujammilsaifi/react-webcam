import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';

import ImageCropper from './ImageCropper';
const CaptureAndUpload = () => {
  const webcamRef = useRef(null);
  const [isWebcamOpen, setIsWebcamOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  
  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };
  const openWebcam = () => {
    setIsWebcamOpen(true);
  };
  return (
    <>
     <div className='col-md-6'>
      {!capturedImage && (
        <>
          {isWebcamOpen && <Webcam audio={false} ref={webcamRef} />}
          <button onClick={openWebcam}>Open Webcam</button>
          {isWebcamOpen && <button onClick={captureImage}>Capture Image</button>}
        </>
      )}
    </div>
    <div className="col-md-6">
      <ImageCropper src={capturedImage}/>
    </div>
    </>
  );
};

export default CaptureAndUpload;
