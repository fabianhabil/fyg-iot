#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>

// Global Variable
const int LED1 = 14;
const int LED2 = 13;
const int LED3 = 12;
const int BUILT_LED = 2;
const int LIGHT_SENSOR = 34;
const int freq = 5000;
const int ledChannel = 0;
const int resolution = 8;
int brightness = 0;
bool useSensor = false;
bool lampOn = false;
const char* ssid = "bianha";
const char* password = "fabianhabil";
String header;

// Web Server using port 80
AsyncWebServer server(80);

void setup() {
    Serial.begin(115200);
    pinMode(LED1, OUTPUT);
    pinMode(LED2, OUTPUT);
    pinMode(LED3, OUTPUT);
    ledcSetup(ledChannel, freq, resolution);
    ledcAttachPin(LED1, ledChannel);
    ledcAttachPin(LED2, ledChannel);
    ledcAttachPin(LED3, ledChannel);
    ledcAttachPin(BUILT_LED, ledChannel);
    pinMode(BUILT_LED, OUTPUT);
    ledcWrite(ledChannel, brightness);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("");
    Serial.println("WiFi connected.");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
    server.on("/", HTTP_GET, [](AsyncWebServerRequest* request) {
        request->send_P(200, "text/plain", "OK");
        });
    server.on("/lamp", HTTP_GET, [](AsyncWebServerRequest* request) {
        int params = request->params();
        if (params == 0) {
            lampOn ? request->send_P(200, "text/plain", "On") : request->send_P(200, "text/plain", "Off");
        }
        if (params == 1) {
            AsyncWebParameter* p = request->getParam(0);
            String parameter = "power";
            if (parameter.compareTo(p->name()) == 0) {
                if (p->value().compareTo("on") == 0) {
                    if (lampOn) {
                        request->send_P(400, "text/plain", "Lamp Already On!");
                    }
                    else {
                        brightness = 255;
                        useSensor = false;
                        lampOn = true;
                        request->send_P(200, "text/plain", "On");
                    }
                }
                else if (p->value().compareTo("off") == 0) {
                    if (!lampOn) {
                        request->send_P(400, "text/plain", "Lamp Already Off!");
                    }
                    else {
                        lampOn = false;
                        brightness = 0;
                        request->send_P(200, "text/plain", "Off");
                    }
                }
                else {
                    request->send_P(404, "text/plain", "Not Found");
                }
            }
            else {
                request->send_P(404, "text/plain", "Not Found");
            }
        }
        else {
            request->send_P(404, "text/plain", "Not Found");
        }
        });
    server.on("/sensor", HTTP_GET, [](AsyncWebServerRequest* request) {
        int params = request->params();
        if (params == 0) {
            useSensor ? request->send_P(200, "text/plain", "On") : request->send_P(200, "text/plain", "Off");
        }
        if (params == 1) {
            AsyncWebParameter* p = request->getParam(0);
            String parameter = "power";
            if (parameter.compareTo(p->name()) == 0) {
                if (p->value().compareTo("on") == 0) {
                    if (useSensor) {
                        request->send_P(400, "text/plain", "Sensor Already On!");
                    }
                    else {
                        brightness = 255;
                        useSensor = true;
                        lampOn = false;
                        request->send_P(200, "text/plain", "On");
                    }
                }
                else if (p->value().compareTo("off") == 0) {
                    if (!useSensor) {
                        request->send_P(400, "text/plain", "Sensor Already Off!");
                    }
                    else {
                        brightness = 0;
                        useSensor = false;
                        request->send_P(200, "text/plain", "Off");
                    }
                }
                else {
                    request->send_P(404, "text/plain", "Not Found");
                }
            }
            else {
                request->send_P(404, "text/plain", "Not Found");
            }
        }
        else {
            request->send_P(404, "text/plain", "Not Found");
        }
        });
    server.on("/brightness", HTTP_GET, [](AsyncWebServerRequest* request) {
        int params = request->params();
        if (params == 0) {
            char _post[40];
            sprintf(_post, "%d", brightness);
            request->send_P(200, "text/plain", _post);
        }
        if (params == 1) {
            AsyncWebParameter* p = request->getParam(0);
            String parameter = "value";
            if (parameter.compareTo(p->name()) == 0) {
                brightness = p->value().toInt();
                request->send_P(200, "text/plain", "OK");
            }
            else {
                request->send_P(404, "text/plain", "Not Found");
            }
        }
        else {
            request->send_P(404, "text/plain", "Not Found");
        }
        });
    DefaultHeaders::Instance().addHeader("Access-Control-Allow-Origin", "*");
    server.begin();
    pinMode(LIGHT_SENSOR, INPUT);
}

void loop() {
    int sensorValue = analogRead(LIGHT_SENSOR);
    if (useSensor) {
        brightness = sensorValue < 500 ? 255 : 0;
    }
    ledcWrite(ledChannel, brightness);
    delay(300);
}