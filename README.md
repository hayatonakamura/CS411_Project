# CS411_Project
Developed by Seung Hee Lee, Hayato Nakamura, and Ziyao Zhang

## Project Idea 1: Mood Fixer
For every feeling you have, there is a certain song that just speaks to you and makes you feel better inside, and that’s why we like music so much: for the emotion it compliments. The purpose of this idea is to play music that matches the user's emotions. This webpage application will take a picture of your face every interval and keep track of how your mood is changing over an interval of time. Then, it will generate a playlist on spotify and switch playlist automatically depending on your mood, whether its sad, happy, or angry. It will use Google Authentication, and the specific user's daily emotions are stored in the database. Therefore, depends on user's collected database, the app can track user's emotional health and give advices.  For instance, if the user's has been feeling sad for more than a few days, it will suggest alternative ways to change your mood such as eating healthier, getting more sleep, or exercising. The app takes care of the user's emotion health in long term and asks for user feedback after every session so that it will be able to learn how accurately the system was able to judge the user's emotion.

API: Google Cloud Vision (or other CV), Spotify

## Project Idea 2: Easy Split
Most restaurants have a card limit of 4, meaning they cannot accept more than 4 credit/debit cards when paying the bill.This is an issue when your party is bigger than 4. What ends up happening is there is an individual who pays for the bill, and everyone else pays him/her back. However, it is difficult to include tip/tax and sometimes people forget that they ordered a dish to share. This web application lets you upload a picture of the receipt of your dinner. Then you can select and drag each order to the corresponding person. If there is something that was shared by multiple people, the user will select that dish for those who shared it, and the app will take care of the rest. After the user is done, it will send a link to his/her friends that directs them to their payment page with the amount they are required to pay. Ultimately, this app allows you to efficiently calculate how a meal should be divided up without anyone questioning the venmo requests they are receiving. 

API: (Venmo,Apple Pay, or Stripe), Twilio
