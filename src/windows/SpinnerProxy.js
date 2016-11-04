
var cordova = require('cordova');

module.exports = {
	show:function(successCallback,errorCallback,data) {
        if (typeof Windows !== 'undefined' &&
            typeof Windows.UI !== 'undefined' /* Check that we have a UI to work with */ &&
            typeof Windows.UI.ViewManagement.StatusBar !== 'undefined' /* Check that we have the StatusBar to work with*/) {

            var data = data[0] || { title: undefined };
            progressIndicator = Windows.UI.ViewManagement.StatusBar.ProgressIndicator
                || Windows.UI.ViewManagement.StatusBar.getForCurrentView().progressIndicator;
            
            if (data.title == null)
                data.title = undefined;
            progressIndicator.text = typeof data.title !== 'undefined' ? data.title : 'Loading...';
            progressIndicator.showAsync();
            Windows.UI.ViewManagement.StatusBar.getForCurrentView().showAsync();
        } else if (typeof Windows !== 'undefined' &&
                    typeof Windows.UI !== 'undefined' /* Check that we have a UI to work with */) {

            var title = data[0];
            var message = data[1];

            var bodyElem = document.body;
            var loadingElem = document.createElement("div");
            loadingElem.setAttribute('style', 'position: fixed; z-index: 1; left:0; top:0; width:100%; height:100%; overflow: auto; text-align:center');
            loadingElem.setAttribute('id', 'loadingDiv');


            var innerElem = document.createElement("div");
            innerElem.setAttribute('style', 'width:100%; height:100%; position:relative; top: 50%; transform: translateY(-50%); background-color: rgba(50,50,50,0.5); margin:auto')
            innerElem.innerHTML = "<progress style=\"width:10%; height:10%; position:relative; top: 50%; transform: translateY(-50%);\" id=\"loadingProcessProgressRing\" class=\"win-ring\"></progress>";
            if(title){
                innerElem.innerHTML += "<h1 style=\"position:relative; top: 55%;  translateY(-50%) \">" + title + "</h1>";
            }
            if (message) {
                innerElem.innerHTML += "<h3 style=\"position:relative; top: 55%;  translateY(-50%) \">" + message + "</h3>";
            }
            
            loadingElem.appendChild(innerElem);
      


            bodyElem.appendChild(loadingElem);
        }		
    },
	hide:function(successCallback,errorCallback,strInput) {
		if (typeof Windows !== 'undefined' &&
            typeof Windows.UI !== 'undefined' /* Check that we have a UI to work with */ &&
            typeof Windows.UI.ViewManagement.StatusBar !== 'undefined' /* Check that we have the StatusBar to work with*/) {

            progressIndicator.hideAsync();
            Windows.UI.ViewManagement.StatusBar.getForCurrentView().hideAsync(); //TODO
        } else if (typeof Windows !== 'undefined' &&
                    typeof Windows.UI !== 'undefined' /* Check that we have a UI to work with */) {
                        
            //TODO: Support Desktop, Xbox, etc
            var loadingDiv = document.getElementById("loadingDiv").remove();
        }
	}

};
require("cordova/exec/proxy").add("SpinnerDialog", module.exports);
