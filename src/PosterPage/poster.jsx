import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Button } from 'antd';
import jsPDF from 'jspdf';
import './poster.css';

const PosterEditor = () => {
  const headingRef = useRef(null);
  const posterRef = useRef(null);
  const [images, setImages] = useState({});

  const handleImageChange = (e, role) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImages(prev => ({ ...prev, [role]: reader.result }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

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
        style={{
          backgroundImage: `url("/MSF Nellaya Copy 1 copy.png")`,
        }}
      >
        {/* ✅ Green Heading */}
        <p
          className="green-heading editable-text"
          contentEditable
          ref={headingRef}
          suppressContentEditableWarning={true}
        >
          Green Heading Text
        </p>

        {/* Image Upload Boxes */}
        {roles.map(role => (
          <div key={role} className={`upload-box ${role.toLowerCase()}`}>
            <input type="file" onChange={e => handleImageChange(e, role)} />
            {images[role] && <img src={images[role]} alt={role} />}
          </div>
        ))}

        {/* Top Role Texts */}
        <div className="textnames">
          {['President', 'Secretary', 'Treasurer'].map(role => (
            <p
              key={role}
              className="editable-text"
              contentEditable
              suppressContentEditableWarning={true}
            >
              {`${role} Name`}
            </p>
          ))}
        </div>

        {/* Bottom Role Texts */}
        <div className="textnames2">
          {['Chairperson', 'GeneralConvener', 'SecondTreasurer'].map(role => (
            <p
              key={role}
              className="editable-text"
              contentEditable
              suppressContentEditableWarning={true}
            >
              {`${role} Name`}
            </p>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
        }}
      >
        <Button onClick={handleDownloadPDF}>Download PDF</Button>
        <Button type="primary" onClick={handleSaveAsImage}>
          Save as Image
        </Button>
      </div>
    </>
  );
};

export default PosterEditor;
