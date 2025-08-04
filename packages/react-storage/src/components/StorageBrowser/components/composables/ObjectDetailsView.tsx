/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { StorageImage } from '@aws-amplify/ui-react-storage';
import { StorageFile } from './StorageFile';
import {
  getProperties,
  GetPropertiesWithPathOutput,
  getUrl,
} from 'aws-amplify/storage';
import { STORAGE_BROWSER_BLOCK } from '../base';
import { ViewElement, HeadingElement, TextElement } from '../elements';
import type { FileData } from '../../actions';
import { useLocationDetailView } from '../../views/LocationDetailView';
import type { LocationState } from '../../store';
import { Button } from '@aws-amplify/ui-react';
import AWS from 'aws-sdk';
import { fetchAuthSession } from 'aws-amplify/auth';
import { Amplify } from 'aws-amplify';

async function getFullS3ObjectDetails(bucket: any, key: any) {
  const session = await fetchAuthSession();
  const credentials = session?.credentials;

  if (!credentials) {
    throw new Error('No valid credentials found');
  }

  // Configure AWS SDK with Amplify credentials
  const s3 = new AWS.S3({
    accessKeyId: credentials.accessKeyId,
    secretAccessKey: credentials.secretAccessKey,
    sessionToken: credentials.sessionToken,
    region: Amplify.getConfig().Storage?.S3.region,
  });

  // const s3 = new AWS.S3();

  try {
    // Get object metadata
    const [objectData, tags = { TagSet: [] }] = await Promise.all([
      s3.headObject({ Bucket: bucket, Key: key }).promise(),
      // s3.getObjectTagging({ Bucket: bucket, Key: key }).promise(),
    ]);

    console.log('[details] data get objectData', objectData);

    return {
      // Object properties
      key: key,
      contentType: objectData.ContentType,
      contentLength: objectData.ContentLength,
      lastModified: objectData.LastModified,
      etag: objectData.ETag,
      metadata: objectData.Metadata,
      storageClass: objectData.StorageClass,

      // Tags
      tags: tags.TagSet,
      tagsObject: tags.TagSet.reduce((acc, tag) => {
        acc[tag.Key] = tag.Value;
        return acc;
      }, {}),
    };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export interface ObjectDetailsViewProps {
  state: {
    object?: FileData;
    isLoading: boolean;
    error: any;
  };
  handleBack: () => void;
}

const isImageFile = (fileName?: string): boolean => {
  if (fileName) {
    const extension = fileName.split('.').pop()?.toLowerCase()?.trim();

    if (extension) {
      const imageExtensions = [
        'jpg',
        'jpeg',
        'png',
        'gif',
        'webp',
        'svg',
        'bmp',
        'ico',
        'tiff',
        'tif',
      ];
      return imageExtensions.includes(extension);
    }
  }

  return false;
};

const isTextFile = (fileName?: string): boolean => {
  if (fileName) {
    const extension = fileName.split('.').pop()?.toLowerCase()?.trim();

    if (extension) {
      const textExtensions = [
        'txt',
        'md',
        'json',
        'xml',
        'csv',
        'log',
        'yaml',
        'yml',
        'ini',
        'cfg',
        'conf',
        'js',
        'ts',
        'jsx',
        'tsx',
        'css',
        'scss',
        'html',
        'htm',
        'py',
        'java',
        'c',
        'cpp',
        'h',
        'php',
        'rb',
        'go',
        'rs',
        'sh',
        'bat',
        'sql',
      ];
      return textExtensions.includes(extension);
    }
  }

  return false;
};

const isVideoFile = (fileName?: string): boolean => {
  if (fileName) {
    const extension = fileName.split('.').pop()?.toLowerCase()?.trim();

    if (extension) {
      const videoExtensions = [
        'mp4',
        'webm',
        'ogg',
        'avi',
        'mov',
        'wmv',
        'flv',
        'mkv',
        'm4v',
        '3gp',
        'ogv',
      ];
      return videoExtensions.includes(extension);
    }
  }

  return false;
};

interface ImagePreviewProps {
  fileKey: string;
  alt: string;
  location: LocationState;
}

const ImageSkeleton: React.FC = () => (
  <div
    style={{
      width: '100%',
      height: '300px',
      backgroundColor: '#f0f0f0',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'pulse 1.5s ease-in-out infinite alternate',
      border: '2px dashed #d0d0d0',
    }}
  >
    <div
      style={{
        textAlign: 'center',
        color: '#888',
        fontSize: '14px',
      }}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          backgroundColor: '#e0e0e0',
          borderRadius: '4px',
          margin: '0 auto 8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
        }}
      >
        🖼️
      </div>
      Loading image...
    </div>
    <style>
      {`
        @keyframes pulse {
          0% { opacity: 0.6; }
          100% { opacity: 1; }
        }
      `}
    </style>
  </div>
);

