import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { WebApp } from '@vkruglikov/react-telegram-web-app';

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Input = styled.textarea`
  width: 100%;
  padding: 16px;
  border: 1px solid #e1e1e1;
  border-radius: 12px;
  font-size: 16px;
  margin-bottom: 16px;
  resize: vertical;
  font-family: inherit;
`;

const ImageUpload = styled.div`
  width: 100%;
  height: 200px;
  border: 2px dashed #e1e1e1;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 16px;
`;

const Button = styled.button`
  background: #007AFF;
  color: white;
  border: none;
  padding: 16px 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  width: 100%;
  cursor: pointer;
  
  &:active {
    background: #0056b3;
  }
`;

function App() {
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Initialize Telegram Mini App
    WebApp.ready();
    WebApp.expand();
    
    // Set theme
    document.body.style.backgroundColor = '#F2F2F7';
  }, []);

  const handleSubmit = () => {
    if (currentEntry.trim()) {
      const newEntry = {
        id: Date.now(),
        text: currentEntry,
        image: selectedImage,
        date: new Date(),
      };
      
      setEntries([newEntry, ...entries]);
      setCurrentEntry('');
      setSelectedImage(null);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container>
      <Card>
        <h2>What are you thankful for today?</h2>
        <Input
          value={currentEntry}
          onChange={(e) => setCurrentEntry(e.target.value)}
          placeholder="Write your gratitude entry..."
          rows={4}
        />
        
        <input
          type="file"
          accept="image/*"
          id="image-upload"
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />
        <label htmlFor="image-upload">
          <ImageUpload>
            {selectedImage ? (
              <img 
                src={selectedImage} 
                alt="Selected" 
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
              />
            ) : (
              'Tap to add an image'
            )}
          </ImageUpload>
        </label>
        
        <Button onClick={handleSubmit}>Save Entry</Button>
      </Card>

      {entries.map(entry => (
        <Card key={entry.id}>
          <p>{entry.text}</p>
          {entry.image && (
            <img 
              src={entry.image} 
              alt="Entry" 
              style={{ 
                maxWidth: '100%', 
                borderRadius: '8px',
                marginTop: '12px'
              }}
            />
          )}
          <small style={{ color: '#8E8E93' }}>
            {new Date(entry.date).toLocaleDateString()}
          </small>
        </Card>
      ))}
    </Container>
  );
}

export default App; 