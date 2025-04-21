import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Button } from 'antd';
import jsPDF from 'jspdf';
import './poster.css';

const PosterEditor = () => {
  const [greenHeading, setGreenHeading] = useState('');
  const [images, setImages] = useState({});
  const posterRef = useRef(null);

  const handleImageChange = (e, position) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImages(prev => ({ ...prev, [position]: reader.result }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // 📥 PDF Download Handler (Supports Mobile)
  const handleDownloadPDF = async () => {
    const canvas = await html2canvas(posterRef.current, {
      useCORS: true,
      scale: 2,
    });
    const imgData = canvas.toDataURL('image/jpeg', 1.0);

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
    pdf.save('poster.pdf');
  };

  // 🖼️ Save as Image Handler
  const handleSaveAsImage = async () => {
    const canvas = await html2canvas(posterRef.current, {
      useCORS: true,
      scale: 2,
    });
    const link = document.createElement('a');
    link.download = 'poster-image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const roles = [
    'President',
    'Secretary',
    'Treasurer',
    'Chairperson',
    'GeneralConvener',
    'SecondTreasurer',
  ];

  return (
    <>
      <div
        className="poster"
        ref={posterRef}
        style={{ backgroundImage: `url("/MSF Nellaya Copy 1 copy.png")` }}
      >
        <input
          type="text"
          className="green-heading"
          value={greenHeading}
          onChange={e => setGreenHeading(e.target.value)}
          placeholder="തലക്കെട്ട് മലയാളത്തിൽ ടൈപ്പ് ചെയ്യൂ"
        />

        {roles.map(role => (
          <div key={role} className={`upload-box ${role.toLowerCase()}`}>
            <input type="file" onChange={e => handleImageChange(e, role)} />
            {images[role] && <img src={images[role]} alt={role} />}
          </div>
        ))}

        <div className="textnames">
          <textarea placeholder="President Name" />
          <textarea placeholder="Secretary Name" />
          <textarea placeholder="Treasurer Name" />
        </div>

        <div className="textnames2">
          <textarea placeholder="Chairperson Name" />
          <textarea placeholder="General Convener Name" />
          <textarea placeholder="Second Treasurer Name" />
        </div>
      </div>

      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
        }}
      >
        <Button onClick={handleDownloadPDF} className="download-btn">
          Download PDF
        </Button>
        <Button
          onClick={handleSaveAsImage}
          className="download-btn"
          type="primary"
        >
          Save as Image
        </Button>
      </div>
    </>
  );
};

export default PosterEditor;
