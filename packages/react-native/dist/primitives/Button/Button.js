var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import { Pressable, Text } from 'react-native';
import { styles } from './styles';
export default function Button(_a) {
    var children = _a.children, textStyle = _a.textStyle, pressableProps = __rest(_a, ["children", "textStyle"]);
    return (<Pressable {...pressableProps}>
      {typeof children === 'string' ? (<Text style={[styles.text, textStyle]}>{children}</Text>) : (children)}
    </Pressable>);
}
