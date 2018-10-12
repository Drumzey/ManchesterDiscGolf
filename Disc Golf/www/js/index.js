/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
		
		var onNotificationReceived = function(pushNotification) 
		{
			var message = pushNotification.message;
			var title = pushNotification.title;

			if (message === null || message === undefined) {
				// Android messages received in the background don't include a message. On Android, that fact can be used to
				// check if the message was received in the background or foreground. For iOS the message is always present.
				title = 'Android background';
				message = '<empty>';
			}

			// Custom name/value pairs set in the App Center web portal are in customProperties
			if (pushNotification.customProperties && Object.keys(pushNotification.customProperties).length > 0) {
				message += '\nCustom properties:\n' + JSON.stringify(pushNotification.customProperties);
			}
        
			console.log(title, message);
		}

		AppCenter.Push.addEventListener('notificationReceived', onNotificationReceived);
				
        app.receivedEvent('deviceready');
    }    
};
