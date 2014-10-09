
(function () {

    // store a reference to the application object that will be created
    // later on so that we can use it if need be
    var app;
    var gaPlugin;
	var offLine;

    // create an object to store the models for each view
    window.APP = {
      models: {
        home: {
          title: 'Home'
        },
        settings: {
          title: 'Settings'
        },
          info: {
          title: 'Info'
        },
          alerts: {
          title: 'Alerts'
        },
          twitter: {
              title: 'Tweets',
              ds:    new kendo.data.DataSource({
                transport: {
            	    read: {
                        url: "http://www.butler.bham.ac.uk/twitter-api/index.php?screenname=uobservicedesk" ,
                        dataType: "json"//,
                        //filter: { field: "ParentId", operator: "eq", value: "22" }
                    }
                },
                change: function (data) {
            	    //app.application.hideLoading();
                }
              })
        },
        guide: {
              title: 'Pocket Guide',
              
              ds:    new kendo.data.HierarchicalDataSource({
                transport: {
            	    read: {
                        url: "http://www.butler.bham.ac.uk/pocket_guides/index.json" ,
                        dataType: "json"
                    }
                },
                schema: {
                    parse: function(response) {
                    
                        var compItems = [];
                        for (var i=0; i< response.length; i++) {
                            if (response[i].ParentId == 22) {
                            var page = {
                                    id: response[i].id,
                                    pageTitle: response[i].PageTitle,
                                    pageFunction: response[i].PageFunction,
                                    icon: response[i].icon
                                };
                                compItems.push(page);
                            }
                        }
                        return compItems;
                    }
                },
                change: function (data) {
            	    //app.application.hideLoading();
                }
              })
        },
        contacts: {
          title: 'Contacts',
          ds: new kendo.data.DataSource({
            data: [{ id: 1, name: 'Bob' }, { id: 2, name: 'Mary' }, { id: 3, name: 'John' }]
          }),
          alert: function(e) {
            alert(e.data.name);
          }
        }
      }
    };
    
    
    // this function is called by Cordova when the application is loaded by the device
    document.addEventListener('deviceready', function () {  
      
       "use strict";
      // hide the splash screen as soon as the app is ready. otherwise
      // Cordova will wait 5 very long seconds to do it for you.
      navigator.splashscreen.hide();

      app = new kendo.mobile.Application(document.body, {
        
        // you can change the default transition (slide, zoom or fade)
        transition: 'slide',
        
        // comment out the following line to get a UI which matches the look
        // and feel of the operating system
        skin: 'flat',

        // the application needs to know which view to load first
        initial: 'views/home.html'
      });

    }, false);


    
    
}());


//Template functions

function cleanOutHtmlTags(content) {

    var myString =  content.replace("&lt;p&gt;","<p>").replace("&lt;/p&gt;","</p>");
    myString =  content.replace("&amp;","&");
    
    console.log("here")
    return myString;
}

function htmlDecode(value){
  return $('<div/>').html(value).text();
}

function timeAgo(created, source) {
    		var date_str = created;
    		
    		if (source && source =="facebook") {
                var created_new = created.replace(/-/g, '/').replace('T', ' ').replace('+0000','');
                date_str = new Date(created_new);
            } else {
                
            }
    		
    		var date_tweet = new Date(date_str);
            var date_now   = new Date();
            var date_diff  = date_now - date_tweet;
            var hours      = Math.round(date_diff/(1000*60*60));
            var days = 0; 
            var timeStr = '';
            if (hours>=24) {
            	days =Math.round(hours/24);
                var dayUnit = "day";
                if (days>1) {
                	dayUnit = "days";
                }
                timeStr = '' + days + ' ' + dayUnit + ' ago';
            }
            else {
            	if (hours<1) {
                	timeStr = 'Just now...';
                }
                else {
                    var hourUnit = "hour";
                
                	if (hours>1) {
                		hourUnit = "hours";
                	}
                	timeStr = '' + hours + ' ' + hourUnit + ' ago';
            	}
            }
			return timeStr;
}

function prettyTime(dateStr) {
    var pTime = "";
    var pDate = new Date(parseInt(dateStr.replace("/Date(", "").replace(")/",""), 10));
    pTime = pDate.toLocaleTimeString();
    return pTime;    
}

function prettyDate(dateStr) {
    var pDate = "";
    if (dateStr) {
        pDate = new Date(dateStr).toLocaleString();
	}
    return pDate;
}

function cleanUpFacebookUrls(facebookurl) {
    cleanUrl = facebookurl.replace(/&amp;/g, "&")
    return cleanUrl;
}
