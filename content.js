var elements = document.getElementsByTagName('*');
var on = true;

chrome.storage.sync.get(['onOff'], function (result) {
    on = result.onOff;
    console.log("On: " + result.onOff);
});

chrome.storage.sync.get(['wage'], function (result) {
    console.log("Hourly pay: $" + result.wage);
    if (result.wage == null) {
        setWage(10);
    }
    moneyToTime(result.wage);
});

function setWage(wage) {
    chrome.storage.sync.set({ "wage": wage }, function () {
        console.log("Wage is: $" + wage);
    });
}



function moneyToTime(hourWage) {
    if (on) {
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];

            for (var j = 0; j < element.childNodes.length; j++) {
                var node = element.childNodes[j];

                var text = node.nodeValue;

                if (text != null) {
                    var pattern = /\$\d+\.?\d{0,2}/g;
                    var numString = "";

                    var match = text.match(pattern);
                    if (match != null) {
                        for (var i = 0; i < match.length; i++) {
                            var newText = text
                            numString = match[i];
                            numString = match[i].replace(/[^\d.-]/g, '');
                            numString = numString.split(' ')[0];

                            //alert(numString);
                            numString = numString / hourWage;
                            numString = numString.toFixed(2) + ' Hours';
                            //alert(numString);

                            newText = newText.replace(match[i], numString);
                        }
                        if (newText !== text) {
                            element.replaceChild(document.createTextNode(newText), node);
                        }
                    }
                }
            }
        }
    }
}