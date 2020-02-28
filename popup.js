chrome.storage.sync.get(['wage'], function (result) {
    document.getElementById('wage').value = result.wage;
});

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

// const form = document.getElementById("form");
// form.addEventListener('submit', changeWage());

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('submit').addEventListener('click', changeWage);
});