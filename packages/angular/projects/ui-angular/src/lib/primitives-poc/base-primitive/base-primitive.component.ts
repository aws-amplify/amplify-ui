import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'base',
  template: '',
})
export class AmplifyBasePrimitiveComponent {
  /** Base Component Prop */
  @Input() id?: string;

  @Input() className?: string;
  @HostBinding('class')
  get classProp() {
    return this.className;
  }

  @Input() testId?: string;

  /** Arai Props */
  @Input() ariaLabel?: string;
  @HostBinding('attr.aria-label')
  get AriaLabelProp() {
    return this.ariaLabel;
  }

  @Input() ariavaluetext?: string;
  @HostBinding('attr.aria-valuetext')
  get AriaValuetextProp() {
    return this.ariavaluetext;
  }

  @Input() role?: string;

  /** Base Style Props */
  @Input() alignSelf?: string;
  @HostBinding('style.align-self')
  get AlignSelfProp() {
    return this.alignSelf;
  }

  @Input() backgroundColor?: string;
  @HostBinding('style.background-color')
  get BackgroundColorProp() {
    return this.backgroundColor;
  }

  @Input() backgroundImage?: string;
  @HostBinding('style.background-image')
  get BackgroundImageProp() {
    return this.backgroundImage;
  }

  @Input() border?: string;
  @HostBinding('style.border')
  get BroderProp() {
    return this.border;
  }

  @Input() borderRadius?: string;
  @HostBinding('style.border-radius')
  get borderRadiousProp() {
    return this.borderRadius;
  }

  @Input() bottom?: string;
  @HostBinding('style.bottom')
  get bottomProp() {
    return this.bottom;
  }

  @Input() boxShadow?: string;
  @HostBinding('style.box-shadow')
  get boxShadowProp() {
    return this.boxShadow;
  }

  @Input() color?: string;
  @HostBinding('style.color')
  get colorProp() {
    return this.color;
  }

  @Input() display?: string;
  @HostBinding('style.display')
  get displayProp() {
    return this.display;
  }

  @Input() fontFamily?: string;
  @HostBinding('style.font-family')
  get fontFamilyProp() {
    return this.fontFamily;
  }

  @Input() fontSize?: string;
  @HostBinding('style.font-size')
  get fontSizeProp() {
    return this.fontSize;
  }

  @Input() fontStyle?: string;
  @HostBinding('style.font-style')
  get fontStyleProp() {
    return this.fontStyle;
  }

  @Input() fontWeight?: string;
  @HostBinding('style.font-weight')
  get fontWeightProp() {
    return this.fontWeight;
  }

  @Input() height?: string;
  @HostBinding('style.height')
  get heightProp() {
    return this.height;
  }

  @Input() left?: string;
  @HostBinding('style.left')
  get leftProp() {
    return this.left;
  }

  @Input() letterSpacing?: string;
  @HostBinding('style.letter-spacing')
  get letterSpacingProp() {
    return this.letterSpacing;
  }

  @Input() lineHeight?: string;
  @HostBinding('style.line-height')
  get lineHeightProp() {
    return this.lineHeight;
  }

  @Input() margin?: string;
  @HostBinding('style.margin')
  get marginProp() {
    return this.margin;
  }

  @Input() marginBlock?: string;
  @HostBinding('style.margin-block')
  get marginBlockProp() {
    return this.marginBlock;
  }

  @Input() marginBlockEnd?: string;
  @HostBinding('style.margin-block-end')
  get marginBlockEndProp() {
    return this.marginBlockEnd;
  }

  @Input() marginBlockStart?: string;
  @HostBinding('style.margin-block-start')
  get marginBlockStartProp() {
    return this.marginBlockStart;
  }

  @Input() marginBottom?: string;
  @HostBinding('style.margin-bottom')
  get marginBottomProp() {
    return this.marginBlockStart;
  }

  @Input() marginInline?: string;
  @HostBinding('style.margin-inline')
  get marginInlineProp() {
    return this.marginInline;
  }

  @Input() marginInlineEnd?: string;
  @HostBinding('style.margin-inline-end')
  get marginInlineEndProp() {
    return this.marginInlineEnd;
  }

  @Input() marginInlineStart?: string;
  @HostBinding('style.margin-inline-start')
  get marginInlineStartProp() {
    return this.marginInlineStart;
  }

