import MyApp from "./_app"

/**
 * Pass which ever component you want to run into the "Component" prop shown here.
 * Example:
 * 
 * const HomePage = () => {
 *   return Myapp({ Component: AuthenticatorWithSmsMfa, pageProps: {} });
 * }
 * 
 */
const HomePage = () => {
    return MyApp({ Component: '', pageProps: {} });
}

export default HomePage;