const ImagePreview: React.FC<ImagePreviewProps> = ({ alt, location }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      {isLoading && <ImageSkeleton />}

      <StorageImage
        path={location.key}
        alt={alt}
        style={{
          width: '100%',
          height: 'auto',
          maxHeight: '500px',
          objectFit: 'contain',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e0e0e0',
          display: isLoading ? 'none' : 'block',
        }}
        onError={(error) => {
          console.error('Error loading image:', error);
          setIsLoading(false);
          setHasError(true);
        }}
        onLoad={() => {
          console.log('Image loaded successfully');
          setIsLoading(false);
          setHasError(false);
        }}
      />

      {hasError && !isLoading && (
        <div
          style={{
            width: '100%',
            height: '200px',
            backgroundColor: '#fef2f2',
            border: '2px dashed #fca5a5',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#dc2626',
            fontSize: '14px',
            textAlign: 'center',
          }}
        >
          <div>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>⚠️</div>
            Failed to load image
          </div>
        </div>
      )}
    </div>
  );
};

interface TextPreviewProps {
  location: LocationState;
  fileName: string;
}

const TextSkeleton: React.FC = () => (
  <div
    style={{
      width: '100%',
      height: '300px',
      backgroundColor: '#f8fafc',
      border: '2px dashed #cbd5e1',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'pulse 1.5s ease-in-out infinite alternate',
    }}
  >
    <div
      style={{
        textAlign: 'center',
        color: '#64748b',
        fontSize: '14px',
      }}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          backgroundColor: '#e2e8f0',
          borderRadius: '4px',
          margin: '0 auto 8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
        }}
      >
        📄
      </div>
      Loading text file...
    </div>
    <style>
      {`
        @keyframes pulse {
          0% { opacity: 0.6; }
          100% { opacity: 1; }
        }
      `}
    </style>
  </div>
);

const TextPreview: React.FC<TextPreviewProps> = ({ location, fileName }) => {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          marginBottom: '12px',
          padding: '8px 12px',
          backgroundColor: '#f1f5f9',
          borderRadius: '6px',
          fontSize: '14px',
          color: '#475569',
          border: '1px solid #e2e8f0',
        }}
      >
        📄 {fileName}
      </div>

      <StorageFile
        path={location.key}
        loadingElement={<TextSkeleton />}
        onError={(error) => {
          console.error('Error loading text file:', error);
        }}
        onLoad={() => {
          console.log('Text file loaded successfully');
        }}
        maxSize={1024 * 1024} // 1MB limit
      />
    </div>
  );
};

// Add Video Preview Component
interface VideoPreviewProps {
  location: LocationState;
  fileName: string;
}

const VideoSkeleton: React.FC = () => (
  <div
    style={{
      width: '100%',
      height: '400px',
      backgroundColor: '#1f2937',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'pulse 1.5s ease-in-out infinite alternate',
      border: '2px dashed #4b5563',
    }}
  >
    <div
      style={{
        textAlign: 'center',
        color: '#9ca3af',
        fontSize: '14px',
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          backgroundColor: '#374151',
          borderRadius: '50%',
          margin: '0 auto 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px',
        }}
      >
        🎬
      </div>
      Loading video...
    </div>
    <style>
      {`
        @keyframes pulse {
          0% { opacity: 0.6; }
          100% { opacity: 1; }
        }
      `}
    </style>
  </div>
);

