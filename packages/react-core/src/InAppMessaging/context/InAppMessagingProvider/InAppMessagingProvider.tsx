import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Notifications } from '@aws-amplify/notifications';
import {
  InAppMessagingContext,
  InAppMessagingContextType,
} from '../InAppMessagingContext';

export interface InAppMessagingProviderProps {
  children: ReactNode;
}

const { InAppMessaging } = Notifications;

export default function InAppMessagingProvider({
  children,
}: InAppMessagingProviderProps): JSX.Element {
  const [message, setMessage] =
    useState<InAppMessagingContextType['message']>(null);

  useEffect(() => {
    const listener = InAppMessaging.onMessageReceived((message) => {
      setMessage(message);
    });
    return listener.remove;
  }, []);

  const clearMessage = useCallback(() => {
    setMessage(null);
  }, []);

  const click = (src: string) => {
    setMessage({
      id: src,
      layout: 'TOP_BANNER',
      content: [
        {
          container: { style: { backgroundColor: '#fee' } },
          header: {
            content:
              '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pulvinar dapibus sem nec auctor. Donec sit amet nisi et sem viverra pharetra. Integer dapibus ultricies ex, sed facilisis molestie."',
            style: { textAlign: 'center' },
          },
          body: {
            // content: 'body content',
            content:
              '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pulvinar dapibus sem nec auctor. Donec sit amet nisi et sem viverra pharetra. Integer dapibus ultricies ex, sed facilisis molestie. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pulvinar dapibus sem nec auctor. Donec sit amet nisi et sem viverra pharetra. Integer dapibus ultricies ex, sed facilisis molestie."',
            style: { textAlign: 'center' },
          },
          image: { src },
          primaryButton: {
            action: 'CLOSE',
            title: 'Primary Action',
            style: {
              backgroundColor: '#FF80AA',
              borderRadius: 5,
              color: '#800040',
            },
          },
          secondaryButton: {
            action: 'CLOSE',
            title: 'Secondary Action',
            style: {
              backgroundColor: '#004080',
              borderRadius: 5,
              color: '#80AAFF',
            },
          },
        },
      ],
      // header={{
      //   // content: "Header content",
      //   content:
      //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pulvinar dapibus sem nec auctor. Donec sit amet nisi et sem viverra pharetra. Integer dapibus ultricies ex, sed facilisis molestie.",
      //   style: { textAlign: "center" },
      // }}
      // body={{
      //   // content: "Body content",
      //   content:
      //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pulvinar dapibus sem nec auctor. Donec sit amet nisi et sem viverra pharetra. Integer dapibus ultricies ex, sed facilisis molestie.",
      //   style: { textAlign: "right" },
      // }}
      // primaryButton={{
      //   title: "Primary Action",
      //   style: {
      //     backgroundColor: "#FF80AA",
      //     borderRadius: 5,
      //     color: "#800040",
      //   },
      //   onAction: () => {
      //     console.log("Clicked primary");
      //   },
      // }}
      // secondaryButton={{
      //   title: "Secondary Action",
      //   style: {
      //     backgroundColor: "#004080",
      //     borderRadius: 5,
      //     color: "#80AAFF",
      //   },
      //   onAction: () => {
      //     console.log("Clicked secondary");
      //   },
      // }}
    });
  };

  const landscape = () => {
    click(
      'https://www.nasa.gov/sites/default/files/thumbnails/image/main_image_star-forming_region_carina_nircam_final-5mb.jpg'
    );
  };

  const portrait = () => {
    click(
      'https://images.unsplash.com/photo-1553061599-86c4cfa449d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3174&q=80'
    );
  };

  const value = useMemo(
    () => ({
      clearMessage,
      displayMessage: setMessage,
      message,
    }),
    [clearMessage, message]
  );

  return (
    <InAppMessagingContext.Provider value={value}>
      <button onClick={landscape}>Landscape Image</button>
      <button onClick={portrait}>Portrait Image</button>
      {children}
    </InAppMessagingContext.Provider>
  );
}
