
# Task 4: Network Intrusion Detection System (IDS)

## Project Overview

This project demonstrates a basic Network Intrusion Detection System using Suricata on Kali Linux.

Suricata monitors network traffic and generates alerts when traffic matches predefined detection rules.

## Tools Used

- Kali Linux
- Suricata 8.0.6
- ICMP (Ping)
- Emerging Threats Open Rules

## Implementation Steps

1. Installed Suricata on Kali Linux.
2. Updated Suricata detection rules using `suricata-update`.
3. Verified the Suricata configuration.
4. Created a custom ICMP detection rule.
5. Monitored network traffic on the `eth0` interface.
6. Generated ICMP traffic using ping.
7. Verified the alert in Suricata's `fast.log`.

## Custom Detection Rule

The custom rule detects ICMP traffic directed toward the local network.

```text
alert icmp any any -> $HOME_NET any (msg:"LOCAL ICMP Ping Detected"; sid:1000001; rev:1;)
```

## Testing and Results

The IDS successfully detected ICMP traffic generated during the ping test.

Example alert:

```text
[1:1000001:1] LOCAL ICMP Ping Detected
```

Source: `8.8.8.8`

Destination: `10.0.2.15`

Protocol: ICMP

## Conclusion

This project provided practical experience with network monitoring, intrusion detection rules, Suricata configuration, and security alert analysis.

## Ethical Considerations

Testing was performed in an authorized lab environment. Network monitoring and detection activities should only be conducted on networks where permission has been granted.

