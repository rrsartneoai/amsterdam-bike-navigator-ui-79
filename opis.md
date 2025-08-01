Struktura Projektu - Platforma Analizy Dokumentów
Struktura katalogów
document-analysis-platform/
├── backend/
│   ├── app/
│   │   ├── init.py
│   │   ├── models/
│   │   │   ├── init.py
│   │   │   ├── user.py
│   │   │   ├── order.py
│   │   │   ├── document.py
│   │   │   ├── analysis.py
│   │   │   └── payment.py
│   │   ├── api/
│   │   │   ├── init.py
│   │   │   ├── auth.py
│   │   │   ├── orders.py
│   │   │   ├── documents.py
│   │   │   ├── analyses.py
│   │   │   └── payments.py
│   │   ├── services/
│   │   │   ├── init.py
│   │   │   ├── auth_service.py
│   │   │   ├── order_service.py
│   │   │   ├── document_service.py
│   │   │   ├── payment_service.py
│   │   │   └── notification_service.py
│   │   ├── utils/
│   │   │   ├── init.py
│   │   │   ├── validators.py
│   │   │   ├── decorators.py
│   │   │   └── exceptions.py
│   │   └── config.py
│   ├── tests/
│   │   ├── init.py
│   │   ├── conftest.py
│   │   ├── test_models/
│   │   ├── test_api/
│   │   ├── test_services/
│   │   └── test_integration/
│   ├── migrations/
│   ├── requirements.txt
│   ├── app.py
│   └── pytest.ini
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── auth/
│   │   │   ├── orders/
│   │   │   ├── documents/
│   │   │   └── admin/
│   │   ├── pages/
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── auth.js
│   │   │   └── utils.js
│   │   ├── store/
│   │   │   ├── index.js
│   │   │   ├── authSlice.js
│   │   │   └── ordersSlice.js
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.js
│   │   └── index.js
│   ├── src/tests/
│   │   ├── components/
│   │   ├── services/
│   │   └── integration/
│   ├── package.json
│   └── jest.config.js
├── docker-compose.yml
├── .github/workflows/
│   └── ci.yml
└── README.md
Tech Stack
Backend

Framework: Flask 2.3+
Database: PostgreSQL + SQLAlchemy
Authentication: JWT tokens
File Storage: Local/AWS S3
Payments: Stripe
Testing: pytest, factory_boy
API Documentation: Flask-RESTX (Swagger)

Frontend

Framework: React 18 + TypeScript
State Management: Redux Toolkit
HTTP Client: Axios
UI Framework: Material-UI v5
Testing: Jest + React Testing Library
Build Tool: Vite

DevOps

Containerization: Docker + Docker Compose
CI/CD: GitHub Actions
Code Quality: ESLint, Prettier, Black, isort

Kluczowe funkcjonalności integracji

API Endpoints Structure /api/v1/ ├── auth/ │ ├── POST /register │ ├── POST /login │ ├── POST /logout │ └── GET /me ├── orders/ │ ├── GET /orders │ ├── POST /orders │ ├── GET /orders/{id} │ ├── PUT /orders/{id}/status │ └── POST /orders/{id}/documents ├── documents/ │ ├── GET /documents/{id} │ └── DELETE /documents/{id} ├── analyses/ │ ├── POST /orders/{id}/analysis │ └── GET /orders/{id}/analysis └── payments/ ├── POST /orders/{id}/payment-intent └── POST /orders/{id}/payment-confirm
Standardy komunikacji
Content-Type: application/json
Authentication: Bearer {jwt_token}
Error Handling: Consistent JSON error responses
Validation: Pydantic (backend) + Yup (frontend)
File Uploads: multipart/form-data

State Management Flow Frontend Action → API Call → Backend Service → Database → Response → Frontend State Update Następne kroki implementacji
Backend API Development
Frontend Components & Services
Integration Testing
Authentication Flow
File Upload System
Payment Integration
Error Handling & Validation
CI/CD Pipeline