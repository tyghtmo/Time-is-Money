var elements = document.getElementsByTagName('*');

chrome.storage.sync.get(['wage'], function (result) {
    console.log("Hourly pay: $" + result.wage);
    moneyToTime(result.wage);
});

function moneyToTime(hourWage) {
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        for (var j = 0; j < element.childNodes.length; j++) {
            var node = element.childNodes[j];

            var text = node.nodeValue;

            if (text != null) {
                var pattern = /\$\d+\.?\d{0,2}/;
                var numString = "";

                var match = text.match(pattern);
                if (match != null) {
                    numString = match[0];
                    numString = text.replace('$', '');
                    numString = numString.trim();
                    numString = numString.split(' ')[0];
                    //alert(numString);
                    numString = numString / hourWage;
                    numString = numString.toFixed(2) + ' Hours';

                    //alert(numString);
                    //var replacedText = text + " " + numString;
                    var replacedText = numString;
                    //var replacedText = text.replace('$', 'hours');

                    if (replacedText !== text) {
                        element.replaceChild(document.createTextNode(replacedText), node);
                    }
                }
            }
        }
    }
}