##### Live Link: [Comming Soon]

## How to Run Locally

### Clone the repository:

```
git clone https://github.com/Mostakimul/naveen.git
```

### Install dependencies:

```
cd naveen-server
yarn install
```

### Set up environment variables:

Create a .env file in the root directory and add the following:

```
NODE_ENV="development"
PORT=8000
DATABASE_URL="postgresql://<postgres_user>:<postgres_password>@localhost:5432/<database_name>?schema=public"
JWT_PRIVATE_KEY="your_private_key"
JWT_EXPIRE_IN="30d"
JWT_REFRESH_PRIVATE_KEY="refresh_private_key"
JWT_REFRESH_EXPIRE_IN="30d"
```

### Run the server:

```
yarn dev
```

# Naveen API

It is sales and inventory management system for comapnies internal use and customized as their preferences.

## Technologies Used

- Prisma
- Node.js
- Express.js
- Postgres
- Typescript
- zod
- bcrypt (for password hashing)
- JSON Web Tokens (JWT) for authentication

## API Endpoints

### Authentication

- **Create Admin**

  - Method: POST
  - Path: `/api/v1/create-admin`

- **Create Manager**

  - Method: POST
  - Path: `/api/v1/create-manager`

- **Login User**

  - Method: POST
  - Path: `/api/v1/login`

- **Refresh Token**
  - Method: POST
  - Path: `/api/v1/refresh-token`

### Users

- **Get All User**
  - Method: GET
  - Path: `/api/v1/user`

### Stores

- **Create Store**

  - Method: POST
  - Path: `/api/v1/store/create-store`

- **Get all stores**

  - Method: GET
  - Path: `/api/v1/store`
