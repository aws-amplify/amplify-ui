import { Theme } from '../index';

describe('Amplify UI Theme', () => {
  describe('components', () => {
    it('should allow empty components', () => {
      const theme: Theme = {
        name: 'test',
        tokens: {
          components: {
            accordion: {},
            alert: {},
            authenticator: {},
            autocomplete: {},
            badge: {},
            button: {},
            card: {},
            checkbox: {},
            checkboxfield: {},
            collection: {},
            copy: {},
            divider: {},
            field: {},
            fieldcontrol: {},
            fieldgroup: {},
            fieldmessages: {},
            flex: {},
            heading: {},
            highlightmatch: {},
            icon: {},
            image: {},
            inappmessaging: {},
            link: {},
            loader: {},
            menu: {},
            pagination: {},
            passwordfield: {},
            phonenumberfield: {},
            placeholder: {},
            radio: {},
            radiogroup: {},
            rating: {},
            searchfield: {},
            select: {},
            selectfield: {},
            sliderfield: {},
            stepperfield: {},
            switchfield: {},
            table: {},
            tabs: {},
            text: {},
            textareafield: {},
            textfield: {},
            togglebutton: {},
            togglebuttongroup: {},
          },
        },
      };
      // This test doesn't test anything, but
      // if there is a TS error it will fail
      expect(theme).toMatchSnapshot();
    });
  });
});
