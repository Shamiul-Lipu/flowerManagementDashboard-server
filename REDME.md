# Flower Management Dashboard Server

This application is aims to create a Flower Management Dashboard with features like authentication, CRUD operations, state management, real-time UI updates, and flower filtering. The goal is to facilitate efficient flower inventory management, sales tracking, and sales history analysis.

#### Hosted on Vercel

Server: [https://flower-management-dashboard-server.vercel.app]
Client: [https://flower-management-client-theta.vercel.app]

### Prerequisites

Before running the application, ensure you have the following installed in your work station:

- Node.js (preferably the latest LTS version)
- MongoDB installed and running on your local machine or a remote server
- Git (if cloning from a repository)

### Installation

1. Clone or download the Server repository from [https://github.com/Porgramming-Hero-web-course/l2b2-full-stack-a5-server-side-Shamiul-Lipu].

-This git repo is private now.

`Clone a Repository:`
This command clones a repository from GitHub to your local machine.

```bash
   git clone Porgramming-Hero-web-course/l2b2-full-stack-a5-server-side-Shamiul-Lipu
```

2. Navigate to the project directory in your terminal.

```bash
   cd l2b2-full-stack-a5-server-side-Shamiul-Lipu
```

or it might be

```bash
   cd flowerManagementDashboard-server
```

3. Install dependencies using npm (Node Package Manager).

```bash
   npm install
```

### Configuration

Create a `.env` file in the root directory of the project.

Add necessary environment variables to the `.env` file, such as:

`BCRYPT_SALT_ROUND`,`JWT_ACCESS_SECRET`,`JWT_REFRESH_SECRET`,`JWT_ACCESS_EXPIRES_IN`,`JWT_REFRESH_EXPIRES_IN`,`NODE_ENV`

`MONGODB_URI:` MongoDB connection URI.
Other necessary environment variables required for your application.
Example .env file:

```bash
MONGODB_URI=mongodb://localhost:27017/your_database_name
```

### Running the Application

#### Development Mode

Start Development Server:
To run the application in development mode (with live reload):

```bash
   npm run dev
```

> The development server will start at http://localhost:5000 or the server port your local machine.

#### Production Mode

`Build for Production:`

To build the application for production:

```bash
    npm run build
```

`Start Production Server:`

To run the application in production mode:

```bash
    npm start:prod
```

#### Additional Information

**For linting:**

```bash
    npm run lint
```

#### Troubleshooting and FAQs

##### Troubleshooting

If you encounter any issues while running the application, try the following steps:

1. Make sure `MongoDB is running`.
2. Check if all dependencies are installed by running `npm install`.

#### My Server is Hosted on Vercel

You can also access the API from the following link:
Server: [https://flower-management-dashboard-server.vercel.app]
Client: [https://flower-management-client-theta.vercel.app]

The API endpoints and their usages are documented below:

|                                | Authorization                     | Method | Route                                                   |
| :----------------------------- | :-------------------------------- | :----- | :------------------------------------------------------ |
| User Registration              |                                   | POST   | `/api/auth/register`                                    |
| User Login                     |                                   | POST   | `/api/auth/login`                                       |
| Refresh token                  |                                   | POST   | `/api/auth/refresh-token`                               |
| Get All Flower                 |                                   | GET    | `/api/flowers`                                          |
| Create a Course                | `Authorization: <USER_JWT_TOKEN>` | POST   | `/api/flowers/add-flowers`                              |
| Update Flower                  | `Authorization: <USER_JWT_TOKEN>` | PUT    | `/api/flowers/update-flower/:flowerId`                  |
| BULK Delete Flower             | `Authorization: <USER_JWT_TOKEN>` | PUT    | `/api/flowers/bulkDeleteFlowerflower"`                  |
| Create Sales                   | `Authorization: <USER_JWT_TOKEN>` | POST   | `/api/flowerManagment/create-sales`                     |
| Last Week sales History        | `Authorization: <USER_JWT_TOKEN>` | GET    | `/api/flowerManagment/lastWeeksales`                    |
| Todays Sales History           | `Authorization: <USER_JWT_TOKEN>` | GET    | `/api/flowerManagment/todaysSalesHistory`               |
| Month And Yearly Sales History | `Authorization: <USER_JWT_TOKEN>` | GET    | `/api/flowerManagment/monthAndYearlySalesHistory/:year` |
