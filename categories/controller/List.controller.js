sap.ui.define(
	["sap/ui/core/mvc/Controller", "sap/base/Log"],
	function (Controller, Log) {
		"use strict"
		return Controller.extend("sample.categories.controller.List", {
			onPressListItem: function (oEvent) {
				Log.info(this.getView().getControllerName(), "onPressListItem")

				var oBindingContext = oEvent.getSource().getBindingContext()

				this.getOwnerComponent()
					.getRouter()
					.navTo("detail", {
						id: oBindingContext.getProperty("CategoryID"),
					})
			},
		})
	}
)
