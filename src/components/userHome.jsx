import React, { useState, useEffect } from "react";
import "./styles/UserHome.css";
import { useNavigate } from 'react-router-dom';

const UserHome = () => {
    const [videos, setVideos] = useState([]);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [user, setUser] = useState(null); // Usuario logueado

    // Simula obtener el usuario desde localStorage
    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem("user")); // Guardar usuario tras login
        setUser(loggedUser);
        
    }, []);

    const navigate = useNavigate();


    
    
    // Cargar lista de videos del usuario
    const fetchVideos = async () => {
        const userId = localStorage.getItem('userId'); // Obtén el userId
        console.log('Obteniendo videos para userId:', userId);
    
        if (!userId) {
            console.error('userId no encontrado en localStorage');
            return;
        }
    
        try {
            const response = await fetch(`https://youtube-back-two.vercel.app/api/list-videos/${userId}`);
    
            if (!response.ok) {
                console.error('Error al obtener videos:', await response.text());
                return;
            }
    
            const videos = await response.json();
            console.log('Videos obtenidos:', videos);
            setVideos(videos);
        } catch (error) {
            console.error('Error al hacer la solicitud:', error);
        }
    };
    
    useEffect(() => {
        fetchVideos();
    }, []); // Ejecuta una vez al montar el componente
    
    

    // Manejar selección de archivo
    const handleFileUpload = (event) => {
        setFile(event.target.files[0]);
    };

    // Manejar subida de archivo
    const handleUpload = async () => {
        if (!file || !fileName) {
            alert("Debes seleccionar un archivo y escribir un nombre");
            return;
        }
    
        const userId = localStorage.getItem("userId"); // Obtén el userId
        if (!userId) {
            console.error("Error: userId no encontrado en localStorage.");
            return alert("Debes estar logueado para subir un video.");
        }

        console.log("Enviando userId:", userId); // Debug

        const formData = new FormData();
        formData.append("video", file);
        formData.append("fileName", fileName);
        formData.append("userId", userId); // Adjuntar el ID del usuario

        try {
            const response = await fetch("https://youtube-back-two.vercel.app/api/upload-video", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Video subido con éxito");
                setFile(null);
                setFileName("");
                console.log("Estado reseteado:", { file, fileName });
                document.getElementById("fileInput").value = "";
                
                // Actualizar lista de videos
                fetch(`https://youtube-back-two.vercel.app/api/list-videos/${userId}`)
                    .then((response) => response.json())
                    .then((data) => setVideos(data));
            } else {
                alert("Error al subir el video");
            }
        } catch (error) {
            console.error("Error al subir video:", error);
        }
    };

    return (
        <div className="user-home">
            <h1>YOUTUBE FAKE</h1>
            <button className="feed-button" onClick={() => navigate('/homeFeed')}>Ir al Feed Principal</button>
        
            <h2> Bienvenido a tu Dashboard</h2>
            <div className="upload-section">
                <h2>Subir un nuevo video</h2>
                <input
                    id="fileInput"
                    type="file"
                    accept="video/*"
                    onChange={handleFileUpload}
                />
                <input
                    type="text"
                    placeholder="Nombre del video"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                />
                <button onClick={handleUpload}>Subir Video</button>
            </div>
            <div className="videos-section">
                <h2>Videos subidos por ti</h2>
                {videos.length === 0 ? (
                    <p>No hay videos subidos</p>
                ) : (
                    <div className="videos-list">
                        {videos.map((video, index) => (
                            <div key={index} className="video-card">
                                <video
                                    width="300"
                                    controls
                                    src={video.url}
                                ></video>
                                <p>{video.name}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};


export default UserHome;
