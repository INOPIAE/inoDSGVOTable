"use strict";

import powerbi from "powerbi-visuals-api";
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import "./../style/visual.less";

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;

import DataView = powerbi.DataView;
import DataViewObjects = powerbi.DataViewObjects;
import DataViewValueColumn = powerbi.DataViewValueColumn;
import DataViewTable = powerbi.DataViewTable;
import DataViewTableRow = powerbi.DataViewTableRow;

import DataViewMetadataColumn = powerbi.DataViewMetadataColumn;
import DataViewCategoryColumn = powerbi.DataViewCategoryColumn;
import PrimitiveValue = powerbi.PrimitiveValue;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;

import { valueFormatter as vf, textMeasurementService as tms } from "powerbi-visuals-utils-formattingutils";
import IValueFormatter = vf.IValueFormatter;


import { VisualFormattingSettingsModel } from "./settings";

import * as $ from "jquery";

export class Visual implements IVisual {
    private target: HTMLElement;
    private updateCount: number;
    private textNode: Text;
    private formattingSettings: VisualFormattingSettingsModel;
    private formattingSettingsService: FormattingSettingsService;
    private rootElement: JQuery;
    private dataView: DataView;
    private hostService: IVisualHost;

    constructor(options: VisualConstructorOptions) {
        console.log('Visual constructor', options);
        this.formattingSettingsService = new FormattingSettingsService();

        this.hostService = options.host;
        this.rootElement = $(options.element);

    }

    public update(options: VisualUpdateOptions) {
        this.formattingSettings = this.formattingSettingsService.populateFormattingSettingsModel(VisualFormattingSettingsModel, options.dataViews);

        console.log('Visual update', options);

        this.rootElement.empty();

        var dataView: DataView = this.dataView = options.dataViews[0];

        if (dataView != null && dataView.table != null) {

            var table: DataViewTable = dataView.table;
            var columns: DataViewMetadataColumn[] = table.columns;
            var rows: DataViewTableRow[] = table.rows;

            var dsgvoTable: JQuery = $("<table>", { id: "dsgvoTable" });
            var headerRow: JQuery = $("<tr>");
            for (var headerIndex: number = 0; headerIndex < columns.length; headerIndex++) {
                headerRow.append($("<th>").text(columns[headerIndex].displayName));
            }
            dsgvoTable.append(headerRow);

            var mainsubject = null;
            var strOther = this.formattingSettings.DSGVOCard.otherName.value;
            var intOther = 0;
            var intOtherMargin = this.formattingSettings.DSGVOCard.otherLimit.value;
            var intSubtotal = 0;
            var intTotal = 0;

            var blnShowMainsubject = this.formattingSettings.DSGVOCard.showMainSubject.value;
            var blnShowSubtotal = this.formattingSettings.TotalCard.showSubTotal.value;
            var blnShowTotal = this.formattingSettings.TotalCard.showTotal.value;
            var blnFirstRow = false;

            for (var rowIndex: number = 0; rowIndex < rows.length; rowIndex++) {

                if (mainsubject === null) {
                    mainsubject = rows[rowIndex][0].valueOf();
                    blnFirstRow = true;
                }
                else if (mainsubject != rows[rowIndex][0].valueOf()) {
                    // handle other
                    var topic = mainsubject;
                    if (blnShowMainsubject != true) {
                        topic = "";
                    }
                    this.addRow(dsgvoTable, topic, strOther, intOther, columns);

                    // handle sub total
                    if (blnShowSubtotal != false) {
                        topic = "Subtotal of " + mainsubject;
                        this.addRow(dsgvoTable, topic, "", intSubtotal, columns, true);
                        intSubtotal = 0;
                    }

                    mainsubject = rows[rowIndex][0].valueOf();
                    blnFirstRow = true;
                }

                console.log('Row', rowIndex + " m " + blnShowMainsubject  + " e " + blnFirstRow);

                var firstColumn: PrimitiveValue = rows[rowIndex][0].valueOf();
                var secondColumn: PrimitiveValue = rows[rowIndex][1].valueOf();
                var thirdColumn: PrimitiveValue = rows[rowIndex][2].valueOf();
                if (blnShowMainsubject != true && blnFirstRow != true) {
                    firstColumn = "";
                }
                if (intOtherMargin < Number(rows[rowIndex][2].valueOf())) {
                    this.addRow(dsgvoTable, firstColumn, secondColumn, thirdColumn, columns, true);
                    blnFirstRow = false;
                } else{
                    intOther += Number(rows[rowIndex][2].valueOf());
                }
                
                intSubtotal += Number(rows[rowIndex][2].valueOf())
                intTotal += Number(rows[rowIndex][2].valueOf())
            }

            // handle final rows
            var topic = mainsubject;
            if (blnShowMainsubject != true) {
                topic = "";
            }
            this.addRow(dsgvoTable, topic, strOther, intOther, columns);

            // handle sub total
            if (blnShowSubtotal != false) {
                topic = "Subtotal of " + mainsubject;
                this.addRow(dsgvoTable, topic, "", intSubtotal, columns, true);
                intSubtotal = 0;
            }
            if (blnShowTotal != false) {
                topic = "Grand total";
                this.addRow(dsgvoTable, topic, "", intTotal, columns, true);
                intSubtotal = 0;
            }

            var dsgvoTableContainer: JQuery = $("<div>", { id: "dsgvoTableContainer" });
            dsgvoTableContainer.css({
                "width": options.viewport.width,
                "height": options.viewport.height
            });

                var dsgvoTableContainer: JQuery = $("<div>", { id: "dsgvoTableContainer" });
                dsgvoTableContainer.css({
                    "width": options.viewport.width,
                    "height": options.viewport.height
                });
                dsgvoTableContainer.append(dsgvoTable);
                this.rootElement.append(dsgvoTableContainer);
            
        }
    }

    /**
     * Returns properties pane formatting model content hierarchies, properties and latest formatting values, Then populate properties pane.
     * This method is called once every time we open properties pane or when the user edit any format property. 
     */
    public getFormattingModel(): powerbi.visuals.FormattingModel {
        return this.formattingSettingsService.buildFormattingModel(this.formattingSettings);
    }

    private addRow(dsgvoTable, firstColumn: any, secondColumn: any, thirdColumn: any, columns: any, bold: boolean = false): void {
        var tableRow: JQuery = $("<tr>");

        var tableCell: JQuery = $("<td>").text(firstColumn);
        // if (this.getValue<boolean>(columns[0].objects, "columnFormatting", "fontBold", false) || bold === true) {
        //     tableCellOther.css({ "font-weight": "bold" });
        // }
        tableRow.append(tableCell);
        tableCell = $("<td>").text(secondColumn);
        // if (this.getValue<boolean>(columns[1].objects, "columnFormatting", "fontBold", false) || bold === true) {
        //     tableCellOther.css({ "font-weight": "bold" });
        // }
        tableRow.append(tableCell);

        var valueFormat: string = columns[2].format;

        var valueFormatter = vf.create({
            format: valueFormat,
            cultureSelector: this.hostService.locale
        });

        tableCell = $("<td>").text(valueFormatter.format(thirdColumn));
        // if (this.getValue<boolean>(columns[2].objects, "columnFormatting", "fontBold", false) || bold === true) {
        //     tableCellOther.css({ "font-weight": "bold" });
        // }
        tableCell.css({ "text-align": "right" });

        tableRow.append(tableCell);
        dsgvoTable.append(tableRow);
    }
}