import { Authenticator } from "@aws-amplify/ui-react";

export const customComponents = {
  Input(props) {
    return (
      <input
        className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
        {...props}
      />
    );
  },
  "Authenticator.SignIn.Button": props => {
    return props.type === "submit" ? (
      <button
        className="px-4 py-2 font-bold text-white bg-purple-500 border-b-4 border-purple-700 rounded-md shadow hover:bg-purple-600"
        {...props}
      >
        Custom Sign In
      </button>
    ) : (
      <button {...props} />
    );
  },
  "Authenticator.SignUp.PasswordControl": ({ label }) => {
    return (
      <>
        <Authenticator.SignUp.PasswordControl label={label} />
        <div className="flex items-center">
          <input className="mr-2" type="checkbox" /> Always remember this
          computer
        </div>
      </>
    );
  }
};
