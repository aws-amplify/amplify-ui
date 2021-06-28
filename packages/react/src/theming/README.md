# Amplify UI React: Theming

## ThemeProvider
```jsx
import { ThemeProvider } from '@aws-amplify/ui-react';
import { CoolTheme } from './theme';

const App = (
    <ThemeProvider theme={CoolTheme}>
        /* AmplifyUI */
    </ThemeProvider>
)
```

### Alternative: Use `withTheme`
```jsx
import { withTheme } from '@aws-amplify/ui-react';
import { CoolTheme } from './theme';

const ThemedApp = withTheme(MyApp, CoolTheme);

render(<ThemedApp />)
```

## TODO
- How to create a theme
- How to extend an existing theme
