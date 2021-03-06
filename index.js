var firebase = require('firebase');
const xbee_api = require('./xbee');

require('dotenv').config()

  const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  };

  var app = firebase.initializeApp(config);
  var auth = app.auth()
  var db = app.database();
  var serverValue = firebase.database.ServerValue;
 

  const user = uid => db.ref(`users/${uid}`);

  const users = () => db.ref("users");

  // const sensors = uid => db.ref(`users/${uid}/sensors`);

  // const sensor = (uid, sensorID) => db.ref(`users/${uid}/sensors/${sensorID}`);
  // const actuators = uid => db.ref(`users/${uid}/actuators`);

  // const actuator = (uid, sensorID) => db.ref(`users/${uid}/actuators/${sensorID}`);
  let counter = 0;
  let alarmCounter = 0;
  const frame_obj = {

    type: 0x10, // xbee_api.constants.FRAME_TYPE.ZIGBEE_TRANSMIT_REQUEST
    id: 0x01, // optional, nextFrameId() is called per default
    destination64: "000000000000FFFF",
    destination16: "fffe", // optional, "fffe" is default
    broadcastRadius: 0x00, // optional, 0x00 is default
    options: 0x00, // optional, 0x00 is default
    //data: "1" // Can either be string or byte array.
};

  xbee_api.serPort.pipe(xbee_api.xbeeModule.parser);
  xbee_api.xbeeModule.builder.pipe(xbee_api.serPort);

  auth.signInWithEmailAndPassword(process.env.NODE_APP_EMAIL,
    process.env.NODE_APP_PASSWORD)
  .catch(function(error){ console.log(error)})
  auth.onAuthStateChanged(authUser =>{
      if(authUser){
          console.log("Authuser: ",authUser.uid)
        //  sensor(authUser.uid, process.env.NODE_APP_SENSORID)
        //  .update({data: 101});
        //   messages().on('value', snapshot => {
        //     console.log("SNAPSHOT", snapshot.val())
        // })

        // actuator(authUser.uid, process.env.NODE_APP_LAMP1ID).on('value',snapshot => {
        //     console.log("SNAPSHOT: ",snapshot.val())
        //     if (snapshot.val().state === 1){
        //         console.log("SENDING 1");
        //         frame_obj.data="1";
        //         xbee_api.xbeeModule.builder.write(frame_obj);
        //     }
        //     if (snapshot.val().state === 0){
        //         console.log("SENDING 0");
        //         frame_obj.data="0";
        //         xbee_api.xbeeModule.builder.write(frame_obj);
        //     }
        // })

        xbee_api.xbeeModule.parser.on("data", function(frame) {
            console.log(">>", frame)
            console.log(">>", frame.remote64)
                if(frame.data){
                if(frame.remote64==='0013a2004198e557'){
	        	      var tagID = frame.data;
                  console.log(tagID);
                  console.log("Counter: ", counter);
                  //  console.log(frame.data.readFloatLE(5));
                  //  console.log("COUNTER: ", counter);
      //                 sensor(authUser.uid, process.env.NODE_APP_TERMOMETERID)
      //                .update({data: temp,
      //                       readingDate: serverValue.TIMESTAMP
      //                       });
			// sensor(authUser.uid, process.env.NODE_APP_BAROMETERID)
			// .update({
			// 	data: press,
			// 	readingDate: serverValue.TIMESTAMP
			// });
			
                    // comments("-LwnsU_BjlGG5_1tQ_VT").push({
                    //     body: "Sensor Data",
                    //     sensorData1: frame.data.readFloatLE(1),
                    //     sensorData2: frame.data.readFloatLE(5)
                    // })
                  //  sensorData("-LwnsU_BjlGG5_1tQ_VT","-LxMEPI-clzctUzlNTX3").update({
                  //      body: "Sensor Data",
                   //     sensorData1: frame.data.readFloatLE(1),
                    //    sensorData2: frame.data.readFloatLE(5),
                    //    cnt: counter
                  //  })
                    counter++;
                               
                }
                // else if (frame.remote64==='0013a2004106afba'){
                //     // console.log("ALARM:  ",frame.data.toString());
                //     console.log("TEMPERATURE", frame.data.readFloatLE());
                //     console.log("Alarm CNT: ", alarmCounter)
                //     alarmCounter++;
                // }
                };
        });

        
      }
  })

  
