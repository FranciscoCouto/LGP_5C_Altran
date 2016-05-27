function preview(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) { $('#img').attr('src', e.target.result);  }
    reader.readAsDataURL(input.files[0]);     }   }

$("#upload").change(function(){
  $("#img").css({top: 0, left: 0});
    preview(this);
    $("#img").draggable({ containment: 'parent',scroll: false });
});