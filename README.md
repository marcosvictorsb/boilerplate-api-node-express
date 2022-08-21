
# BOILERPLATE API NODE EXPRESS
This boilerplate is intended to start an API, using Node.js, Express, Sequelize, JWT, Sinon for unit tests.

## Features

- Express + Sequelize
- Request validation with joi
- Linting with eslint
- Tests with mocha, chai and sinon
- Logging with winston
- Load environment variables from .env files with dotenv

## Requirements
- Now using node v16.15.0 (npm v8.5.5)
## Getting Started

Clone the repo:

```bash
  git clone git@github.com:MarcosVictorSB/boilerplate-api-node-express.git
```
Install dependencies:

```bash
  npm install
```

Set environment variables:

```bash
  cp .env.example .env
```

Running Locally
```bash
  npm run start
```


## Units Tests
```bash
  # run all tests with mocha
  npm run test
```

## Units Tests Coverage
```bash
  # command to run coverage unit tests
  npm run test:coverage
```




## Project Structure
```bash
  src\
    |--config\                     # Environment variables and configuration related things
    |--domains\                    # Layer Domains
      |-- user\                    # Example a domain
        |-- adapter\               # Adapters
        |-- controller\            # Layer Controller
        |-- factories\             # Build main layers (controller, service and repository)
        |-- repositories\          # Layer Repository (container where something is deposited or stored)
        |-- routes\                # Layer Routes
        |-- services\              # Layer Service (Business logic)
        |-- validator\             # Request data validation schemas
    |--helpers\                    # EnumHelpers example: enumHelperCustomer, enumHelperAuthentication 
    |--infra\                      # Layer infra
      |-- database\                   
        |-- config\                # Config database: production, development
        |-- migrations\            # Migrations
        |-- models\                # Models
        |-- seeders\               # Seeders
    |--interfaces\                 # Main interfaces to system
    |--middlewares\                # Custom express middlewares    
    |--protocols\                  # Protocols http
  test/                            # Unit tests
app.js          
server.js        

```