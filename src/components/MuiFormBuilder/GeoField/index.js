import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';

import { useGeolocation } from 'hooks/geoHook';
import ReactMapboxGl, {
  Layer,
  Feature,
  RotationControl,
  ScaleControl,
  ZoomControl,
  Popup,
  Marker,
} from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { setRTLTextPlugin, getRTLTextPluginStatus } from 'mapbox-gl';

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA',
  // interactive: !disabled,
});

const GeoFieldTemplate = (props) => {
  const { formData, onChange, disabled } = props;
  const state = useGeolocation();
  const [center, setCenter] = useState([formData?.lng || state.longitude, formData?.lat || state.latitude]);


  useEffect(() => {
    const status = getRTLTextPluginStatus();
    if (status === 'unavailable') {
      setRTLTextPlugin(
        'https://www.parsimap.com/scripts/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.0/mapbox-gl-rtl-text.js'
      );
    }
  }, []);

  useEffect(()=> {
    onChange({lat: String(center[1]) , lng: String(center[0])})
  }, [])

  return (
    <>
      <Card style={{ boxShadow: 'none', border: '1px dashed #989898', marginBottom: 8 }}>
        <Map
          zoom={[15]}
          style="https://www.parsimap.com/styles/street.json"
          containerStyle={{ height: '200px', width: '100%', borderRadius: 10 }}
          center={center}
          onClick={(map, event) => {
            setCenter([event.lngLat.lng, event.lngLat.lat]);
            onChange({
              lat: String(event.lngLat.lat),
              lng: String(event.lngLat.lng),
            });
          }}
        >
          <Marker coordinates={center} anchor="center">
            <img src="/logo.png" width="40" />
          </Marker>
        </Map>
      </Card>
    </>
  );
};

export default GeoFieldTemplate;
