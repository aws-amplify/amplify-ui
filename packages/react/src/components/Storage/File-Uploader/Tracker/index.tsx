import React from 'react';
import { Loader, View } from 'src/primitives';

export function Tracker({
  file,
  percentage,
  onPause,
  onResume,
  onCancel,
  isPaused,
}: {
  file: File;
  percentage: number;
  onPause: () => void;
  onResume: () => void;
  onCancel: () => void;
  isPaused: boolean;
}): JSX.Element {
  return (
    <View style={{ display: 'flex', flexDirection: 'column' }}>
      <View
        style={{
          border: '1px solid gray',
          padding: '8px 10px',
          borderRadius: '8px',
          backgroundColor: '#EFF0F0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <View style={{ display: 'flex', justifyContent: 'space-between' }}>
          <View
            style={{
              whiteSpace: 'pre',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {file.name}
          </View>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              fontSize: '1.1rem',
            }}
          >
            {percentage !== 0 && percentage !== 100 && (
              <View style={{ display: 'flex', alignItems: 'center' }}>
                {!isPaused ? (
                  <svg
                    onClick={() => onPause()}
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>
                    <path fill="none" d="M0 0h24v24H0z"></path>
                  </svg>
                ) : (
                  <svg
                    onClick={() => onResume()}
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 6v12l10-6z"></path>
                  </svg>
                )}
              </View>
            )}
            <View onClick={() => onCancel()}>X</View>
          </View>
        </View>
        <View style={{ fontSize: '10px', color: 'gray' }}>
          {file.size} bytes
        </View>
        <Loader
          className="loader"
          strokeLinecap="square"
          variation="linear"
          percentage={percentage}
          isPercentageTextHidden
          isDeterminate
        />
      </View>
      <View
        style={{ color: '#687078', fontSize: '12px', alignSelf: 'flex-end' }}
      >
        {percentage}% uploaded
      </View>
    </View>
  );
}
