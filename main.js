/* Moralis init code */
const serverUrl = 'https://s6fvsobuqttq.usemoralis.com:2053/server';
const appId = "a4jK2AV4xP9lLnvbGvpd36TRDMk3lNn5N0ppuzWt";
Moralis.start({ serverUrl, appId });

let x = document.getElementById("user-info");
let xName = document.getElementById("name");
let xAddress = document.getElementById("address");
let xLogout = document.getElementById("btn-logout");
let xLogin = document.getElementById("btn-login");
/* Authentication code */
async function login() {
  let user = Moralis.User.current();
  if (!user) {
    user = await Moralis.authenticate({ signingMessage: "Login Address" })
      .then(function (user) {
        console.log("logged in user:", user);
        console.log(user.get("ethAddress"));
        xLogin.style.display = 'none';
        xLogout.style.display = 'block';
        x.style.display = 'block';
        xName.innerText = user.id;
        xAddress.innerText = user.get("ethAddress");
      })
      .catch(function (error) {
        console.log(error);

      });
  }
}

async function logOut() { 
  await Moralis.User.logOut();
  console.log("logged out");
    //  x = document.getElementById("user-info");
    // if (x.style.display === "none"){
    //    x.style.display = "block";
    //  } else {
    //  x.style.display = "none";
    // }
    xLogin.style.display = 'block';
    xLogout.style.display = 'none';
    x.style.display = 'none';
    xName.innerText = '';
    xAddress.innerText = '';
}

function isLoggedIn() {
  let user = Moralis.User.current();
  if (user) {
    console.log("logged in user:", user);
    console.log(user.get("ethAddress"));
    xLogin.style.display = 'none';
    xLogout.style.display = 'block';
    x.style.display = 'block';
    xName.innerText = user.id;
    xAddress.innerText = user.get("ethAddress");
  }
}

isLoggedIn();

document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;
