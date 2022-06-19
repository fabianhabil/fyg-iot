# fyg-iot

Our Project for Human Computer Interaction Course Semester 2 @Bina Nusantara Bandung

## Video Demo
[Link Youtube](https://www.youtube.com/watch?v=kGtCep5hEHA&ab_channel=FabianHabilRamdhan)


## Installation Guide

1. You need an ESP32, NodeJS and Git installed on your computer.
2. Clone the repository anywhere in your computer
    ```sh
    git clone https://github.com/fabianhabil/fyg-iot.git
    ```
3. Open your terminal in the root of the project.
4. ```
   cd frontend
   npm install
   ```
5. Upload main.cpp to your ESP32 (Dont forget to download the header file)
6. Edit your ESP32 IP Address on .env file in the root of the frontend directory.
7. ```
   npm run dev
   ```
8. Your program is ready!


## Backstory

This is our first project on IoT on Course Human Computer Interaction. The name fyg is based on our member name (Fabian, Yoga and Girenda).
At first we gonna use 9W LED Lamp with some relay, but unlucky for us the power on the cafe get turned off by accidentaly because our wiring is not good :D.
So we replace our lamp with some 5mm LED!
We promise we will back with some cool and good project in the future!

## What can this fyg-iot do?

We can turn off and turn on the lamp on the website (make sure your on the same wifi with the lamp).
We used photosensor to make the lamp on and off based on the lighting around the lamp.

## How it works?

Basically, the ESP32 is gonna be the server and we send a request to the server. To see how it works, please kindly read main.cpp because too long to explain :D

## Member

-   2501976503 - Fabian Habil Ramdhan
-   2501980091 - I Nyoman Yogasmara Prasetya Darma
-   2501995995 - Girenda Dhiandre Ardianugrah

## Technology

-   ESP32
-   Photosensor
-   Jumper Wires
-   Breadboard
-   Next JS
-   Bootstrap with Styled Components
