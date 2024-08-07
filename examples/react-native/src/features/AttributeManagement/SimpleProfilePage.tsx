import React from 'react';
import { useUserAttributes } from '@aws-amplify/ui-react-core';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';
import { UserAttributeKey } from 'aws-amplify/auth';

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#f5f5f5',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 2,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'center',
    marginVertical: 2,
    paddingHorizontal: 6,
    backgroundColor: '#fff',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 2,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    backgroundColor: 'blue',
  },
  key: {
    width: 120,
    fontWeight: 'bold',
    marginRight: 12,
    color: '#333',
  },
  value: {
    color: '#666',
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 12,
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 8,
    marginHorizontal: 4,
    alignSelf: 'center',
    borderWidth: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export const SimpleProfilePage = () => {
  const [state, handleAttributes] = useUserAttributes();
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [formData, setFormData] = React.useState<
    Partial<Record<UserAttributeKey, string>>
  >({});
  const [emailData, setEmailData] = React.useState<string>('');
  const [confirmData, setConfirmData] = React.useState<string>('');
  const [isConfirmMode, setIsConfirmMode] = React.useState(false);

  const editableAttributes: UserAttributeKey[] = [
    'family_name',
    'given_name',
    'locale',
    'name',
    'nickname',
    'birthdate',
    'middle_name',
    'gender',
    'preferred_username',
    'website',
  ];

  const handleAttributeDelete = (key: UserAttributeKey) => {
    handleAttributes({
      type: 'DELETE',
      userAttributeKeys: [key],
    });
    setFormData((prevForm) => ({ ...prevForm, [key]: '' }));
  };

  const handleUpdateInputChange = (key: UserAttributeKey, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value,
    }));
  };

  const handleEmailInputChange = (value: string) => {
    setEmailData(value);
  };

  const handleConfirmInputChange = (value: string) => {
    setConfirmData(value);
  };
  const handleSubmit = () => {
    handleAttributes({ type: 'UPDATE', userAttributes: formData });
  };

  const handleUpdateSubmit = () => {
    handleAttributes({ type: 'UPDATE', userAttributes: { email: emailData } });
    setIsConfirmMode(true);
  };

  const handleVerifySubmit = () => {
    handleAttributes({
      type: 'CONFIRM',
      userAttributeKey: 'email',
      confirmationCode: confirmData,
    });
    setIsConfirmMode(false);
    setEmailData('');
  };

  React.useEffect(() => {
    handleAttributes({ type: 'FETCH' });
  }, [handleAttributes]);

  if (state.isLoading && !state.data.attributes) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (state.message) {
    return (
      <View>
        <Text>Error: {state.message}</Text>
      </View>
    );
  }

  if (!state.data.attributes) {
    return (
      <View>
        <Text>No data</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View>
        <Text style={styles.header}>Profile Information</Text>
        {!isEditMode ? (
          <>
            {Object.entries(state.data.attributes)
              .filter(
                ([key]) =>
                  key !== 'phone_number_verified' &&
                  key !== 'sub' &&
                  key !== 'email_verified' &&
                  key !== 'phone_number'
              )
              .map(([key, value]) => (
                <View key={key} style={styles.profileContainer}>
                  <Text style={styles.key}>
                    {key
                      .replace(/_/g, ' ')
                      .replace(/(^|\s)\S/g, (match) => match.toUpperCase())}
                    :
                  </Text>
                  <Text style={styles.value}>{value as string}</Text>
                </View>
              ))}
            <Pressable
              style={styles.button}
              disabled={state.isLoading}
              onPress={() => setIsEditMode(true)}
            >
              <Text style={styles.buttonText}>Edit</Text>
            </Pressable>
          </>
        ) : (
          <View>
            <View style={styles.buttonContainer}>
              <Pressable
                style={styles.button}
                onPress={handleSubmit}
                disabled={state.isLoading}
              >
                <Text style={styles.buttonText}>Submit Updates</Text>
              </Pressable>
              <Pressable
                style={styles.button}
                onPress={() => setIsEditMode(false)}
                disabled={state.isLoading}
              >
                <Text style={styles.buttonText}>Done Editing</Text>
              </Pressable>
            </View>
            {editableAttributes.map((key) => (
              <View key={key} style={styles.container}>
                <Text style={styles.key}>
                  {key
                    .replace(/_/g, ' ')
                    .replace(/(^|\s)\S/g, (match) => match.toUpperCase())}
                  :
                </Text>
                <TextInput
                  style={styles.input}
                  defaultValue={state.data.attributes[key] || ''}
                  value={formData[key]}
                  onChangeText={(value) => handleUpdateInputChange(key, value)}
                />
                <Pressable
                  style={styles.button}
                  disabled={state.isLoading}
                  onPress={() => handleAttributeDelete(key)}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </Pressable>
              </View>
            ))}
            <View style={styles.container}>
              <Text style={styles.key}>Email:</Text>
              <TextInput
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                value={emailData}
                onChangeText={(value) => handleEmailInputChange(value)}
              />
              <Pressable
                style={styles.button}
                onPress={handleUpdateSubmit}
                disabled={state.isLoading}
              >
                <Text style={styles.buttonText}>Update Email</Text>
              </Pressable>
            </View>
            {isConfirmMode && (
              <View style={styles.container}>
                <Text>Verification Code:</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={confirmData}
                  onChangeText={(value) => handleConfirmInputChange(value)}
                />
                <Pressable
                  style={styles.button}
                  onPress={handleVerifySubmit}
                  disabled={state.isLoading}
                >
                  <Text style={styles.buttonText}>Verify Email</Text>
                </Pressable>
              </View>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};
