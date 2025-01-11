const runBtn = document.querySelector("#run");
const darkBtn = document.querySelector("#btn-dark");
const lightBtn = document.querySelector("#btn-light");
const preview = document.getElementById("preview");
const isLive = document.querySelector("#isLive");
const htmlCodeTag = document.querySelector("#html");
const cssCodeTag = document.querySelector("#css");
const jsCodeTag = document.querySelector("#js");

var myCodeMirrorHtml = CodeMirror(htmlCodeTag, {
    value: localStorage.getItem("html") ? localStorage.getItem("html") : `<html>
        <head>
        </head>
        <body>
                <h1>helloWorld!</h1>
        </body>
</html>`,
    mode: "htmlmixed",
    tabSize: 8,
    indentUnit: 8,
    lineNumbers: true,
    theme: "dracula",
    extraKeys: { "Ctrl-Space": "autocomplete" },
});

var myCodeMirrorCss = CodeMirror(cssCodeTag, {
    value: localStorage.getItem("css") ? localStorage.getItem("css") : `h1{
        color: #4040a1;
}`,
    mode: "css",
    tabSize: 8,
    indentUnit: 8,
    lineNumbers: true,
    theme: "dracula",
    extraKeys: { "Ctrl-Space": "autocomplete" },
});

var myCodeMirrorJs = CodeMirror(jsCodeTag, {
    value: localStorage.getItem("javascript") ? localStorage.getItem("javascript") :`document.querySelector("h1").addEventListener("click", () => {alert("hello!")});`,
    mode: "javascript",
    tabSize: 8,
    indentUnit: 8,
    lineNumbers: true,
    theme: "dracula",
    extraKeys: { "Ctrl-Space": "autocomplete" },
});

const runCodes = (e) => {
    const htmlCode = myCodeMirrorHtml.getValue();
    const cssCode = `<style>` + myCodeMirrorCss.getValue() + `</style>`;
    const jsCode = `<script>` + myCodeMirrorJs.getValue() + `</script>`;
    const previewShow = preview.contentWindow.document;
    previewShow.open();
    previewShow.write(htmlCode + cssCode + jsCode);
    previewShow.close();
};

runBtn.addEventListener("click", runCodes);
isLive.addEventListener("change", (e) => {
    if (e.currentTarget.checked) {
        //execute first time
        runCodes();
        htmlCodeTag.addEventListener("keyup", runCodes);
        cssCodeTag.addEventListener("keyup", runCodes);
        jsCodeTag.addEventListener("keyup", runCodes);
    } else {
        htmlCodeTag.removeEventListener("keyup", runCodes);
        cssCodeTag.removeEventListener("keyup", runCodes);
        jsCodeTag.removeEventListener("keyup", runCodes);
    }
});

lightBtn.addEventListener("click", (e) => {
    myCodeMirrorHtml = changeTheme(myCodeMirrorHtml, htmlCodeTag, "htmlmixed", "mdn-like");
    myCodeMirrorCss = changeTheme(myCodeMirrorCss, cssCodeTag, "css", "mdn-like");
    myCodeMirrorJs = changeTheme(myCodeMirrorJs, jsCodeTag, "javascript", "mdn-like");
});

darkBtn.addEventListener("click", function (e) {
    myCodeMirrorHtml = changeTheme(myCodeMirrorHtml, htmlCodeTag, "htmlmixed", "dracula");
    myCodeMirrorCss = changeTheme(myCodeMirrorCss, cssCodeTag, "css", "dracula");
    myCodeMirrorJs = changeTheme(myCodeMirrorJs, jsCodeTag, "javascript", "dracula");
});

function changeTheme(codeMirror, codeTag, mode, theme) {
    const previousValue = codeMirror.getValue();
    codeTag.innerHTML = "";
    return CodeMirror(codeTag, {
        value: previousValue,
        mode,
        tabSize: 8,
        indentUnit: 8,
        lineNumbers: true,
        theme,
        extraKeys: { "Ctrl-Space": "autocomplete" },
    });
}

(() => {
    let preLoader = document.getElementById("preLoader");
    let content = document.getElementById("content");
    document.addEventListener("DOMContentLoaded", function () {
        preLoader.style.display = "none";
        content.style.display = "block";
        myCodeMirrorHtml = changeTheme(myCodeMirrorHtml, htmlCodeTag, "htmlmixed", "dracula");
        myCodeMirrorCss = changeTheme(myCodeMirrorCss, cssCodeTag, "css", "dracula");
        myCodeMirrorJs = changeTheme(myCodeMirrorJs, jsCodeTag, "javascript", "dracula");
    });
})();
