---
layout: default
title: Test
nav_order: 2
---

<div id="adobe-dc-view" style="height: 360px; width: 500px;"></div>
<script src="https://acrobatservices.adobe.com/view-sdk/viewer.js"></script>
<script type="text/javascript">
  document.addEventListener("adobe_dc_view_sdk.ready", function(){
    var adobeDCView = new AdobeDC.View({clientId: "7c1e0c31346443b581bfab472ae29541", divId: "adobe-dc-view"});
    adobeDCView.previewFile({
      content:{ location:
        { url: "[https://acrobatservices.adobe.com/view-sdk-demo/PDFs/Bodea%20Brochure.pdf](https://dannyphamv.com/assets/resume.pdf)"}},
      metaData:{fileName: "resume.pdf"}
    },
    {
      embedMode: "SIZED_CONTAINER"
    });
  });
</script>
