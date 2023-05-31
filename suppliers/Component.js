sap.ui.define(
	["sap/ui/core/library", "sap/ui/core/UIComponent"],
	function (library, UIComponent) {
		"use strict"

		return UIComponent.extend("sample.suppliers.Component", {
			metadata: {
				manifest: "json",
				interfaces: [library.IAsyncContentCreation],
			},
			init: function () {
				UIComponent.prototype.init.apply(this, arguments)

				this.getRouter().initialize()
			},
		})
	}
)
