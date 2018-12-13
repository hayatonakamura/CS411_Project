# CS411_Project
Developed by Seung Hee Lee, Hayato Nakamura, and Ziyao Zhang

## Mood Fixer
For every feeling you have, there is a certain song that just speaks to you and makes you feel better inside, and that’s why we like music so much: for the emotion it compliments. The purpose of this idea is to play music that matches the user's emotions. This webpage application will allow the user to take a picture of themselves and keep track of how your mood is changing overtime. Then, it will generate a playlist on spotify depending on your mood, whether its sad, happy, or angry. It will use Spotify's Authentication, and the specific user's daily emotions are stored in mongodb. Additionally, it will display the average emotion score through the days you have been using this application to further help the user understand how he/she has been feeling. Ultimately the goal is that, the user, whether they were sad or happy, will end the day feeling slightly better as they have listened to music that fits their emotions. Enjoy! 

Primary Language: Javascript
API: Google Cloud Vision, Spotify 
Authentication: Spotify
Database: MongoDB

## Instructions
There are 3 simple pages involved in this webpage. The following is a brief description of each page.

### Page 1: Login - About page
  Provides a description of the web application as well as a login page to start the application. This redirects the user to  subpage 1b, which includes requires authentication via Spotify, allowing the user to login as well as the allow the developers to access the user's Spotify library.

### Page 2: Instructions - Take Picture Page
  This page allows the user to take a picture with a simple button, and select the photo to upload for it to be analyzed by the Google Cloud Vision API. Additionally, this page describes 4 simple steps on how to upload the photo to the Google Cloud Vision API, making it easier for the user to navigate through the page.
  
### Page 3: Results - Logout Page
  This is where the fun begins. This page shows the quantatative results of your emotions, which will be explained with further detail in the section below. The results that will be shown includes the current score of the photo that was just passed, the average score, as well as all the previous scores which were stored in the monogoDB.


## Converting Emotion into a Quantative Score
Google Cloud Vision lists out 5 different emotions depending on the photo: Anger, Sorrow, Joy, Confusion, and Surprise. Each emotion also lists out 6 different scores, VERY UNLIKELY, UNLIKELY, POSSIBLE, LIKELY, VERY LIKELY, UNKNOWN. In order to convert the user's emotion into a quantatative score, the Sorrow and Joy scores are extracted. The 6 different emotion ranges are then scored from -100 to 100 with 20 point intervals. In the end the Sorrow and Joy scores are added together, making a superscore. There will be 8 different possible outcomes of this superscore, and the playlist genre is dependent on this score.
