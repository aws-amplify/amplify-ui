

module.exports = {
  colors: {
    red: {
      100: { value: "hsl(0, 100%, 15%)" },
      90:  { value: "hsl(0, 100%, 20%)" },
      80:  { value: "hsl(0, 95%, 30%)" },
      60:  { value: "hsl(0, 50%, 50%)" },
      40:  { value: "hsl(0, 50%, 75%)" },
      20:  { value: "hsl(0, 50%, 85%)" },
      10:  { value: "hsl(0, 50%, 95%)" },
      0:   { value: "hsl(0, 50%, 100%)" },
    },
    
    orange: {
      100: { value: "hsl(30, 100%, 15%)" },
      90:  { value: "hsl(30, 100%, 20%)" },
      80:  { value: "hsl(30, 95%, 30%)" },
      60:  { value: "hsl(30, 50%, 50%)" },
      40:  { value: "hsl(30, 50%, 75%)" },
      20:  { value: "hsl(30, 50%, 85%)" },
      10:  { value: "hsl(30, 50%, 95%)" },
      0:   { value: "hsl(30, 50%, 100%)" },
    },
    
    yellow: {
      100: { value: "hsl(60, 100%, 15%)" },
      90:  { value: "hsl(60, 100%, 20%)" },
      80:  { value: "hsl(60, 95%, 30%)" },
      60:  { value: "hsl(60, 50%, 50%)" },
      40:  { value: "hsl(60, 50%, 75%)" },
      20:  { value: "hsl(60, 50%, 85%)" },
      10:  { value: "hsl(60, 50%, 95%)" },
      0:   { value: "hsl(60, 50%, 100%)" },
    },
    
    green: {
      100: { value: "hsl(130, 100%, 15%)" },
      90:  { value: "hsl(130, 100%, 20%)" },
      80:  { value: "hsl(130, 95%, 30%)" },
      60:  { value: "hsl(130, 50%, 50%)" },
      40:  { value: "hsl(130, 50%, 75%)" },
      20:  { value: "hsl(130, 50%, 85%)" },
      10:  { value: "hsl(130, 50%, 95%)" },
      0:   { value: "hsl(130, 50%, 100%)" },
    },
    
    teal: {
      100: { value: "hsl(190, 100%, 15%)" },
      90:  { value: "hsl(190, 100%, 20%)" },
      80:  { value: "hsl(190, 95%, 30%)" },
      60:  { value: "hsl(190, 50%, 50%)" },
      40:  { value: "hsl(190, 50%, 75%)" },
      20:  { value: "hsl(190, 50%, 85%)" },
      10:  { value: "hsl(190, 50%, 95%)" },
      0:   { value: "hsl(190, 50%, 100%)" },
    },
    
    blue: {
      100: { value: "hsl(240, 100%, 15%)" },
      90:  { value: "hsl(240, 100%, 20%)" },
      80:  { value: "hsl(240, 95%, 30%)" },
      60:  { value: "hsl(240, 50%, 50%)" },
      40:  { value: "hsl(240, 50%, 75%)" },
      20:  { value: "hsl(240, 50%, 85%)" },
      10:  { value: "hsl(240, 50%, 95%)" },
      0:   { value: "hsl(240, 50%, 100%)" },
    },
    
    purple: {
      100: { value: "hsl(300, 100%, 15%)" },
      90:  { value: "hsl(300, 100%, 20%)" },
      80:  { value: "hsl(300, 95%, 30%)" },
      60:  { value: "hsl(300, 50%, 50%)" },
      40:  { value: "hsl(300, 50%, 75%)" },
      20:  { value: "hsl(300, 50%, 85%)" },
      10:  { value: "hsl(300, 50%, 95%)" },
      0:   { value: "hsl(300, 50%, 100%)" },
    },
    
    pink: {
      100: { value: "hsl(340, 100%, 15%)" },
      90:  { value: "hsl(340, 100%, 20%)" },
      80:  { value: "hsl(340, 95%, 30%)" },
      60:  { value: "hsl(340, 50%, 50%)" },
      40:  { value: "hsl(340, 50%, 75%)" },
      20:  { value: "hsl(340, 50%, 85%)" },
      10:  { value: "hsl(340, 50%, 95%)" },
      0:   { value: "hsl(340, 50%, 100%)" },
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
        0:   { value: "{colors.teal.0.value}" },
        10:  { value: "{colors.teal.10.value}" },
        20:  { value: "{colors.teal.20.value}" },
        40:  { value: "{colors.teal.40.value}" },
        60:  { value: "{colors.teal.60.value}" },
        80:  { value: "{colors.teal.80.value}" },
        90:  { value: "{colors.teal.90.value}" },
        100: { value: "{colors.teal.100.value}" },
      },
      secondary: {
        0:   { value: "{colors.purple.0.value}" },
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
}
