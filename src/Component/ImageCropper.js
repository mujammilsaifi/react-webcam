 
import { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
const ImageCropper = ({src}) => {
    // const [src, setSrc] = useState(null);
    const [crop, setCrop] = useState({ aspect: 16 / 9 });
    const [image, setImage] = useState(null);
    const [output, setOutput] = useState(null);
 
    // const selectImage = (file) => {
    //     setSrc(URL.createObjectURL(file));
    // };
    const onImageLoad = (img) => {
        setImage(img);
    };
    const cropImageNow = () => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
 
        const pixelRatio = window.devicePixelRatio;
        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';
 
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,
        );
 
        // Converting to base64
        const base64Image = canvas.toDataURL('image/jpeg');
        setOutput(base64Image);
    };
    const downloadCroppedImage = () => {
        const downloadLink = document.createElement('a');
        downloadLink.href = output;
        downloadLink.download = 'cropped_image.jpg';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };


  return (
    <div className="App">
    <center>
        {/* <input
            type="file"
            accept="image/*"
            onChange={(e) => {
                selectImage(e.target.files[0]);
            }}
        /> */}
        <br />
      
        <div>
            {src && (
                <div>
                    <ReactCrop crop={crop} onChange={c => setCrop(c)}  >
                        <img src={src} alt='cropping' onLoad={(e) => onImageLoad(e.target)}/>
                        </ReactCrop>                    
                    <br /><button onClick={cropImageNow}>Crop</button>
                </div>
            )}
        </div>
        <div>{output && <img src={output} alt='cropped' />}</div>
        <button onClick={downloadCroppedImage}>download</button>
    </center>
</div>
  )
}

export default ImageCropper