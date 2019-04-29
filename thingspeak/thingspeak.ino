
/*
 * 2017/3/15  Kyuho Kim
 * Template for using Thing Speak Service
 */

const char* host = "api.thingspeak.com";
String url = "/update?api_key=19CMQKTTBMM3KQG1";   // Your Own Key here
const int httpPort = 80;
int h, t;
int cur_h, cur_t;
int interval = 15000;

#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include "DHT.h"

int pin=D4; //
#define DHTTYPE DHT11
DHT dht(pin, DHTTYPE);


const char* ssid = "GreenGreen";   // Your own ssid here
const char* password = "01235asd";  // Your own password here


String working() { 
  return(String("field1=")+String(cur_h)+String("&field2=")+String(cur_t));
}

void delivering(String payload) { 
  WiFiClient client;
  Serial.print("connecting to ");
  Serial.println(host);
  if (!client.connect(host, httpPort)) {
    Serial.print("connection failed: ");
    Serial.println(payload);
    return;
  }
  String getheader ="GET "+String(url)+"&"+String(payload)+"HTTP/1.1";
  client.println(getheader);
 // client.println("User-Agent: ESP8266 Kyuho Kim");  
 // client.println("Host: " + String(host));  
  //client.println("Connection: close");  
  //client.println();
delay(500);
  Serial.println(getheader);
 // while (client.connected()) {
 // String line = client.readStringUntil('\n');
  //Serial.println(line);
 //}
  Serial.println("Done cycle.");
}

void connect_ap() {
  Serial.println();
  Serial.print("connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.print("\n Got WiFi, IP address: ");
  Serial.println(WiFi.localIP());  
}

void setup() {
  Serial.begin(9600);
  connect_ap();

  Serial.println("ESPArduinoThingSpeak.cpp - 2017/3/15");
}

unsigned long mark = 0;
void loop() {
  static int  stat = 0;
  static byte buf[10];
  static int i;

  float temp, humi;
  int err;
  h = dht.readHumidity();
  t = dht.readTemperature();
  if (h != cur_h || t != cur_t) {
    cur_t = t;
    cur_h = h;
    Serial.print("Humidity: ");
    Serial.print(cur_h);
    Serial.print(" %\t");
    Serial.print("Temperature: ");
    Serial.print(cur_t);
    Serial.println(" C");
  }
  
  if (millis() > mark && !isnan(cur_t) && cur_t != 0 && cur_t <= 100 && !isnan(cur_h) && cur_h != 0 && cur_h <=100) {
     mark = millis() + interval;
     String payload = working();
     delivering(payload);
  }
}
