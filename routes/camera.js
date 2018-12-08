
//Available in nodejs
 
var NodeWebcam = require( "node-webcam" );
 
 
//Default options
module.exports = function(){

    console.log('in camera')

    var opts = {
        
        //Picture related
     
        width: 1280,
     
        height: 720,
     
        quality: 300,
     
     
        //Delay to take shot
     
        delay: 0,
     
     
        //Save shots in memory
     
        saveShots: true,
     
     
        // [jpeg, png] support varies
        // Webcam.OutputTypes
     
        output: "jpg",
     
     
        //Which camera to use
        //Use Webcam.list() for results
        //false for default device
     
        device: false,
     
     
        // [location, buffer, base64]
        // Webcam.CallbackReturnTypes
     
        callbackReturn: "location",
     
     
        //Logging
     
        verbose: false
     
    };
     
     
    //Creates webcam instance
     
    var Webcam = NodeWebcam.create( opts );
     
     
    //Will automatically append location output type
    console.log(__dirname);
    var url = "/Users/leeseunghee/Documents/CS411/mood_fixer_final/uploaded/test_picture.jpg";
     
    Webcam.capture( url, function( err, data ) {} );
     
     
    //Also available for quick use
     
    NodeWebcam.capture( url, opts, function( err, data ) {
     
    });
     
     
    //Get list of cameras
     
    Webcam.list( function( list ) {
     
        //Use another device
     
        var anotherCam = NodeWebcam.create( { device: list[ 0 ] } );
     
    });
     
    //Return type with base 64 image
     
    var opts = {
        callbackReturn: "base64"
    };
     
    NodeWebcam.capture( url, opts, function( err, data ) {
     
        var image = "<img src='" + data + "'>";
     
    });


}
