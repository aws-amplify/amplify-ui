import { useState } from 'react';
import {
  LivenessFlow,
  LivenessFlowProps,
  LivenessStatus,
} from '@aws-amplify/ui-react';
import { GetServerSideProps } from 'next';
import { Amplify, API, withSSRContext } from 'aws-amplify';
import awsExports from '@environments/liveness/src/aws-exports';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure({
  ...awsExports,
  ssr: true,
  API: {
    endpoints: [
      {
        name: 'SampleBackend',
        endpoint: 'https://zoi5y67js7.execute-api.us-west-2.amazonaws.com/prod',
        region: 'us-west-2',
      },
    ],
  },
});

export default function App({
  sessionId,
  livenessSeed,
}: {
  sessionId: string;
  livenessSeed: string;
}) {
  const [isLivenessVisible, setLivenessVisible] = useState(false);

  const handleStartLiveness = () => {
    setLivenessVisible(true);
  };

  const handleUserExit = () => {
    setLivenessVisible(false);
  };

  const handleSuccess = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLivenessVisible(false);
  };

  const handleGetLivenessDetection: LivenessFlowProps['onGetLivenessDetection'] =
    async (sessionId) => {
      let response;
      // TODO: remove try/catch and return response
      try {
        response = await API.get('SampleBackend', `/liveness/${sessionId}`, {});
        console.log({ response });
      } catch (err) {
        console.log({ err });
      }

      return { isLive: LivenessStatus.SUCCESS };
    };

  return (
    <div>
      {isLivenessVisible ? (
        <LivenessFlow
          sessionId={sessionId}
          livenessSeed={livenessSeed}
          onUserExit={handleUserExit}
          onGetLivenessDetection={handleGetLivenessDetection}
          onSuccess={handleSuccess}
        />
      ) : (
        <button id="StartButton" onClick={handleStartLiveness}>
          Start Liveness
        </button>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { API } = withSSRContext(context);

  let response;
  try {
    response = await API.post('SampleBackend', '/liveness/start', {});
  } catch (err) {
    console.log({ err: err.response?.data });
  }

  if (!response) {
    return {
      notFound: true,
    };
  }

  const sessionId = response.sessionId;
  const livenessSeed = response.seed;

  return {
    props: {
      sessionId,
      livenessSeed,
    },
  };
};
