SauceDemo Comprehensive Test Plan
Application Overview
SauceDemo (Swag Labs) is a shopping web application. The plan covers the login page and six supplied user roles, six-product inventory with four sorting modes, product details, cart state, checkout information and overview, order completion with PDF generation, navigation menu actions, external About/social links, validation, session protection, role-specific behavior, accessibility, responsive layout, and browser compatibility. Each test is intended to run independently from a fresh browser context using the setup seed file.

Test Scenarios
1. Authentication and Session Management
Seed: tests/seed.spec.ts

1.1. Valid standard-user login
File: tests/auth/valid-login.spec.ts

Steps:

Start with a fresh browser context and navigate to https://www.saucedemo.com/. - expect: The Swag Labs login page is displayed with Username, Password, and Login controls.
Enter standard_user in Username and secret_sauce in Password, then activate Login. - expect: The user is redirected to /inventory.html. - expect: The Products heading and six inventory products are visible.
1.2. Invalid and incomplete login validation
File: tests/auth/login-validation.spec.ts

Steps:

Start from a fresh login page and submit with both fields empty. - expect: Login is rejected. - expect: A required username validation message is displayed.
Enter standard_user only and submit. - expect: Login is rejected with a password-required message.
Enter invalid_user and invalid_password and submit. - expect: Login is rejected. - expect: An authentication error is displayed and the user remains unauthenticated.
1.3. Locked-out account cannot authenticate
File: tests/auth/locked-user.spec.ts

Steps:

Enter locked_out_user and secret_sauce on the fresh login page, then submit. - expect: The user remains on the login page. - expect: A locked-out account error is displayed. - expect: The inventory page is not accessible.
1.4. Logout and protected-page access
File: tests/auth/logout-protection.spec.ts

Steps:

Log in as standard_user from a fresh context. - expect: The inventory page is displayed.
Open the application menu and activate Logout. - expect: The login page is displayed.
Use browser navigation to attempt to return to the inventory page. - expect: Protected inventory content is not exposed without authentication, or the user is redirected to login.
1.5. Keyboard and password accessibility
File: tests/auth/keyboard-accessibility.spec.ts

Steps:

From a fresh login page, move through Username and Password using the keyboard and enter valid credentials. - expect: Keyboard focus moves in a logical order. - expect: Password characters are masked.
Submit the form with Enter while focused in the Password field. - expect: Valid credentials authenticate successfully.
2. Catalog and Product Interaction
Seed: tests/seed.spec.ts

2.1. Inventory content and product details
File: tests/catalog/inventory-details.spec.ts

Steps:

Log in as standard_user from a fresh context. - expect: Exactly six products are displayed with names, descriptions, prices, images, and Add to cart controls.
Open Sauce Labs Backpack using its name or image. - expect: The product detail page shows the matching name, description, image, price, and action control.
Activate Back to products. - expect: The inventory page is displayed again.
2.2. All inventory sort modes
File: tests/catalog/sorting.spec.ts

Steps:

Log in as standard_user and record the displayed product names and prices. - expect: The default sort is Name (A to Z).
Select Name (Z to A). - expect: Product names are in descending alphabetical order.
Select Price (low to high). - expect: Prices are in ascending numerical order.
Select Price (high to low). - expect: Prices are in descending numerical order.
Return to Name (A to Z). - expect: The original alphabetical order is restored without losing product data.
2.3. Add, remove, and persist cart contents
File: tests/catalog/cart-state.spec.ts

Steps:

Log in as standard_user and add Sauce Labs Backpack and Sauce Labs Bike Light. - expect: Both product controls change to Remove. - expect: The cart badge shows 2.
Open the cart and inspect its line items. - expect: Both selected products are present with quantity 1 and correct names/prices.
Remove one item in the cart, then continue shopping and reopen the cart. - expect: Only the remaining item is present. - expect: The cart badge shows 1.
Remove the final item. - expect: The cart becomes empty and its badge is cleared or hidden.
2.4. Reset App State
File: tests/catalog/reset-state.spec.ts

Steps:

Log in as standard_user, add multiple products, and open the application menu. - expect: The cart badge reflects the selected products.
Activate Reset App State. - expect: Cart contents are cleared. - expect: Product controls return to Add to cart. - expect: The cart badge is cleared or hidden.
3. Cart and Checkout
Seed: tests/seed.spec.ts

3.1. Cart navigation and empty-cart handling
File: tests/checkout/cart-navigation.spec.ts

