# SecondDibs Ecommerce Site

## Deployed at

https://seconddibs.herokuapp.com/

## Description

Ecommerce site inspired by 1stdibs.com — Users can browse and search items, make purchases, view order history, and save a list of favorite items, with or without creating a user account (uses cookies and Passport.js for authentication). Responsive designed front-end.

Inspired by 1stdibs.com's repo:
https://github.com/1stdibs/front-end-quiz/tree/master/react

Technologies used: JavaScript - React, Redux; Node, Express, PostgreSQL | Sequelize, Express-Session & Passport.js for authentication; HTML, SCSS, Material-UI

## To Log In

Feel free to sign up with your own test account.
Or log in and test purchasing items using this account:

test@test.com  |  email
test1  |  password

Mike Test  |  name
1 Test St  |  street
Testville  |  city
10001  |  zip code

4242 4242 4242 4242  |  credit card
12 / 20  |  expiration date
111  |  security code

For more info on using Stripe in test mode:
https://stripe.com/docs/testing#cards

## To Start from Codebase
```
yarn install
createdb 2ndDibsEcommerce
yarn seed
create a secrets.js file with:
  export const stripeAPITestKey = 'INSERT-YOUR-STRIPE-API-TEST-KEY-HERE';
yarn start-dev
```

## To Test
```
yarn install
createdb 2ndDibsEcommerce-Test
yarn test
```

## Connect with Me

Jasiu Leja, Software Developer

LinkedIn:
https://www.linkedin.com/in/jrleja

GitHub:
https://github.com/jrleja0
