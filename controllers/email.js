const nodemailer = require("nodemailer");

exports.email = (req, res, next) => {
  /*
  // Import the Nodemailer library
const nodemailer = require('nodemailer');

// Create a transporter object
const transporter = nodemailer.createTransport({

  secure: true, // use SSL
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
  
  auth: {
    user: 'halfya@mobiblanc.com',
    pass: 'dodomido123',
  }
});

// Configure the mailoptions object
const mailOptions = {
  from: 'halfya@mobiblanc.com',
  to: 'halfyamehdi@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

// Send the email
transporter.sendMail(mailOptions, function(error, info){
  console.log(error);
  if (error) {
    res.status(200).json({
      ok:"ok" ,
    });
  } else {
    res.status(240).json({
      error: error,
    });
  }
});
*/
const nodemailer = require('nodemailer');

// Création d'un transporteur SMTP réutilisable (utilisez le service par défaut pour l'envoi)
let transporter = nodemailer.createTransport({
    
  secure: false, // use SSL
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
    auth: {
      user: 'halfya@mobiblanc.com',
      pass: 'dodomido123',         // Mot de passe de votre adresse email
    }
});

// Configuration de l'email
let mailOptions = {
  from: 'halfya@mobiblanc.com',
  to: 'halfyamehdi@gmail.com',     // Adresse email du destinataire
    subject: 'Test Email',          // Sujet de l'email
    text: 'Hello from Node.js'      // Corps de l'email au format texte
    // Vous pouvez également utiliser html: pour le contenu HTML
};

// Envoi de l'email
transporter.sendMail(mailOptions, function(error, info){
  console.log(error);
  if (error) {
    res.status(200).json({
      ok:"ok" ,
    });
  } else {
    res.status(240).json({
      error: error,
    });
  }
});

};
