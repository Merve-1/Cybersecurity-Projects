# **🔍 Haskell Network Vulnerability Scanner**

## **📌 Brief Overview**
This project is a Haskell-based network port scanner that:
- **Scans open ports** on a specified host.
- **Performs concurrent scanning** for efficiency.
- **Checks firewall rules** for unauthorized open ports.
- **Simulates IDS/IPS attacks** by sending test traffic.

📌 **Detailed Code Explanation:** [Notion Link](https://www.notion.so/Haskell-Network-Vulnerability-Scanner-1897a1b71e4180369b76d26eecbe3b6e?pvs=4)

---
## **📸 Preview**
![demo](https://github.com/user-attachments/assets/77f2b613-0966-4f7c-95ee-aa5f6132ac16)
---

## **🚀 Installation & Setup**

### **Prerequisites**
- Haskell and `cabal` installed.
- Administrative privileges to run port scanning.
- Apache server running (for testing port 80).

### **📦 Setup Steps**

1️⃣ **Clone the repository:**
Click on Download Zip
```sh
cd networkScan
```

2️⃣ **Initialize & Build the Project:**
```sh
cabal init  # (Only needed if setting up a new project)
cabal build
```

3️⃣ **Run the Scanner:**
```sh
sudo cabal run
```

