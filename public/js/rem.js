(function () {
    setRem()
    window.addEventListener('resize', setRem, false)

    function setRem() {
        var width = window.innerWidth;
        document.documentElement.style.fontSize = width / 10 + 'px';
        window.Rem = width / 10;
    }
})()