// src/api.js
import axios from 'axios';

const unsplashAPI = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID GnBbQqXz1Zl2pPcGujA3rbfHv1fo97CY60FZ5GL7R8Y`
  }
});

export const fetchPhotos = (page = 1) => unsplashAPI.get(`/photos?page=${page}`);
export const fetchPhotoDetails = (id) => unsplashAPI.get(`/photos/${id}`);
