"use strict";

import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";

import FormattingSettingsCard = formattingSettings.Card;
import FormattingSettingsSlice = formattingSettings.Slice;
import FormattingSettingsModel = formattingSettings.Model;

export class VisualFormattingSettingsModel extends FormattingSettingsModel {
    // Create formatting settings model formatting cards
    DSGVOCard = new DSGVOCardSettings();
    TotalCard = new TotalsCardSettings();
    cards = [this.DSGVOCard, this.TotalCard];
}

/**
 * Data Point Formatting Card
 */
class DSGVOCardSettings extends FormattingSettingsCard {
    otherName = new formattingSettings.TextInput({
        placeholder:"otherName",
        name: "otherName",
        displayNameKey: "F_Othername",
        value: "Other"
    });

    otherLimit = new formattingSettings.NumUpDown({
        name: "otherLimit",
        displayNameKey: "F_OtherLimit",
        value: 5
    });

    showMainSubject= new formattingSettings.ToggleSwitch({
        name: "showMainSubject",
        displayNameKey: "F_ShowMainSubject",
        value: false
    })
        
    fontSize = new formattingSettings.NumUpDown({
        name: "fontSize",
        displayNameKey: "F_FontSize",
        value: 10
    });

    colorFontColorheader = new formattingSettings.ColorPicker({
        name: "fontColorHeader",
        displayNameKey: "F_FontColorHeader",
        value: { value: "" }
    });

    colorBackColorHeader = new formattingSettings.ColorPicker({
        name: "backColorHeader",
        displayNameKey: "F_BackColorHeader",
        value: { value: "" }
    });

    name: string = "dsgvoSettings";
    displayNameKey: string = "F_DSGVOSettings";
    slices: Array<FormattingSettingsSlice> = [this.otherName, this.otherLimit, this.showMainSubject, this.fontSize, this.colorBackColorHeader, this.colorFontColorheader];
}

class TotalsCardSettings extends FormattingSettingsCard {
    showTotal= new formattingSettings.ToggleSwitch({
        name: "showTotal",
        displayNameKey: "F_ShowGrandTotal",
        value: false
    })

    boldTotal= new formattingSettings.ToggleSwitch({
        name: "boldTotal",
        displayNameKey: "F_BoldGrandTotal",
        value: true
    })

    colorTotal = new formattingSettings.ColorPicker({
        name: "colorTotal",
        displayNameKey: "F_ColorGrandTotal",
        value: { value: "" }
    });

    showSubTotal= new formattingSettings.ToggleSwitch({
        name: "showSubtotal",
        displayNameKey: "F_ShowSubTotal",
        value: false
    })

    boldSubtotal= new formattingSettings.ToggleSwitch({
        name: "boldSubtotal",
        displayNameKey: "F_BoldSubTotal",
        value: true
    })

    colorSubtotal = new formattingSettings.ColorPicker({
        name: "colorSubtotal",
        displayNameKey: "F_ColorSubTotal",
        value: { value: "" }
    });

    name: string = "totals";
    displayNameKey: string = "F_Totals";
    slices: Array<FormattingSettingsSlice> = [this.showSubTotal, this.boldSubtotal, this.colorSubtotal, this.showTotal, this.boldTotal, this.colorTotal];
}