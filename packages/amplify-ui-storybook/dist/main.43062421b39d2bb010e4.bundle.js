(window.webpackJsonp = window.webpackJsonp || []).push([
  [1],
  {
    1638: function (module, exports) {},
    1689: function (module, __webpack_exports__, __webpack_require__) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        function (module) {
          var _storybook_react__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(231);
          (module._StorybookPreserveDecorators = !0),
            Object(_storybook_react__WEBPACK_IMPORTED_MODULE_0__.configure)(
              [__webpack_require__(1691)],
              module
            );
        }.call(this, __webpack_require__(1690)(module));
    },
    1691: function (module, exports, __webpack_require__) {
      var map = {
        './0-Welcome.stories.mdx': 1692,
        './AmplifyAuthenticator.stories.tsx': 1704,
      };
      function webpackContext(req) {
        var id = webpackContextResolve(req);
        return __webpack_require__(id);
      }
      function webpackContextResolve(req) {
        if (!__webpack_require__.o(map, req)) {
          var e = new Error("Cannot find module '" + req + "'");
          throw ((e.code = 'MODULE_NOT_FOUND'), e);
        }
        return map[req];
      }
      (webpackContext.keys = function webpackContextKeys() {
        return Object.keys(map);
      }),
        (webpackContext.resolve = webpackContextResolve),
        (module.exports = webpackContext),
        (webpackContext.id = 1691);
    },
    1692: function (module, __webpack_exports__, __webpack_require__) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, '__page', function () {
          return __page;
        });
      __webpack_require__(10),
        __webpack_require__(17),
        __webpack_require__(8),
        __webpack_require__(9),
        __webpack_require__(74),
        __webpack_require__(605),
        __webpack_require__(61),
        __webpack_require__(606),
        __webpack_require__(2);
      var _Meta,
        _Description,
        _AddContext,
        _mdx_js_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(31),
        _storybook_addon_docs_blocks__WEBPACK_IMPORTED_MODULE_10__ =
          __webpack_require__(90),
        _aws_amplify_ui_components_Readme_md__WEBPACK_IMPORTED_MODULE_11__ =
          __webpack_require__(662),
        _excluded = ['components'];
      function ownKeys(object, enumerableOnly) {
        var keys = Object.keys(object);
        if (Object.getOwnPropertySymbols) {
          var symbols = Object.getOwnPropertySymbols(object);
          enumerableOnly &&
            (symbols = symbols.filter(function (sym) {
              return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            })),
            keys.push.apply(keys, symbols);
        }
        return keys;
      }
      function _objectSpread(target) {
        for (var source, i = 1; i < arguments.length; i++)
          (source = null != arguments[i] ? arguments[i] : {}),
            i % 2
              ? ownKeys(Object(source), !0).forEach(function (key) {
                  _defineProperty(target, key, source[key]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(
                  target,
                  Object.getOwnPropertyDescriptors(source)
                )
              : ownKeys(Object(source)).forEach(function (key) {
                  Object.defineProperty(
                    target,
                    key,
                    Object.getOwnPropertyDescriptor(source, key)
                  );
                });
        return target;
      }
      function _defineProperty(obj, key, value) {
        return (
          key in obj
            ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (obj[key] = value),
          obj
        );
      }
      function _extends() {
        return (_extends =
          Object.assign ||
          function (target) {
            for (var source, i = 1; i < arguments.length; i++)
              for (var key in (source = arguments[i]))
                Object.prototype.hasOwnProperty.call(source, key) &&
                  (target[key] = source[key]);
            return target;
          }).apply(this, arguments);
      }
      function _objectWithoutProperties(source, excluded) {
        if (null == source) return {};
        var key,
          i,
          target = (function _objectWithoutPropertiesLoose(source, excluded) {
            if (null == source) return {};
            var key,
              i,
              target = {},
              sourceKeys = Object.keys(source);
            for (i = 0; i < sourceKeys.length; i++)
              (key = sourceKeys[i]),
                0 <= excluded.indexOf(key) || (target[key] = source[key]);
            return target;
          })(source, excluded);
        if (Object.getOwnPropertySymbols) {
          var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
          for (i = 0; i < sourceSymbolKeys.length; i++)
            (key = sourceSymbolKeys[i]),
              0 <= excluded.indexOf(key) ||
                (Object.prototype.propertyIsEnumerable.call(source, key) &&
                  (target[key] = source[key]));
        }
        return target;
      }
      var layoutProps = {};
      function MDXContent(_ref) {
        var components = _ref.components,
          props = _objectWithoutProperties(_ref, _excluded);
        return Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_9__.mdx)(
          'wrapper',
          _extends({}, layoutProps, props, {
            components: components,
            mdxType: 'MDXLayout',
          }),
          _Meta ||
            (_Meta = Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_9__.mdx)(
              _storybook_addon_docs_blocks__WEBPACK_IMPORTED_MODULE_10__.Meta,
              { title: 'Welcome', mdxType: 'Meta' }
            )),
          _Description ||
            (_Description = Object(
              _mdx_js_react__WEBPACK_IMPORTED_MODULE_9__.mdx
            )(
              _storybook_addon_docs_blocks__WEBPACK_IMPORTED_MODULE_10__.Description,
              { mdxType: 'Description' },
              _aws_amplify_ui_components_Readme_md__WEBPACK_IMPORTED_MODULE_11__.a
            ))
        );
      }
      (MDXContent.displayName = 'MDXContent'), (MDXContent.isMDXComponent = !0);
      var __page = function () {
        throw new Error('Docs-only story');
      };
      __page.story = { parameters: { docsOnly: !0 } };
      var componentMeta = { title: 'Welcome', includeStories: ['__page'] },
        mdxStoryNameToKey = {};
      (componentMeta.parameters = componentMeta.parameters || {}),
        (componentMeta.parameters.docs = _objectSpread(
          _objectSpread({}, componentMeta.parameters.docs || {}),
          {},
          {
            page: function page() {
              return (
                _AddContext ||
                (_AddContext = Object(
                  _mdx_js_react__WEBPACK_IMPORTED_MODULE_9__.mdx
                )(
                  _storybook_addon_docs_blocks__WEBPACK_IMPORTED_MODULE_10__.AddContext,
                  {
                    mdxStoryNameToKey: mdxStoryNameToKey,
                    mdxComponentMeta: componentMeta,
                  },
                  Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_9__.mdx)(
                    MDXContent,
                    null
                  )
                ))
              );
            },
          }
        )),
        (__webpack_exports__.default = componentMeta);
    },
    1695: function (module, exports, __webpack_require__) {
      var map = {
        './amplify-amazon-button_5.entry.js': [1707, 198],
        './amplify-auth-fields_9.entry.js': [1708, 199],
        './amplify-authenticator.entry.js': [1709, 192],
        './amplify-button_3.entry.js': [1710, 200],
        './amplify-chatbot.entry.js': [1734, 193],
        './amplify-checkbox.entry.js': [1711, 201],
        './amplify-confirm-sign-in_7.entry.js': [1712, 194],
        './amplify-container.entry.js': [1713, 202],
        './amplify-federated-buttons_2.entry.js': [1714, 203],
        './amplify-federated-sign-in.entry.js': [1715, 204],
        './amplify-form-field_4.entry.js': [1716, 205],
        './amplify-greetings.entry.js': [1717, 206],
        './amplify-icon-button.entry.js': [1718, 207],
        './amplify-icon.entry.js': [1719, 195],
        './amplify-link.entry.js': [1720, 208],
        './amplify-nav_2.entry.js': [1721, 209],
        './amplify-photo-picker.entry.js': [1722, 210],
        './amplify-picker.entry.js': [1723, 211],
        './amplify-radio-button_2.entry.js': [1724, 196],
        './amplify-s3-album.entry.js': [1725, 0, 212],
        './amplify-s3-image-picker.entry.js': [1726, 0, 213],
        './amplify-s3-image.entry.js': [1727, 0, 214],
        './amplify-s3-text-picker.entry.js': [1728, 0, 215],
        './amplify-s3-text.entry.js': [1729, 0, 216],
        './amplify-select-mfa-type.entry.js': [1730, 217],
        './amplify-sign-in-button.entry.js': [1731, 197],
        './amplify-toast.entry.js': [1732, 218],
        './amplify-tooltip.entry.js': [1733, 219],
      };
      function webpackAsyncContext(req) {
        if (!__webpack_require__.o(map, req))
          return Promise.resolve().then(function () {
            var e = new Error("Cannot find module '" + req + "'");
            throw ((e.code = 'MODULE_NOT_FOUND'), e);
          });
        var ids = map[req],
          id = ids[0];
        return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(
          function () {
            return __webpack_require__(id);
          }
        );
      }
      (webpackAsyncContext.keys = function webpackAsyncContextKeys() {
        return Object.keys(map);
      }),
        (webpackAsyncContext.id = 1695),
        (module.exports = webpackAsyncContext);
    },
    1702: function (module, __webpack_exports__, __webpack_require__) {
      'use strict';
      __webpack_require__.r(__webpack_exports__);
      __webpack_require__(1451), __webpack_require__(1459);
      var client = __webpack_require__(231),
        dist = __webpack_require__(12),
        docs = (__webpack_require__(22), __webpack_require__(655)),
        extractProps = __webpack_require__(289);
      var lib_esm = __webpack_require__(405);
      Object(client.addDecorator)(function withAmplify(storyFn) {
        return lib_esm.default.configure({}), storyFn();
      }),
        Object(client.addParameters)({
          docs: {
            extractProps: function extractPropsFromComponentName(tagName) {
              var component = docs.a.find(function (component) {
                return component.tag === tagName;
              });
              return component
                ? {
                    sections: [
                      'props',
                      'methods',
                      'events',
                      'styles',
                      'slots',
                    ].reduce(function (acc, section) {
                      return (
                        component[section].length &&
                          (acc[section] = (function mapData(data) {
                            return data.map(function (item) {
                              return {
                                name: item.name,
                                type: { summary: item.type, detail: void 0 },
                                required: item.required,
                                description: item.docs,
                                defaultValue: {
                                  summary:
                                    void 0 === item.default
                                      ? '-'
                                      : item.default,
                                  detail: void 0,
                                },
                              };
                            });
                          })(component[section])),
                        acc
                      );
                    }, {}),
                  }
                : Object(extractProps.extractProps)(tagName);
            },
          },
          options: {
            theme: Object(dist.create)({
              appBg: '#F6F6F5',
              base: 'light',
              brandImage:
                'https://aws-amplify.github.io/docs/images/Logos/Amplify%20Logo.svg',
              brandTitle: 'Amplify UI Components',
              colorPrimary: '#232f3e',
              colorSecondary: '#ff9900',
              fontBase: '"Amazon Ember", "Helvetica", sans-serif',
              fontCode: '"Source Code Pro", Monaco, monospace',
            }),
          },
        });
    },
    1704: function (module, __webpack_exports__, __webpack_require__) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'basic', function () {
          return basic;
        }),
        __webpack_require__.d(
          __webpack_exports__,
          'FederatedIdentityProviders',
          function () {
            return FederatedIdentityProviders;
          }
        ),
        __webpack_require__.d(
          __webpack_exports__,
          'FederatedOAuthProviders',
          function () {
            return FederatedOAuthProviders;
          }
        ),
        __webpack_require__.d(__webpack_exports__, 'initialState', function () {
          return initialState;
        }),
        __webpack_require__.d(
          __webpack_exports__,
          'BasicWithAuthenticator',
          function () {
            return BasicWithAuthenticator;
          }
        ),
        __webpack_require__.d(
          __webpack_exports__,
          'WithAuthenticatorWithUsernameAlias',
          function () {
            return WithAuthenticatorWithUsernameAlias;
          }
        );
      var _p,
        _ul,
        _Story,
        _Props,
        _Story2,
        _Story3,
        _Story4,
        Auth = __webpack_require__(666),
        lib_esm_components = __webpack_require__(1769),
        withAuthenticator = __webpack_require__(1770),
        dist = __webpack_require__(125),
        react = __webpack_require__(2),
        react_default = __webpack_require__.n(react),
        esm =
          (__webpack_require__(10),
          __webpack_require__(17),
          __webpack_require__(8),
          __webpack_require__(9),
          __webpack_require__(31)),
        blocks = __webpack_require__(90),
        _excluded = ['components'];
      function _extends() {
        return (_extends =
          Object.assign ||
          function (target) {
            for (var source, i = 1; i < arguments.length; i++)
              for (var key in (source = arguments[i]))
                Object.prototype.hasOwnProperty.call(source, key) &&
                  (target[key] = source[key]);
            return target;
          }).apply(this, arguments);
      }
      function _objectWithoutProperties(source, excluded) {
        if (null == source) return {};
        var key,
          i,
          target = (function _objectWithoutPropertiesLoose(source, excluded) {
            if (null == source) return {};
            var key,
              i,
              target = {},
              sourceKeys = Object.keys(source);
            for (i = 0; i < sourceKeys.length; i++)
              (key = sourceKeys[i]),
                0 <= excluded.indexOf(key) || (target[key] = source[key]);
            return target;
          })(source, excluded);
        if (Object.getOwnPropertySymbols) {
          var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
          for (i = 0; i < sourceSymbolKeys.length; i++)
            (key = sourceSymbolKeys[i]),
              0 <= excluded.indexOf(key) ||
                (Object.prototype.propertyIsEnumerable.call(source, key) &&
                  (target[key] = source[key]));
        }
        return target;
      }
      var layoutProps = {};
      function MDXContent(_ref) {
        var components = _ref.components,
          props = _objectWithoutProperties(_ref, _excluded);
        return Object(esm.mdx)(
          'wrapper',
          _extends({}, layoutProps, props, {
            components: components,
            mdxType: 'MDXLayout',
          }),
          Object(esm.mdx)(
            'h1',
            { id: 'amplifyauthenticator' },
            'AmplifyAuthenticator'
          ),
          _p ||
            (_p = Object(esm.mdx)(
              'p',
              null,
              'The Authenticator is a drop-in UI component that provides:'
            )),
          _ul ||
            (_ul = Object(esm.mdx)(
              'ul',
              null,
              Object(esm.mdx)('li', { parentName: 'ul' }, 'User Sign in'),
              Object(esm.mdx)('li', { parentName: 'ul' }, 'User Sign up'),
              Object(esm.mdx)('li', { parentName: 'ul' }, 'User Sign out'),
              Object(esm.mdx)('li', { parentName: 'ul' }, 'Forgot Password'),
              Object(esm.mdx)(
                'li',
                { parentName: 'ul' },
                'Federated authentication'
              ),
              Object(esm.mdx)(
                'li',
                { parentName: 'ul' },
                'MFA (Multi-Factor Authentication) e.g. SMS, Email, and TOTP (Temporary One Time Password)'
              ),
              Object(esm.mdx)(
                'li',
                { parentName: 'ul' },
                'Confirm MFA Code’s and Provide QR codes for TOTP'
              )
            )),
          Object(esm.mdx)('h2', { id: 'live-demo' }, 'Live Demo'),
          _Story ||
            (_Story = Object(esm.mdx)(blocks.Story, {
              id: 'amplifyauthenticator--basic',
              inline: !1,
              mdxType: 'Story',
            })),
          Object(esm.mdx)('h2', { id: 'props' }, 'Props'),
          _Props ||
            (_Props = Object(esm.mdx)(blocks.Props, {
              of: 'amplify-authenticator',
              mdxType: 'Props',
            })),
          Object(esm.mdx)('h2', { id: 'social-providers' }, 'Social Providers'),
          _Story2 ||
            (_Story2 = Object(esm.mdx)(blocks.Story, {
              id: 'amplifyauthenticator--federated-o-auth-providers',
              mdxType: 'Story',
            })),
          _Story3 ||
            (_Story3 = Object(esm.mdx)(blocks.Story, {
              id: 'amplifyauthenticator--federated-identity-providers',
              mdxType: 'Story',
            })),
          Object(esm.mdx)('h2', { id: 'initial-state' }, 'Initial State'),
          _Story4 ||
            (_Story4 = Object(esm.mdx)(blocks.Story, {
              id: 'amplifyauthenticator--initial-state',
              mdxType: 'Story',
            }))
        );
      }
      (MDXContent.displayName = 'MDXContent'),
        (MDXContent.isMDXComponent = !0),
        (MDXContent.__docgenInfo = {
          description: '',
          methods: [],
          displayName: 'MDXContent',
        }),
        'undefined' != typeof STORYBOOK_REACT_CLASSES &&
          (STORYBOOK_REACT_CLASSES['src/stories/AmplifyAuthenticator.mdx'] = {
            name: 'MDXContent',
            docgenInfo: MDXContent.__docgenInfo,
            path: 'src/stories/AmplifyAuthenticator.mdx',
          });
      __webpack_require__(635).withSource;
      var _h,
        _AmplifySignOut,
        _AmplifyAuthenticator,
        _g,
        _img,
        addSourceDecorator = __webpack_require__(635).addSource,
        __SOURCE_PREFIX__ =
          '/Users/ehhanche/programming/work/spark/amplify-ui/packages/amplify-ui-storybook/src/stories',
        __STORY__ =
          "import { Auth } from 'aws-amplify';\nimport {\n  AmplifyAuthenticator,\n  AmplifySignOut,\n  withAuthenticator,\n} from '@aws-amplify/ui-react';\nimport { withKnobs, select, text } from '@storybook/addon-knobs';\nimport React from 'react';\n\nimport page from './AmplifyAuthenticator.mdx';\n\nexport default {\n  title: 'AmplifyAuthenticator',\n  component: 'amplify-authenticator',\n  decorators: [withKnobs],\n  parameters: { docs: { page } },\n};\n\nconst App = () => (\n  <>\n    <h1>You are signed in!</h1>\n    <AmplifySignOut />\n  </>\n);\n\nexport const basic = () => (\n  <AmplifyAuthenticator>\n    <App />\n  </AmplifyAuthenticator>\n);\n\nexport const FederatedIdentityProviders = () => (\n  <AmplifyAuthenticator\n    federated={{\n      amazonClientId: text('Amazon client ID', 'amazon_client_id'),\n      auth0Config: {\n        clientID: text('Auth0 client ID', 'auth0_client_id'),\n        domain: text('Auth0 account domain', 'example.auth0.com'),\n        redirectUri: 'http://localhost:3000/',\n        responseType: 'token id_token',\n      },\n      facebookAppId: text('Facebook app ID', 'facebook_app_id'),\n      googleClientId: text('Google client ID', 'google_client_id'),\n      oauthConfig: {},\n    }}\n  />\n);\n\n// Styles from https://developers.google.com/identity/sign-in/web/sign-in\nexport const FederatedOAuthProviders = () => (\n  <AmplifyAuthenticator>\n    <div\n      slot=\"sign-in\"\n      style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}\n    >\n      <button\n        onClick={() => Auth.federatedSignIn({ provider: 'Google' as any })}\n        style={{\n          background: '#fff',\n          border: 'none',\n          borderRadius: 1,\n          boxShadow: '0 2px 4px 0 rgba(0,0,0,.25)',\n          color: '#757575',\n          cursor: 'pointer',\n          height: 36,\n          padding: 0,\n          width: 120,\n        }}\n      >\n        <svg\n          version=\"1.1\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n          width=\"18px\"\n          height=\"18px\"\n          style={{ float: 'left', padding: 8 }}\n          viewBox=\"0 0 48 48\"\n        >\n          <g>\n            <path\n              fill=\"#EA4335\"\n              d=\"M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z\"\n            ></path>\n            <path\n              fill=\"#4285F4\"\n              d=\"M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z\"\n            ></path>\n            <path\n              fill=\"#FBBC05\"\n              d=\"M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z\"\n            ></path>\n            <path\n              fill=\"#34A853\"\n              d=\"M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z\"\n            ></path>\n            <path fill=\"none\" d=\"M0 0h48v48H0z\"></path>\n          </g>\n        </svg>\n        <span style={{ fontSize: 13, lineHeight: '34px' }}>Sign in</span>\n      </button>\n\n      <button\n        onClick={() =>\n          Auth.federatedSignIn({ provider: 'LoginWithAmazon' as any })\n        }\n        style={{\n          background: 'none',\n          border: 'none',\n          cursor: 'pointer',\n          padding: 0,\n        }}\n      >\n        <img src=\"https://images-na.ssl-images-amazon.com/images/G/01/lwa/btnLWA_gold_156x32.png\" />\n      </button>\n\n      <button\n        onClick={() => Auth.federatedSignIn({ provider: 'Facebook' as any })}\n        style={{\n          background: '#1877f2',\n          borderRadius: 3,\n          border: 'none',\n          color: '#fff',\n          cursor: 'pointer',\n          fontFamily: 'Helvetica, Arial, sans-serif',\n          fontSize: 13,\n          height: 28,\n          letterSpacing: '0.25px',\n          lineHeight: '28px',\n          padding: '0 8px 0 0',\n        }}\n      >\n        <img\n          src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyUlEQVQ4jaWTMQ6CQBBFp8Hawp4eLmTjPaitjYRwDm7AIYwJxzAxQTr0WeyQLOMuRvwJzez8tzMfEDECcqAEOqDXp9Nabvt9YwLUwJO4Ru1JQuZ2wWjVziBKDekG7IEtsAFO3lnt7xwb+2AmPZp1csGFE9NOjWdcmC9zXgou4aC8m61xUidK/gaIqRfgETMGXvUlBPhYYQFwD61Q/bFCJUAKDCsAA5BODcUKQGE/5eYHQIP9H7xJxgXAOLs5knSGC/bq1a5ay2z/G35e2IdEyxJKAAAAAElFTkSuQmCC\"\n          width=\"16\"\n          height=\"16\"\n          style={{ float: 'left', margin: '6px 6px 6px 8px' }}\n        />\n        Log In With Facebook\n      </button>\n    </div>\n  </AmplifyAuthenticator>\n);\n\nFederatedOAuthProviders.story = {\n  name: 'Federated OAuth Providers',\n};\n\nexport const initialState = () => {\n  const initialAuthState = select(\n    'Initial Auth State',\n    ['signin', 'signup'],\n    'signup'\n  );\n\n  return (\n    <AmplifyAuthenticator\n      // Dispose when initialAuthState changes\n      key={initialAuthState}\n      // AuthState isn't exported\n      initialAuthState={initialAuthState as any}\n    />\n  );\n};\n\nexport const BasicWithAuthenticator = () => {\n  const Wrapped = withAuthenticator(App);\n\n  return <Wrapped />;\n};\n\nBasicWithAuthenticator.story = {\n  name: 'Basic withAuthenticator',\n};\n\nexport const WithAuthenticatorWithUsernameAlias = () => {\n  const Wrapped = withAuthenticator(App, { usernameAlias: 'email' });\n\n  return <Wrapped />;\n};\n\nWithAuthenticatorWithUsernameAlias.story = {\n  name: 'withAuthenticator with usernameAlias',\n};\n",
        __ADDS_MAP__ = {
          'amplifyauthenticator--basic': {
            startLoc: { col: 21, line: 26 },
            endLoc: { col: 1, line: 30 },
            startBody: { col: 21, line: 26 },
            endBody: { col: 1, line: 30 },
          },
          'amplifyauthenticator--federated-identity-providers': {
            startLoc: { col: 42, line: 32 },
            endLoc: { col: 1, line: 47 },
            startBody: { col: 42, line: 32 },
            endBody: { col: 1, line: 47 },
          },
          'amplifyauthenticator--federated-o-auth-providers': {
            startLoc: { col: 39, line: 50 },
            endLoc: { col: 1, line: 141 },
            startBody: { col: 39, line: 50 },
            endBody: { col: 1, line: 141 },
          },
          'amplifyauthenticator--initial-state': {
            startLoc: { col: 28, line: 147 },
            endLoc: { col: 1, line: 162 },
            startBody: { col: 28, line: 147 },
            endBody: { col: 1, line: 162 },
          },
          'amplifyauthenticator--basic-with-authenticator': {
            startLoc: { col: 38, line: 164 },
            endLoc: { col: 1, line: 168 },
            startBody: { col: 38, line: 164 },
            endBody: { col: 1, line: 168 },
          },
          'amplifyauthenticator--with-authenticator-with-username-alias': {
            startLoc: { col: 50, line: 174 },
            endLoc: { col: 1, line: 178 },
            startBody: { col: 50, line: 174 },
            endBody: { col: 1, line: 178 },
          },
        },
        __MAIN_FILE_LOCATION__ = '/AmplifyAuthenticator.stories.tsx',
        __MODULE_DEPENDENCIES__ = [],
        __LOCAL_DEPENDENCIES__ = {},
        __IDS_TO_FRAMEWORKS__ = {},
        App =
          ((__webpack_exports__.default = {
            title: 'AmplifyAuthenticator',
            component: 'amplify-authenticator',
            decorators: [dist.withKnobs],
            parameters: {
              storySource: {
                source:
                  "import { Auth } from 'aws-amplify';\nimport {\n  AmplifyAuthenticator,\n  AmplifySignOut,\n  withAuthenticator,\n} from '@aws-amplify/ui-react';\nimport { withKnobs, select, text } from '@storybook/addon-knobs';\nimport React from 'react';\n\nimport page from './AmplifyAuthenticator.mdx';\n\nexport default {\n  title: 'AmplifyAuthenticator',\n  component: 'amplify-authenticator',\n  decorators: [withKnobs],\n  parameters: { docs: { page } },\n};\n\nconst App = () => (\n  <>\n    <h1>You are signed in!</h1>\n    <AmplifySignOut />\n  </>\n);\n\nexport const basic = () => (\n  <AmplifyAuthenticator>\n    <App />\n  </AmplifyAuthenticator>\n);\n\nexport const FederatedIdentityProviders = () => (\n  <AmplifyAuthenticator\n    federated={{\n      amazonClientId: text('Amazon client ID', 'amazon_client_id'),\n      auth0Config: {\n        clientID: text('Auth0 client ID', 'auth0_client_id'),\n        domain: text('Auth0 account domain', 'example.auth0.com'),\n        redirectUri: 'http://localhost:3000/',\n        responseType: 'token id_token',\n      },\n      facebookAppId: text('Facebook app ID', 'facebook_app_id'),\n      googleClientId: text('Google client ID', 'google_client_id'),\n      oauthConfig: {},\n    }}\n  />\n);\n\n// Styles from https://developers.google.com/identity/sign-in/web/sign-in\nexport const FederatedOAuthProviders = () => (\n  <AmplifyAuthenticator>\n    <div\n      slot=\"sign-in\"\n      style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}\n    >\n      <button\n        onClick={() => Auth.federatedSignIn({ provider: 'Google' as any })}\n        style={{\n          background: '#fff',\n          border: 'none',\n          borderRadius: 1,\n          boxShadow: '0 2px 4px 0 rgba(0,0,0,.25)',\n          color: '#757575',\n          cursor: 'pointer',\n          height: 36,\n          padding: 0,\n          width: 120,\n        }}\n      >\n        <svg\n          version=\"1.1\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n          width=\"18px\"\n          height=\"18px\"\n          style={{ float: 'left', padding: 8 }}\n          viewBox=\"0 0 48 48\"\n        >\n          <g>\n            <path\n              fill=\"#EA4335\"\n              d=\"M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z\"\n            ></path>\n            <path\n              fill=\"#4285F4\"\n              d=\"M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z\"\n            ></path>\n            <path\n              fill=\"#FBBC05\"\n              d=\"M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z\"\n            ></path>\n            <path\n              fill=\"#34A853\"\n              d=\"M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z\"\n            ></path>\n            <path fill=\"none\" d=\"M0 0h48v48H0z\"></path>\n          </g>\n        </svg>\n        <span style={{ fontSize: 13, lineHeight: '34px' }}>Sign in</span>\n      </button>\n\n      <button\n        onClick={() =>\n          Auth.federatedSignIn({ provider: 'LoginWithAmazon' as any })\n        }\n        style={{\n          background: 'none',\n          border: 'none',\n          cursor: 'pointer',\n          padding: 0,\n        }}\n      >\n        <img src=\"https://images-na.ssl-images-amazon.com/images/G/01/lwa/btnLWA_gold_156x32.png\" />\n      </button>\n\n      <button\n        onClick={() => Auth.federatedSignIn({ provider: 'Facebook' as any })}\n        style={{\n          background: '#1877f2',\n          borderRadius: 3,\n          border: 'none',\n          color: '#fff',\n          cursor: 'pointer',\n          fontFamily: 'Helvetica, Arial, sans-serif',\n          fontSize: 13,\n          height: 28,\n          letterSpacing: '0.25px',\n          lineHeight: '28px',\n          padding: '0 8px 0 0',\n        }}\n      >\n        <img\n          src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyUlEQVQ4jaWTMQ6CQBBFp8Hawp4eLmTjPaitjYRwDm7AIYwJxzAxQTr0WeyQLOMuRvwJzez8tzMfEDECcqAEOqDXp9Nabvt9YwLUwJO4Ru1JQuZ2wWjVziBKDekG7IEtsAFO3lnt7xwb+2AmPZp1csGFE9NOjWdcmC9zXgou4aC8m61xUidK/gaIqRfgETMGXvUlBPhYYQFwD61Q/bFCJUAKDCsAA5BODcUKQGE/5eYHQIP9H7xJxgXAOLs5knSGC/bq1a5ay2z/G35e2IdEyxJKAAAAAElFTkSuQmCC\"\n          width=\"16\"\n          height=\"16\"\n          style={{ float: 'left', margin: '6px 6px 6px 8px' }}\n        />\n        Log In With Facebook\n      </button>\n    </div>\n  </AmplifyAuthenticator>\n);\n\nFederatedOAuthProviders.story = {\n  name: 'Federated OAuth Providers',\n};\n\nexport const initialState = () => {\n  const initialAuthState = select(\n    'Initial Auth State',\n    ['signin', 'signup'],\n    'signup'\n  );\n\n  return (\n    <AmplifyAuthenticator\n      // Dispose when initialAuthState changes\n      key={initialAuthState}\n      // AuthState isn't exported\n      initialAuthState={initialAuthState as any}\n    />\n  );\n};\n\nexport const BasicWithAuthenticator = () => {\n  const Wrapped = withAuthenticator(App);\n\n  return <Wrapped />;\n};\n\nBasicWithAuthenticator.story = {\n  name: 'Basic withAuthenticator',\n};\n\nexport const WithAuthenticatorWithUsernameAlias = () => {\n  const Wrapped = withAuthenticator(App, { usernameAlias: 'email' });\n\n  return <Wrapped />;\n};\n\nWithAuthenticatorWithUsernameAlias.story = {\n  name: 'withAuthenticator with usernameAlias',\n};\n",
                locationsMap: {
                  'amplifyauthenticator--basic': {
                    startLoc: { col: 21, line: 26 },
                    endLoc: { col: 1, line: 30 },
                    startBody: { col: 21, line: 26 },
                    endBody: { col: 1, line: 30 },
                  },
                  'amplifyauthenticator--federated-identity-providers': {
                    startLoc: { col: 42, line: 32 },
                    endLoc: { col: 1, line: 47 },
                    startBody: { col: 42, line: 32 },
                    endBody: { col: 1, line: 47 },
                  },
                  'amplifyauthenticator--federated-o-auth-providers': {
                    startLoc: { col: 39, line: 50 },
                    endLoc: { col: 1, line: 141 },
                    startBody: { col: 39, line: 50 },
                    endBody: { col: 1, line: 141 },
                  },
                  'amplifyauthenticator--initial-state': {
                    startLoc: { col: 28, line: 147 },
                    endLoc: { col: 1, line: 162 },
                    startBody: { col: 28, line: 147 },
                    endBody: { col: 1, line: 162 },
                  },
                  'amplifyauthenticator--basic-with-authenticator': {
                    startLoc: { col: 38, line: 164 },
                    endLoc: { col: 1, line: 168 },
                    startBody: { col: 38, line: 164 },
                    endBody: { col: 1, line: 168 },
                  },
                  'amplifyauthenticator--with-authenticator-with-username-alias':
                    {
                      startLoc: { col: 50, line: 174 },
                      endLoc: { col: 1, line: 178 },
                      startBody: { col: 50, line: 174 },
                      endBody: { col: 1, line: 178 },
                    },
                },
              },
              docs: { page: MDXContent },
            },
          }),
          function () {
            return react_default.a.createElement(
              react_default.a.Fragment,
              null,
              _h ||
                (_h = react_default.a.createElement(
                  'h1',
                  null,
                  'You are signed in!'
                )),
              _AmplifySignOut ||
                (_AmplifySignOut = react_default.a.createElement(
                  lib_esm_components.c,
                  null
                ))
            );
          }),
        basic = addSourceDecorator(
          function () {
            return (
              _AmplifyAuthenticator ||
              (_AmplifyAuthenticator = react_default.a.createElement(
                lib_esm_components.a,
                null,
                react_default.a.createElement(App, null)
              ))
            );
          },
          {
            __STORY__: __STORY__,
            __ADDS_MAP__: __ADDS_MAP__,
            __MAIN_FILE_LOCATION__: __MAIN_FILE_LOCATION__,
            __MODULE_DEPENDENCIES__: __MODULE_DEPENDENCIES__,
            __LOCAL_DEPENDENCIES__: __LOCAL_DEPENDENCIES__,
            __SOURCE_PREFIX__: __SOURCE_PREFIX__,
            __IDS_TO_FRAMEWORKS__: __IDS_TO_FRAMEWORKS__,
          }
        ),
        FederatedIdentityProviders = addSourceDecorator(
          function () {
            return react_default.a.createElement(lib_esm_components.a, {
              federated: {
                amazonClientId: Object(dist.text)(
                  'Amazon client ID',
                  'amazon_client_id'
                ),
                auth0Config: {
                  clientID: Object(dist.text)(
                    'Auth0 client ID',
                    'auth0_client_id'
                  ),
                  domain: Object(dist.text)(
                    'Auth0 account domain',
                    'example.auth0.com'
                  ),
                  redirectUri: 'http://localhost:3000/',
                  responseType: 'token id_token',
                },
                facebookAppId: Object(dist.text)(
                  'Facebook app ID',
                  'facebook_app_id'
                ),
                googleClientId: Object(dist.text)(
                  'Google client ID',
                  'google_client_id'
                ),
                oauthConfig: {},
              },
            });
          },
          {
            __STORY__: __STORY__,
            __ADDS_MAP__: __ADDS_MAP__,
            __MAIN_FILE_LOCATION__: __MAIN_FILE_LOCATION__,
            __MODULE_DEPENDENCIES__: __MODULE_DEPENDENCIES__,
            __LOCAL_DEPENDENCIES__: __LOCAL_DEPENDENCIES__,
            __SOURCE_PREFIX__: __SOURCE_PREFIX__,
            __IDS_TO_FRAMEWORKS__: __IDS_TO_FRAMEWORKS__,
          }
        ),
        FederatedOAuthProviders = addSourceDecorator(
          function () {
            return react_default.a.createElement(
              lib_esm_components.a,
              null,
              react_default.a.createElement(
                'div',
                {
                  slot: 'sign-in',
                  style: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                  },
                },
                react_default.a.createElement(
                  'button',
                  {
                    onClick: function onClick() {
                      return Auth.a.federatedSignIn({ provider: 'Google' });
                    },
                    style: {
                      background: '#fff',
                      border: 'none',
                      borderRadius: 1,
                      boxShadow: '0 2px 4px 0 rgba(0,0,0,.25)',
                      color: '#757575',
                      cursor: 'pointer',
                      height: 36,
                      padding: 0,
                      width: 120,
                    },
                  },
                  react_default.a.createElement(
                    'svg',
                    {
                      version: '1.1',
                      xmlns: 'http://www.w3.org/2000/svg',
                      width: '18px',
                      height: '18px',
                      style: { float: 'left', padding: 8 },
                      viewBox: '0 0 48 48',
                    },
                    _g ||
                      (_g = react_default.a.createElement(
                        'g',
                        null,
                        react_default.a.createElement('path', {
                          fill: '#EA4335',
                          d: 'M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z',
                        }),
                        react_default.a.createElement('path', {
                          fill: '#4285F4',
                          d: 'M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z',
                        }),
                        react_default.a.createElement('path', {
                          fill: '#FBBC05',
                          d: 'M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z',
                        }),
                        react_default.a.createElement('path', {
                          fill: '#34A853',
                          d: 'M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z',
                        }),
                        react_default.a.createElement('path', {
                          fill: 'none',
                          d: 'M0 0h48v48H0z',
                        })
                      ))
                  ),
                  react_default.a.createElement(
                    'span',
                    { style: { fontSize: 13, lineHeight: '34px' } },
                    'Sign in'
                  )
                ),
                react_default.a.createElement(
                  'button',
                  {
                    onClick: function onClick() {
                      return Auth.a.federatedSignIn({
                        provider: 'LoginWithAmazon',
                      });
                    },
                    style: {
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                    },
                  },
                  _img ||
                    (_img = react_default.a.createElement('img', {
                      src: 'https://images-na.ssl-images-amazon.com/images/G/01/lwa/btnLWA_gold_156x32.png',
                    }))
                ),
                react_default.a.createElement(
                  'button',
                  {
                    onClick: function onClick() {
                      return Auth.a.federatedSignIn({ provider: 'Facebook' });
                    },
                    style: {
                      background: '#1877f2',
                      borderRadius: 3,
                      border: 'none',
                      color: '#fff',
                      cursor: 'pointer',
                      fontFamily: 'Helvetica, Arial, sans-serif',
                      fontSize: 13,
                      height: 28,
                      letterSpacing: '0.25px',
                      lineHeight: '28px',
                      padding: '0 8px 0 0',
                    },
                  },
                  react_default.a.createElement('img', {
                    src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyUlEQVQ4jaWTMQ6CQBBFp8Hawp4eLmTjPaitjYRwDm7AIYwJxzAxQTr0WeyQLOMuRvwJzez8tzMfEDECcqAEOqDXp9Nabvt9YwLUwJO4Ru1JQuZ2wWjVziBKDekG7IEtsAFO3lnt7xwb+2AmPZp1csGFE9NOjWdcmC9zXgou4aC8m61xUidK/gaIqRfgETMGXvUlBPhYYQFwD61Q/bFCJUAKDCsAA5BODcUKQGE/5eYHQIP9H7xJxgXAOLs5knSGC/bq1a5ay2z/G35e2IdEyxJKAAAAAElFTkSuQmCC',
                    width: '16',
                    height: '16',
                    style: { float: 'left', margin: '6px 6px 6px 8px' },
                  }),
                  'Log In With Facebook'
                )
              )
            );
          },
          {
            __STORY__: __STORY__,
            __ADDS_MAP__: __ADDS_MAP__,
            __MAIN_FILE_LOCATION__: __MAIN_FILE_LOCATION__,
            __MODULE_DEPENDENCIES__: __MODULE_DEPENDENCIES__,
            __LOCAL_DEPENDENCIES__: __LOCAL_DEPENDENCIES__,
            __SOURCE_PREFIX__: __SOURCE_PREFIX__,
            __IDS_TO_FRAMEWORKS__: __IDS_TO_FRAMEWORKS__,
          }
        );
      FederatedOAuthProviders.story = { name: 'Federated OAuth Providers' };
      var initialState = addSourceDecorator(
          function () {
            var initialAuthState = Object(dist.select)(
              'Initial Auth State',
              ['signin', 'signup'],
              'signup'
            );
            return react_default.a.createElement(lib_esm_components.a, {
              key: initialAuthState,
              initialAuthState: initialAuthState,
            });
          },
          {
            __STORY__: __STORY__,
            __ADDS_MAP__: __ADDS_MAP__,
            __MAIN_FILE_LOCATION__: __MAIN_FILE_LOCATION__,
            __MODULE_DEPENDENCIES__: __MODULE_DEPENDENCIES__,
            __LOCAL_DEPENDENCIES__: __LOCAL_DEPENDENCIES__,
            __SOURCE_PREFIX__: __SOURCE_PREFIX__,
            __IDS_TO_FRAMEWORKS__: __IDS_TO_FRAMEWORKS__,
          }
        ),
        BasicWithAuthenticator = addSourceDecorator(
          function () {
            var Wrapped = Object(withAuthenticator.a)(App);
            return react_default.a.createElement(Wrapped, null);
          },
          {
            __STORY__: __STORY__,
            __ADDS_MAP__: __ADDS_MAP__,
            __MAIN_FILE_LOCATION__: __MAIN_FILE_LOCATION__,
            __MODULE_DEPENDENCIES__: __MODULE_DEPENDENCIES__,
            __LOCAL_DEPENDENCIES__: __LOCAL_DEPENDENCIES__,
            __SOURCE_PREFIX__: __SOURCE_PREFIX__,
            __IDS_TO_FRAMEWORKS__: __IDS_TO_FRAMEWORKS__,
          }
        );
      BasicWithAuthenticator.story = { name: 'Basic withAuthenticator' };
      var WithAuthenticatorWithUsernameAlias = addSourceDecorator(
        function () {
          var Wrapped = Object(withAuthenticator.a)(App, {
            usernameAlias: 'email',
          });
          return react_default.a.createElement(Wrapped, null);
        },
        {
          __STORY__: __STORY__,
          __ADDS_MAP__: __ADDS_MAP__,
          __MAIN_FILE_LOCATION__: __MAIN_FILE_LOCATION__,
          __MODULE_DEPENDENCIES__: __MODULE_DEPENDENCIES__,
          __LOCAL_DEPENDENCIES__: __LOCAL_DEPENDENCIES__,
          __SOURCE_PREFIX__: __SOURCE_PREFIX__,
          __IDS_TO_FRAMEWORKS__: __IDS_TO_FRAMEWORKS__,
        }
      );
      WithAuthenticatorWithUsernameAlias.story = {
        name: 'withAuthenticator with usernameAlias',
      };
    },
    634: function (module, exports, __webpack_require__) {
      module.exports = (function (t) {
        var n = {};
        function _(o) {
          if (n[o]) return n[o].exports;
          var e = (n[o] = { i: o, l: !1, exports: {} });
          return t[o].call(e.exports, e, e.exports, _), (e.l = !0), e.exports;
        }
        return (
          (_.m = t),
          (_.c = n),
          (_.d = function (t, n, o) {
            _.o(t, n) ||
              Object.defineProperty(t, n, { enumerable: !0, get: o });
          }),
          (_.r = function (t) {
            'undefined' != typeof Symbol &&
              Symbol.toStringTag &&
              Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
              Object.defineProperty(t, '__esModule', { value: !0 });
          }),
          (_.t = function (t, n) {
            if ((1 & n && (t = _(t)), 8 & n)) return t;
            if (4 & n && 'object' == typeof t && t && t.__esModule) return t;
            var o = Object.create(null);
            if (
              (_.r(o),
              Object.defineProperty(o, 'default', { enumerable: !0, value: t }),
              2 & n && 'string' != typeof t)
            )
              for (var e in t)
                _.d(
                  o,
                  e,
                  function (n) {
                    return t[n];
                  }.bind(null, e)
                );
            return o;
          }),
          (_.n = function (t) {
            var n =
              t && t.__esModule
                ? function () {
                    return t.default;
                  }
                : function () {
                    return t;
                  };
            return _.d(n, 'a', n), n;
          }),
          (_.o = function (t, n) {
            return Object.prototype.hasOwnProperty.call(t, n);
          }),
          (_.p = ''),
          _((_.s = 0))
        );
      })([
        function (t, n, _) {
          'use strict';
          var o =
              (this && this.__createBinding) ||
              (Object.create
                ? function (t, n, _, o) {
                    void 0 === o && (o = _),
                      Object.defineProperty(t, o, {
                        enumerable: !0,
                        get: function () {
                          return n[_];
                        },
                      });
                  }
                : function (t, n, _, o) {
                    void 0 === o && (o = _), (t[o] = n[_]);
                  }),
            e =
              (this && this.__exportStar) ||
              function (t, n) {
                for (var _ in t)
                  'default' === _ ||
                    Object.prototype.hasOwnProperty.call(n, _) ||
                    o(n, t, _);
              };
          Object.defineProperty(n, '__esModule', { value: !0 }),
            e(_(1), n),
            e(_(2), n),
            e(_(3), n),
            e(_(4), n),
            e(_(5), n),
            e(_(6), n),
            e(_(7), n),
            e(_(8), n),
            e(_(9), n),
            e(_(10), n),
            e(_(11), n),
            e(_(12), n),
            e(_(13), n);
        },
        function (t, n, _) {
          t.exports = { a: 'Anchor__a___1_Iz8' };
        },
        function (t, n, _) {
          t.exports = {
            button: 'Button__button___vS7Mv',
            signInButton: 'Button__signInButton___3bUH-',
            googleSignInButton: 'Button__googleSignInButton___1YiCu',
            signInButtonIcon: 'Button__signInButtonIcon___ihN75',
            auth0SignInButton: 'Button__auth0SignInButton___znnCj',
            facebookSignInButton: 'Button__facebookSignInButton___34Txh',
            amazonSignInButton: 'Button__amazonSignInButton___2EMtl',
            oAuthSignInButton: 'Button__oAuthSignInButton___3UGOl',
            signInButtonContent: 'Button__signInButtonContent___xqTXJ',
          };
        },
        function (t, n, _) {
          t.exports = {
            formContainer: 'Form__formContainer___1GA3x',
            formSection: 'Form__formSection___1PPvW',
            formField: 'Form__formField___38Ikl',
            formRow: 'Form__formRow___2mwRs',
          };
        },
        function (t, n, _) {
          t.exports = { hint: 'Hint__hint___2XngB' };
        },
        function (t, n, _) {
          t.exports = {
            input: 'Input__input___3e_bf',
            inputLabel: 'Input__inputLabel___3VF0S',
            label: 'Input__label___23sO8',
            radio: 'Input__radio___2hllK',
          };
        },
        function (t, n, _) {
          t.exports = {
            navBar: 'Nav__navBar___xtCFA',
            navRight: 'Nav__navRight___1QG2J',
            nav: 'Nav__nav___2Dx2Y',
            navItem: 'Nav__navItem___1LtFQ',
          };
        },
        function (t, n, _) {
          t.exports = {
            photoPickerButton: 'PhotoPicker__photoPickerButton___2XdVn',
            photoPlaceholder: 'PhotoPicker__photoPlaceholder___2JXO4',
            photoPlaceholderIcon: 'PhotoPicker__photoPlaceholderIcon___3Et71',
          };
        },
        function (t, n, _) {
          t.exports = {
            container: 'Section__container___3YYTG',
            actionRow: 'Section__actionRow___2LWSU',
            sectionHeader: 'Section__sectionHeader___2djyg',
            sectionHeaderHint: 'Section__sectionHeaderHint___3Wxdc',
            sectionBody: 'Section__sectionBody___ihqqd',
            sectionHeaderContent: 'Section__sectionHeaderContent___1UCqa',
            sectionFooter: 'Section__sectionFooter___1T54C',
            sectionFooterPrimaryContent:
              'Section__sectionFooterPrimaryContent___2r9ZX',
            sectionFooterSecondaryContent:
              'Section__sectionFooterSecondaryContent___Nj41Q',
          };
        },
        function (t, n, _) {
          t.exports = { selectInput: 'SelectInput__selectInput___3efO4' };
        },
        function (t, n, _) {
          t.exports = {
            strike: 'Strike__strike___1XV1b',
            strikeContent: 'Strike__strikeContent___10gLb',
          };
        },
        function (t, n, _) {
          t.exports = {
            toast: 'Toast__toast___XXr3v',
            toastClose: 'Toast__toastClose___18lU4',
          };
        },
        function (t, n, _) {
          t.exports = { totpQrcode: 'Totp__totpQrcode___1crLx' };
        },
        function (t, n, _) {
          t.exports = {
            sumerianSceneContainer: 'XR__sumerianSceneContainer___3nVMt',
            sumerianScene: 'XR__sumerianScene___2Tt7-',
            loadingOverlay: 'XR__loadingOverlay___IbqcI',
            loadingContainer: 'XR__loadingContainer___2Itxb',
            loadingLogo: 'XR__loadingLogo___Ub7xQ',
            loadingSceneName: 'XR__loadingSceneName___3__ne',
            loadingBar: 'XR__loadingBar___2vcke',
            loadingBarFill: 'XR__loadingBarFill___3M-D9',
            sceneErrorText: 'XR__sceneErrorText___2y0tp',
            sceneBar: 'XR__sceneBar___2ShrP',
            sceneName: 'XR__sceneName___1ApHr',
            sceneActions: 'XR__sceneActions___7plGs',
            actionButton: 'XR__actionButton___2poIM',
            tooltip: 'XR__tooltip___UYyhn',
            actionIcon: 'XR__actionIcon___2qnd2',
            autoShowTooltip: 'XR__autoShowTooltip___V1QH7',
          };
        },
      ]);
    },
    674: function (module, exports, __webpack_require__) {
      __webpack_require__(675),
        __webpack_require__(814),
        __webpack_require__(815),
        __webpack_require__(1450),
        __webpack_require__(1702),
        __webpack_require__(1683),
        (module.exports = __webpack_require__(1689));
    },
    740: function (module, exports) {},
  },
  [[674, 182, 183]],
]);
//# sourceMappingURL=main.43062421b39d2bb010e4.bundle.js.map
