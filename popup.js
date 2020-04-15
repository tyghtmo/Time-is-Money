chrome.storage.sync.get(['wage'], function (result) {
    document.getElementById('wage').value = result.wage;
});

chrome.storage.sync.get(['onOff'], function (result) {
    document.getElementById('onOff').checked = result.onOff;
});

function onOff() {
    var onOff = document.getElementById('onOff').checked;
    chrome.storage.sync.set({ "onOff": onOff }, function () {
        console.log("Switch checked: " + onOff);
    });
    loadContent();
}

function changeWage() {
    var newWage = document.getElementById("wage").value;
    chrome.storage.sync.set({ "wage": newWage }, function () {
        console.log("Wage is: $" + newWage);
    });
    loadContent();
}

function loadContent(){
    //alert("script run");
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
    });
}


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('submit').addEventListener('click', changeWage);
    document.getElementById('onOff').addEventListener('click', onOff)
});