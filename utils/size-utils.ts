import {Dimensions, PixelRatio, ScaledSize} from 'react-native';
// import Device from 'react-native-device-info';
export const GUIDELINE_BASE_WIDTH = 430;
export const GUIDELINE_BASE_HEIGHT = 932;

export const GUIDELINE_TABLET_BASE_WIDTH = 834;
export const GUIDELINE_TABLET_BASE_HEIGHT = 1194;

export const GUIDELINE_FONT_SIZE_FACTOR = 0.25;

export class SizeUtils {
  public static window: ScaledSize = Dimensions.get('window');
  public static screen: ScaledSize = Dimensions.get('screen');

  constructor() {
    Dimensions.addEventListener('change', this.handleDimensionChange);
  }

  private static percentageCalculation(max: number, val: number) {
    return max * (val / 100);
  }

  private static normalize(size: number, based: 'width' | 'height' = 'width') {
    const parsedSize = typeof size === 'number' ? size : parseFloat(size);
    const heightBaseScale = this.getScreenOffset('height');
    const widthBaseScale = this.getScreenOffset('width');
    const baseScale = based === 'height' ? heightBaseScale : widthBaseScale;
    const newSize = parsedSize * baseScale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }

  public static getScreenOffset(based: 'width' | 'height') {
    if (based === 'width') {
      if (this.isExtraSmall()) {
        return this.getWidthScale() * 0.5;
      } else {
        return this.getWidthScale();
      }
    } else {
      if (this.isExtraSmall()) {
        return this.getHeightScale() * 1.1;
      } else {
        return this.getHeightScale();
      }
    }
  }
  private static getHeightScale(): number {
    // if (Device.getDeviceType() === 'Tablet') {
    //   return this.window.height / GUIDELINE_TABLET_BASE_HEIGHT;
    // }
    return this.window.height / GUIDELINE_BASE_HEIGHT;
  }

  private static getWidthScale(): number {
    // if (Device.getDeviceType() === 'Tablet') {
    //   return this.window.height / GUIDELINE_TABLET_BASE_WIDTH;
    // }

    return this.window.height / GUIDELINE_BASE_WIDTH;
  }

  handleDimensionChange({
    window,
    screen,
  }: {
    window: ScaledSize;
    screen: ScaledSize;
  }) {
    SizeUtils.window = window;
    SizeUtils.screen = screen;
  }

  public static responsiveHeight = (h: number) => {
    return this.normalize(h, 'height');
  };

  public static responsiveWidth = (w: number): number => {
    return this.normalize(w, 'width');
  };

  public static responsiveFontSize = (f: number) => {
    const parsedSize = typeof f === 'number' ? f / 3.5 : parseFloat(f) / 3.5;

    if (this.isExtraSmall()) {
      return parsedSize / 1.5;
    }

    return (
      parsedSize +
      (this.normalize(parsedSize, 'width') - parsedSize) *
        GUIDELINE_FONT_SIZE_FACTOR
    );
  };

  public static responsiveScreenHeight = (h: number) => {
    return this.percentageCalculation(this.window.height, h);
  };

  public static responsiveScreenWidth = (w: number) => {
    return this.percentageCalculation(this.window.width, w);
  };

  public static responsiveScreenFontSize = (f: number) => {
    return this.responsiveHeight(f);
  };

  public static isExtraSmall = () => {
    return this.window.height <= 500;
  };
}
