# Quizo - Quiz Management System

Quizo is a quiz management system built using Next.js (App Router), ShadCN UI, and MySQL with Prisma ORM. This guide provides setup instructions to run the project locally.

---

## 🚀 Project Setup

### 1. Clone the Repository

```sh
git clone https://github.com/your-repo/quizo.git
cd quizo
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add your database connection string:

```sh
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
```

Replace `USER`, `PASSWORD`, `HOST`, `PORT`, and `DATABASE` with your actual database credentials.

### 4. Initialize the Database

Run Prisma migrations to set up the database schema:

```sh
npx prisma migrate dev --name init
```

### 5. Seed the Database

Since the login part is static so you have to  `Create` a user in the `users` table with static credentials:

```sql
INSERT INTO users (id, username, password) VALUES ('priyam', 'priyam', 'priyam');
```

### 6. Start the Development Server

```sh
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## 🔗 API Documentation

### 1️⃣ **User Authentication** (Static Credentials)

- **Login**
  - Endpoint: `POST /api/login`
  - Request Body:
    ```json
    {
      "username": "priyam",
      "password": "priyam"
    }
    ```
  - Response:
    ```json
    {
      "message": "Login successful"
    }
    ```

### 2️⃣ **Quizzes API**

- **Get All Quizzes**

  - Endpoint: `GET /api/quizzes`
  - Response:
    ```json
    [
      {
        "id": "1",
        "title": "Sample Quiz",
        "description": "This is a sample quiz."
      }
    ]
    ```

- **Get a Single Quiz**

  - Endpoint: `GET /api/quizzes/{id}`
  - Response:
    ```json
    {
      "id": "1",
      "title": "Sample Quiz",
      "description": "This is a sample quiz."
    }
    ```

- **Create a Quiz**

  - Endpoint: `POST /api/quizzes`
  - Request Body:
    ```json
    {
      "title": "New Quiz",
      "description": "Quiz description"
    }
    ```
  - Response:
    ```json
    {
      "message": "Quiz created successfully",
      "quiz": {
        "id": "2",
        "title": "New Quiz",
        "description": "Quiz description"
      }
    }
    ```

- **Update a Quiz**

  - Endpoint: `PUT /api/quizzes`
  - Request Body:
    ```json
    {
      "id": "2",
      "title": "Updated Quiz",
      "description": "Updated description"
    }
    ```
  - Response:
    ```json
    {
      "message": "Quiz updated successfully"
    }
    ```

- **Delete a Quiz**

  - Endpoint: `DELETE /api/quizzes/{id}`
  - Response:
    ```json
    {
      "message": "Quiz deleted successfully"
    }
    ```

---

## ✅ Conclusion

You have successfully set up and run the Quiz Management System locally. If you encounter any issues, check your database connection and ensure Prisma migrations are applied correctly.

Happy Coding! 🚀
