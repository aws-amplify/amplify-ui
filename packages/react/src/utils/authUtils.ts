import { useAuthenticator } from '../hooks';

const [_state, send] = useAuthenticator();

export const handleFormChange = (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const { name, value } = event.target;
  send({
    type: 'CHANGE',
    data: { name, value },
  });
};

export const handleFormSubmit = (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  send({
    type: 'SUBMIT',
    data: Object.fromEntries(formData),
  });
};
