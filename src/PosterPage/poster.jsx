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

  const handleDownloadPDF = async () => {
    const canvas = await html2canvas(posterRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('poster.pdf');
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

        {/* Name input sections */}
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

      <Button onClick={handleDownloadPDF} className="download-btn">
        Download as PDF
      </Button>
    </>
  );
};

export default PosterEditor;
