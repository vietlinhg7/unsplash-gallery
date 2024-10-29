import React, { useState, useEffect, useCallback } from 'react';
import { fetchPhotos } from '../api';
import { Link } from 'react-router-dom';

function PhotoList() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadPhotos = async () => {
      setLoading(true);
      try {
        const response = await fetchPhotos(page);
        const newPhotos = response.data;

        // Check for duplicates
        setPhotos(prevPhotos => {
          const existingIds = new Set(prevPhotos.map(photo => photo.id));
          const uniqueNewPhotos = newPhotos.filter(photo => !existingIds.has(photo.id));
          return [...prevPhotos, ...uniqueNewPhotos];
        });

        // If the fetched data is empty, assume no more photos are available
        if (newPhotos.length === 0) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
      setLoading(false);
    };
    
    loadPhotos();
  }, [page]); // Removed 'photos' from dependencies

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      if (hasMore && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [hasMore, loading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="container">
      <div className="photo-grid">
        {photos.map(photo => (
          <Link to={`/photos/${photo.id}`} key={photo.id}>
            <img src={photo.urls.thumb} alt={photo.alt_description} />
            <p>{photo.user.name}</p>
          </Link>
        ))}
      </div>
      {loading && <p className="loading">Loading more photos...</p>}
      {!hasMore && <p className="loading">No more photos available.</p>}
    </div>
  );
}

export default PhotoList;
