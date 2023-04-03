import * as React from 'react';
import { ToggleButtonGroup, ToggleButton } from '@aws-amplify/ui-react';
import { StorageManager } from '@aws-amplify/ui-react-storage';

const dictionary = {
  // use default strings for english
  en: null,
  es: {
    getFilesUploadedText(count) {
      return `${count} ${
        count === 1 ? 'archivo cargado' : 'archivos cargados'
      }`;
    },
    getFileSizeErrorText(sizeText) {
      return `El tamaño del archivo debe ser menor a ${sizeText}`;
    },
    getRemainingFilesText(count) {
      return `${count} ${count === 1 ? 'archivo' : 'archivos'} subiendo`;
    },
    getUploadingText(percentage) {
      return `Subiendo${percentage > 0 ? `: ${percentage}%` : ''}`;
    },
    getUploadButtonText(count) {
      return `Cargar ${count} ${count === 1 ? 'archivo' : 'archivos'}`;
    },
    getMaxFilesErrorText(count) {
      return `No se pueden seleccionar más de ${count} ${
        count === 1 ? 'archivo' : 'archivos'
      }. Elimine archivos antes de actualizar.`;
    },
    getErrorText(message) {
      return message;
    },
    doneButtonText: 'Listo',
    clearAllButtonText: 'Limpiar todo',
    extensionNotAllowedText: 'Extensión no permitida',
    browseFilesText: 'Buscar archivos',
    dropFilesText: 'Arrastre los archivos aquí o',
    pauseText: 'Pausa',
    resumeText: 'Reanudar',
    uploadSuccessfulText: 'Carga exitosa',
    getPausedText(percentage) {
      return `Pausado: ${percentage}%`;
    },
  },
};

export const StorageManageri18nExample = () => {
  const [language, setLanguage] = React.useState('en');
  return (
    <>
      <ToggleButtonGroup
        value={language}
        isExclusive
        // @ts-ignore // IGNORE
        onChange={(value) => setLanguage(value)}
      >
        <ToggleButton value="en">En</ToggleButton>
        <ToggleButton value="es">Es</ToggleButton>
      </ToggleButtonGroup>
      <StorageManager
        acceptedFileTypes={['image/*']}
        accessLevel="public"
        maxFileCount={1}
        displayText={dictionary[language]}
        provider="fast" // IGNORE
      />
    </>
  );
};
