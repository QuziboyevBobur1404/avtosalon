// const nodemailer = require("nodemailer");
// const CustomErrorHandler = require("../error/custom-error.handler");

// async function sendMessage(code, email) {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "qoziboyevbobur674@gmail.com",
//         pass: process.env.GOOGLE_PASS || "orcy ptns lqbz fvxe",
//       },
//     });
//     await transporter.sendMail({
//       subject: "lesson",
//       from: "qoziboyevbobur674@gmail.com",
//       to: email,
//       html: `

//       <!DOCTYPE html>
// <html lang="uz">
// <head>
// <meta charset="UTF-8">
// <meta name="viewport" content="width=device-width, initial-scale=1.0">
// <title>Auto Salon</title>

// <style>

// body{
// margin:0;
// font-family:Arial;
// background:#0f0f0f;
// color:white;
// }

// /* NAVBAR */

// header{
// display:flex;
// justify-content:space-between;
// align-items:center;
// padding:20px 40px;
// background:#000;
// }

// .logo{
// font-size:22px;
// font-weight:700;
// letter-spacing:2px;
// }

// nav a{
// color:#ccc;
// margin-left:20px;
// text-decoration:none;
// cursor:pointer;
// }

// /* HERO */

// .hero{
// height:350px;
// background:url("https://images.unsplash.com/photo-1503376780353-7e6692767b70") center/cover;
// display:flex;
// align-items:center;
// justify-content:center;
// }

// .hero h1{
// background:rgba(0,0,0,0.6);
// padding:20px 40px;
// border-radius:10px;
// }

// /* SHOWROOM */

// .container{
// padding:40px;
// display:grid;
// grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
// gap:30px;
// }

// .card{
// background:#1a1a1a;
// border-radius:10px;
// overflow:hidden;
// }

// .card img{
// width:100%;
// height:200px;
// object-fit:cover;
// }

// .card-body{
// padding:20px;
// }

// .car-title{
// font-size:20px;
// font-weight:700;
// }

// .price{
// color:#00e5ff;
// margin:6px 0;
// }

// .meta{
// color:#aaa;
// font-size:14px;
// }

// /* GALLERY */

// .gallery{
// display:flex;
// gap:6px;
// padding:8px;
// }

// .gallery img{
// width:60px;
// height:40px;
// object-fit:cover;
// cursor:pointer;
// border-radius:4px;
// }

// /* ADMIN PANEL */

// .admin{
// display:none;
// padding:40px;
// background:#111;
// }

// form{
// max-width:500px;
// background:#1a1a1a;
// padding:25px;
// border-radius:10px;
// }

// input,textarea{
// width:100%;
// padding:10px;
// margin-bottom:10px;
// border:none;
// border-radius:6px;
// }

// button{
// background:#00e5ff;
// border:none;
// padding:12px;
// border-radius:6px;
// font-weight:bold;
// cursor:pointer;
// }

// </style>
// </head>

// <body>

// <header>
// <div class="logo">AUTO SALON</div>

// <nav>
// <a onclick="showPage('shop')">Showroom</a>
// <a onclick="showPage('admin')">Admin Panel</a>
// </nav>
// </header>

// <section class="hero" id="shop">
// <h1>Find Your Dream Car</h1>
// </section>

// <section class="container" id="carContainer">

// <!-- CAR CARD -->

// <div class="card">

// <img src="https://picsum.photos/400/200?1" id="main0">

// <div class="gallery">
// <img src="https://picsum.photos/400/200?1" onclick="changeImage(this,'main0')">
// <img src="https://picsum.photos/400/200?2" onclick="changeImage(this,'main0')">
// <img src="https://picsum.photos/400/200?3" onclick="changeImage(this,'main0')">
// </div>

// <div class="card-body">

// <div class="car-title">Chevrolet Malibu</div>

// <div class="price">$22,000</div>

// <div class="meta">2018 • 2.5L • Automatic</div>

// </div>

// </div>

// </section>

// <!-- ADMIN PANEL -->

// <section class="admin" id="admin">

// <h2>🚗 Car qo‘shish</h2>

// <form id="carForm">

// <input name="marka" placeholder="Marka">
// <input name="model" placeholder="Model">
// <input name="motor" placeholder="Motor">
// <input name="year" placeholder="Year">
// <input name="price" placeholder="Price">
// <input name="distance" placeholder="Distance">

// <textarea name="description" placeholder="Description"></textarea>

// <input name="image1" placeholder="Image 1 URL">
// <input name="image2" placeholder="Image 2 URL">
// <input name="image3" placeholder="Image 3 URL">

// <button type="submit">Add Car</button>

// </form>

// </section>

// <script>

// /* PAGE SWITCH */

// function showPage(page){

// document.getElementById("admin").style.display =
// page === "admin" ? "block" : "none"

// document.getElementById("carContainer").style.display =
// page === "admin" ? "none" : "grid"

// document.querySelector(".hero").style.display =
// page === "admin" ? "none" : "flex"

// }

// /* IMAGE GALLERY */

// function changeImage(el,id){
// document.getElementById(id).src = el.src
// }

// /* ADD CAR */

// let carIndex = 1

// document.getElementById("carForm").addEventListener("submit",(e)=>{

// e.preventDefault()

// const f = e.target

// const card = document.createElement("div")

// card.className="card"

// card.innerHTML =

// <img src="${f.image1.value}" id="main${carIndex}">

// <div class="gallery">
// <img src="${f.image1.value}" onclick="changeImage(this,'main${carIndex}')">
// <img src="${f.image2.value}" onclick="changeImage(this,'main${carIndex}')">
// <img src="${f.image3.value}" onclick="changeImage(this,'main${carIndex}')">
// </div>

// <div class="card-body">

// <div class="car-title">${f.marka.value} ${f.model.value}</div>

// <div class="price">$${f.price.value}</div>

// <div class="meta">${f.year.value} • ${f.motor.value}L • ${f.distance.value} km</div>

// </div>

// document.getElementById("carContainer").appendChild(card)

// carIndex++

// alert("Car added!")

// f.reset()

// })

// </script>

// </body>
// </html>
//   `,
//     });
//   } catch (error) {
//     throw CustomErrorHandler.InternalServerError(error.message);
//   }
// }

// module.exports = sendMessage;
const nodemailer = require("nodemailer");
const CustomErrorHandler = require("../error/custom-error.handler");

async function sendMessage(code, email) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "qoziboyevbobur674@gmail.com",
        pass: process.env.GOOGLE_PASS || "orcy ptns lqbz fvxe",
      },
    });

    await transporter.sendMail({
      subject: "Auto Salon Verification",
      from: "qoziboyevbobur674@gmail.com",
      to: email, // ✅ TO‘G‘RILANDI
      html: `<h2>Your verification code</h2>
             <h1>${code}</h1>
             <p>Code expires in 2 minutes</p>`,
    });

    console.log("Email sent to:", email);
  } catch (error) {
    // ✅ ERROR QO‘SHILDI
    throw CustomErrorHandler.InternalServerError(error.message);
  }
}

module.exports = sendMessage;
