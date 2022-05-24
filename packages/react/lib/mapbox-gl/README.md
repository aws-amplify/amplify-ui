This lib creates an empty package which the `mapbox-gl` dependency will resolve to. This resolves the problem that some users are facing where the `mapbox-gl` module is not found at build time.

See the following issues:
github.com/aws-amplify/amplify-ui/issues/1736
github.com/visgl/react-map-gl/issues/1783
