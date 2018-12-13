import { RippleBase } from './ripple-common';
import { rippleColorProperty } from './cssproperties';
import { Color } from 'tns-core-modules/ui/page/page';
import { themer } from './material';

export class Ripple extends RippleBase {
    getRippleColor(color: Color) {
        // const temp = typeof color === "string" ? new Color(color) : color
        return new Color(36, color.r, color.g, color.b).ios; // default alpha is 0.14
    }
    inkTouchController: MDCInkTouchController;

    get ios() {
        return this.nativeViewProtected as MDCInkView;
    }
    public createNativeView() {
        const view = UIView.alloc().init();
        this.inkTouchController = MDCInkTouchController.alloc().initWithView(view);
        this.inkTouchController.addInkView();
        // if (this.style['rippleColor']) {
        //     this.inkTouchController.defaultInkView.inkColor = this.getRippleColor(this.style['rippleColor']);
        // } else {
            const colorScheme = themer.getAppColorScheme();
            MDCInkColorThemer.applyColorSchemeToInkView(colorScheme, this.inkTouchController.defaultInkView);
        // }
        return view;
    }
    [rippleColorProperty.setNative](color: Color) {
        this.inkTouchController.defaultInkView.inkColor = this.getRippleColor(color);
    }
}