const VideoPreview: React.FC<VideoPreviewProps> = ({ location, fileName }) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    const loadVideo = async () => {
      try {
        setIsLoading(true);
        setError(null);

        console.log('Getting video URL for:', location.key);

        const { url } = await getUrl({
          path: location.key,
          options: {
            validateObjectExistence: true,
            expiresIn: 3600, // 1 hour
          },
        });

        console.log('Got video URL:', url.toString());
        setVideoUrl(url.toString());
      } catch (err) {
        console.error('Error getting video URL:', err);
        setError(err instanceof Error ? err.message : 'Failed to load video');
      } finally {
        setIsLoading(false);
      }
    };

    if (location.key) {
      loadVideo();
    }
  }, [location.key]);

  if (isLoading) {
    return <VideoSkeleton />;
  }

  if (error) {
    return (
      <div
        style={{
          width: '100%',
          height: '300px',
          backgroundColor: '#fef2f2',
          border: '2px dashed #fca5a5',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#dc2626',
          fontSize: '14px',
          textAlign: 'center',
        }}
      >
        <div>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>⚠️</div>
          <div>Failed to load video: {error}</div>
          <div style={{ fontSize: '12px', marginTop: '4px', opacity: 0.8 }}>
            {fileName}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          marginBottom: '12px',
          padding: '8px 12px',
          backgroundColor: '#1f2937',
          borderRadius: '6px',
          fontSize: '14px',
          color: '#f3f4f6',
          border: '1px solid #374151',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span>🎬</span>
        <span>{fileName}</span>
      </div>

      {videoUrl && (
        <video
          controls
          preload="metadata"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '500px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            border: '1px solid #e5e7eb',
            backgroundColor: '#000',
          }}
          onError={(e) => {
            console.error('Video playback error:', e);
            setError('Failed to play video');
          }}
          onLoadStart={() => {
            console.log('Video started loading');
          }}
          onCanPlay={() => {
            console.log('Video can start playing');
          }}
        >
          <source src={videoUrl} />
          <div
            style={{
              padding: '20px',
              textAlign: 'center',
              color: '#6b7280',
            }}
          >
            Your browser does not support the video tag.
            <br />
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#3b82f6',
                textDecoration: 'underline',
                marginTop: '8px',
                display: 'inline-block',
              }}
            >
              Download video instead
            </a>
          </div>
        </video>
      )}
    </div>
  );
};

const NotSupportedPreview: React.FC<{
  fileName: string;
  mimeType?: string;
}> = ({ fileName, mimeType }) => (
  <div
    style={{
      padding: '32px',
      backgroundColor: '#f8fafc',
      border: '2px dashed #cbd5e1',
      borderRadius: '12px',
      textAlign: 'center',
      color: '#64748b',
      maxWidth: '400px',
      margin: '0 auto',
    }}
  >
    <div style={{ fontSize: '48px', marginBottom: '16px' }}>📄</div>
    <TextElement style={{ marginBottom: '8px', fontWeight: '500' }}>
      Preview not supported
    </TextElement>
    <TextElement style={{ marginBottom: '4px', fontSize: '14px' }}>
      <strong>File:</strong> {fileName}
    </TextElement>
    {mimeType && (
      <TextElement style={{ fontSize: '14px', color: '#94a3b8' }}>
        <strong>Type:</strong> {mimeType}
      </TextElement>
    )}
  </div>
);

interface FilePreviewProps {
  object: FileData;
  location: LocationState;
}

const FilePreview: React.FC<FilePreviewProps> = ({ location }) => {
  const { key } = location;

  const fileName = key?.split('/').pop() ?? 'Unknown';
  console.log('FilePreview', fileName, key);

  const isImage = isImageFile(key);
  const isText = isTextFile(key);
  const isVideo = isVideoFile(key);

  console.log('[preview] location', location);
  console.log(
    '[preview] isImage',
    isImage,
    'isText',
    isText,
    'isVideo',
    isVideo
  );

  if (isImage && key) {
    return <ImagePreview fileKey={key} alt={fileName} location={location} />;
  }

  if (isText && key) {
    return <TextPreview location={location} fileName={fileName} />;
  }

  if (isVideo && key) {
    return <VideoPreview location={location} fileName={fileName} />;
  }

  return <NotSupportedPreview fileName={fileName} mimeType={key} />;
};

