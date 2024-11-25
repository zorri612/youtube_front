import React, { useState, useEffect } from 'react';
import './styles/homeFeed.css'
import { useNavigate } from 'react-router-dom';



const HomeFeed = () => {
    const [videos, setVideos] = useState([]);

    const fetchAllVideos = async () => {
        try {
            const response = await fetch('https://youtube-back-two.vercel.app/api/list-all-videos');

            if (!response.ok) {
                console.error('Error al obtener todos los videos:', await response.text());
                return;
            }

            const allVideos = await response.json();
            setVideos(allVideos);
        } catch (error) {
            console.error('Error al cargar el feed de videos:', error);
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        fetchAllVideos();
    }, []);

    return (
        <div>
            <h1>YOUTUBE FAKE</h1>
            <button className="back-button" onClick={() => navigate('/userHome')}>Ir  tu Dashboard</button>
            <h1>Bienvenido al Feed</h1>
                <div className="feed-container">
                    {videos.map((video, index) => (
                  <div className="card" key={index}>
                     <video controls src={video.url}></video>
                <div className="info">
                    <p>{video.name}</p>
                </div>
            </div>
    ))}
</div>
        </div>
    );
};

export default HomeFeed;
