
var ip = "192.168.1.9"; //James' IP
//var ip = "192.168.1.174"; //Paulina Ip
//var ip = "192.168.50.50"; //Jeremy IP
//var path = "http://" + ip + ":5000"; //Create path with port number
path = "https://sunny-scanner-server.herokuapp.com/"
var DEBUG_MODE = false;

async function callServer(method, route, body, onResponse) {
  console.log("Calling server at " + path + " with route " + route)
  console.log("RESPONSE TO SERVER========================");
  console.log(JSON.stringify(body));
  let res = await fetch(path + "/" + route, {

    method: method,
    //mode: 'no-cors', // no-cors, *cors, same-origin, cors

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    //body: JSON.stringify(result),
    body: JSON.stringify(body)

  });
  let response = await res.json();
  console.log("RESPONSE FROM SERVER ========================");

  console.log(JSON.stringify(response));

  if(onResponse){
    (onResponse(response))
  }
}

module.exports = {
  ip: ip,
  path: path,
  callServer: callServer,
  DEBUG_MODE : DEBUG_MODE
}