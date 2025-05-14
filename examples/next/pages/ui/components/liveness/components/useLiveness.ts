import { useEffect, useState } from 'react';
import { post, get } from 'aws-amplify/api';
import useSWR from 'swr';

const maxSupportedClockSkew = 5 * 60 * 1000;

const getSystemClockOffset = (serverDate: string | undefined) => {
  const deviceTime = Date.now();
  const serverTime = new Date(serverDate).getTime();
  const delta = serverTime ? serverTime - deviceTime : 0;

  return Math.abs(delta) > maxSupportedClockSkew ? delta : undefined;
};

export function useLiveness(challengeType: string) {
  const [isLivenessActive, setLivenessActive] = useState(false);
  const [getLivenessResponse, setGetLivenessResponse] = useState(null);

  useEffect(() => {
    mutate('CreateStreamingLivenessSession');
  }, [challengeType]);

  const {
    data: createLivenessSessionApiData,
    error: createLivenessSessionApiError,
    isValidating: createLivenessSessionApiLoading,
    mutate,
  } = useSWR(
    'CreateStreamingLivenessSession',
    async () => {
      const response = await post({
        apiName: 'BYOB',
        path: `/livenessnolight/create?challengeType=${challengeType}`,
        options: {},
      }).response;
      const { body } = response;

      const systemClockOffset = getSystemClockOffset(response.headers['date']);
      const livenessResponse = await body.json();
      return { sessionId: livenessResponse['sessionId'], systemClockOffset };
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

  const handleGetLivenessDetection = async (sessionId) => {
    const response = await get({
      apiName: 'BYOB',
      path: `/livenessnolight/${sessionId}`,
      options: {},
    }).response;
    const { body } = response;
    const livenessResponse = await body.json();
    setGetLivenessResponse(livenessResponse);
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
