import { useState } from 'react';
import { API } from 'aws-amplify';
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
    () => API.post('BYOB', '/liveness/create', {}),
    { revalidateOnFocus: false }
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

  const handleGetLivenessDetection = async (sessionId) => {
    const response = await API.get('BYOB', `/liveness/${sessionId}`, {});
    setGetLivenessResponse(response);
    return { isLive: response.isLive };
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
