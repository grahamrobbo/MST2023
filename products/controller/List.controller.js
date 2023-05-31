sap.ui.define(
	[
		"sap/ui/core/mvc/Controller",
		"sap/base/Log",
		"sap/m/ColumnListItem",
		"sap/m/Text",
		"sap/ui/model/type/Currency",
	],
	function (Controller, Log, ColumnListItem, Text, Currency) {
		"use strict"
		return Controller.extend("sample.products.controller.List", {
			onInit: function () {
				this.getOwnerComponent()
					.getRouter()
					.getRoute("list")
					.attachMatched(this._onMatched, this)
			},

			_onMatched: function (oEvent) {
				var oArgs = oEvent.getParameter("arguments")
				var sPath = decodeURIComponent(oArgs.basepath || "") + "/Products"
				var oTable = this.getView().byId("table")
				var that = this

				oTable.bindItems({
					path: sPath,
					parameters: {
						expand: "Supplier",
					},
					template: new ColumnListItem({
						type: "Navigation",
						press: that.onPressListItem.bind(that),
						cells: [
							new Text({ text: "{ProductID}" }),
							new Text({ text: "{ProductName}" }),
							new Text({ text: "{Supplier/CompanyName}" }),
							new Text({
								text: {
									parts: [
										{
											path: "UnitPrice",
										},
										{
											value: "$",
										},
									],
									type: new Currency({
										currencyCode: false,
									}),
								},
							}),
						],
					}),
				})
			},

			onPressListItem: function (oEvent) {
				Log.info(this.getView().getControllerName(), "onPressListItem")

				var oBindingContext = oEvent.getSource().getBindingContext()

				this.getOwnerComponent()
					.getRouter()
					.navTo("detail", {
						id: oBindingContext.getProperty("ProductID"),
					})
			},
		})
	}
)
