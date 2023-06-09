# CRM Shop Client

# Live preview
## https://crm-shop-client.vercel.app/

## Backend REST Api hosted on MyDevil Server 
## https://crm-api.mydevillogin.usermd.net/

## Test accounts to login to application with certain role:
- Admin
  - email: admin@admin
  - password: admin123
- Employee
  - email: employee@employee
  - password: employee123
- Client
  - email: client@client
  - password: client123

## To test all the functionalities of the application, it is recommended to log in as an admin
### Of course you can register a new account using the register form, but this way you automatically create an account with client role

## Role limitations:
- admin:
  - no limitations
- employee:
  - adding new users with admin roles
  - changing user's passwords
- client:
  - checking, editing, and removing users from list
  - checking, editing, and removing other user's orders
  - removing and editing own orders
  - removing, adding, and editing products

## Description:
This CRUD frontend app, built with Next.js and TypeScript, provides a user-friendly interface for managing data through the CRUD operations. The app is designed to simplify the process of interacting with a backend API and offers a service of three modules: users, products, and orders. The application has been prepared in such a way as to fetch data effectively and effectively. The structure of the application is organized and easily expanded and edited.

## Libraries:
- redux toolkit query
- redux toolkit
- formik
- yup
- styled components
- lodash
- cookies next



