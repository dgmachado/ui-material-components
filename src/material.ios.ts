import { Color } from 'tns-core-modules/color/color';

// export * from './material.common';

export class Themer {
    appColorScheme: MDCSemanticColorScheme
    constructor() {
        //create a default one to prevent multiple creations on widget side
        this.appColorScheme =  MDCSemanticColorScheme.new();
        this.appColorScheme.primaryColorVariant = this.appColorScheme.primaryColor.colorWithAlphaComponent(0.24);
    }
    getOrcreateAppColorScheme() {
        if (!this.appColorScheme) {
            this.appColorScheme = MDCSemanticColorScheme.new();
        }
        return this.appColorScheme;
    }
    getAppColorScheme() {
        return this.appColorScheme;
    }
    setPrimaryColor(value: string) {
        const colorTheme = this.getOrcreateAppColorScheme();
        const color = new Color(value);
        colorTheme.primaryColor = color.ios;
        colorTheme.primaryColorVariant = new Color(61.2, color.r, color.g, color.b).ios; // default alpha is 0.24

    }
    setPrimaryColorVariant(value: string) {
        this.getOrcreateAppColorScheme().primaryColorVariant = new Color(value).ios;
    }
}

export const themer = new Themer();

function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            console.log('overrinding', name);
            if (name !== 'constructor') {
                derivedCtor.prototype[name] = baseCtor.prototype[name]
            }
        })
    })
}
export function overridePage() {
    // const NSPage = require("tns-core-modules/ui/page/page").Page
    // applyMixins(NSPage, [require("./page").Page])
}export function overrideBottomSheet() {
    console.log('overrideBottomSheet');
    
    const NSView = require("tns-core-modules/ui/core/view").View
    applyMixins(NSView, [require("./bottomsheet-common").ViewWithBottomSheetBase, require("./bottomsheet").ViewWithBottomSheet])
}
export function install() {
    overridePage()
    overrideBottomSheet()
}