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
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function()
	document.addEventListener("deviceready", function(), false);
		// Check if device supports fingerprint
/**
* @return {
*      isAvailable:boolean,
*      isHardwareDetected:boolean,
*      hasEnrolledFingerprints:boolean
*   }
*/
FingerprintAuth.isAvailable(function (result) {

    console.log("FingerprintAuth available: " + JSON.stringify(result));
    
    // If has fingerprint device and has fingerprints registered
    if (result.isAvailable == true && result.hasEnrolledFingerprints == true) {

        // Check the docs to know more about the encryptConfig object :)
        var encryptConfig = {
            clientId: "myAppName",
            username: "currentUser",
            password: "currentUserPassword",
            maxAttempts: 5,
            locale: "en_US",
            dialogTitle: "Hey dude, your finger",
            dialogMessage: "Put your finger on the device",
            dialogHint: "No one will steal your identity, promised"
        }; // See config object for required parameters

        // Set config and success callback
        FingerprintAuth.encrypt(encryptConfig, function(_fingerResult){
            console.log("successCallback(): " + JSON.stringify(_fingerResult));
            if (_fingerResult.withFingerprint) {
                console.log("Successfully encrypted credentials.");
                console.log("Encrypted credentials: " + result.token);  
            } else if (_fingerResult.withBackup) {
                console.log("Authenticated with backup password");
            }
        // Error callback
        }, function(err){
                if (err === "Cancelled") {
                console.log("FingerprintAuth Dialog Cancelled!");
            } else {
                console.log("FingerprintAuth Error: " + err);
            }
        });
    }

/**
* @return {
*      isAvailable:boolean,
*      isHardwareDetected:boolean,
*      hasEnrolledFingerprints:boolean
*   }
*/
}, function (message) {
    console.log("isAvailableError(): " + message);
});
FingerprintAuth.decrypt(decryptConfig, successCallback, errorCallback);

function successCallback(result) {
    console.log("successCallback(): " + JSON.stringify(result));
    if (result.withFingerprint) {
        console.log("Successful biometric authentication.");
        if (result.password) {
            console.log("Successfully decrypted credential token.");
            console.log("password: " + result.password);  
        }
    } else if (result.withBackup) {
        console.log("Authenticated with backup password");
    }
}

function errorCallback(error) {
    if (error === FingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
        console.log("FingerprintAuth Dialog Cancelled!");
    } else {
        console.log("FingerprintAuth Error: " + error);
    }
}		
};
