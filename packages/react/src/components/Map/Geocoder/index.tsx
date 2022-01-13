import { Geo } from '@aws-amplify/geo';
import { createAmplifyGeocoder } from 'maplibre-gl-js-amplify';
import React, { useEffect, useRef, useState } from 'react';
import { FlyToInterpolator, WebMercatorViewport } from 'react-map-gl';

import '@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css';
import 'maplibre-gl-js-amplify/dist/public/amplify-geocoder.css';

export const Geocoder = (props) => {
  const [cachedResult, setCachedResult] = useState();
  const geocoder: any = useRef();

  const showClearIcon = () =>
    (geocoder.current._clearEl.style.display = 'block');

  const handleSearch = async (event) => {
    const { result } = event;
    const { onViewportChange, onResult = () => {} } = props;
    const { bbox, center, properties = {} } = result;
    const { short_code } = properties;
    const [longitude, latitude] = center;
    const bboxExceptions = {
      fr: {
        name: 'France',
        bbox: [
          [-4.59235, 41.380007],
          [9.560016, 51.148506],
        ],
      },
      us: {
        name: 'United States',
        bbox: [
          [-171.791111, 18.91619],
          [-66.96466, 71.357764],
        ],
      },
      ru: {
        name: 'Russia',
        bbox: [
          [19.66064, 41.151416],
          [190.10042, 81.2504],
        ],
      },
      ca: {
        name: 'Canada',
        bbox: [
          [-140.99778, 41.675105],
          [-52.648099, 83.23324],
        ],
      },
    };
    const { width, height } = props.mapRef?.current
      ?.getMap()
      .getContainer()
      .getBoundingClientRect();
    let zoom = geocoder.current.options.zoom;
    const fitBounds = (bounds, viewport) =>
      new WebMercatorViewport(viewport).fitBounds(bounds);

    try {
      if (!bboxExceptions[short_code] && bbox) {
        zoom = fitBounds(
          [
            [bbox[0], bbox[1]],
            [bbox[2], bbox[3]],
          ],
          { width, height }
        ).zoom;
      } else if (bboxExceptions[short_code]) {
        zoom = fitBounds(bboxExceptions[short_code].bbox, {
          width,
          height,
        }).zoom;
      }
    } catch (e) {
      console.warn(
        'following result caused an error when trying to zoom to bbox: ',
        result
      ); // eslint-disable-line
      zoom = geocoder.current.options.zoom;
    }

    onViewportChange({
      longitude,
      latitude,
      zoom,
      transitionInterpolator: new FlyToInterpolator(),
      transitionDuration: 3000,
    });
    onResult(event);

    setCachedResult(result);
    geocoder.current._typeahead.selected = null;
    showClearIcon();
  };

  useEffect(() => {
    geocoder.current = createAmplifyGeocoder();

    geocoder.current.on('clear', (event) => console.log('clear', event));
    geocoder.current.on('loading', (event) => console.log('loading', event));
    geocoder.current.on('results', (event) => console.log('results', event));
    geocoder.current.on('result', handleSearch);
    geocoder.current.on('error', (event) => console.log('error', event));

    props.mapRef?.current?.getMap()?.addControl(geocoder.current);

    return () => {
      geocoder.current.off('clear', (event) => console.log('clear', event));
      geocoder.current.off('loading', (event) => console.log('loading', event));
      geocoder.current.off('results', (event) => console.log('results', event));
      geocoder.current.off('result', (event) => console.log('result', event));
      geocoder.current.off('error', (event) => console.log('error', event));

      props.mapRef?.current?.getMap()?.removeControl(geocoder.current);
    };
  });

  return null;
};
