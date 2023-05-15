PingBox

A Cross-Platrom social media application which aims to combine features of Twitter, GitHub, and Gmail. 

The platform aims makes use of 'pings' to allow users to connect, share information and collaborate.

Created with Quasar Framework, VueJS & Firebase.

Setup:
Create a new Firebase project
Create a Web App
Copy the config from the code sample that appears and add it to src/boot/firebase.js

Create a Cloud Firestore database - make sure you choose "Start in test mode"

Install the dependencies
npm install
Web Version

Start in development mode
quasar dev

Build for production
quasar build

Desktop Version (Electron)
Start in development mode
quasar dev -m electron

Build for production
To build for different platforms, change the electron > packager > platform setting in quasar.conf.js to win32, darwin, mas or linux

quasar build -m electron
