# Flower Management Dashboard Client

This application is aims to create a Flower Management Dashboard with features like authentication, CRUD operations, state management, real-time UI updates, and flower filtering. The goal is to facilitate efficient flower inventory management, sales tracking, and sales history analysis.

#### Hosted on Vercel

Server: [https://flower-management-dashboard-server-new.vercel.app]

Client: [https://flower-dashboard-management-client-new.vercel.app]

### Prerequisites

Before running the application, ensure you have the following installed in your work station:

- Node.js (preferably the latest LTS version)
- MongoDB installed and running on your local machine or a remote server
- Git (if cloning from a repository)

### Installation

1. Clone or download the Server repository from [https://github.com/Porgramming-Hero-web-course/l2-b2-assignment-6-backend-Shamiul-Lipu].

-This git repo is private now.

`Clone a Repository:`
This command clones a repository from GitHub to your local machine.

```bash
   git clone Porgramming-Hero-web-course/l2-b2-assignment-6-backend-Shamiul-Lipu
```

2. Navigate to the project directory in your terminal.

```bash
   cd l2-b2-assignment-6-backend-Shamiul-Lipu
```

or it might be

```bash
   cd flowerManagement-server
```

3. Install dependencies using npm (Node Package Manager).

```bash
   npm install
```

### Configuration

Create a `.env` file in the root directory of the project.

Add necessary environment variables to the `.env` file, such as:

`NODE_ENV`
`PORT`
`DATABASE_URL`
`JWT_ACCESS_SECRET`
`JWT_REFRESH_SECRET`
`BCRYPT_SALT_ROUNDS`
`JWT_ACCESS_EXPIRES_IN`
`JWT_REFRESH_EXPIRES_IN`
`MANAGER_PASSWORD`

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

Server: [https://flower-management-dashboard-server-new.vercel.app]

Client: [https://flower-dashboard-management-client-new.vercel.app]

The API endpoints and their usages are documented below:

|                                | Authorization                                  | Method | Route                                                   |
| :----------------------------- | :--------------------------------------------- | :----- | :------------------------------------------------------ |
| Become a member                |                                                | POST   | `/api/auth/registerMember`                              |
| Create Manager or Salesman     | `Authorization: <Manager_JWT_TOKEN>`           | POST   | `/api/auth/create-salesmanOrManager`                    |
| User Login                     |                                                | POST   | `/api/auth/login`                                       |
| Refresh token                  |                                                | POST   | `/api/auth/refresh-token`                               |
| Get All Flower                 |                                                | GET    | `/api/flowers`                                          |
| Add Flower                     | `Authorization: <Manager_JWT_TOKEN>`           | POST   | `/api/flowers/add-flowers`                              |
| Update Flower                  | `Authorization: <Manager_JWT_TOKEN>`           | PUT    | `/api/flowers/update-flower/:flowerId`                  |
| Delete Flower                  | `Authorization: <Manager_JWT_TOKEN>`           | PUT    | `/api/flowers//delete-flower/:flowerId`                 |
| BULK Delete Flower             | `Authorization: <Manager_JWT_TOKEN>`           | PUT    | `/api/flowers/bulkDeleteFlowerflower"`                  |
| Create Sales                   |                                                | POST   | `/api/flowerManagment/create-sales`                     |
| Last Week sales History        | `Authorization: <Salesmen, Manager_JWT_TOKEN>` | GET    | `/api/flowerManagment/lastWeeksales`                    |
| Todays Sales History           | `Authorization: <Salesmen, Manager_JWT_TOKEN>` | GET    | `/api/flowerManagment/todaysSalesHistory`               |
| Month And Yearly Sales History | `Authorization: <Salesmen, Manager_JWT_TOKEN>` | GET    | `/api/flowerManagment/monthAndYearlySalesHistory/:year` |
| Member Purches Points          | `Authorization: <Member_JWT_TOKEN>`            | GET    | `/api/flowerManagment/memberPurchesPoints`              |
| Get My Purches History         | `Authorization: <Salesmen, Member_JWT_TOKEN>`  | GET    | `/api/flowerManagment/getMyPurchesHistory`              |
| Create Coupon                  | `Authorization: <Manager_JWT_TOKEN>`           | POST   | `/api/flowerManagment/create-coupon`                    |
