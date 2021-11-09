import Link from 'next/link';
import { Heading } from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';

const NavLink = ({ href, children }) => {
  const { pathname } = useRouter();
  const isCurrent = pathname === href;

  return (
    <Link href={href}>
      <a className={`docs-secondary-nav-link ${isCurrent ? 'current' : ''}`}>
        {children}
      </a>
    </Link>
  );
};

// TODO: clean up this logic
export const SecondaryNav = () => {
  const router = useRouter();
  if (router.pathname.startsWith('/theming')) {
    return (
      <Sidebar>
        <NavLink href="/theming">Overview</NavLink>
        <NavLink href="/theming/responsive">Responsive</NavLink>
        <NavLink href="/theming/dark-mode">Dark mode</NavLink>
        <NavLink href="/theming/alternativeStyling">
          Alternative styling
        </NavLink>
      </Sidebar>
    );
  }

  if (router.pathname.startsWith('/getting-started')) {
    return (
      <Sidebar>
        <NavLink href="/getting-started/installation">Installation</NavLink>
      </Sidebar>
    );
  }

  if (router.pathname.startsWith('/components')) {
    return (
      <Sidebar>
        <Heading level={6}>Connected Components</Heading>
        <NavLink href="/components/authenticator">Authenticator</NavLink>
        <NavLink href="/components/chatbot">Chatbot</NavLink>
        <NavLink href="/components/chatbot">S3 Album</NavLink>

        <Heading level={6}>Base</Heading>
        <NavLink href="/components/view">View</NavLink>
        <NavLink href="/components/text">Text</NavLink>
        <NavLink href="/components/heading">Heading</NavLink>
        <NavLink href="/components/link">Link</NavLink>
        <NavLink href="/components/image">Image</NavLink>
        <NavLink href="/components/divider">Divider</NavLink>
        <NavLink href="/components/icon">Icon</NavLink>

        <Heading level={6}>Feedback</Heading>
        <NavLink href="/components/alert">Alert</NavLink>
        <NavLink href="/components/pagination">Pagination</NavLink>
        <NavLink href="/components/placeholder">Placeholder</NavLink>
        <NavLink href="/components/loader">Loader</NavLink>

        <Heading level={6}>Inputs</Heading>
        <NavLink href="/components/textfield">Text Field</NavLink>
        <NavLink href="/components/selectfield">Select Field</NavLink>
        <NavLink href="/components/stepperField">Stepper Field</NavLink>
        <NavLink href="/components/searchfield">Search Field</NavLink>
        <NavLink href="/components/passwordfield">Password Field</NavLink>
        <NavLink href="/components/phonenumberfield">
          Phone Number Field
        </NavLink>
        <NavLink href="/components/switchfield">Switch Field</NavLink>
        <NavLink href="/components/radiogroupfield">Radio Group Field</NavLink>
        <NavLink href="/components/checkboxfield">Checkbox Field</NavLink>
        <NavLink href="/components/togglebutton">Toggle Button</NavLink>
        <NavLink href="/components/button">Button</NavLink>

        <Heading level={6}>Layout</Heading>
        <NavLink href="/components/collection">Collection</NavLink>
        <NavLink href="/components/flex">Flex</NavLink>
        <NavLink href="/components/grid">Grid</NavLink>
        <NavLink href="/components/table">Table</NavLink>

        <Heading level={6}>Data Display</Heading>
        <NavLink href="/components/badge">Badge</NavLink>
        <NavLink href="/components/rating">Rating</NavLink>

        <Heading level={6}>Utilities</Heading>
        <NavLink href="/components/visuallyhidden">Visually Hidden</NavLink>
      </Sidebar>
    );
  }
  return null;
};

const Sidebar = ({ children }) => {
  return (
    <aside className="docs-sidebar">
      <div className="docs-sidebar-inner">
        <nav className="docs-sidebar-nav">{children}</nav>
        {/* <div className="docs-sidebar-footer">
          <Button size="small" as="a" href="https://github.com/aws-amplify/amplify-ui/issues/new?title=[Feedback]FEEDBACK_TITLE_HERE&labels=&body=**Page**%3A%20%5B%60%2FChooseFilterPage%60%5D(https%3A%2F%2Fdocs.amplify.aws%2Fstart)%0A%0A**Feedback**%3A%0A%0A%3C!--%20your%20feedback%20here%20--%3E">
            Feedback
          </Button>
          <Button size="small" variation="link" as="a" href="">
            <Icon
            ariaLabel="Github"
            pathData="M15.4992327,3 C8.59699202,3 3,8.5085046 3,15.3048195 C3,20.7400586 6.58118478,25.3512503 11.5489564,26.9789518 C12.1743401,27.0914936 12.4022406,26.7115707 12.4022406,26.385275 C12.4022406,26.0937239 12.3914979,25.3195271 12.3853591,24.2930554 C8.90853284,25.0362843 8.17495396,22.6434498 8.17495396,22.6434498 C7.60635359,21.2219489 6.78683241,20.8442919 6.78683241,20.8442919 C5.6519337,20.0806696 6.87277471,20.0957758 6.87277471,20.0957758 C8.12737876,20.1833922 8.78729282,21.3639479 8.78729282,21.3639479 C9.90224064,23.2439244 11.7124002,22.7008536 12.4252609,22.386643 C12.5388275,21.5912974 12.8611111,21.048982 13.2186924,20.7415693 C10.4432167,20.4311352 7.52501535,19.3752063 7.52501535,14.6605367 C7.52501535,13.3175885 8.01227747,12.219362 8.81184776,11.3590594 C8.68293432,11.0478701 8.25399018,9.79707019 8.93385513,8.10290101 C8.93385513,8.10290101 9.98357888,7.7720735 12.371547,9.3642753 C13.3683241,9.09085165 14.4379988,8.95489514 15.5007673,8.94960794 C16.5620012,8.95489514 17.6316759,9.09085165 18.6299877,9.3642753 C21.0164211,7.7720735 22.0638428,8.10290101 22.0638428,8.10290101 C22.7460098,9.79707019 22.3170657,11.0478701 22.1881522,11.3590594 C22.9892572,12.219362 23.47345,13.3175885 23.47345,14.6605367 C23.47345,19.3872913 20.5506446,20.4273587 17.7659607,20.7317502 C18.2148557,21.1116731 18.6146409,21.8624551 18.6146409,23.0105323 C18.6146409,24.6548508 18.599294,25.9819374 18.599294,26.385275 C18.599294,26.7145919 18.8241252,27.0975361 19.458717,26.9774412 C24.4211172,25.3467184 28,20.738548 28,15.3048195 C28,8.5085046 22.403008,3 15.4992327,3" />
          </Button>
        </div> */}
      </div>
    </aside>
  );
};
