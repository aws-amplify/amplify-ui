export * from './components';
export * from './hooks';

export * from './shared';
export * from './types';

export function Form(props) {
  return <form data-amplify-form="" {...props} />;
}
