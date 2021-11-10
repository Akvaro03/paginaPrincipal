

#include <Arduino.h>

#include <WiFi.h>
#include <WiFiMulti.h>

#include <HTTPClient.h>
#include <Adafruit_Sensor.h>  // incluye librerias para sensor BMP280
#include <Adafruit_BMP280.h>
#include "DHT.h"
#include <QMC5883LCompass.h>
#include <Wire.h>
#define USE_SERIAL Serial
#define DHTPIN 4
#define DHTTYPE DHT22

WiFiMulti wifiMulti;
Adafruit_BMP280 bmp;
QMC5883LCompass compass;
DHT dht(DHTPIN, DHTTYPE);


const int PinTrig = 0;
const int PinEcho = 15;

// Constante velocidad sonido en cm/s
const float VelSon = 34000.0;
 
// Número de muestras
const int numLecturas = 5;
 
// Distancia a los 100 ml y vacío
const float distancia100 = 2.15;
const float distanciaVacio = 11.41;
 
float lecturas[numLecturas]; // Array para almacenar lecturas
int lecturaActual = 0; // Lectura por la que vamos
float total = 0; // Total de las que llevamos
float media = 0; // Media de las medidas
bool primeraMedia = false; // Para saber que ya hemos calculado por lo menos una
float cantidadLiquido;

float Temperature;
float Humidity;
float PRESION;
int x,y,z,a;      // variables de los 3 ejes
char myArray[3];
String arrayUnido;

unsigned long lastConnectionTime = 0;         // last time you connected to the server, in milliseconds
const unsigned long postingInterval = 10000L; // delay between updates, in milliseconds

void setup() {

    Serial.begin(115200);
    USE_SERIAL.begin(115200);
     bmp.begin();
     Wire.begin();
     dht.begin();
     compass.init(); 
  compass.setCalibration(-656, 376, -442, 500, -975, 0);

   pinMode(PinTrig, OUTPUT);
  // Ponemos el pin Echo en modo entrada
  pinMode(PinEcho, INPUT);
  
    USE_SERIAL.println();
    USE_SERIAL.println();
    USE_SERIAL.println();

    for(uint8_t t = 4; t > 0; t--) {
        USE_SERIAL.printf("[SETUP] WAIT %d...\n", t);
        USE_SERIAL.flush();
        delay(1000);
    }

    wifiMulti.addAP("Hardware", "escuela2043");

}

void loop() {

    Temperature = dht.readTemperature();
     Humidity= dht.readHumidity();
    PRESION = bmp.readPressure()/100;

// brujula
    compass.read();
    a = compass.getAzimuth();
  compass.getDirection(myArray, a);
  arrayUnido=String(myArray[0])+ String(myArray[1])+String(myArray[2]);
  arrayUnido.trim();
//-------------------------------------------------

iniciarTrigger();
 
  // Eliminamos la última medida
  total = total - lecturas[lecturaActual];
 
  iniciarTrigger();
 
  // La función pulseIn obtiene el tiempo que tarda en cambiar entre estados, en este caso a HIGH
  unsigned long tiempo = pulseIn(PinEcho, HIGH);
 
  // Obtenemos la distancia en cm, hay que convertir el tiempo en segudos ya que está en microsegundos
  // por eso se multiplica por 0.000001
  float distancia = tiempo * 0.000001 * VelSon / 2.0;
 
  // Almacenamos la distancia en el array
  lecturas[lecturaActual] = distancia;
 
  // Añadimos la lectura al total
  total = total + lecturas[lecturaActual];
 
  // Avanzamos a la siguiente posición del array
  lecturaActual = lecturaActual + 1;
 
  // Comprobamos si hemos llegado al final del array
  if (lecturaActual >= numLecturas)
  {
    primeraMedia = true;
    lecturaActual = 0;
  }
 
  // Calculamos la media
  media = total / numLecturas;
 
  // Solo mostramos si hemos calculado por lo menos una media
  
    float distanciaLleno = distanciaVacio - media;
    float cantidadLiquido = distanciaLleno * 100 / distancia100;

 
  if (millis() - lastConnectionTime > postingInterval) {
    httpRequest();
  }
   
}


void httpRequest()
{
   Serial.println("http://klimarios.herokuapp.com/arduino?temp="+ String(Temperature)+"/"+String(Humidity)+"/"+String(PRESION)+"/"+String(arrayUnido)+"/"+String(cantidadLiquido));
   if((wifiMulti.run() == WL_CONNECTED)) {

        HTTPClient http;

        USE_SERIAL.print("[HTTP] begin...\n");
        // configure traged server and url
        //http.begin("https://www.howsmyssl.com/a/check", ca); //HTTPS
        http.begin("http://klimarios.herokuapp.com/arduino?temp="+ String(Temperature)+"/"+String(Humidity)+"/"+String(PRESION)+"/"+String(arrayUnido)); //HTTP

        USE_SERIAL.print("[HTTP] GET...\n");
        // start connection and send HTTP header
        int httpCode = http.GET();

        // httpCode will be negative on error
        if(httpCode > 0) {
            // HTTP header has been send and Server response header has been handled
            USE_SERIAL.printf("[HTTP] GET... code: %d\n", httpCode);

            // file found at server
            if(httpCode == HTTP_CODE_OK) {
                String payload = http.getString();
                USE_SERIAL.println(payload);
            }
        } else {
            USE_SERIAL.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
        }

        http.end();
    }
}
void iniciarTrigger()
{
  // Ponemos el Triiger en estado bajo y esperamos 2 ms
  digitalWrite(PinTrig, LOW);
  delayMicroseconds(2);
 
  // Ponemos el pin Trigger a estado alto y esperamos 10 ms
  digitalWrite(PinTrig, HIGH);
  delayMicroseconds(10);
 
  // Comenzamos poniendo el pin Trigger en estado bajo
  digitalWrite(PinTrig, LOW);
}