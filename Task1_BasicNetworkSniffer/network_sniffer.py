from scapy.all import sniff, IP, TCP, UDP, ICMP, Raw
from datetime import datetime

packet_count = 0

def display_payload(packet):
    """Display packet payload information."""

    if Raw not in packet:
        print("\nPayload: No payload")
        return

    payload = packet[Raw].load

    print(f"\nPayload Size: {len(payload)} bytes")

    try:
        readable_payload = payload.decode("utf-8")

        print("Payload Type: Readable Text")
        print("Payload Data:")
        print(readable_payload[:100])

    except UnicodeDecodeError:
        print("Payload Type: Binary or Encrypted Data")
        print("Payload Data (first 100 bytes):")
        print(payload[:100])


def packet_callback(packet):
    global packet_count

    if IP not in packet:
        return


    packet_count += 1
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")


    ip_layer = packet[IP]

    print("\n" + "=" * 60)
    print(f"PACKET #{packet_count} CAPTURED")
    print(f"Timestamp:         {timestamp}")
    print("=" * 60)

    print(f"Source IP:        {ip_layer.src}")
    print(f"Destination IP:   {ip_layer.dst}")

    if TCP in packet:

        tcp_layer = packet[TCP]

        print("Protocol:         TCP")
        print(f"Source Port:      {tcp_layer.sport}")
        print(f"Destination Port: {tcp_layer.dport}")

    elif UDP in packet:

        udp_layer = packet[UDP]

        print("Protocol:         UDP")
        print(f"Source Port:      {udp_layer.sport}")
        print(f"Destination Port: {udp_layer.dport}")

    elif ICMP in packet:

        print("Protocol:         ICMP")

    else:

        print(f"Protocol:         Other ({ip_layer.proto})")

    display_payload(packet)

    print("=" * 60)


print("\nStarting Network Sniffer...")
print("Interface: eth0")
print("Capturing IPv4 packets.")
print("Press Ctrl+C to stop.\n")

try:
    sniff(iface="eth0", prn=packet_callback, store=False)
finally:
     print("\nStopping Network Sniffer...")
     print(f"Total packets captured: {packet_count}")
