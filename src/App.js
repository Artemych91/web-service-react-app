// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from 'react';

const App = () => {
  const [albums, setAlbums] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/albums?page=${page}&pageSize=${pageSize}`);
        const data = await response.json();
        setAlbums(data);

        // Check if this is the last page
        setIsLastPage(data.length < pageSize);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [page, pageSize]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handlePageSizeChange = (e) => {
    setPageSize(parseInt(e.target.value, 10));
    setPage(1); // Reset to the first page when changing page size
  };

  return (
    <div>
      <h1>Albums</h1>
      <label>
        Page Size:
        <input type="number" value={pageSize} onChange={handlePageSizeChange} min="1" />
      </label>
      <ul>
        {albums.map(album => (
          <li key={album.id}>{album.title} by {album.artist}</li>
        ))}
      </ul>
      <button onClick={handlePrevPage} disabled={page === 1}>Previous Page</button>
      <button onClick={handleNextPage}  disabled={isLastPage}>Next Page</button>
    </div>
  );
};

export default App;
