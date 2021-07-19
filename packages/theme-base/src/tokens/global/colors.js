

module.exports = {
  red: {
    100: { value: "hsl(0, 100%, 15%)" },
    90:  { value: "hsl(0, 100%, 20%)" },
    80:  { value: "hsl(0, 95%, 30%)" },
    60:  { value: "hsl(0, 50%, 50%)" },
    40:  { value: "hsl(0, 75%, 75%)" },
    20:  { value: "hsl(0, 75%, 85%)" },
    10:  { value: "hsl(0, 75%, 95%)" },
  },
  
  orange: {
    100: { value: "hsl(30, 100%, 15%)" },
    90:  { value: "hsl(30, 100%, 20%)" },
    80:  { value: "hsl(30, 95%, 30%)" },
    60:  { value: "hsl(30, 50%, 50%)" },
    40:  { value: "hsl(30, 75%, 75%)" },
    20:  { value: "hsl(30, 75%, 85%)" },
    10:  { value: "hsl(30, 75%, 95%)" },
  },
  
  yellow: {
    100: { value: "hsl(60, 100%, 15%)" },
    90:  { value: "hsl(60, 100%, 20%)" },
    80:  { value: "hsl(60, 95%, 30%)" },
    60:  { value: "hsl(60, 50%, 50%)" },
    40:  { value: "hsl(60, 75%, 75%)" },
    20:  { value: "hsl(60, 75%, 85%)" },
    10:  { value: "hsl(60, 75%, 95%)" },
  },
  
  green: {
    100: { value: "hsl(130, 100%, 15%)" },
    90:  { value: "hsl(130, 100%, 20%)" },
    80:  { value: "hsl(130, 95%, 30%)" },
    60:  { value: "hsl(130, 50%, 50%)" },
    40:  { value: "hsl(130, 75%, 75%)" },
    20:  { value: "hsl(130, 75%, 85%)" },
    10:  { value: "hsl(130, 75%, 95%)" },
  },
  
  teal: {
    100: { value: "hsl(190, 100%, 15%)" },
    90:  { value: "hsl(190, 100%, 20%)" },
    80:  { value: "hsl(190, 95%, 30%)" },
    60:  { value: "hsl(190, 50%, 50%)" },
    40:  { value: "hsl(190, 70%, 70%)" },
    20:  { value: "hsl(190, 75%, 85%)" },
    10:  { value: "hsl(190, 75%, 95%)" },
  },
  
  blue: {
    100: { value: "hsl(220, 100%, 15%)" },
    90:  { value: "hsl(220, 100%, 20%)" },
    80:  { value: "hsl(220, 95%, 30%)" },
    60:  { value: "hsl(220, 50%, 50%)" },
    40:  { value: "hsl(220, 70%, 70%)" },
    20:  { value: "hsl(220, 85%, 85%)" },
    10:  { value: "hsl(220, 95%, 95%)" },
  },
  
  purple: {
    100: { value: "hsl(300, 100%, 15%)" },
    90:  { value: "hsl(300, 100%, 20%)" },
    80:  { value: "hsl(300, 95%, 30%)" },
    60:  { value: "hsl(300, 50%, 50%)" },
    40:  { value: "hsl(300, 70%, 70%)" },
    20:  { value: "hsl(300, 85%, 85%)" },
    10:  { value: "hsl(300, 95%, 95%)" },
  },
  
  pink: {
    100: { value: "hsl(340, 100%, 15%)" },
    90:  { value: "hsl(340, 100%, 20%)" },
    80:  { value: "hsl(340, 95%, 30%)" },
    60:  { value: "hsl(340, 50%, 50%)" },
    40:  { value: "hsl(340, 70%, 70%)" },
    20:  { value: "hsl(340, 90%, 85%)" },
    10:  { value: "hsl(340, 95%, 95%)" },
  },
  
  neutral: {
    100: { value: "hsl(210, 50%, 10%)" },
    90:  { value: "hsl(210, 25%, 25%)" },
    80:  { value: "hsl(210, 10%, 40%)" },
    60:  { value: "hsl(210, 6%, 70%)" },
    40:  { value: "hsl(210, 5%, 80%)" },
    20:  { value: "hsl(210, 5%, 90%)" },
    10:  { value: "hsl(210, 5%, 95%)" },
    0:   { value: "hsl(210, 0%, 100%)" },
  },
  
  brand: {
    primary: {
      10:  { value: "{colors.teal.10.value}" },
      20:  { value: "{colors.teal.20.value}" },
      40:  { value: "{colors.teal.40.value}" },
      60:  { value: "{colors.teal.60.value}" },
      80:  { value: "{colors.teal.80.value}" },
      90:  { value: "{colors.teal.90.value}" },
      100: { value: "{colors.teal.100.value}" },
    },
    secondary: {
      10:  { value: "{colors.purple.10.value}" },
      20:  { value: "{colors.purple.20.value}" },
      40:  { value: "{colors.purple.40.value}" },
      60:  { value: "{colors.purple.60.value}" },
      80:  { value: "{colors.purple.80.value}" },
      90:  { value: "{colors.purple.90.value}" },
      100: { value: "{colors.purple.100.value}" },
    },
  },
  
  font: {
    primary: { value: "{colors.neutral.100.value}" },
    secondary: { value: "{colors.neutral.90.value}" },
    tertiary: { value: "{colors.neutral.80.value}" },
    inverse: { value: "{colors.white.value}" },
    
    interactive: { value: "{colors.brand.primary.80.value}" },
    hover: { value: "{colors.brand.primary.90.value}" },
    focus: { value: "{colors.brand.primary.90.value}" },
    active: { value: "{colors.brand.primary.100.value}" },
    
    info: { value: "{colors.blue.80.value}" },
    warning: { value: "{colors.orange.80.value}" },
    error: { value: "{colors.red.80.value}" },
    success: { value: "{colors.green.80.value}" }
  },
  
  background: {
    primary: { value: "{colors.white.value}" },
    secondary: { value: "{colors.neutral.0.value}" },
    tertiary: { value: "{colors.neutral.10.value}" },
    
    info: { value: "{colors.blue.20.value}" },
    warning: { value: "{colors.orange.20.value}" },
    error: { value: "{colors.red.20.value}" },
    success: { value: "{colors.green.20.value}" }
  },
  
  border: {
    primary: { value: "{colors.neutral.60.value}" },
    secondary: { value: "{colors.neutral.40.value}" },
    tertiary: { value: "{colors.neutral.20.value}" }
  },
  
  shadow: {
    primary: { value: "hsl(210, 50%, 10%, 0.25)" },
    secondary: { value: "hsl(210, 50%, 10%, 0.15)" },
    tertiary: { value: "hsl(210, 50%, 10%, 0.05)" }
  },
  
  black: { "value": "#000" },
  white: { "value": "#fff" },
  transparent: { "value": "transparent" }
}
