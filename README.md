# Mongodb Export Collections As Csv

## Inspiration

Time and time again I have had need to export mongodb collections as a csv. Either for data processing or any other requirements. But there has been a constant need for this. So i thought I'd whip a quick example repo and share my way of doing this.

## What the repository contains

* A mongoose model called users which is what we wish to export
* A method for downloading the csv as a file directly in a browser
* A method for sending the file to a provided email address

## Dependencies

### Mongoose-to-csv

This sample repository depends on mongoose-to-csv by @nickpisacane, an amazing mongoose plugin that takes care of turning a mongoose model into a streamable object. <a href="https://www.npmjs.com/package/mongoose-to-csv">You can check it out here. </a>.

## How to use

Grab your copy in three simple steps:

* Clone the repository using git clone or download it as zip.
* Run npm i or npm install to install all dependencies
* Create a .env file in the root and fill with the following keys:
    * MONGO_URI
    * APP_NAME
    * MAIL_USERNAME
    * MAIL_PASSWORD
    * MAIL_SERVICE
* Add your values to the keys above then run `npm start`
* Thank me by starring this repo and sharing with others.
* You're welcome

# Contributions

Contributions are totally welcome, send a PR and help grow the repo to help others.
