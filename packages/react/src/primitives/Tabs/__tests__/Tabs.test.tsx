import { render, screen } from '@testing-library/react';
import { Tabs, TabItem } from '../Tabs';
import { ComponentClassNames } from '../../shared';
import { ComponentPropsToStylePropsMap } from '../../types';
import { kebabCase } from 'lodash';

describe('Tabs: ', () => {
  //   it('can render Tabs', async () => {
  //     render(
  //       <Tabs testId="tabsTest">
  //         <TabItem title="Tab 1">Testing</TabItem>
  //         <TabItem title="Tab 2">Testing</TabItem>
  //       </Tabs>
  //     );

  //     const tabs = await screen.findByTestId('tabsTest');
  //     console.log(tabs);
  //   });

  // it('can render a heading for the alert', async () => {
  //   render(
  //     <Alert heading="Test heading" testId="alertHeading">
  //       Testing the alert heading
  //     </Alert>
  //   );

  //   const alert = await screen.findByText('Test heading');
  //   expect(alert.nodeName).toBe('H6');
  //   expect(
  //     alert.parentElement.parentElement.parentElement.classList.contains(
  //       ComponentClassNames.Alert
  //     )
  //   ).toBe(true);
  // });

  // it('can render an icon via the hasIcon prop', async () => {
  //   render(
  //     <div>
  //       <Alert variation="info" testId="hasIcon">
  //         Has Icon
  //       </Alert>
  //       <Alert variation="info" hasIcon={false} testId="noIcon">
  //         No Icon
  //       </Alert>
  //       <Alert testId="default">Default Alert Without Icon</Alert>
  //     </div>
  //   );

  //   const hasIcon = await screen.findByTestId('hasIcon');
  //   const noIcon = await screen.findByTestId('noIcon');
  //   const defaultAlert = await screen.findByTestId('default');

  //   expect(hasIcon.firstElementChild.childElementCount).toBe(2);
  //   expect(noIcon.firstElementChild.childElementCount).toBe(1);
  //   expect(defaultAlert.firstElementChild.childElementCount).toBe(1);
  //   expect(
  //     hasIcon.firstElementChild.firstElementChild.classList.contains(
  //       ComponentClassNames.Icon
  //     )
  //   ).toBe(true);
  //   expect(
  //     noIcon.firstElementChild.firstElementChild.classList.contains(
  //       ComponentClassNames.Icon
  //     )
  //   ).toBe(false);
  // });

  // it('can be dismissible', async () => {
  //   render(
  //     <div>
  //       <Alert testId="notDismissible">Not dismissible by default</Alert>
  //       <Alert isDismissible={true} testId="isDismissible">
  //         Is dismissible
  //       </Alert>
  //     </div>
  //   );

  //   const notDismissible = await screen.findByTestId('notDismissible');
  //   const isDismissible = await screen.findByTestId('isDismissible');

  //   expect(notDismissible.childElementCount).toBe(1);
  //   expect(isDismissible.childElementCount).toBe(2);
  // });

  // it('can apply styling via props', async () => {
  //   render(
  //     <Alert backgroundColor="white" fontStyle="italic" testId="alertId">
  //       Test alert
  //     </Alert>
  //   );
  //   const alert = await screen.findByTestId('alertId');
  //   expect(
  //     alert.style.getPropertyValue(
  //       kebabCase(ComponentPropsToStylePropsMap.backgroundColor)
  //     )
  //   ).toBe('white');
  //   expect(
  //     alert.style.getPropertyValue(
  //       kebabCase(ComponentPropsToStylePropsMap.fontStyle)
  //     )
  //   ).toBe('italic');
  // });

  // it('can apply a custom className', async () => {
  //   render(<Alert className="custom-alert" testId="alertId"></Alert>);
  //   const alert = await screen.findByTestId('alertId');
  //   expect(alert.classList.contains('custom-alert')).toBe(true);
  //   expect(alert.classList.contains(ComponentClassNames.Alert)).toBe(true);
  // });

  it('can render any arbitrary data-* attribute', async () => {
    render(
      <Tabs data-demo="true" testId="dataTest">
        <TabItem title="Tab 1">Tab 1</TabItem>
        <TabItem title="Tab 2">Tab 2</TabItem>
      </Tabs>
    );
    const alert = await screen.findByTestId('dataTest');
    expect(alert.dataset['demo']).toBe('true');
  });
});
