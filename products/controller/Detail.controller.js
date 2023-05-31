sap.ui.define(
	["sap/ui/core/mvc/Controller", "sap/base/Log"],
	function (Controller, Log) {
		"use strict"

		return Controller.extend("sample.products.controller.Detail", {
			onInit: function () {
				this.getOwnerComponent()
					.getRouter()
					.getRoute("detail")
					.attachMatched(this._onMatched, this)
			},

			_onMatched: function (oEvent) {
				Log.info(this.getView().getControllerName(), "_onMatched")
				var oArgs = oEvent.getParameter("arguments")
				this.getOwnerComponent()
					.getModel()
					.metadataLoaded()
					.then(this._bindData.bind(this, oArgs.id))
			},

			_bindData: function (id) {
				Log.info(this.getView().getControllerName(), "_bindData")

				var sObjectPath = this.getOwnerComponent()
					.getModel()
					.createKey("Products", { ProductID: id })

				this.getView().bindElement({
					path: "/" + sObjectPath,
					parameters: {
						expand: "Supplier,Category",
					},
					events: {
						change: function () {
							Log.info(this.getView().getControllerName(), "_bindData change")
							this.getView().setBusy(false)
						}.bind(this),
						dataRequested: function () {
							Log.info(
								this.getView().getControllerName(),
								"_bindData dataRequested"
							)
							this.getView().setBusy(true)
						}.bind(this),
						dataReceived: function () {
							Log.info(
								this.getView().getControllerName(),
								"_bindData dataReceived"
							)
							this.getView().setBusy(false)
							if (this.getView().getBindingContext() === null) {
								this.getOwnerComponent()
									.getRouter()
									.getTargets()
									.display("notFound")
							}
						}.bind(this),
					},
				})
			},
			base64StringToImage: function (picture) {
				return picture ? "data:image/bmp;base64," + picture : null
			},
		})
	}
)