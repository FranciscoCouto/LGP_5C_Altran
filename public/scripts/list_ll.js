$(document).ready(function() {
    $('#lessonslist .addLesson').on('click', function() {
        console.log("clicked");
        $(this).closest('a').toggleClass('active');
    });

    $(function() {
        $('#selectStatus').bootstrapToggle();
    })

});
