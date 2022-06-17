#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>

// Global Variable
const int LED = 14;
const int BUILT_LED = 2;
const int LIGHT_SENSOR = 34;
bool useSensor = false;
bool lampOn = false;
const char* ssid = "bianha";
const char* password = "fabianhabil";
String header;

// Web Server using port 80
AsyncWebServer server(80);

// Current time
unsigned long currentTime = millis();
// Previous time
unsigned long previousTime = 0;
// Define timeout time in milliseconds (example: 2000ms = 2s)
const long timeoutTime = 2000;

void setup() {
    // put your setup code here, to run once:
    Serial.begin(115200);
    pinMode(LED, OUTPUT);
    pinMode(BUILT_LED, OUTPUT);
    digitalWrite(LED, LOW);
    digitalWrite(BUILT_LED, LOW);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    // Print local IP address and start web server
    Serial.println("");
    Serial.println("WiFi connected.");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
    server.on("/", HTTP_GET, [](AsyncWebServerRequest* request) {
        request->send_P(200, "text/plain", "OK");
        });
    server.on("/lamp", HTTP_GET, [](AsyncWebServerRequest* request) {
        int params = request->params();
        Serial.println(params);

        if (params == 0) {
            lampOn ? request->send_P(200, "text/plain", "On") : request->send_P(200, "text/plain", "Off");
        }
        if (params == 1) {
            AsyncWebParameter* p = request->getParam(i);
            string parameter = "power";
            if (parameter.compare(p->name()) == 0) {
                if (p->value().compare("on") == 0) {
                    if (lampOn) {
                        request->send_P(400, "text/plain", "Lamp Already On!");
                    }
                    else {
                        lampOn = true;
                        request->send_P(200, "text/plain", "On");
                    }
                }
                else if (p->value().compare("off") == 0) {
                    if (!lampOn) {
                        request->send_P(400, "text/plain", "Lamp Already Off!");
                    }
                    else {
                        lampOn = false;
                        request->send_P(200, "text/plain", "Off");
                    }
                }
                else {
                    request->send_P(404, "text/plain", "Not Found, Check Documentation");
                }
            }
            else {
                request->send_P(404, "text/plain", "Not Found, Check Documentation");
            }
            for (int i = 0;i < params;i++) {
                AsyncWebParameter* p = request->getParam(i);
                Serial.print("Param name: ");
                Serial.println(p->name());
                Serial.print("Param value: ");
                Serial.println(p->value());
                Serial.println("------");
            }
        }
        else {
            request->send_P(404, "text/plain", "Not Found, Check Documentation");
        }
        });
    server.on("/lamp/on/", HTTP_GET, [](AsyncWebServerRequest* request) {
        if (lampOn) {
            request->send_P(400, "text/plain", "Lamp Already On!");
        }
        else {
            lampOn = true;
            request->send_P(200, "text/plain", "On");
        }
        });
    server.on("/lamp/off/", HTTP_GET, [](AsyncWebServerRequest* request) {
        if (!lampOn) {
            request->send_P(400, "text/plain", "Lamp Already Off!");
        }
        else {
            lampOn = false;
            request->send_P(200, "text/plain", "Off");
        }
        });
    // server.on("/sensor", HTTP_GET, [](AsyncWebServerRequest* request) {
    //     if (useSensor) request->send_P(200, "text/plain", "On") : request->send_P(200, "text/plain", "Off");
    //     });
    // server.on("/sensor/power", HTTP_GET, [](AsyncWebServerRequest* request) {
    //     useSensor = !useSensor;
    //     request->send_P(200, "text/plain", "%d", useSensor);
    //     });

    server.begin();

    pinMode(LIGHT_SENSOR, INPUT);
}

void loop() {
    // put your main code here, to run repeatedly:
    int sensorValue = analogRead(LIGHT_SENSOR);
    if (useSensor) {
        digitalWrite(LED, sensorValue < 500 ? HIGH : LOW);
        digitalWrite(BUILT_LED, sensorValue < 500 ? HIGH : LOW);
    }
    if (lampOn) {
        digitalWrite(LED, HIGH);
        digitalWrite(BUILT_LED, HIGH);
    }
    //  Serial.println(sensorValue);
    delay(300);
}