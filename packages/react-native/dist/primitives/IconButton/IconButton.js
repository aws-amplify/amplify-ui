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
import React, { useMemo } from 'react';
import { Image, Pressable } from 'react-native';
import { getStyles } from './styles';
export default function IconButton(_a) {
    var color = _a.color, source = _a.source, _b = _a.size, size = _b === void 0 ? 16 : _b, pressableProps = __rest(_a, ["color", "source", "size"]);
    var icon = useMemo(function () { return getStyles(color, size); }, [color, size]).icon;
    return (<Pressable {...pressableProps}>
      <Image source={source} style={icon}/>
    </Pressable>);
}