Steps:

Log in from a fresh context and open the cart without adding a product. - expect: The Your Cart page is displayed with no line items.
Activate Continue Shopping. - expect: The inventory page is displayed.
Open the empty cart again and inspect available actions. - expect: The application does not create an order from an empty cart and handles Checkout consistently if exposed.
3.2. Checkout information validation
File: tests/checkout/checkout-validation.spec.ts

Steps:

Log in, add one product, open the cart, and activate Checkout. - expect: Checkout: Your Information is displayed with First Name, Last Name, Zip/Postal Code, Cancel, and Continue.
Submit with all fields empty. - expect: Checkout is blocked with a required-field error.
Test missing First Name, missing Last Name, and missing Zip/Postal Code independently. - expect: Each incomplete submission is blocked with a clear error for the missing field.
Submit whitespace-only values in all fields. - expect: Whitespace-only data is rejected or treated as empty.
3.3. Checkout overview accuracy
File: tests/checkout/overview.spec.ts

Steps:

Add Sauce Labs Backpack, enter Test, User, and 12345 in checkout, and continue. - expect: Checkout: Overview is displayed.
Compare the overview item, price, item total, tax, and total with the selected product. - expect: The selected item and price are correct. - expect: The overview displays Payment Information and Shipping Information. - expect: Item total, tax, and total are mathematically consistent.
Activate Cancel. - expect: The order is not submitted and the user returns to the prior shopping flow.
3.4. Complete order and generate receipt
File: tests/checkout/complete-order.spec.ts

Steps:

From a fresh context, add one or more products and complete checkout with valid information. - expect: The Checkout: Overview page displays the expected order.
Activate Finish. - expect: Checkout: Complete is displayed. - expect: Thank you for your order is shown. - expect: The dispatch message and Pony Express image are visible.
Activate Back Home. - expect: The inventory page is displayed. - expect: The cart is empty.
Repeat the order flow and activate Generate PDF order on the confirmation page. - expect: A PDF download or browser PDF response is initiated. - expect: No duplicate order is created.
4. Navigation, Roles, and Resilience
Seed: tests/seed.spec.ts

4.1. Application menu and external links
File: tests/navigation/menu-links.spec.ts

Steps:

Log in as standard_user and open the menu. - expect: All Items, About, Logout, Reset App State, and Close Menu are available.
Activate Close Menu. - expect: The menu is hidden.
Open the menu and activate All Items. - expect: The inventory page is displayed.
Open About in a controlled new-tab or same-tab context. - expect: The Sauce Labs About destination opens successfully.
Inspect Twitter, Facebook, and LinkedIn footer links. - expect: Each footer link has the expected external destination and is keyboard/click accessible.
4.2. Supplied user-role behavior
File: tests/roles/supplied-users.spec.ts

Steps:

Independently log in with problem_user, performance_glitch_user, error_user, and visual_user using secret_sauce. - expect: Each supplied account reaches the expected authenticated or documented account-specific behavior without silent failure.
For each account that reaches inventory, attempt product selection, cart navigation, and checkout. - expect: Known defects are recorded separately from regressions. - expect: The application does not lose cart state or create duplicate orders during delayed/error behavior.
4.3. Refresh, history, and direct URL resilience
File: tests/navigation/navigation-resilience.spec.ts

Steps:

Log in, add a product, and refresh inventory and cart pages. - expect: The application remains usable and cart state is handled consistently.
Navigate backward and forward through inventory, cart, and checkout. - expect: No unauthorized content is exposed and no duplicate submission occurs.
From a fresh unauthenticated context, directly navigate to inventory, cart, checkout, and checkout-complete URLs. - expect: Protected routes redirect to login or otherwise deny unauthenticated access.
4.4. Responsive, browser, and accessibility baseline
File: tests/nonfunctional/cross-browser-accessibility.spec.ts

Steps:

Run the primary login-to-order flow at desktop, tablet, and mobile viewport sizes in Chromium, Firefox, WebKit, and Edge where supported. - expect: Core flows remain usable. - expect: No horizontal overflow, clipped controls, overlapping text, or broken layout is present.
Complete login, sorting, cart, checkout, menu, and confirmation using keyboard only. - expect: All interactive controls are reachable in logical order with visible focus.
Inspect accessible names, labels, error associations, image alternative text, and contrast for core controls. - expect: Controls have meaningful accessible names and form errors are understandable and associated with their fields.