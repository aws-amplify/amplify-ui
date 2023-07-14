// copied from https://snack.expo.dev/embed.js
// but edited for our purposes
(function () {
  if (window.ExpoSnack) {
    return;
  }

  var ExpoSnack = {
    append: function (container, options) {
      options = options || {};
      options.id =
        options.id || container.dataset.snackId || container.dataset.sketchId;
      options.platform =
        options.platform ||
        container.dataset.snackPlatform ||
        container.dataset.sketchPlatform;
      options.supportedPlatforms =
        options.supportedPlatforms ||
        container.dataset.snackSupportedPlatforms ||
        container.dataset.snackSupportedplatforms;
      options.preview =
        options.preview ||
        container.dataset.snackPreview ||
        container.dataset.sketchPreview ||
        'true';
      options.sdkVersion =
        options.sdkVersion ||
        container.dataset.snackSdkVersion ||
        container.dataset.snackSdkversion;
      options.name = options.name || container.dataset.snackName;
      options.description =
        options.description || container.dataset.snackDescription;
      options.theme = options.theme || container.dataset.snackTheme;
      options.appetizePayerCode =
        options.appetizePayerCode || container.dataset.snackAppetizePayerCode;
      options.loading = options.loading || container.dataset.snackLoading;
      options.deviceFrame =
        options.deviceFrame ||
        container.dataset.deviceFrame ||
        container.dataset.snackDeviceFrame;
      options.deviceAndroid =
        options.deviceAndroid ||
        container.dataset.deviceAndroid ||
        container.dataset.snackDeviceAndroid;
      options.deviceAndroidScale =
        options.deviceAndroidScale ||
        container.dataset.deviceAndroidScale ||
        container.dataset.snackDeviceAndroidScale;
      options.deviceIos =
        options.deviceIos ||
        container.dataset.deviceIos ||
        container.dataset.snackDeviceIos;
      options.deviceIosScale =
        options.deviceIosScale ||
        container.dataset.deviceIosScale ||
        container.dataset.snackDeviceIosScale;

      if (!options.code && container.dataset.snackCode) {
        options.code = decodeURIComponent(container.dataset.snackCode);
      }

      if (!options.files && container.dataset.snackFiles) {
        options.files = decodeURIComponent(container.dataset.snackFiles);
      }

      if (!options.dependencies && container.dataset.snackDependencies) {
        options.dependencies = container.dataset.snackDependencies;
      }

      if (container.querySelector('iframe[data-snack-iframe]')) {
        return;
      }

      if (!options.id && !(options.code || options.files)) {
        return;
      }

      var iframeId = Math.random().toString(36).substr(2, 10);
      var iframe = document.createElement('iframe');

      var iframeQueryParams = '?iframeId=' + iframeId;

      if (options.preview) {
        iframeQueryParams += '&preview=' + options.preview;
      }
      if (options.platform) {
        iframeQueryParams += '&platform=' + options.platform;
      }
      if (options.supportedPlatforms) {
        iframeQueryParams +=
          '&supportedPlatforms=' + options.supportedPlatforms;
      }
      if (options.sdkVersion) {
        iframeQueryParams += '&sdkVersion=' + options.sdkVersion;
      }
      if (options.name) {
        iframeQueryParams += '&name=' + options.name;
      }
      if (options.description) {
        iframeQueryParams += '&description=' + options.description;
      }
      if (options.theme) {
        iframeQueryParams += '&theme=' + options.theme;
      }
      if (options.appetizePayerCode) {
        iframeQueryParams += '&appetizePayerCode=' + options.appetizePayerCode;
      }
      if (options.verbose) {
        iframeQueryParams += '&verbose=' + options.verbose;
      }
      if (options.deviceFrame) {
        iframeQueryParams += '&deviceFrame=' + options.deviceFrame;
      }
      if (options.deviceAndroid) {
        iframeQueryParams += '&deviceAndroid=' + options.deviceAndroid;
      }
      if (options.deviceAndroidScale) {
        iframeQueryParams +=
          '&deviceAndroidScale=' + options.deviceAndroidScale;
      }
      if (options.deviceFrameIos) {
        iframeQueryParams += '&deviceFrameIos=' + options.deviceFrameIos;
      }
      if (options.deviceFrameIosScale) {
        iframeQueryParams +=
          '&deviceFrameIosScale=' + options.deviceFrameIosScale;
      }
      if (options.loading) {
        iframe.loading = options.loading;
      }

      if (options.id) {
        iframe.src =
          'https://snack.expo.dev/embedded/' + options.id + iframeQueryParams;
      } else {
        iframe.src =
          'https://snack.expo.dev/embedded' +
          iframeQueryParams +
          '&waitForData=true';
      }
      iframe.style = 'display: block';
      iframe.height = '100%';
      iframe.width = '100%';
      iframe.frameBorder = '0';
      iframe.allowTransparency = true;
      iframe.dataset.snackIframe = true;

      container.appendChild(iframe);

      if (options.code || options.files || options.dependencies) {
        window.addEventListener('message', function (event) {
          var eventName = event.data[0];
          var data = event.data[1];
          if (eventName === 'expoFrameLoaded' && data.iframeId === iframeId) {
            iframe.contentWindow.postMessage(
              [
                'expoDataEvent',
                {
                  iframeId: iframeId,
                  dependencies: options.dependencies,
                  code: options.code,
                  files: options.files,
                },
              ],
              '*'
            );
          }
        });
      }
    },

    remove: function (container) {
      var iframe = container.querySelector('iframe[data-snack-iframe]');

      if (iframe) {
        iframe.parentNode.removeChild(iframe);
      }
    },

    initialize: function () {
      let theme = document.documentElement.getAttribute(
        'data-amplify-color-mode'
      );

      if (theme === 'system') {
        if (window.matchMedia('(prefers-color-scheme:dark)').matches) {
          theme = 'dark';
        } else {
          theme = 'light';
        }
      }

      document
        .querySelectorAll(
          '[data-sketch-id], [data-snack-id], [data-snack-code], [data-snack-files]'
        )
        .forEach(function (element) {
          ExpoSnack.append(element, { theme });
        });
    },
  };

  if (document.readyState === 'complete') {
    ExpoSnack.initialize();
  } else {
    document.addEventListener('readystatechange', function () {
      if (document.readyState === 'complete') {
        ExpoSnack.initialize();
      }
    });
  }

  window.ExpoSnack = ExpoSnack;
  window.ExpoSketch = ExpoSnack;
})();
