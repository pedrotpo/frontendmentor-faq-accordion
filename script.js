let toggle = document.getElementsByClassName("toggle");
toggle = Array.from(toggle);

toggle.map((i) => {
  const panel = i.nextElementSibling;
  const icon = i.childNodes[1].childNodes[1];

  i.addEventListener("click", function (event) {
    if (icon.style.transform === "rotate(180deg)"){
      icon.style.transform="rotate(0deg)";
    } else {
      icon.style.transform="rotate(180deg)";
    }
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
});
