# Week 3 - Electronics Design

## Assignments of the Week
1. Use an EDA tool to design a development board that uses parts from the inventory to interact and communicate with an embedded microcontroller
2. Extra credit: try another design workflow
3. Extra credit: simulate your design
4. Extra credit: design a case around your design

---
This week, I plan to design and manufacture an expansion board using Seeed Studio XIAO ESP32-C3, which can accommodate four A4988 stepper motor drivers, enabling independent control of four stepper motors. Through this practice, I will delve into using LCEDA for PCB design, covering component selection, schematic drawing, circuit layout optimization, and generating 3D views and manufacturing files to ensure the board’s producibility and stability.

---
## PCB Design Process
### 1.Project Initialization
Create a new electronic design project in LCEDA:
1. Create a new project and select "project"
![](https://unncfab.oss-cn-hangzhou.aliyuncs.com/img/AL/20250320145053208.png)
2. Select "Save",then a new project is created.
![](https://unncfab.oss-cn-hangzhou.aliyuncs.com/img/AL/20250320145237622.png)
![](https://unncfab.oss-cn-hangzhou.aliyuncs.com/img/AL/20250320145250904.png)

### 2.Component Library Preparation
In LCEDA, I need to use component models for the Seeed Studio Xiao ESP32-C3 and A4988 stepper motor driver. 
1. Click on "Library", then enter "XIAO ESP32C3 PCB" in the search bar, and you will find "XIAO ESP32C3 PCB",and the double click it.
![](https://unncfab.oss-cn-hangzhou.aliyuncs.com/img/AL/20250320150833593.png)
![](https://unncfab.oss-cn-hangzhou.aliyuncs.com/img/AL/20250320152136156.png)
![](https://unncfab.oss-cn-hangzhou.aliyuncs.com/img/AL/20250320152350399.png)
### 3.Place A4988 and other modules in the schematic using the same method
![](https://unncfab.oss-cn-hangzhou.aliyuncs.com/img/AL/20250320153455842.png)

## 3.Hardware Specification Analysis
### 3.1Pin Definitions
Below are the pin definitions for XIAO ESP32-C3 and A4988. Based on these definitions, I can connect four A4988 modules to the XIAO ESP32-C3 to achieve independent control of four stepper motors.
![](https://unncfab.oss-cn-hangzhou.aliyuncs.com/img/AL/20250320153716010.png)
![](https://unncfab.oss-cn-hangzhou.aliyuncs.com/img/AL/20250320153825235.png)

### 3.2 A4988 Technical Specifications
Here are the technical specifications for the A4988:
| Parameter Type | Specification |
| ----- | ----- |
| Motor Output Voltage | 8V – 35V |
| ----- | ----- |
| Logic Input Voltage | 3V – 5.5V |
| ----- | ----- |
| Continuous Current per Phase | 1A |
| ----- | ----- |
| Maximum Current per Phase | 2A |
| ----- | ----- |
| Microstepping Resolution | Full, 1/2, 1/4, 1/8, 1/16 |

### 3.3Power System
A4988 requires two power connections:
- Logic Power
VDD-GND: 3V-5.5V, for internal logic circuits
- Motor Power
VMOT-GND: 8V-35V, for motor drive
- Note: Motor power requires decoupling capacitors to maintain current
![](https://unncfab.oss-cn-hangzhou.aliyuncs.com/img/AL/20250320155739875.png)
### 3.4Microstepping Control
The A4988 driver supports microstepping, which achieves finer step divisions by applying intermediate current levels to the motor coils.
- MS1/MS2/MS3: Used to select microstepping resolution, different logic level combinations can set different microstepping modes.
- Default state: Pulled down to full-step mode. For example, when driving a NEMA 17 motor (1.8° step angle, i.e., 200 steps/revolution) in quarter-step mode, the motor will execute 800 microsteps per revolution.
![](https://unncfab.oss-cn-hangzhou.aliyuncs.com/img/AL/20250320155905232.png)
### 3.5Motion Control
A4988 has two control input pins - STEP and DIR.
- STEP: Step control, each high-level pulse sent to this pin drives the motor according to the microstep selection pins. The faster the pulses, the faster the motor rotates.
- DIR: Direction control, high level for clockwise, low level for counterclockwise.
### 3.6Power Management
- EN: Enable control, default active-low input for this pin
- SLP: Sleep mode, enters on low level
- RST: Reset control, resets on low level
![](https://unncfab.oss-cn-hangzhou.aliyuncs.com/img/AL/20250320160020696.png)
### 3.7Motor Output
- 1A/1B/2A/2B: Motor phase interfaces for connecting stepper motors.
![](https://unncfab.oss-cn-hangzhou.aliyuncs.com/img/AL/20250320160052722.png)
## 4.Pin Assignment Plan
Below is the pin connection plan: 
| Parameter Type | Specification |
| ----- | ----- |
| D0 | Motor 1 STEP |
| ----- | ----- |
| D1 | Motor 1 DIR |
| ----- | ----- |
| D2 | Motor 2 STEP |
| ----- | ----- |
| D3 | Motor 2 DIR |
| ----- | ----- |
| D4 | Motor 3 STEP |
| ----- | ----- |
| D5 | Motor 3 DIR |
| ----- | ----- |
| D6 | Motor 4 STEP |
| ----- | ----- |
| D7 | Motor 4 DIR |
| ----- | ----- |
| GND | All A4988 ENABLE |
| ----- | ----- |
| GND | All A4988 GND |
| ----- | ----- |
| 5V | All A4988 VDD |

## 5.Circuit Design Implementation
### 5.1Schematic Design
1. Power Area Wiring
First, we wire the power section to ensure proper VCC and GND connections.
![](https://unncfab.oss-cn-hangzhou.aliyuncs.com/img/AL/20250320161038439.png)
2. Pin Connections
