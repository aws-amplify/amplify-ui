jest.mock('react-native-safe-area-context');

const SafeAreaProvider = 'SafeAreaProvider';
const SafeAreaView = 'SafeAreaView';

// return somewhat arbitrary values, safe area insets of iPhone 13
const useSafeAreaInsets = jest.fn(() => ({ bottom: 44, top: 47 }));

export { SafeAreaProvider, SafeAreaView, useSafeAreaInsets };
