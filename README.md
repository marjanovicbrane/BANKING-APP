# BANKING APPLICATION

# App FLOWCHART:

In this flowchart we can see all the phases we had to go through when we made this application.

![SLIKA](https://user-images.githubusercontent.com/61464267/156890173-906f3da5-5891-421b-bae7-1bf200491260.png)

# Login page:

The user can log in to the application using the following username and PIN.
1. username:bm PIN:1111,

2. username:mm PIN:2222,

3. username:em PIN:3333,

4. username:bg PIN:4444,

5. username:jb PIN:5555.

# About application:

![1](https://user-images.githubusercontent.com/61464267/156890432-56a7fbbb-56f1-451c-8008-715d23bc55e3.gif)


When we log in to the application, in the top left corner we have welcome message with our name.On the right side we can see the current account balance, formatted by the currency, which logged user use.

When we log in to the application, we have shown the current time, date and currency formatted by the region from which the user logged in, ie. location.On the left side, we have an overview of all movements on our account.

Movements can be DEPOSIT or WITHDRAWAL and beside the movements we can see the date when that movement happened and also we can see amount of movement formatted by the currency, which logged user use.

At the bottom of the page we can also see sections:IN, OUT and INTEREST.

IN is the total amount of deposits that we have, OUT is the total amount we withdrew from the account and INTEREST.

On button SORT we can also sort all the movements descending and when we click again on the button SORT we return original movements.

# Security feature:

![22](https://user-images.githubusercontent.com/61464267/156890511-9533de0d-1cbc-4432-b296-0ccb6e35591e.gif)

We may have already noticed by now we have a timer in the bottom right corner.When we log in to the application, the timer starts countdown from 2 min. After that 2 minutes, the application will log us out.

But if we are active in our application, for example we transfer money or request a loan, every time the timer will be reset to 2 minutes, because the app knows when we are active and when we are not.

# Main features:

1.Transfer money,

2.Request loan,

3.Close account.

# 1. Transfer money:

![2](https://user-images.githubusercontent.com/61464267/156890761-9b8e939c-bd03-4914-b6cf-dabf58568461.gif)

In the input field “Transfer to”, we enter the username of the user to whom we send the money.

In the input field “Amount”, we enter the amount of money which we want to send.

After that, on the left side where we have an overview of all movements, we can see our new "WITHDEAWAL" movement.

We can now log in to another profile to see if a certain amount has been deposited on that account.When we log in into that account, we can see on the left side our new “DEPOSIT” movement.

# 2. Request loan:

![3](https://user-images.githubusercontent.com/61464267/156890895-46730548-1032-41b9-9fa9-268d591b2124.gif)

You can request a loan based on the largest deposit you have. In this case the largest deposit is 1.000.000 € and that is 10% of the total amount we can request.In this case we can maximum request 10.000.000 € , we can’t request  10.000.001 €.

We may also notice that we have to wait 5 seconds for the loan to be approved, on this way, we simulate the time we have to wait in the real world for a loan to be approved by a bank.

On the left side where we have an overview of all movements, we can see our new "DEPOSIT" movement.

# 3. Close account:

![4](https://user-images.githubusercontent.com/61464267/156891004-eb69558c-c04d-4552-b9b3-17fe360376da.gif)

You can also close your account.To do that, in the input field “Confirm user” you need to enter your username and also in the input field “Confirm PIN” you need to enter your PIN.

Now  when you try to log in again with your username and PIN, you will not be able.