const formatFileSize = (bytes?: number): string => {
  if (!bytes) return '0 bytes';

  const sizes = ['bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
};

const LoadingSpinner: React.FC = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px',
    }}
  >
    <div
      style={{
        width: '32px',
        height: '32px',
        border: '3px solid #e2e8f0',
        borderTop: '3px solid #3b82f6',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginRight: '12px',
      }}
    />
    <TextElement style={{ color: '#64748b' }}>
      Loading object details...
    </TextElement>
    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
);

export const ObjectDetailsView = ({
  state,
  handleBack,
}: ObjectDetailsViewProps): React.JSX.Element => {
  const { object, isLoading, error } = state;
  const { location } = useLocationDetailView();

  console.log('[preview] render ObjectDetailsView location ', location);

  React.useEffect(() => {
    getProperties({
      path: object?.key ?? '',
      options: {},
    })
      .then((data: GetPropertiesWithPathOutput) => {
        console.log('[details] data get properties', data);
      })
      .catch((err) => {
        console.log('err', err);
      });

    getFullS3ObjectDetails(location.current?.bucket, object?.key).then(
      (data) => {
        console.log('[details] data get full details', data);
      }
    );
  }, [object?.key]);

  const containerStyle: React.CSSProperties = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '24px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
  };

  if (isLoading) {
    return (
      <ViewElement
        className={`${STORAGE_BROWSER_BLOCK}__object-details-view`}
        style={containerStyle}
      >
        <LoadingSpinner />
      </ViewElement>
    );
  }

  if (error) {
    return (
      <ViewElement
        className={`${STORAGE_BROWSER_BLOCK}__object-details-view`}
        style={containerStyle}
      >
        <div
          style={{
            padding: '24px',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>❌</div>
          <TextElement style={{ color: '#dc2626', fontWeight: '500' }}>
            Error loading object: {error.message}
          </TextElement>
        </div>
      </ViewElement>
    );
  }

  if (!object) {
    return (
      <ViewElement
        className={`${STORAGE_BROWSER_BLOCK}__object-details-view`}
        style={containerStyle}
      >
        <div
          style={{
            padding: '24px',
            textAlign: 'center',
            color: '#64748b',
          }}
        >
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>📭</div>
          <TextElement>No object selected</TextElement>
        </div>
      </ViewElement>
    );
  }

  const { size, id, key, type, lastModified } = object;
  const fileName = key?.split('/').pop() ?? 'Unknown';

  return (
    <ViewElement
      className={`${STORAGE_BROWSER_BLOCK}__object-details-view`}
      style={containerStyle}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
          paddingBottom: '16px',
          borderBottom: '1px solid #e5e7eb',
          paddingLeft: 20,
        }}
      >
        <Button
          onClick={handleBack}
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'background-color 0.2s',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#2563eb';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#3b82f6';
          }}
        >
          ← Back
        </Button>
      </div>

      <div style={{ marginBottom: '32px', padding: 20 }}>
        <HeadingElement
          style={{
            marginBottom: '16px',
            color: '#374151',
            fontSize: '18px',
            fontWeight: '600',
          }}
        >
          Preview
        </HeadingElement>
        <FilePreview object={object} location={location} />
      </div>

      <div style={{ padding: 20 }}>
        <HeadingElement
          style={{
            marginBottom: '16px',
            color: '#374151',
            fontSize: '18px',
            fontWeight: '600',
          }}
        >
          File Information
        </HeadingElement>
        <div
          style={{
            display: 'grid',
            gap: '12px',
            backgroundColor: '#f9fafb',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
          }}
        >
          {[
            { label: 'Name', value: fileName },
            { label: 'Key', value: key },
            { label: 'Size', value: formatFileSize(size) },
            { label: 'Type', value: type || 'Unknown' },
            {
              label: 'Last Modified',
              value: lastModified?.toLocaleString() || 'Unknown',
            },
            ...(id ? [{ label: 'ID', value: id }] : []),
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 0',
                borderBottom: '1px solid #e5e7eb',
              }}
            >
              <TextElement
                style={{
                  fontWeight: '500',
                  color: '#374151',
                  margin: 0,
                }}
              >
                {label}:
              </TextElement>
              <TextElement
                style={{
                  color: '#6b7280',
                  margin: 0,
                  wordBreak: 'break-all',
                  textAlign: 'right',
                  maxWidth: '60%',
                }}
              >
                {value}
              </TextElement>
            </div>
          ))}
        </div>
      </div>
    </ViewElement>
  );
};
