![image](https://github.com/user-attachments/assets/2c66c65f-efde-4595-8766-95956ed9254c)![image](https://github.com/user-attachments/assets/2c66c65f-efde-4595-8766-95956ed9254c)# 📅 EventPlanner

EventPlanner is a full-stack web application that allows users to create, manage, and edit events and assign them to different groups. It features a modern UI, real-time form validation, and persistent data storage.
---
## 🛠️ Tech Stack

**Frontend:**
- React (with React Router & React Select)
- Axios
- CSS (custom styling)

**Backend:**
- Java Spring Boot
- Spring MVC + JPA
- MySQL / H2 (changeable)
- RESTful APIs

---

## 📂 Project Structure

event-planner/
├── backend/ # Spring Boot application
│ ├── src/main/java/com/example/eventplanner
│ ├── src/main/resources/application.properties
│ └── pom.xml
├── eventplanner (Frontend)/ # React application
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── styles/
│ │ └── api/api.js
│ ├── package.json
│ 
├── .gitignore
└── README.md


## 🚀 Getting Started

### Prerequisites

- Node.js & npm
- Java 17+
- MySQL (or use H2 for testing)

---
### 🔧 Backend Setup

```bash
cd backend
# Update database credentials in application.properties
U can use Xampp (PhpMyAdmin)
./mvnw spring-boot:run

cd frontend
npm install
npm start


