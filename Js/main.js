(function($) {
    "use strict";

    var fullHeight = function() {
        $('.js-fullheight').css('height', $(window).height());
        $(window).resize(function(){
            $('.js-fullheight').css('height', $(window).height());
        });
    };
    fullHeight();

    // Toggle แสดง/ซ่อนรหัสผ่าน สำหรับ input field
    $(".toggle-password").click(function() {
        $(this).toggleClass("fa-eye fa-eye-slash");
        var input = $($(this).attr("toggle")); 
        if (input.attr("type") === "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });

    // ตรวจสอบรหัสผ่านในฟอร์ม registerForm
    $("#registerForm").on("submit", function(event) {
        var password = $("#passwordInput").val();
        var confirmPassword = $("#confirmPasswordInput").val();
        var errorMessage = $("#errorMessage");

        if (password !== confirmPassword) {
            event.preventDefault(); // หยุดการ submit ฟอร์ม
            errorMessage.show(); // แสดงข้อความ error
        } else {
            errorMessage.hide(); // ซ่อนข้อความ error
        }
    });

})(jQuery);
