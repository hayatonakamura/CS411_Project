# CS411_Project
Developed by Seung Hee Lee, Hayato Nakamura, and Ziyao Zhang

## Project Idea 1: Mood Fixer
For every feeling you have, there is a certain song that just speaks to you and makes you feel better inside, and that’s why we like music so much: for the emotion it compliments. The purpose of this idea is to play music that matches the user's emotions. This webpage application will take a picture of your face every interval and keep track of how your mood is changing over an interval of time. Then, it will generate a playlist on spotify and switch playlist automatically depending on your mood, whether its sad, happy, or angry. It will use Google Authentication, and the specific user's daily emotions are stored in the database. Therefore, depends on user's collected database, the app can track user's emotional health and give advices.  For instance, if the user's has been feeling sad for more than a few days, it will suggest alternative ways to change your mood such as eating healthier, getting more sleep, or exercising. The app takes care of the user's emotion health in long term and asks for user feedback after every session so that it will be able to learn how accurately the system was able to judge the user's emotion.

API: Google Cloud Vision (or other CV), Spotify

