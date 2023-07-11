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
        displayName: "Text for Other",
        value: "Other"
    });

    otherLimit = new formattingSettings.NumUpDown({
        name: "otherLimit",
        displayName: "Less than",
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

    showSubTotal= new formattingSettings.ToggleSwitch({
        name: "showSubTotal",
        displayName: "Show Sub Totals",
        value: false
    })

    name: string = "totals";
    displayName: string = "Totals and Sub totals";
    slices: Array<FormattingSettingsSlice> = [this.showTotal, this.showSubTotal];
}