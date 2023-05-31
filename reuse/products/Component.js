sap.ui.define(
	[
		"sap/ui/core/library",
		"sap/ui/core/sample/RoutingNestedComponent/base/BaseComponent",
		"sap/ui/core/Component",
	],
	function (library, BaseComponent, Component) {
		"use strict"
		return BaseComponent.extend(
			"sap.ui.core.sample.RoutingNestedComponent.reuse.products.Component",
			{
				metadata: {
					manifest: "json",
					interfaces: [library.IAsyncContentCreation],
				},
			}
		)
	}
)
