var elements = document.getElementsByTagName('*');
var on = true;

var symbolClass = ["price-symbol", "currency-sign", "a-price-symbol", "small-dollar", "price--currency-sign", "Price-currency"];
var dollarClass = ["price-dollars", "dollar-value", "a-price-whole", "price--dollars", "price-regular price "];
var centClass = ["price-cents", "cent-value", "a-price-fraction", "price--cents"];

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
                    //Match any text with $0,000.00 and replace
                    var pattern = /\$(?:\d+\,?)\d+\.?\d{0,2}/g;
                    var numString = "";
                    var match = text.match(pattern);
                    if (match != null) {
                        var newText = text;

                        for (var k = 0; k < match.length; k++) {
                            numString = match[k]
                            numString = numString.replace(/[^\d.-]/g, '');
                            numString = numString.split(' ')[0];
                            numString = numString / hourWage;
                            numString = numString.toFixed(2) + ' Hours';
                            newText = newText.replace(match[k], numString);
                        }
                        if (newText !== text) {
                            element.replaceChild(document.createTextNode(newText), node);
                        }
                    }
                }

                //Remove currency sign and cents
                if (symbolClass.includes(node.className) || centClass.includes(node.className)) {
                    element.removeChild(node);
                }
            }
        }

        //Match text based on div className
        dollarClass.forEach(function (entry) {
            var dollarElements = document.getElementsByClassName(entry);

            for (var i = 0; i < dollarElements.length; i++) {
                var element = dollarElements[i];
                var numString = "";
                //console.log(element);

                for (var j = 0; j < element.childNodes.length; j++) {
                    var node = element.childNodes[j];

                    if (node != null && node.nodeType == 3) {
                        if (/\S/.test(node.textContent) && !/^\d+\.{1}\d{2}\s{1}(?:Hours)$/.test(node.textContent)) {
                        
                        //console.log("Input: " + node.textContent);
                        numString = node.textContent
                        numString = numString.replace(/[^\d.-]/g, '');
                        numString = numString / hourWage;

                        numString = numString.toFixed(2) + ' Hours';
                        //console.log("Output: " + numString);

                        
                        element.replaceChild(document.createTextNode(numString), node);
                        }
                    }
                }
            }
        });
    }
}