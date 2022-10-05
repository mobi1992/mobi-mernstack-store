export const newPassword_show_hide = () => {
    var x = document.getElementById('newPassword')
    var show_eye = document.getElementById("show_eye4");
    var hide_eye = document.getElementById("hide_eye4");
    hide_eye.classList.remove("d-none");
    if (x.type === "password") {
      x.type = "text";
      show_eye.style.display = "none";
      hide_eye.style.display = "block";
    } else {
      x.type = "password";
      show_eye.style.display = "block";
      hide_eye.style.display = "none";
    }
  }
