import React from 'react';
import { useUserAttributes } from '@aws-amplify/ui-react-core';
import { UserAttributeKey } from 'aws-amplify/auth';

export const SimpleProfilePage = () => {
  const [state, handleAttributes] = useUserAttributes();
  const [isEditMode, setIsEditMode] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);
  const updateEmailRef = React.useRef<HTMLFormElement>(null);
  const verifyEmailRef = React.useRef<HTMLFormElement>(null);
  const [isConfirmMode, setIsConfirmMode] = React.useState(false);
  // const [isConfirmMode, setIsConfirmMode] = React.useState(false);

  const editableAttributes: UserAttributeKey[] = [
    'family_name',
    'given_name',
    'locale',
    'middle_name',
    'name',
    'nickname',
    'birthdate',
    'gender',
    'preferred_username',
    'website',
  ];

  const handleEditClick = () => {
    setIsEditMode(true);
    editableAttributes.forEach((key) => {
      const input = document.createElement('input');
      input.type = 'text';
      input.name = key;
      input.value = state.attributes[key] || '';
      formRef.current?.appendChild(input);
    });
    console.log(state.attributes);
  };

  const handleAttributeDelete = (key: UserAttributeKey) => {
    handleAttributes({
      type: 'DELETE',
      data: { userAttributeKeys: [key] },
    });
    const input = formRef.current?.querySelector(
      `input[name="${key}"]`
    ) as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  };

  const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userAttributes = Object.fromEntries(formData.entries()) as Record<
      UserAttributeKey,
      string
    >;
    handleAttributes({ type: 'UPDATE', data: { userAttributes } });
    setIsConfirmMode(true);
    e.currentTarget.reset();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userAttributes = Object.fromEntries(formData.entries()) as Record<
      UserAttributeKey,
      string
    >;
    await handleAttributes({ type: 'UPDATE', data: { userAttributes } });
  };

  const handleVerifySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const confirmationCode = formData.get('confirmationCode') as string;
    handleAttributes({
      type: 'CONFIRM',
      data: {
        userAttributeKey: 'email',
        confirmationCode,
      },
    });
    setIsConfirmMode(false);
    e.currentTarget.reset();
  };

  React.useEffect(() => {
    handleAttributes({ type: 'FETCH' });
    console.log(state.attributes);
  }, []);

  if (state.fetchStatus.isLoading && !state.attributes) {
    return <div>Loading...</div>;
  }

  if (state.fetchStatus.message) {
    return <div>Error: {state.fetchStatus.message}</div>;
  }

  if (typeof state.attributes === 'undefined') {
    return <div>No data</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      {!isEditMode ? (
        <>
          {Object.entries(state.attributes).map(([key, value]) => (
            <div key={key}>
              <span>{key}: </span>
              <span>{value}</span>
            </div>
          ))}
          <button onClick={handleEditClick}>Edit</button>
        </>
      ) : (
        <div>
          <form ref={formRef} onSubmit={handleSubmit}>
            {editableAttributes.map((key) => (
              <div
                key={key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '0.5rem',
                }}
              >
                <span
                  style={{
                    width: '175px',
                    paddingRight: '0.5rem',
                    textAlign: 'right',
                  }}
                >
                  {key}:{' '}
                </span>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                  <input
                    type="text"
                    name={key}
                    defaultValue={state.attributes[key] || ''}
                  />
                  <button
                    type="button"
                    onClick={() => handleAttributeDelete(key)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            <div
              style={{
                display: 'flex',
                justifyContent: 'left',
                marginTop: '1rem',
                paddingLeft: '175px',
              }}
            >
              <button type="submit">Submit Updates</button>
              <button type="button" onClick={() => setIsEditMode(false)}>
                Done
              </button>
            </div>
          </form>
          <div style={{ marginTop: '1rem' }}>
            <form ref={updateEmailRef} onSubmit={handleUpdateSubmit}>
              <label>
                Email:
                <input type="email" name="email" />
              </label>
              <button type="submit">Update Email</button>
            </form>
          </div>
          {isConfirmMode && (
            <form ref={verifyEmailRef} onSubmit={handleVerifySubmit}>
              <label>
                Verification Code:
                <input type="text" name="confirmationCode" />
              </label>
              <button type="submit">Verify Email</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
