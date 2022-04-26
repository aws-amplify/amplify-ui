# Contributing

## Getting started

1. Navigate to the _root_ of your local clone of [aws-amplify/amplify-ui](https://github.com/aws-amplify/amplify-ui)
1. Run `yarn setup`
1. Run `yarn ui dev`

## Style Guide

The @aws-amplify/ui package uses the [BEM](http://getbem.com/) styling syntax to standardize its CSS code and maintain flat CSS selectors.  The goal is to keep all CSS selectors at a 010 specificity so that customers can easily restyle their application using any of the available styling tools that exist. This is achieved by using specific classes that follow the syntax of `{Block}__{Element}--{Modifier}`.  Blocks should be a standalone entity that has meaning on its own. An Element is a part of a block and only has meaning within the context of a block.  A Modifier is state on a block or element that changes its behavior or appearance.
- A class name following this syntax can only have a single Block, Element, and Modifier, but there are some cases where multiple states influence a css properties value.  In these instances we are using an additional css variable prefixed with `amplify-internal` to update the targeted value when multiple states are applied.
```
.amplify-divider {
  --amplify-internal-divider-size: 1rem;
}

.amplify-divider--small {
  --amplify-internal-divider-size: 0.75rem;
}
.amplify-divider--horizontal {
  border-bottom-width: var(--amplify-internal-divider-size);
}
.amplify-divider--vertical {
  border-left-width: var(--amplify-internal-divider-size);
}
```
In this example the `amplify-divider` block can have 2 modifiers that will influence each other.  The size modifier `--small` is responsible for updating the border width, but cannot update it directly because it targets different CSS properties based on the orientation modifier.  Here we are using a CSS variable to update the desired value.  The orientation modifier applies the CSS variable to the desired CSS property while the size modifier updates the value of that CSS variable so it is the correct value being applied to the correct property.