  @Input() marginLeft?: string;
  @HostBinding('style.margin-left')
  get marginLeftProp() {
    return this.marginLeft;
  }

  @Input() marginRight?: string;
  @HostBinding('style.margin-right')
  get marginRightProp() {
    return this.marginRight;
  }

  @Input() marginTop?: string;
  @HostBinding('style.margin-top')
  get marginTopProp() {
    return this.marginTop;
  }

  @Input() maxHeight?: string;
  @HostBinding('style.max-height')
  get maxHeightProp() {
    return this.maxHeight;
  }

  @Input() maxWidth?: string;
  @HostBinding('style.max-width')
  get maxWidthProp() {
    return this.maxWidth;
  }

  @Input() minHeight?: string;
  @HostBinding('style.min-height')
  get minHeightProp() {
    return this.minHeight;
  }

  @Input() minWidth?: string;
  @HostBinding('style.min-width')
  get minWidthProp() {
    return this.minWidth;
  }

  @Input() opacity?: string;
  @HostBinding('style.opacity')
  get opacityProp() {
    return this.opacity;
  }

  @Input() overflow?: string;
  @HostBinding('style.overflow')
  get overflowProp() {
    return this.overflow;
  }

  @Input() paddingBlock?: string;
  @HostBinding('style.padding-block')
  get paddingBlockProp() {
    return this.paddingBlock;
  }

  @Input() paddingBlockEnd?: string;
  @HostBinding('style.padding-block-end')
  get paddingBlockEndProp() {
    return this.paddingBlockEnd;
  }

  @Input() paddingBlockStart?: string;
  @HostBinding('style.padding-block-start')
  get paddingBlockStartProp() {
    return this.paddingBlockStart;
  }

  @Input() paddingBottom?: string;
  @HostBinding('style.padding-bottom')
  get paddingBottomProp() {
    return this.paddingBottom;
  }

  @Input() paddingInline?: string;
  @HostBinding('style.padding-inline')
  get paddingInlineProp() {
    return this.paddingInline;
  }

  @Input() paddingInlineEnd?: string;
  @HostBinding('style.padding-inline-end')
  get paddingInlineEndProp() {
    return this.paddingInlineEnd;
  }

  @Input() paddingInlineStart?: string;
  @HostBinding('style.padding-inline-start')
  get paddingInlineStartProp() {
    return this.paddingInlineStart;
  }

  @Input() paddingLeft?: string;
  @HostBinding('style.padding-left')
  get paddingLeftProp() {
    return this.paddingLeft;
  }

  @Input() paddingRight?: string;
  @HostBinding('style.padding-right')
  get paddingRightProp() {
    return this.paddingRight;
  }

  @Input() paddingTop?: string;
  @HostBinding('style.padding-top')
  get paddingTopProp() {
    return this.paddingTop;
  }

  @Input() position?: string;
  @HostBinding('style.position')
  get positionProp() {
    return this.position;
  }

  @Input() right?: string;
  @HostBinding('style.right')
  get rightProp() {
    return this.right;
  }

  @Input() textAlign?: string;
  @HostBinding('style.text-align')
  get textAlignProp() {
    return this.textAlign;
  }

  @Input() textDecoration?: string;
  @HostBinding('style.text-decoration')
  get textDecorationProp() {
    return this.textDecoration;
  }

  @Input() textTransform?: string;
  @HostBinding('style.text-transform')
  get textTransformProp() {
    return this.textTransform;
  }

  @Input() top?: string;
  @HostBinding('style.top')
  get topProp() {
    return this.top;
  }

  @Input() transform?: string;
  @HostBinding('style.transform')
  get transformProp() {
    return this.transform;
  }

  @Input() transformOrigin?: string;
  @HostBinding('style.transform-origin')
  get transformOriginProp() {
    return this.transformOrigin;
  }

  @Input() width?: string;
  @HostBinding('style.width')
  get widthProp() {
    return this.width;
  }

  @Input() whiteSpace?: string;
  @HostBinding('style.white-space')
  get whiteSpaceProp() {
    return this.whiteSpace;
  }

  @Input() padding?: string;
  @HostBinding('style.padding')
  get paddingProp() {
    return this.padding;
  }
}
