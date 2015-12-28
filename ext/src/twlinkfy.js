var elements = document.getElementsByTagName('body')[0];
var validNodes = getNodes(elements);
replaceNodes(validNodes);

function replaceNodes(nodes) {
var regex = new RegExp("^@\\w+", "g");
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        var newVal = node.nodeValue;
        newVal = newVal.replace(regex, "<a href=\"https://twitter.com/intent/user?screen_name=$&\">" + '$&' + "</a>")hfghg
        if (newVal !== node.nodeValue) {
            var wrapper = document.createElement("span");
            wrapper.innerHTML = newVal;
            var parent = node.parentNode;
            parent.insertBefore(wrapper, node);
            parent.removeChild(node);
        }
    }
}

function getNodes(node) {
    var textNodes = [];
    var queue = [node];
    var regex = new RegExp("^@\\w+", "g");
    while (queue.length > 0) {
        var childNode = queue.shift();
	if (typeof childNode === "undefined")
		continue;
        var parent = childNode.parentElement;
        if (typeof parent != "undefined" && childNode.nodeType === 3 && parent.tagName !== 'A' && parent.tagName !== 'TEXTAREA' && childNode.nodeValue.match(regex)) {
            textNodes.push(childNode);
        } else {
            for (var i = 0; i < childNode.childNodes.length; i++) {
                queue.push(childNode.childNodes[i]);
            }
        }
    }

    return textNodes;
}
