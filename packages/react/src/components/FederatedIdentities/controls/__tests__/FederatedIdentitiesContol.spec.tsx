import React, { forwardRef } from 'react';
import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { createFederatedIdentities } from '../FederatedIdentitiesControl';
import { signInWithRedirect } from 'aws-amplify/auth';
import {
  AuthProvider,
  DefaultFederatedProviderList,
  ProviderData,
  ProviderType,
} from '../types';
import { UseHandleSignInWithRedirectProvider } from '../../context';
import { capitalize, FederatedProvider } from '@aws-amplify/ui';

describe('FederatedIdentityControl', () => {
  const mockProviders: ProviderType[] = [
    'google',
    {
      providerName: 'okta',
      displayName: 'Okta',
      icon: <svg className="oktaIcon"></svg>,
    },
    { providerName: 'facebook', displayName: 'Facebook', icon: 'facebook' },
  ];

  function myCustomRender(data: ProviderData): React.JSX.Element {
    const { providerName, displayName } = data;

    const myOnClick = () => {
      if (
        DefaultFederatedProviderList.includes(providerName as FederatedProvider)
      ) {
        signInWithRedirect({
          provider: capitalize(providerName) as AuthProvider,
        });
      } else {
        signInWithRedirect({ provider: { custom: providerName } });
      }
    };

    return (
      <div key={`${providerName}`}>
        <button
          key={`${providerName}`}
          data-testid={`${providerName}-custom-button`}
          onClick={() => myOnClick()}
        >
          Click here for {displayName} login!
        </button>
      </div>
    );
  }

  const { FederatedIdentities, useHandleSignInWithRedirect } =
    createFederatedIdentities({
      providers: mockProviders,
    });

  it('renders the FederatedIdentitiesControl', () => {
    const { container } = render(<FederatedIdentities />);

    const groupControl = container?.querySelector(
      '.federated-identities__group'
    );
    expect(groupControl).toBeInTheDocument();

    expect(screen.getByLabelText('Federated Identities Button Group')).toEqual(
      groupControl
    );

    const googleButton = screen
      .getByText('Sign In with Google')
      .closest('button');
    expect(googleButton).toBeInTheDocument();

    const oktaButton = screen.getByText('Sign In with Okta').closest('button');
    expect(oktaButton).toBeInTheDocument();

    const facebookButton = screen
      .getByText('Sign In with Facebook')
      .closest('button');
    expect(facebookButton).toBeInTheDocument();
  });

  it('allows for composability', () => {
    const { container } = render(
      <FederatedIdentities>
        <p data-testid="identity-composability">See the below buttons</p>
        <FederatedIdentities.Identity providerName="okta">
          <p data-testid="okta-composability">click here for okta</p>
        </FederatedIdentities.Identity>
        <FederatedIdentities.Identity providerName="facebook">
          <svg data-testid="facebook-composability" />
        </FederatedIdentities.Identity>
      </FederatedIdentities>
    );

    const groupControl = container?.querySelector(
      '.federated-identities__group'
    );
    expect(groupControl).not.toBeNull();
    if (groupControl === null) {
      return;
    }

    const identityText = groupControl.querySelector(
      '[data-testid="identity-composability"]'
    );
    expect(identityText).toBeInTheDocument();
    expect(identityText).toHaveTextContent('See the below buttons');

    const oktaButton = screen
      .getByText('click here for okta')
      .closest('button');
    expect(oktaButton).toBeInTheDocument();
    expect(oktaButton).not.toBeNull();
    if (oktaButton === null) {
      return;
    }

    const oktaText = oktaButton.querySelector(
      '[data-testid="okta-composability"]'
    );
    expect(oktaText).toBeInTheDocument();
    expect(oktaText).toHaveTextContent('click here for okta');

    const facebookSVG = groupControl.querySelector(
      '[data-testid="facebook-composability"]'
    );
    expect(facebookSVG).toBeInTheDocument();
    expect(facebookSVG).not.toBeNull();
    if (facebookSVG === null) {
      return;
    }
    const facebookButton = facebookSVG.closest('button');
    expect(facebookButton).toBeInTheDocument();
  });

  it('allows for useHandleSignInWithRedirect usage', () => {
    const wrapper = ({ children }) => (
      <UseHandleSignInWithRedirectProvider>
        {children}
      </UseHandleSignInWithRedirectProvider>
    );
    const { result } = renderHook(() => useHandleSignInWithRedirect(), {
      wrapper,
    });

    expect(() => result.current).not.toThrow(
      'useHandleSignInWithRedirect must be used within a UseHandleSignInWithRedirectProvider'
    );
  });

  it('allows for a custom button renderer', () => {
    render(<FederatedIdentities renderButton={myCustomRender} />);

    const googleButton = screen.getByTestId('google-custom-button');
    expect(googleButton).toBeInTheDocument();
    expect(googleButton).toHaveTextContent('Click here for Google login!');

    const oktaButton = screen.getByTestId('okta-custom-button');
    expect(oktaButton).toBeInTheDocument();
    expect(oktaButton).toHaveTextContent('Click here for Okta login!');

    const facebookButton = screen.getByTestId('facebook-custom-button');
    expect(facebookButton).toBeInTheDocument();
    expect(facebookButton).toHaveTextContent('Click here for Facebook login!');
  });

  it('has a TS error when button renderer and children are passed in', () => {
    render(
      // @ts-expect-error
      <FederatedIdentities renderButton={myCustomRender}>
        <p />
      </FederatedIdentities>
    );
  });

  it('allows for custom elements', () => {
    const customGroup = forwardRef<
      HTMLDivElement,
      React.HTMLAttributes<HTMLDivElement>
    >(function Group({ children, className, ...props }, ref) {
      return (
        <div className="custom-group" {...props} ref={ref}>
          {children}
        </div>
      );
    });

    const { FederatedIdentities: CustomFederatedIdentities } =
      createFederatedIdentities({
        providers: mockProviders,
        elements: {
          Group: customGroup,
        },
      });

    const { container } = render(<CustomFederatedIdentities />);

    const customGroupControl = container.querySelector('.custom-group');
    expect(customGroupControl).toBeInTheDocument();
  });

  it('allows for custom props', () => {
    const { container } = render(
      <FederatedIdentities className="custom-prop" />
    );
    const customGroupControl = container.querySelector('.custom-prop');
    expect(customGroupControl).toBeInTheDocument();
  });
});
