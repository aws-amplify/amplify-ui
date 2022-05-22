import React, { useMemo } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DEFAULT_CAROUSEL_INDICATOR_ACTIVE_STYLE, DEFAULT_CAROUSEL_INDICATOR_INACTIVE_STYLE, } from './constants';
export default function CarouselPageIndicator(_a) {
    var activeStyle = _a.activeStyle, currentIndex = _a.currentIndex, inactiveStyle = _a.inactiveStyle, numberOfItems = _a.numberOfItems, style = _a.style;
    var items = useMemo(function () {
        return new Array(numberOfItems !== null && numberOfItems !== void 0 ? numberOfItems : 0)
            .fill(null)
            .map(function (_, index) {
            return (currentIndex !== null && currentIndex !== void 0 ? currentIndex : 0) === index ? (<View style={[DEFAULT_CAROUSEL_INDICATOR_ACTIVE_STYLE, activeStyle]} key={"indicator-item-".concat(index)}/>) : (<View style={[DEFAULT_CAROUSEL_INDICATOR_INACTIVE_STYLE, inactiveStyle]} key={"indicator-item-".concat(index)}/>);
        });
    }, [activeStyle, currentIndex, inactiveStyle, numberOfItems]);
    return <SafeAreaView style={style}>{items}</SafeAreaView>;
}
