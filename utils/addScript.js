
export default function addScript(src) { //loads script
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref); //inserts new script into file before previous scripts
}
