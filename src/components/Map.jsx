/* eslint-disable no-unused-vars */
import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useState } from 'react';

function Map() {
    const navigate = useNavigate();
    const [mapPosition, setMapPosition] = useState([23.1286792, 72.5428675])
    const [searchParams, setSearchParams] = useSearchParams();

    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    return (
        <div className={styles.mapContainer} onClick={() => navigate("form")}>
            <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={styles.map}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                <Marker position={mapPosition}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default Map
