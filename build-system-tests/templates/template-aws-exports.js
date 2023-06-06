const awsmobile = {
  aws_project_region: 'us-east-2',
  aws_cognito_identity_pool_id: 'us-east-2:place-holder',
  aws_cognito_region: 'us-east-2',
  aws_user_pools_id: 'us-east-2_placeholder',
  aws_user_pools_web_client_id: 'placeholder',
  geo: {
    amazon_location_service: {
      region: 'us-east-2',
      maps: {
        items: {
          'map51addb38-dev': {
            style: 'VectorEsriStreets',
          },
        },
        default: 'map51addb38-dev',
      },
      search_indices: {
        items: ['placeindexab1c482f-dev'],
        default: 'placeindexab1c482f-dev',
      },
    },
  },
};

export default awsmobile;
