import './App.css';
import { Routes, Route } from 'react-router-dom';
import PosterEditor from './PosterPage/poster';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PosterEditor />} />
      </Routes>
    </>
  );
};

export default App;
