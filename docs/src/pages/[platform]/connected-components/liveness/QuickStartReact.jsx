import React from 'react';
import { FaceLivenessDetector } from '@aws-amplify/ui-react-liveness';
import { Loader, ThemeProvider } from '@aws-amplify/ui-react';

export function LivenessQuickStartReact() {
  const [loading, setLoading] = React.useState(true);
  const [createLivenessApiData, setCreateLivenessApiData] =
    React.useState(null);
  const fetchCreateLiveness = async () => {
      /*
       * This should be replaced with a real call to your own backend API
       */
      await new Promise((r) => setTimeout(r, 2000));
      const mockResponse = { sessionId: 'mockSessionId' };
      const data = mockResponse;

      setCreateLivenessApiData(data);
      setLoading(false);
  };

  React.useEffect(() => {
    fetchCreateLiveness();
  }, []);

  const handleAnalysisComplete = async () => {
    /*
     * This should be replaced with a real call to your own backend API
     */
    const response = await fetch(
      `/api/get?sessionId=${createLivenessApiData.sessionId}`
    );
    const data = await response.json();

    /*
     * Note: The isLive flag is not returned from the GetFaceLivenessSession API
     * This should be returned from your backend based on the score that you
     * get in response. Based on the return value of your API you can determine what to render next.
     * Any next steps from an authorization perspective should happen in your backend and you should not rely
     * on this value for any auth related decisions.
     */
    if (data.isLive) {
      console.log('User is live');
    } else {
      console.log('User is not live');
    }
  };

  // Use a ref to track if we're currently handling an error
  const isHandlingError = React.useRef(false);

  const handleError = async (error) => {
      console.error('Liveness error:', error);

      // Simple infinite loop prevention
      if (isHandlingError.current) return;
      isHandlingError.current = true;
      setLoading(true);

      // Create a new session for retry - sessions are single-use
      await fetchCreateLiveness();

      // Reset error handling flag
      isHandlingError.current = false;
  };

  return (
    <ThemeProvider>
      {loading ? (
        <Loader />
      ) : (
        <FaceLivenessDetector
          sessionId={createLivenessApiData.sessionId}
          region="us-east-1"
          onAnalysisComplete={handleAnalysisComplete}
          onError={handleError}
        />
      )}
    </ThemeProvider>
  );
}
