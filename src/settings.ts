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
        descriptionKey: "F_Othername",
        value: "Other"
    });

    otherLimit = new formattingSettings.NumUpDown({
        name: "otherLimit",
        displayNameKey: "F_OtherLimit",
        value: 5
    });

    showMainSubject= new formattingSettings.ToggleSwitch({
        name: "showMainSubject",
        displayName: "Show main subject",
        value: false
    })
        
    name: string = "dsgvoSettings";
    displayName: string = "DSGVO settings";
    slices: Array<FormattingSettingsSlice> = [this.otherName, this.otherLimit, this.showMainSubject];
}

class TotalsCardSettings extends FormattingSettingsCard {
    showTotal= new formattingSettings.ToggleSwitch({
        name: "showTotal",
        displayName: "Show Grand Totals",
        value: false
    })

    boldTotal= new formattingSettings.ToggleSwitch({
        name: "boldTotal",
        displayName: "Bold Grand Totals",
        value: true
    })

    colorTotal = new formattingSettings.ColorPicker({
        name: "colorTotal",
        displayName: "Default color Grand Totals",
        value: { value: "" }
    });

    showSubTotal= new formattingSettings.ToggleSwitch({
        name: "showSubtotal",
        displayName: "Show Sub Totals",
        value: false
    })

    boldSubtotal= new formattingSettings.ToggleSwitch({
        name: "boldSubtotal",
        displayName: "Bold Sub Totals",
        value: true
    })

    colorSubtotal = new formattingSettings.ColorPicker({
        name: "colorSubtotal",
        displayName: "Default color Grand Totals",
        value: { value: "" }
    });

    name: string = "totals";
    displayName: string = "Totals and Sub totals";
    slices: Array<FormattingSettingsSlice> = [this.showSubTotal, this.boldSubtotal, this.colorSubtotal, this.showTotal, this.boldTotal, this.colorTotal];
}