import { StyleSheet } from 'react-native';
import deepMap from './deep-map';

const validScaleSheetRegex = /^(\-?\d+(\.\d{1,3})?)@(ms(\d+(\.\d{1,2})?)?|mvs(\d+(\.\d{1,2})?)?|s|vs)(r?)$/;

const scaleByAnnotation = (scale, verticalScale, moderateScale, moderateVerticalScale) => (value) => {
    if (!validScaleSheetRegex.test(value)) {
        return value;
    }

    const regexExecResult = validScaleSheetRegex.exec(value);
    const size = parseFloat(regexExecResult[1]);
    const scaleFunc = regexExecResult[3];
    const shouldRound = value.endsWith('r');

    let result;

    switch (scaleFunc) {
        case 's':
            result = scale(size);
            break;
        case 'vs':
            result = verticalScale(size);
            break;
        case 'ms':
            result = moderateScale(size);
            break;
        case 'mvs':
            result = moderateVerticalScale(size);
            break;
        default:
            if (value.includes('ms')) {
                const scaleFactor = value.split('ms')[1].replace('r', '');
                result = moderateScale(size, parseFloat(scaleFactor));
            } else if (value.includes('mvs')) {
                const scaleFactor = value.split('mvs')[1].replace('r', '');
                result = moderateVerticalScale(size, parseFloat(scaleFactor));
            }
    }

    return shouldRound ? Math.round(result) : result;
};

const scaledSheetCreator = (scale, verticalScale, moderateScale, moderateVerticalScale) => {
    const scaleFunc = scaleByAnnotation(scale, verticalScale, moderateScale, moderateVerticalScale);
    return {
        create: styleSheet => StyleSheet.create(deepMap(styleSheet, scaleFunc))
    }
}

export default scaledSheetCreator;
