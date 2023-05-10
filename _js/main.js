// Switch the box color

const colorSelectors = document.querySelectorAll(".colorswitcher div");
colorSelectors.forEach(function (selector) {
    selector.addEventListener("click", function () {
        // Get the selected radio button
        const selected = document.querySelector("input[type='radio']:checked");
        const selectedBox = selected.previousElementSibling;
        selectedBox.className = selector.className;
    });
});
