import { useState } from 'react';
import { post, get } from 'aws-amplify/api';
import useSWR from 'swr';

export function useLiveness() {
  const [isLivenessActive, setLivenessActive] = useState(false);
  const [getLivenessResponse, setGetLivenessResponse] = useState(null);

  const {
    data: createLivenessSessionApiData,
    error: createLivenessSessionApiError,
    isValidating: createLivenessSessionApiLoading,
    mutate,
  } = useSWR(
    'CreateStreamingLivenessSession',
    async () => {
      // 2. Create a liveness session from client side?
      const response = await post({
        apiName: 'BYOB',
        path: '/liveness/create',
        options: {},
      }).response;
      const { body } = response;
      // returns a session id here
      return body.json();
    },
    {
      revalidateOnFocus: false,
    }
  );

  const handleCreateLivenessSession = () => {
    setLivenessActive(true);
  };

  const handleExit = () => {
    stopLiveness();
  };

  const handleUserExit = (event: CustomEvent) => {
    event.preventDefault();
    stopLiveness();
  };

  const handleSuccess = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    stopLiveness();
  };

  const stopLiveness = () => {
    setLivenessActive(false);
    setGetLivenessResponse(null);
    mutate();
  };

  // 7. call customer backend? to get boolean flag if user was live or not
  const handleGetLivenessDetection = async (sessionId) => {
    const response = await get({
      apiName: 'BYOB',
      path: `/liveness/${sessionId}`,
      options: {},
    }).response;
    const { body } = response;
    const livenessResponse = await body.json();
    setGetLivenessResponse(livenessResponse);
    // 8. passes response to facelivenessdetector component which appropriately renders success or failure
    return { isLive: livenessResponse['isLive'] };
  };

  return {
    isLivenessActive,
    getLivenessResponse,
    handleCreateLivenessSession,
    handleExit,
    handleUserExit,
    handleSuccess,
    handleGetLivenessDetection,
    stopLiveness,
    createLivenessSessionApiData,
    createLivenessSessionApiError,
    createLivenessSessionApiLoading,
  };
}
