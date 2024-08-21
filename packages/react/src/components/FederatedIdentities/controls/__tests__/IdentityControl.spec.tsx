import React, { forwardRef } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { CreateProviderInput, ProviderData } from '../types';
import createProvider from '../createProvider';
import { IdentityControl } from '../IdentityControl';
import { CLASS_BASE } from '../../constants';
import userEvent from '@testing-library/user-event';
import * as AuthModule from 'aws-amplify/auth';

const customRedirect = jest.fn();
const customOnClick = jest.fn();
const signInWithRedirectSpy = jest.spyOn(AuthModule, 'signInWithRedirect');

const PROVIDER_DATA_LIST: ProviderData[] = [
  { providerName: 'google', displayName: 'Google', icon: 'google' },
  {
    providerName: 'OktaClient',
    displayName: 'Okta',
    icon: <svg className="hi"></svg>,
  },
  { providerName: 'facebook', displayName: 'Facebook' },
];

describe('IdentityControl', () => {
  let user;
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    user = userEvent.setup();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const providerInput: CreateProviderInput = {
    providers: PROVIDER_DATA_LIST,
  };

  const Provider = createProvider(providerInput);

  it('renders the IdentityControl', () => {
    render(
      <Provider>
        <IdentityControl providerName="google" />
        <IdentityControl providerName="OktaClient" />
        <IdentityControl providerName="facebook" />
      </Provider>
    );

    const googleListItem = screen
      .getByText('Sign In with Google')
      .closest('li');
    const oktaListItem = screen.getByText('Sign In with Okta').closest('li');
    const facebookListItem = screen
      .getByText('Sign In with Facebook')
      .closest('li');

    expect(googleListItem).toBeInTheDocument();
    expect(googleListItem).toHaveClass(`${CLASS_BASE}__list__item`);

    expect(oktaListItem).toBeInTheDocument();
    expect(oktaListItem).toHaveClass(`${CLASS_BASE}__list__item`);

    const googleButton = googleListItem?.querySelector('button');
    const oktaButton = oktaListItem?.querySelector('button');
    const facebookButton = facebookListItem?.querySelector('button');

    expect(googleButton).toBeInTheDocument();
    expect(googleButton).toHaveClass(`${CLASS_BASE}__button`);

    expect(oktaButton).toBeInTheDocument();
    expect(oktaButton).toHaveClass(`${CLASS_BASE}__button`);

    const googleIcon = googleButton?.querySelector('svg');
    const oktaIcon = oktaButton?.querySelector('svg');
    const facebookIcon = facebookButton?.querySelector('svg');

    expect(googleIcon).toBeInTheDocument();
    expect(googleIcon).toHaveClass(`${CLASS_BASE}__icon`);

    expect(oktaIcon).toBeInTheDocument();
    expect(oktaIcon).toHaveClass('hi');

    expect(facebookIcon).not.toBeInTheDocument();

    const googleText = googleButton?.querySelector('span');
    const oktaText = oktaButton?.querySelector('span');

    expect(googleText).toBeInTheDocument();
    expect(googleText).toHaveClass(`${CLASS_BASE}__text`);

    expect(oktaText).toBeInTheDocument();
    expect(oktaText).toHaveClass(`${CLASS_BASE}__text`);
  });

  it('allows for composabiltity', async () => {
    signInWithRedirectSpy.mockResolvedValueOnce();

    const { container } = render(
      <Provider>
        <IdentityControl providerName="google">
          <p data-testid="google-composability">click here for google login!</p>
        </IdentityControl>
      </Provider>
    );

    const googleListItem = container.querySelector('li');

    expect(googleListItem).toBeInTheDocument();
    expect(googleListItem).toHaveClass(`${CLASS_BASE}__list__item`);

    const googleButton = googleListItem?.querySelector('button');

    expect(googleButton).toBeInTheDocument();
    expect(googleButton).toHaveClass(`${CLASS_BASE}__button`);

    user.click(googleButton);

    await waitFor(() => {
      expect(signInWithRedirectSpy).toHaveBeenCalled();
    });

    const googleText = googleButton?.querySelector('p');
    expect(googleText).toBeInTheDocument();
    expect(screen.getByTestId('google-composability')).toEqual(googleText);
    expect(googleText).toHaveTextContent('click here for google login!');
  });

  it('calls signInWithRedirect onClick', async () => {
    signInWithRedirectSpy.mockResolvedValueOnce();

    render(
      <Provider>
        <IdentityControl providerName="google" />
        <IdentityControl providerName="OktaClient" />
      </Provider>
    );

    const oktaButton = screen.getByText('Sign In with Okta').closest('button');

    expect(oktaButton).not.toBeNull();

    if (oktaButton === null) return;

    user.click(oktaButton);

    await waitFor(() => {
      expect(signInWithRedirectSpy).toHaveBeenCalled();
    });

    jest.clearAllMocks();
    signInWithRedirectSpy.mockResolvedValueOnce();

    const googleButton = screen
      .getByText('Sign In with Google')
      .closest('button');

    expect(googleButton).not.toBeNull();

    if (googleButton === null) return;

    user.click(googleButton);

    await waitFor(() => {
      expect(signInWithRedirectSpy).toHaveBeenCalled();
    });
  });
  it('supports icon overrides', () => {
    render(
      <Provider>
        <IdentityControl providerName="google" />
        <IdentityControl providerName="OktaClient" />
      </Provider>
    );

    const googleListItem = screen
      .getByText('Sign In with Google')
      .closest('li');
    const oktaListItem = screen.getByText('Sign In with Okta').closest('li');

    const googlePaths = googleListItem
      ?.querySelector('svg')
      ?.querySelectorAll('path');
    const oktaPaths = oktaListItem
      ?.querySelector('svg')
      ?.querySelectorAll('path');

    expect(googlePaths?.length).toBe(4);
    expect(oktaPaths?.length).toBe(0);
  });
  it('supports displayText changes', () => {
    const displayProviderInput: CreateProviderInput = {
      ...providerInput,
      displayText: (displayText: string) => {
        return `testing ${displayText}`;
      },
    };

    const DisplayTextProvider = createProvider(displayProviderInput);

    render(
      <DisplayTextProvider>
        <IdentityControl providerName="google" />
        <IdentityControl providerName="OktaClient" />
      </DisplayTextProvider>
    );

    const googleText = screen.getByText('testing Google');
    const oktaText = screen.getByText('testing Okta');

    expect(googleText).toBeInTheDocument();
    expect(oktaText).toBeInTheDocument();
  });
  it('supports handleSignInWithRedirect changes', async () => {
    const redirectProviderInput: CreateProviderInput = {
      ...providerInput,
      handleSignInWithRedirect: customRedirect,
    };

    const RedirectProvider = createProvider(redirectProviderInput);

    render(
      <RedirectProvider>
        <IdentityControl providerName="google" />
        <IdentityControl providerName="OktaClient" />
      </RedirectProvider>
    );

    const oktaButton = screen.getByText('Sign In with Okta').closest('button');

    user.click(oktaButton);

    await waitFor(() => {
      expect(customRedirect.mock.calls.length).toBe(1);
    });

    const googleButton = screen
      .getByText('Sign In with Google')
      .closest('button');

    user.click(googleButton);

    await waitFor(() => {
      expect(customRedirect.mock.calls.length).toBe(1);
    });
  });
  it('throws an error for invalid providerNames', () => {
    expect(() =>
      render(
        <Provider>
          <IdentityControl providerName="amazon" />
        </Provider>
      )
    ).toThrow('Undeclared providerName: amazon');
  });
  it('supports custom elements', () => {
    const myButton = forwardRef<
      HTMLButtonElement,
      React.ButtonHTMLAttributes<HTMLButtonElement>
    >(function Button({ children, className, onClick, ...props }, ref) {
      return (
        <button className="button" onClick={customOnClick} {...props} ref={ref}>
          {children}
        </button>
      );
    });

    const myIcon = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
      function Button({ children, className, ...props }, ref) {
        return (
          <svg className="icon" {...props} ref={ref}>
            {children}
          </svg>
        );
      }
    );

    const myListItem = forwardRef<
      HTMLLIElement,
      React.LiHTMLAttributes<HTMLLIElement>
    >(function ListItem({ children, className, ...props }, ref) {
      return (
        <li className="list-item" {...props} ref={ref}>
          {children}
        </li>
      );
    });

    const myText = forwardRef<
      HTMLSpanElement,
      React.HTMLAttributes<HTMLSpanElement>
    >(function Text({ children, className, ...props }, ref) {
      return (
        <span className="text" {...props} ref={ref}>
          {children}
        </span>
      );
    });

    const elementsProviderInput: CreateProviderInput = {
      ...providerInput,
      elements: {
        Button: myButton,
        Icon: myIcon,
        ListItem: myListItem,
        Text: myText,
      },
    };

    const ElementsProvider = createProvider(elementsProviderInput);

    render(
      <ElementsProvider>
        <IdentityControl providerName="google" />
        <IdentityControl providerName="OktaClient" />
      </ElementsProvider>
    );

    const googleListItem = screen
      .getByText('Sign In with Google')
      .closest('li');
    const oktaListItem = screen.getByText('Sign In with Okta').closest('li');

    expect(googleListItem).toHaveClass('list-item');
    expect(oktaListItem).toHaveClass('list-item');

    const googleButton = googleListItem?.querySelector('button');
    const oktaButton = oktaListItem?.querySelector('button');

    expect(googleButton).toHaveClass('button');
    expect(oktaButton).toHaveClass('button');

    const googleIcon = googleButton?.querySelector('svg');
    const oktaIcon = oktaButton?.querySelector('svg');

    expect(googleIcon).toHaveClass('icon');
    expect(oktaIcon).toHaveClass('hi');

    const googleText = googleButton?.querySelector('span');
    const oktaText = oktaButton?.querySelector('span');

    expect(googleText).toHaveClass('text');
    expect(oktaText).toHaveClass('text');
  });
  it('allows for passing in props', () => {
    render(
      <Provider>
        <IdentityControl className="button" providerName="google" />
      </Provider>
    );

    const oktaButton = screen
      .getByText('Sign In with Google')
      .closest('button');
    expect(oktaButton).toHaveClass('button');
  });
});
