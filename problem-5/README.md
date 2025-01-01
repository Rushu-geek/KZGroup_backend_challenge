# Express.js CRUD API with PostgreSQL (TypeScript)

This project is a TypeScript-based CRUD API using Express.js and PostgreSQL.

## Prerequisites

Ensure the following are installed on your system:

- **Node.js** (v14 or later)
- **npm** or **yarn**
- **PostgreSQL**

---

## Installation and Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Rushu-geek/KZGroup_backend_challenge.git
cd problem-5
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure the Database

1. Create a PostgreSQL database:
   ```sql
   CREATE DATABASE my_database;
   ```

2. Create the `resources` table:
   ```sql
   CREATE TABLE resources (
       id SERIAL PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       description TEXT,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

### 4. Set Up Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database_name>
```

Replace `<username>`, `<password>`, `<host>`, `<port>`, and `<database_name>` with your PostgreSQL credentials.

### 5. Run the Application

#### Development Mode
```bash
npm run dev
```

#### Production Mode
1. Build the project:
   ```bash
   npm run build
   ```
2. Start the server:
   ```bash
   npm start
   ```

---

## API Endpoints

All endpoints are prefixed with `/api`.

### 1. Create a Resource
**POST** `/api/resources`

#### Request Body
```json
{
    "name": "Resource Name",
    "description": "Resource Description"
}
```

#### Response
- **200 OK**: Returns created resource details.

### 2. List Resources
**GET** `/api/resources`

#### Query Parameters
- `name` (optional): Filter resources by name (case-insensitive).

#### Response
- **200 OK**: Returns a list of resources.

### 3. Get Resource Details
**GET** `/api/resources/:id`

#### Path Parameters
- `id`: Resource ID.

#### Response
- **200 OK**: Returns the resource details.
- **404 Not Found**: If resource does not exist.

### 4. Update a Resource
**PUT** `/api/resources/:id`

#### Path Parameters
- `id`: Resource ID.

#### Request Body
```json
{
    "name": "Updated Resource Name",
    "description": "Updated Resource Description"
}
```

#### Response
- **200 OK**: Returns updated resource details.
- **404 Not Found**: If resource does not exist.

### 5. Delete a Resource
**DELETE** `/api/resources/:id`

#### Path Parameters
- `id`: Resource ID.

#### Response
- **200 OK**: Confirms resource deletion.
- **404 Not Found**: If resource does not exist.

---

## Project Structure

```
project-root/
├── dist/                       # Compiled output files
├── node_modules/               # Node.js dependencies
├── src/
│   ├── config/
│   │   └── db.ts               # Database connection
│   ├── controllers/
│   │   └── resourceController.ts # Controller logic for resources
│   ├── models/
│   │   └── resourceModel.ts    # Database model for resources
│   ├── routes/
│   │   └── resourceRoutes.ts   # Routes for resources
│   ├── services/
│   │   └── resourceService.ts  # Service logic for resources
│   └── server.ts               # Entry point for the application
├── .env                        # Environment variables
├── .env.example                # Example environment variables
├── .gitignore                  # Files to ignore in Git
├── package.json                # Project dependencies and scripts
├── package-lock.json           # Exact dependency tree
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation
```

---

## Scripts

### Start the Development Server
```bash
npm run dev
```

### Build the Project
```bash
npm run build
```

### Start the Production Server
```bash
npm start
```

---

## Testing the API

Use [Postman](https://www.postman.com/) or [cURL](https://curl.se/) to test the endpoints.

### Example cURL Commands

1. **Create a Resource**:
   ```bash
   curl -X POST http://localhost:3000/api/resources \
   -H "Content-Type: application/json" \
   -d '{"name": "Resource Name", "description": "Resource Description"}'
   ```

2. **List Resources**:
   ```bash
   curl http://localhost:3000/api/resources
   ```

3. **Get Resource Details**:
   ```bash
   curl http://localhost:3000/api/resources/1
   ```

4. **Update a Resource**:
   ```bash
   curl -X PUT http://localhost:3000/api/resources/1 \
   -H "Content-Type: application/json" \
   -d '{"name": "Updated Name", "description": "Updated Description"}'
   ```

5. **Delete a Resource**:
   ```bash
   curl -X DELETE http://localhost:3000/api/resources/1
   ```