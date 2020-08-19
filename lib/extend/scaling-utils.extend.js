import { Dimensions } from 'react-native';
import Config from 'react-native-config';

const { width, height } = Dimensions.get('window');
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];

//Default guideline sizes are based on iPhone X screen
const guidelineBaseWidth = Config.SIZE_MATTERS_BASE_WIDTH || 375;
const guidelineBaseHeight = Config.SIZE_MATTERS_BASE_HEIGHT || 812;

export const scale = size => shortDimension / guidelineBaseWidth * size;
export const verticalScale = size => longDimension / guidelineBaseHeight * size;
export const moderateScale = (size, factor = 0.5) => size + ( scale(size) - size ) * factor;
export const moderateVerticalScale = (size, factor = 0.5) => size + ( verticalScale(size) - size ) * factor;

export const s = scale;
export const vs = verticalScale;
export const ms = moderateScale;
export const mvs = moderateVerticalScale;
