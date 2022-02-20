# WebSockets Introduction
## Table of Contents

[Introduction](#introduction)

## Introduction

Traditional HTTP (hypertext transfer protocol) follows a request/response paradigm. The client establishes a connection with the server, and then submits a request via this connection. The server will respond to this request with the appropriate response, and then the connection will close. 

![HTTP Diagram](file:///Users/evanhe/Desktop/http_process_explained.jpg)

There are several limitations to relying exclusively on this model of communcation. This limitation that we will focus on is in regards to realtime communication. Take a stock trading app as an example. During trading hours, stock prices will constantly be updating on the server. Using the HTTP model, in order to remain in sync with the latest prices, the client will need to perform many requests in rapid succession. However, since the connection closes after each request, we will need to re-establish the connection every time we make a new request. This additional overhead makes HTTP a poor choice for realtime applications. 

Addressing this issue is where WebSockets come in handy. 
