import * as React from 'react';
import { StorageBrowser, useView } from './StorageBrowser';
import { CustomDeleteView } from './CustomDeleteView';
import { CustomCopyView } from './CustomCopyView';
import { CustomCreateFolderView } from './CustomCreateFolderView';
import { CustomUploadView } from './CustomUploadView';
import { CustomLocationsView } from './CustomLocationsView';

// Third-party preview libraries
import VideoJS from 'video.js';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { json } from '@codemirror/lang-json';
import { Luckysheet } from 'luckysheet-react';
import ReactAudioPlayer from 'react-audio-player';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Custom Object Details View with Full Preview Capabilities
function CustomObjectDetailsView({ onExit }) {
  const state = useView('ObjectDetails');

  const getCodeLanguage = (fileName) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'js':
      case 'jsx':
      case 'ts':
      case 'tsx':
        return javascript();
      case 'py':
        return python();
      case 'json':
        return json();
      default:
        return [];
    }
  };

  const renderCustomPreview = () => {
    const { fileType, fileUrl, fileName, fileContent } = state;

    switch (fileType) {
      case 'video':
        return (
          <div className="video-preview-container">
            <VideoJS
              options={{
                controls: true,
                responsive: true,
                fluid: true,
                playbackRates: [0.5, 1, 1.25, 1.5, 2],
                sources: [{ src: fileUrl, type: 'video/mp4' }],
                plugins: {
                  hotkeys: true,
                  qualitySelector: true,
                },
              }}
            />
          </div>
        );

      case 'audio':
        return (
          <div className="audio-player-container">
            <ReactAudioPlayer
              src={fileUrl}
              controls
              preload="metadata"
              style={{ width: '100%' }}
            />
            <div className="audio-visualizer">
              <AudioVisualizer audioUrl={fileUrl} />
            </div>
          </div>
        );

      case 'pdf':
        return (
          <div className="pdf-viewer-container">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js">
              <Viewer
                fileUrl={fileUrl}
                defaultScale={1.0}
                plugins={[searchPlugin(), highlightPlugin(), bookmarkPlugin()]}
              />
            </Worker>
          </div>
        );

      case 'excel':
        return (
          <div className="excel-viewer-container">
            <div className="excel-toolbar">
              <button onClick={() => exportExcel(state.excelData)}>
                Export
              </button>
              <button onClick={() => printExcel()}>Print</button>
            </div>
            <Luckysheet
              luckysheetfile={state.excelData}
              options={{
                container: 'luckysheet-container',
                showinfobar: false,
                showsheetbar: true,
                showstatisticBar: true,
                enableAddRow: false,
                enableAddCol: false,
                sheetFormulaBar: true,
              }}
            />
          </div>
        );

      case 'code':
        return (
          <div className="code-editor-container">
            <div className="code-header">
              <div className="file-info">
                <span className="file-name">{fileName}</span>
                <span className="file-size">{state.formattedSize}</span>
              </div>
              <div className="code-actions">
                <button onClick={() => copyToClipboard(fileContent)}>
                  Copy Code
                </button>
                <button onClick={() => downloadFile(fileContent, fileName)}>
                  Download
                </button>
              </div>
            </div>
            <CodeMirror
              value={fileContent}
              height="500px"
              extensions={[
                getCodeLanguage(fileName),
                lineNumbers(),
                foldGutter(),
                bracketMatching(),
                syntaxHighlighting(),
              ]}
              theme="oneDark"
              editable={false}
              basicSetup={{
                lineNumbers: true,
                foldGutter: true,
                dropCursor: false,
                allowMultipleSelections: false,
              }}
            />
          </div>
        );

      case 'image':
        return (
          <div className="image-viewer-container">
            <TransformWrapper
              initialScale={1}
              minScale={0.1}
              maxScale={5}
              wheel={{ step: 0.1 }}
            >
              <TransformComponent>
                <img
                  src={fileUrl}
                  alt={fileName}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                />
              </TransformComponent>
            </TransformWrapper>
            <div className="image-controls">
              <button onClick={() => rotateImage(90)}>Rotate</button>
              <button onClick={() => downloadImage(fileUrl, fileName)}>
                Download
              </button>
            </div>
          </div>
        );

      case 'markdown':
        return (
          <div className="markdown-viewer-container">
            <div className="markdown-toolbar">
              <button onClick={() => togglePreviewMode()}>
                Toggle Preview
              </button>
              <button onClick={() => exportMarkdown()}>Export</button>
            </div>
            <ReactMarkdown
              children={fileContent}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      children={String(children).replace(/\n$/, '')}
                      style={atomDark}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    />
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            />
          </div>
        );

      default:
        return (
          <div className="unsupported-file-container">
            <div className="unsupported-icon">📄</div>
            <h3>Preview not available</h3>
            <p>This file type is not supported for preview</p>
            <div className="unsupported-actions">
              <button onClick={() => state.onDownload()}>Download File</button>
              <button onClick={() => openWithExternalApp(fileUrl)}>
                Open Externally
              </button>
            </div>
          </div>
        );
    }
  };

  if (state.isLoading) {
    return (
      <div className="object-details-loading">
        <CustomLoadingSkeleton fileType={state.fileType} />
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="object-details-error">
        <h2>Error Loading File</h2>
        <p>{state.error.message}</p>
        <div className="error-actions">
          <button onClick={() => state.onRetry()}>Retry</button>
          <button onClick={onExit}>Back to List</button>
        </div>
      </div>
    );
  }

  return (
    <div className="custom-object-details">
      {/* Header with navigation and actions */}
      <header className="object-details-header">
        <div className="header-left">
          <button onClick={onExit} className="back-button">
            ← Back to Files
          </button>
          <div className="file-info">
            <h1>{state.fileName}</h1>
            <span className="file-type-badge">
              {state.fileType?.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="header-actions">
          <button onClick={() => state.onShare()}>Share</button>
          <button onClick={() => state.onDownload()}>Download</button>
          {state.canEdit && (
            <button onClick={() => state.onEdit()}>Edit</button>
          )}
        </div>
      </header>

      {/* Main content area */}
      <div className="object-details-content">
        {/* Preview area */}
        <main className="preview-area">{renderCustomPreview()}</main>

        {/* Metadata sidebar */}
        <aside className="metadata-sidebar">
          <h2>File Information</h2>
          <div className="metadata-grid">
            <div className="metadata-item">
              <label>Size:</label>
              <span>{state.formattedSize}</span>
            </div>
            <div className="metadata-item">
              <label>Modified:</label>
              <span>{state.lastModified}</span>
            </div>
            <div className="metadata-item">
              <label>Type:</label>
              <span>{state.mimeType}</span>
            </div>

            {/* File-type specific metadata */}
            {state.fileType === 'image' && state.metadata && (
              <>
                <div className="metadata-item">
                  <label>Dimensions:</label>
                  <span>
                    {state.metadata.width} × {state.metadata.height}
                  </span>
                </div>
                <div className="metadata-item">
                  <label>Color Space:</label>
                  <span>{state.metadata.colorSpace}</span>
                </div>
              </>
            )}

            {state.fileType === 'video' && state.metadata && (
              <>
                <div className="metadata-item">
                  <label>Duration:</label>
                  <span>{state.metadata.duration}</span>
                </div>
                <div className="metadata-item">
                  <label>Resolution:</label>
                  <span>{state.metadata.resolution}</span>
                </div>
                <div className="metadata-item">
                  <label>Codec:</label>
                  <span>{state.metadata.codec}</span>
                </div>
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

// Main Location Action View Handler
function MyLocationActionView() {
  const state = useView('LocationDetail');
  const onExit = () => {
    state.onActionSelect('');
  };

  switch (state.actionType) {
    case 'copy':
      return <CustomCopyView onExit={onExit} />;
    case 'createFolder':
      return <CustomCreateFolderView onExit={onExit} />;
    case 'delete':
      return <CustomDeleteView onExit={onExit} />;
    case 'upload':
      return <CustomUploadView onExit={onExit} />;
    default:
      return null;
  }
}

// Main Storage Browser Component
function MyStorageBrowser() {
  const state = useView('LocationDetail');

  // Show locations view if no current location
  if (!state.location.current) {
    return <CustomLocationsView />;
  }

  // Show action views (copy, delete, upload, etc.)
  if (state.actionType) {
    return <MyLocationActionView />;
  }

  // Show object details view if an object is selected
  if (state.location.current?.type === 'OBJECT') {
    return (
      <CustomObjectDetailsView
        onExit={() =>
          state.onNavigate({ ...state.location.current, type: 'PREFIX' })
        }
      />
    );
  }

  // Default location detail view
  return <StorageBrowser.LocationDetailView />;
}

// Helper Components
const AudioVisualizer = ({ audioUrl }) => {
  return (
    <div className="audio-waveform">
      <div className="waveform-bars">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="waveform-bar"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  );
};

const CustomLoadingSkeleton = ({ fileType }) => {
  const getSkeletonContent = () => {
    switch (fileType) {
      case 'code':
        return (
          <div className="code-skeleton">
            <div className="skeleton-header" />
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                className="skeleton-line"
                style={{ width: `${60 + Math.random() * 40}%` }}
              />
            ))}
          </div>
        );
      case 'excel':
        return (
          <div className="excel-skeleton">
            <div className="skeleton-toolbar" />
            <div className="skeleton-grid">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="skeleton-row">
                  {Array.from({ length: 4 }, (_, j) => (
                    <div key={j} className="skeleton-cell" />
                  ))}
                </div>
              ))}
            </div>
          </div>
        );
      case 'video':
        return (
          <div className="video-skeleton">
            <div className="skeleton-video-player" />
            <div className="skeleton-controls" />
          </div>
        );
      default:
        return (
          <div className="generic-skeleton">
            <div className="skeleton-content" />
          </div>
        );
    }
  };

  return <div className="loading-skeleton">{getSkeletonContent()}</div>;
};

// Helper functions
const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
};

const downloadFile = (content, fileName) => {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
};

// Main App Export
export default function Example() {
  return (
    <StorageBrowser.Provider>
      <MyStorageBrowser />
    </StorageBrowser.Provider>
  );
}
