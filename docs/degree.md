---
layout: default
title: Degree
parent: Resume
nav_order: 1
---

<div id="adobe-dc-view" style="width: 100%;"></div>
<script src="https://acrobatservices.adobe.com/view-sdk/viewer.js"></script>
<script type="text/javascript">
	document.addEventListener("adobe_dc_view_sdk.ready", function(){ 
		var adobeDCView = new AdobeDC.View({clientId: "7c1e0c31346443b581bfab472ae29541", divId: "adobe-dc-view"});
		adobeDCView.previewFile({
			content:{location: {url: "https://dannyphamv.com/assets/bachelor.pdf"}},
			metaData:{fileName: "DannyPham_Degree.pdf"}
		}, {embedMode: "IN_LINE"});
	});
</script>
