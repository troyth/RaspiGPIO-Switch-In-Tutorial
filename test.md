#Raspberry Pi Switch In Tutorial

A tutorial for using an input switch value to drive a web-browser interface.

This tutorial is used as part of the Site to Site course taught at the Columbia University Graduate School of Architecture, Planning and Preservation.

***

##Dependencies

This tutorial uses Node.js on the ARM-powered Raspberry Pi Rasbian (Wheezy) Linux system. It employs the following frameworks and modules for its core tasks

*	Express.js web framework
*	pi-gpio
*	HTML5 canvas

##Description

The web app draws a full-screen HTML5 canvas element one line at a time (verical lines progressing horizontally) in one of two colors depending on the state of a toggle flag driven by a physical switch connected to the GPIO of a Raspberry Pi. 
