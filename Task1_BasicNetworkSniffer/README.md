# Basic Network Sniffer

A Python-based network sniffer built using Scapy. This project captures live IPv4 network traffic and analyzes useful packet information such as source and destination IP addresses, protocols, port numbers, and payload data.

## Features

- Captures live network traffic
- Analyzes IPv4 packets
- Displays source and destination IP addresses
- Identifies TCP, UDP, and ICMP protocols
- Displays source and destination ports for TCP and UDP packets
- Displays packet payload size
- Detects readable text payloads
- Displays binary or encrypted payload data
- Shows packet numbers
- Shows packet capture timestamps
- Gracefully stops using Ctrl+C
- Displays the total number of IPv4 packets captured

## Technologies Used

- Python 3
- Scapy

## How to Run

Run the program with root privileges:

```bash
sudo python3 network_sniffer.py
The program captures IPv4 packets from the eth0 network interface.

Press Ctrl+C to stop the network sniffer.

HTTP vs HTTPS Observation
HTTP

HTTP traffic may contain readable data because it is not encrypted.

Example:

GET / HTTP/1.1
Host: example.com
User-Agent: curl
HTTPS
HTTPS encrypts application data, so the payload may appear as binary or unreadable data.

Ethical Use

This project is intended for educational purposes and authorized network analysis only.

Do not capture or inspect network traffic without proper authorization.

Author

Created as part of the CodeAlpha Cyber Security Internship.
