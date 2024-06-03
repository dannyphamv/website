---
layout: default
title: Test
nav_order: 2
---

<div id="adobe-dc-view" style="width: 800px;"></div>
<script src="https://acrobatservices.adobe.com/view-sdk/viewer.js"></script>
<script type="text/javascript">
	document.addEventListener("adobe_dc_view_sdk.ready", function(){ 
		var adobeDCView = new AdobeDC.View({clientId: "7c1e0c31346443b581bfab472ae29541", divId: "adobe-dc-view"});
		adobeDCView.previewFile({
			content:{location: {url: "https://dannyphamv.com/assets/resume.pdf"}},
			metaData:{fileName: "resume.pdf"}
		}, {embedMode: "IN_LINE"});
	});
</script>

[Test resume](
<script src="https://acrobatservices.adobe.com/view-sdk/viewer.js"></script>
<script type="text/javascript">
	document.addEventListener("adobe_dc_view_sdk.ready", function(){ 
		var adobeDCView = new AdobeDC.View({clientId: "7c1e0c31346443b581bfab472ae29541"});
		adobeDCView.previewFile({
			content:{location: {url: "https://dannyphamv.com/assets/resume.pdf"}},
			metaData:{fileName: "resume.pdf"}
		}, {embedMode: "LIGHT_BOX"});
	});
</script>
){: .btn .fs-5 .mb-4 .mb-md-0 }
