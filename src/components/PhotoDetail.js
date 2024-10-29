import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPhotoDetails } from '../api';

function PhotoDetail() {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const loadPhoto = async () => {
      const response = await fetchPhotoDetails(id);
      setPhoto(response.data);
    };
    loadPhoto();
  }, [id]);

  if (!photo) return <p>Loading...</p>;

  return (
    <div className="photo-detail">
      <img src={photo.urls.full} alt={photo.alt_description} />
      <h2>{photo.alt_description || 'Untitled'}</h2>
      <p>Author: {photo.user.name}</p>
      <p>Description: {photo.description || 'No description available'}</p>
    </div>
  );
}

export default PhotoDetail;
