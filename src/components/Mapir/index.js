import './styles.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import React, { useEffect } from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';

import { Box, Card, styled } from '@mui/material';
import { mapboxAccessToken, mapirApiToken } from 'config';
import { setRTLTextPlugin, getRTLTextPluginStatus } from 'mapbox-gl';

const Map = ReactMapboxGl({
  minZoom: 10,
  maxZoom: 16,
  bearingSnap: 10,
  renderWorldCopies: false,
  attributionControl: false,
  accessToken: mapboxAccessToken,
});

const Mapbox = ({
  center,
  width = '100%',
  height = '300px',
  borderRadius = 16,
  interactive = true,
  setAddress = (address) => address,
  setLocation = (location) => location,
}) => {
  const findAddress = (location) => {
    var url = `https://map.ir/reverse/no?lat=${location[1]}&lon=${location[0]}`;
    fetch(url, {
      headers: {
        'Mapir-SDK': 'reactjs',
        'Content-Type': 'application/json',
        'x-api-key': mapirApiToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAddress({
          name: data.last || data.region || data.poi,
          primary: data.address_compact,
          compact: `${data.county} - ${data.region} - خیابان ${data.primary}`,
          postal: data.postal_code,
        });
      });
  };

  useEffect(() => {
    findAddress(center);
  }, [center]);

  useEffect(() => {
    const status = getRTLTextPluginStatus();
    if (status === 'unavailable') {
      setRTLTextPlugin(
        'https://www.parsimap.com/scripts/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.0/mapbox-gl-rtl-text.js'
      );
    }
  }, []);

  return (
    <Card style={{ boxShadow: 'none', border: '1px dashed #989898', marginBottom: 8 }}>
      <Map
        zoom={[15]}
        center={center}
        movingMethod="easeTo"
        style="/assets/map/green-gray.json"
        containerStyle={{ width, height, borderRadius }}
        onClick={(map, event) => {
          if (interactive) {
            setLocation([event.lngLat.lng, event.lngLat.lat]);
          }
        }}
      >
        <Marker coordinates={center} anchor="center">
          <StyledBox width={16} height={16} borderRadius={2} bgcolor="info.main" color="info" sx={{ opacity: 0.9 }} />
        </Marker>
      </Map>
    </Card>
  );
};

const StyledBox = styled(Box)(({ theme, color = 'info' }) => ({
  '&::after': {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    position: 'absolute',
    border: '1px solid',
    animation: 'ripple 1.2s infinite ease-in-out',
    borderColor: theme.palette[color].main,
    content: '""',
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export default Mapbox;
