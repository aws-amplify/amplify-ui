import React, { useEffect, useState } from 'react';
import VideoJS from 'video.js';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { Luckysheet } from 'luckysheet-react';
import ReactAudioPlayer from 'react-audio-player';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import ReactMarkdown from 'react-markdown';

// Assuming these are imported from your storage browser library
// import { StorageBrowser, useView } from 'your-storage-browser-library';

// Custom Object Preview component
function FullyCustomObjectPreview() {
  const state = useView('LocationDetail');

  const renderPreview = () => {
    const { fileType, fileUrl, fileName } = state.ObjectDetails;

    switch (fileType) {
      case 'video':
        return <VideoJS src={fileUrl} controls />;
      case 'audio':
        return <ReactAudioPlayer src={fileUrl} controls />;
      case 'pdf':
        return (
          <Worker>
            <Viewer fileUrl={fileUrl} />
          </Worker>
        );
      case 'excel':
        return <Luckysheet data={state.excelData} />;
      case 'image':
        return (
          <TransformWrapper>
            <TransformComponent>
              <img src={fileUrl} alt={fileName} />
            </TransformComponent>
          </TransformWrapper>
        );
      case 'markdown': {
        const MarkdownPreview = () => {
          const [fileContent, setFileContent] = useState('');

          useEffect(() => {
            const loadTextFile = async () => {
              try {
                const response = await fetch(fileUrl);
                const textContent = await response.text();
                setFileContent(textContent);
              } catch (error) {
                console.error('Error loading markdown file:', error);
                setFileContent('Error loading file content');
              }
            };

            if (fileUrl) {
              loadTextFile();
            }
          }, [fileUrl]);

          return <ReactMarkdown children={fileContent} />;
        };

        return <MarkdownPreview />;
      }
      default:
        return <div>Preview not available</div>;
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <main style={{ flex: '1' }}>{renderPreview()}</main>
      <aside style={{ width: '300px', padding: '20px' }}>
        <h2>Metadata</h2>
        <p>Size: {state.fileSize}</p>
        <p>Type: {state.fileType}</p>
        {/* Additional metadata */}
      </aside>
    </div>
  );
}

// Integrate with existing Storage Browser
function MyCustomLocationDetailsViewWithFullyCustomPreview() {
  const state = useView('LocationDetail');

  return (
    <StorageBrowser.LocationDetailView.Provider {...state}>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '1' }}>
          <StorageBrowser.LocationDetailView.DataTable />
        </div>
        {state.selectedObject && (
          <div style={{ width: '600px' }}>
            <FullyCustomObjectPreview />
          </div>
        )}

        {/* Put other location details view components if needed e.g Search, Title, Message ....etc */}
      </div>
    </StorageBrowser.LocationDetailView.Provider>
  );
}

function MyStorageBrowser() {
  const state = useView('LocationDetail');

  if (!state.location.current) {
    return <CustomLocationsView />;
  }

  if (state.actionType) {
    return <MyComposedLocationDetailsView />;
  }

  return <MyCustomLocationDetailsViewWithFullyCustomPreview />;
}

export default function App() {
  return (
    <StorageBrowser.Provider>
      <MyStorageBrowser />
    </StorageBrowser.Provider>
  );
}
