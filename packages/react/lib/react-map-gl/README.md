This lib takes the `react-map-gl` dependency and uses the es5 bundle as the main entry point to the package. This resolves the problem of users running into compilation issues with the esm bundle from `react-map-gl`, as well as allow users to import components from `react-map-gl` as captured in the [Amplify UI Geo docs](https://ui.docs.amplify.aws/react/components/geo#usage-with-react-map-gl).

See the following issues:
github.com/aws-amplify/amplify-ui/issues/1656
github.com/visgl/react-map-gl/issues/1871
