import React from "react";

import { AmplifyUI, ButtonElementEmotion } from "@aws-amplify/ui-react";

export const ButtonEmotionExample = () => {
  return (
    <AmplifyUI>
      <ButtonElementEmotion
        variant="primary"
        className="my-favorite-button"
        onClick={() => alert("hello")}
        loading={true}
        type="button"
      >
        Click me (button emotion)
      </ButtonElementEmotion>
    </AmplifyUI>
  );
};
