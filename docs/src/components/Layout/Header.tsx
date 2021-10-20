import { useState } from 'react';
import Link from 'next/link';
import { Icon, IconChevronRight, IconNotStarted, IconWidgets, IconDeviceHub, SearchField, View, Heading, Button, IconSearch, Flex } from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';
import { Logo } from '@/components/Logo';
import { FrameworkChooser } from './FrameworkChooser';

const NavSection = ({ children, title, icon }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <section className={`docs-nav-section ${expanded ? 'expanded' : ''}`}
      onClick={() => setExpanded(!expanded)}>
      <div className="docs-nav-section-title">
        {icon}
        <span>{title}</span>
        <IconChevronRight className="chevron" />
      </div>
      <div className="docs-nav-section-links">
      {children}
      </div>
    </section>
  )
}

const NavLink = ({ href, children }) => {
  const router = useRouter();
  const isCurrent = router.pathname.startsWith(href);
  
  return (
    <Link href={href}>
      <a className={`docs-nav-link ${isCurrent ? 'current' : ''}`}>{children}</a>
    </Link>
  )
}

export const Header = () => {
  
  return (
    <header className="docs-header">

      <Link href="/">
        <a className="docs-logo-link">
          <Logo />
          Amplify UI
        </a>
      </Link>

      <nav className="docs-nav">
        <NavLink href="/getting-started">Getting started</NavLink>
        <NavLink href="/ui/primitives">Components</NavLink>
        <NavLink href="/ui/theming">Theming</NavLink>
        {/* <NavSection title="Get started" icon={<IconNotStarted style={{height: '24px'}} />}>
          <NavLink href="/getting-started/installation">Installation</NavLink>
          <NavLink href="/getting-started/usage">Usage</NavLink>
        </NavSection>
        
        <NavSection title="Connected components" icon={<IconDeviceHub style={{height: '24px'}} />}>
          <Heading level={5}>Authentication</Heading>
          <NavLink href="/connected-components/authenticator">Authenticator</NavLink>
        </NavSection>
        
        <NavSection title="Primitive components" icon={<IconWidgets style={{height: '24px'}} />}>
          <Heading level={6}>Base</Heading>
          <NavLink href="/ui/primitives/text">Text</NavLink>
          <NavLink href="/ui/primitives/heading">Heading</NavLink>
          <NavLink href="/ui/primitives/image">Image</NavLink>
          <Heading level={6}>Forms</Heading>
          <NavLink href="/ui/primitives/textfield">Text Field</NavLink>
          <NavLink href="/ui/primitives/selectfield">Select Field</NavLink>
          <NavLink href="/ui/primitives/stepperField">Stepper Field</NavLink>
          <NavLink href="/ui/primitives/searchfield">Search Field</NavLink>
          <NavLink href="/ui/primitives/passwordfield">Password Field</NavLink>
          <NavLink href="/ui/primitives/phonenumberfield">Phone Number Field</NavLink>
          <NavLink href="/ui/primitives/switchfield">Switch Field</NavLink>
          <NavLink href="/ui/primitives/radiogroupfield">Radio Group Field</NavLink>
          <NavLink href="/ui/primitives/checkboxfield">Checkbox Field</NavLink>
          <NavLink href="/ui/primitives/alert">Alert</NavLink>
          <NavLink href="/ui/primitives/badge">Badge</NavLink>
          <NavLink href="/ui/primitives/button">Button</NavLink>
          <Heading level={6}>Layout</Heading>
          <NavLink href="/ui/primitives/flex">Flex</NavLink>
          <NavLink href="/ui/primitives/grid">Grid</NavLink>
          <Heading level={6}>Utilities</Heading>
          <NavLink href="/ui/primitives/visuallyhidden">Visually Hidden</NavLink>
        </NavSection>
        
        <NavSection title="Theming" icon={<IconNotStarted style={{height: '24px'}} />}>
          <NavLink href="/theming/introduction">Introduction</NavLink>
          <NavLink href="/theming/colors">Colors</NavLink>
        </NavSection>
        
        <NavSection title="Guides" icon={<IconNotStarted style={{height: '24px'}} />}>
          
        </NavSection>
        
        <NavSection title="Examples" icon={<IconNotStarted style={{height: '24px'}} />}>
          
        </NavSection> */}
      </nav>
      <Flex direction="row" alignItems="center">
        <Button variation="primary">
          <IconSearch />
        </Button>
        <FrameworkChooser />
        {/* <SearchField label="Search docs"
          labelHidden={true}
          placeholder="Search" /> */}
      </Flex>
      {/* <footer className="docs-nav-footer">
        <Link href="https://github.com/aws-amplify/amplify-ui">
        <Icon
          ariaLabel="Github"
          color="var(--amplify-colors-font-tertiary)"
          pathData="M15.4992327,3 C8.59699202,3 3,8.5085046 3,15.3048195 C3,20.7400586 6.58118478,25.3512503 11.5489564,26.9789518 C12.1743401,27.0914936 12.4022406,26.7115707 12.4022406,26.385275 C12.4022406,26.0937239 12.3914979,25.3195271 12.3853591,24.2930554 C8.90853284,25.0362843 8.17495396,22.6434498 8.17495396,22.6434498 C7.60635359,21.2219489 6.78683241,20.8442919 6.78683241,20.8442919 C5.6519337,20.0806696 6.87277471,20.0957758 6.87277471,20.0957758 C8.12737876,20.1833922 8.78729282,21.3639479 8.78729282,21.3639479 C9.90224064,23.2439244 11.7124002,22.7008536 12.4252609,22.386643 C12.5388275,21.5912974 12.8611111,21.048982 13.2186924,20.7415693 C10.4432167,20.4311352 7.52501535,19.3752063 7.52501535,14.6605367 C7.52501535,13.3175885 8.01227747,12.219362 8.81184776,11.3590594 C8.68293432,11.0478701 8.25399018,9.79707019 8.93385513,8.10290101 C8.93385513,8.10290101 9.98357888,7.7720735 12.371547,9.3642753 C13.3683241,9.09085165 14.4379988,8.95489514 15.5007673,8.94960794 C16.5620012,8.95489514 17.6316759,9.09085165 18.6299877,9.3642753 C21.0164211,7.7720735 22.0638428,8.10290101 22.0638428,8.10290101 C22.7460098,9.79707019 22.3170657,11.0478701 22.1881522,11.3590594 C22.9892572,12.219362 23.47345,13.3175885 23.47345,14.6605367 C23.47345,19.3872913 20.5506446,20.4273587 17.7659607,20.7317502 C18.2148557,21.1116731 18.6146409,21.8624551 18.6146409,23.0105323 C18.6146409,24.6548508 18.599294,25.9819374 18.599294,26.385275 C18.599294,26.7145919 18.8241252,27.0975361 19.458717,26.9774412 C24.4211172,25.3467184 28,20.738548 28,15.3048195 C28,8.5085046 22.403008,3 15.4992327,3" />
        </Link>
      </footer> */}
    </header>
  )
}
