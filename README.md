# 🛡️ Threat Modeling Web Application

This project is a simple authentication-based web application designed to apply **Threat Modeling** techniques. The objective is to analyze potential security threats, assess risks, and implement security controls using industry best practices.

---

## 🚀 Getting Started

To set up this project on your local machine, follow these steps:

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-username/threat-modeling-webapp.git
cd threat-modeling-webapp
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Start the Backend Server**
```sh
node server.js
```

### **4️⃣ Start the Frontend**
```sh
npm start
```

The application should now be running at **http://localhost:3000**.

---

## 🔒 Threat Modeling Process

This project follows a structured **Threat Modeling** approach to identify and mitigate security risks.

### **1️⃣ Define the Scope & Identify Assets**
- Identify critical assets such as **user authentication**, **stored credentials**, and **API endpoints**.
- Define **trust boundaries** between the frontend, backend, and storage systems.

### **2️⃣ Create a Data Flow Diagram (DFD)**
- A **DFD** will be designed using **OWASP Threat Dragon** to map data flows, user interactions, and external dependencies.
- This helps in visualizing **entry points**, **attack vectors**, and **trust boundaries**.

### **3️⃣ Identify Potential Threats (Using STRIDE)**
Using the **STRIDE** model, we categorize threats into:
- **S**poofing: Unauthorized access to user accounts.
- **T**ampering: Modification of data in transit.
- **R**epudiation: Lack of proper logging for actions.
- **I**nformation Disclosure: Exposure of sensitive data.
- **D**enial of Service: Overloading the authentication system.
- **E**levation of Privilege: Bypassing security checks.

### **4️⃣ Prioritize Risks (Using DREAD or CVSS)**
- Each identified threat will be **assessed and prioritized** using either:
  - **DREAD** (Damage, Reproducibility, Exploitability, Affected Users, Discoverability)
  - **CVSS** (Common Vulnerability Scoring System)
- This helps in ranking threats based on **impact and exploitability**.

### **5️⃣ Mitigate and Implement Security Controls**
- **Mitigation strategies** will be applied based on priority.
- Security controls include:
    - **Input Validation** to prevent **SQL Injection & XSS**.
    - **Authentication Hardening** with **bcrypt** for password hashing.
    - **Access Controls** to enforce **least privilege principles**.
    - **Logging & Monitoring** for better **auditing and threat detection**.


### **6️⃣ Test & Continuously Improve Security**
- **Regular penetration testing** will be performed.
- **Security reviews & automated scanning** will be integrated into the development lifecycle.
- **Continuous updates** will be applied to mitigate new threats.

---

## 📜 Resources
- [OWASP Threat Dragon](https://owasp.org/www-project-threat-dragon/) - For creating **DFD diagrams**.
- [OWASP Secure Coding Practices](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/) - To ensure **secure development**.
- [STRIDE Threat Modeling](https://owasp.org/www-community/Threat_Modeling) - To identify security threats.
- [DREAD & CVSS](https://owasp.org/www-community/metrics) - To **rank risks** effectively.

---

