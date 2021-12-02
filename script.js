'use strict';

// Data
const account1 = {
  owner: 'Brane Marjanovic',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2020-11-18T21:31:17.178Z',
    '2020-12-23T07:42:02.383Z',
    '2021-01-28T09:15:04.904Z',
    '2021-04-01T10:17:24.185Z',
    '2021-05-08T14:11:59.604Z',
    '2021-11-26T17:01:17.194Z',
    '2021-11-28T23:36:17.929Z',
    '2021-11-29T10:51:36.790Z',
  ],

  currency: 'EUR',
  locale: 'en-US',
};

const account2 = {
  owner: 'Mira Marjanovic',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
  pin: 2222,

  movementsDates: [
    '2020-11-18T21:31:17.178Z',
    '2020-12-23T07:42:02.383Z',
    '2021-01-28T09:15:04.904Z',
    '2021-04-01T10:17:24.185Z',
    '2019-05-08T14:11:59.604Z',
    '2019-05-27T17:01:17.194Z',
    '2021-07-11T23:36:17.929Z',
    '2021-07-12T10:51:36.790Z',
  ],

  currency: 'BAM',
  locale: 'sr-SP',
};

const account3 = {
  owner: 'Elon Musk',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 3333,

  movementsDates: [
    '2020-11-18T21:31:17.178Z',
    '2018-12-23T07:42:02.383Z',
    '2021-01-28T09:15:04.904Z',
    '2019-04-01T10:17:24.185Z',
    '2021-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2021-07-11T23:36:17.929Z',
    '2021-07-12T10:51:36.790Z',
  ],

  currency: 'EUR',
  locale: 'en-US',
};

const account4 = {
  owner: 'Bill Gates',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 4444,

  movementsDates: [
    '2020-11-18T21:31:17.178Z',
    '2020-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2021-04-01T10:17:24.185Z',
    '2018-05-08T14:11:59.604Z',
    '2019-05-27T17:01:17.194Z',
    '2021-07-11T23:36:17.929Z',
    '2021-07-12T10:51:36.790Z',
  ],

  currency: 'USD',
  locale: 'en-US',
};

const account5 = {
  owner: 'Jeff Bezos',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 5555,

  movementsDates: [
    '2020-11-18T21:31:17.178Z',
    '2021-12-23T07:42:02.383Z',
    '2021-01-28T09:15:04.904Z',
    '2019-04-01T10:17:24.185Z',
    '2019-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2021-07-11T23:36:17.929Z',
    '2021-07-12T10:51:36.790Z',
  ],

  currency: 'USD',
  locale: 'ar',
};

const accounts = [account1, account2, account3, account4, account5];

// All elements that we are going to use
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//WE REFACTOR OUR CODE AND WE HAVE MADE A FUNCTION FOR DATE MOVEMENTS HERE.WE WANT TO DISPLAY TODAY,YESTERDAY,3 DAYS AGO AND FULL DATE FOR EVERY MOVEMENT, DEPENDING HOW MANY DAYS HAVE PASSED FROM THE CURRENT DATE.

//This function willhave one more argument now and that is locale.
const formatMovementDate = function (date, locale) {
  //Function that calculates how many days have passed.
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  //We are going to store that result here.
  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  //We implement here a logic
  if (daysPassed === 0) return `Today`;
  if (daysPassed === 1) return `Yesterday`;
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  //Only if everything above (if statement) is false, then display full date
  //else {

  //CREATING DATE FOR MOVEMENTS FOR > 7 DAYS

  //const day = `${date.getDate()}`.padStart(2, 0);
  //const month = `${date.getMonth() + 1}`.padStart(2, 0);
  //const year = date.getFullYear();

  //FORMAT:DD/MM/YY
  //return `${day}/${month}/${year}`;

  //}

  //We are going to use here also INTERNATIONALIZING API for DATES:
  return new Intl.DateTimeFormat(locale).format(date);
};

//FUNCTION FOR FORMATTING CURRENCY, USING INTERNATIONALIZING API FOR NUMBER
const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

//We are going to make a function to display all the movements.

//We are going to add a new argument sort in this method for sorting movements array.This parameter is going to be optional and his default value we are going to set on false.

//Now besides the movements, we want to display date of these movements, so we need to pass entire account object in this function.
const displayMovements = function (acc, sort = false) {
  //First we want to empty the entire container and only then we start adding new elements.
  containerMovements.innerHTML = '';

  //We are going to have condition here, if sort is true we are going to sort this movements array, but first we will copy this movement array with slice method, because sort method mutate original array and on that array we will call a sort method.If condition is false we will simply return that movements array.
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  //Here we nedd to use this movs array, not movements.
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    //This index of the current movement we are going to use to retreve dates from the current account object.
    const date = new Date(acc.movementsDates[i]);

    //Result of this function formatMovementDate() with current date movement and current locale from the current account object we are going to store in this variable displayDate.
    const displayDate = formatMovementDate(date, acc.locale);

    //We are calling function for formatting currency.
    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    //We making template string,with template literals to create HTML template elements.
    //We want to round the number in 2 decimal places.

    //WE NEED TO ADD ONE MORE ELEMENT, WHICH WILL CONTAIN DATE.
    const html = `
  <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${formattedMov}</div>
  </div>
  `;

    //Now we want to attach this hmtl element into container movements in html page.
    //Method insertAdjacentHTML() have 2 string arguments:
    //1.First argument is position in which we want to attach this html element.
    //2.Second arguments is that string which contains that html element.
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//We are calling this function
//displayMovements(account1.movements);

//We will calculate balance of our account

//We need to modify this function, because in transfer money callbackfunction we need a current balance from the current account.Because of that we adding account object here as an argument.Because we want to add a new property balance for current object account.
const calcDisplayBalance = function (account) {
  //Adding a new property balance for current account object.
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);

  //We want to display that balance in our application.
  //We want to round the number in 2 decimal places.
  labelBalance.textContent = formatCur(
    account.balance,
    account.locale,
    account.currency
  );
};

//We are calling this function
//calcDisplayBalance(account1.movements);

//We want to show in this function incomes, costs and interest in our application.
const calcDisplaySummary = function (account) {
  //Incomes
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  //We want to round the number in 2 decimal places.
  labelSumIn.textContent = formatCur(incomes, account.locale, account.currency);

  //Costs
  const out = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  //We want to round the number in 2 decimal places.
  labelSumOut.textContent = formatCur(
    Math.abs(out),
    account.locale,
    account.currency
  );

  //Interest is 1.2% for all deposits, and bank pays interest only if it's interest grater then 1 euro or some other currency.
  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter((intrest, i, arr) => {
      //console.log(arr);
      return intrest >= 1;
    })
    .reduce((acc, intrest) => acc + intrest, 0);

  //We want to round the number in 2 decimal places.
  labelSumInterest.textContent = formatCur(
    interest,
    account.locale,
    account.currency
  );
};

//We are calling this function
//calcDisplaySummary(account1.movements);

//We are going to make a function, to compute usernames for each account in application (we have 4 accounts).
const createUserNames = function (accs) {
  //We don't want to create a new array, we just want to modify objects account from the array accounts, because of that we are going to use for each method insted of map.
  //We just want to add a new property username for each object account.
  accs.forEach(function (acc) {
    //We want to create a new property username for the current account.Every user have owner property which contains full name of the user.
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      //For example: when split method is executed we have this array ['Brane','Marjanovic'] and then when map method is executed we have this array ['b','m'] stored in this property acc.username.In this example we transformed this array ['Brane','Marjanovic'] to this ['b','m'].
      .map(name => name[0])
      .join('');
  });
};

//When this function is executed it will create us a new property username for each account object.
createUserNames(accounts);

//We are going to create here a function which calling all 3 methods for updating UI (MOVEMENTS, BALANCE I SUMMERY-IN, OUT, INTEREST).
//This function takes for an argument current account object, because we need to update UI for that account.
const updateUI = function (account) {
  //DISPLAY MOVEMENTS
  displayMovements(account);
  //DISPLAY BALANCE
  calcDisplayBalance(account);
  //DISPLAY SUMMARY
  calcDisplaySummary(account);
};

//We want to store current account object in this global variable, because we will need this information in some other functions.
let currentAccount;

//FAKE ALWAYS LOGGED IN
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

//LOGIN FEATURE
btnLogin.addEventListener('click', function (e) {
  //This method prevent form from submitting (reload page).
  e.preventDefault();

  //console.log('LOGIN');

  //Checking for username using find method.
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  //Checking for PIN using OPTIONAL CHAINING
  if (currentAccount?.pin === +inputLoginPin.value) {
    //console.log('LOGIN');

    //DISPLAY WELCOME MESSAGE
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    //DISPLAY USER INTERFACE
    containerApp.style.opacity = 100;

    //We are going to use now INTERNATIONALIZING API for DATES:
    const now = new Date();

    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      //weekday: 'long',
    };

    labelDate.textContent = Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    //---------------------------------------------------------
    //WE WANT TO DISPLAY THE CURRENT DATE AND TIME, WHEN WE LOG IN.

    // const now = new Date();

    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();

    // //TIME
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);

    // //DATE AND TIME FORMAT:
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
    //----------------------------------------------------------

    //CLEAR INPUT FIELDS USERNAME AND PIN
    inputLoginUsername.value = inputLoginPin.value = '';

    //REMOVE FOCUS FROM PIN INPUT FIELD
    inputLoginPin.blur();

    //UPDATE UI (MOVEMENTS, BALANCE I SUMMERY-IN, OUT,   INTEREST)
    //We are going to create a function which calling all 3 methods for updating UI.
    updateUI(currentAccount);
  }
});

//FEATURE FOR TRANSFER MONEY
btnTransfer.addEventListener('click', function (e) {
  //This method prevent form from submitting (reload page).
  e.preventDefault();

  //Get amount
  const amount = +inputTransferAmount.value;

  //Get first account object with current username if exist.
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  //Clean input fields transfer ro and amount.
  inputTransferTo.value = inputTransferAmount.value = '';

  //console.log(amount, receiverAcc);

  //Here we need to check more things:
  //1.Amount we transferring need to be positive number.
  //2.Current user need to have enough money to do transfer.
  //To check balance we need to add a new property balance for the current account object.
  //3.We should not be able to transfer money to current account.
  //4.We need to check if this receiver account actually exists (receiverAcc &&).
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc.username !== currentAccount.username
  ) {
    //console.log('Transfer valid!');

    //TRANSFER MONEY

    //We adding a new movement for the current account (negative number).
    currentAccount.movements.push(-amount);

    //We adding a new movement for the current account (positive number).
    receiverAcc.movements.push(amount);

    //Add transfer date to the account object in array movemenetsDates.
    currentAccount.movementsDates.push(new Date().toISOString());

    //Do the same for the receiver.
    receiverAcc.movementsDates.push(new Date().toISOString());

    //UPDATE UI (MOVEMENTS, BALANCE I SUMMERY-IN, OUT,   INTEREST)
    //We are going to create a function which calling all 3 methods for updating UI.
    updateUI(currentAccount);
  }

  //inputTransferTo.value = inputTransferAmount.value = '';
});

//IMPLEMENTATION FOR LOAN FEATURE
btnLoan.addEventListener('click', function (e) {
  //This method prevent form from submitting (reload page).
  e.preventDefault();

  //We take that amount from input field.
  //We want to truncate the number, when we use a loan.For this we are going to use flooer() method.This method also do type coercion, so we don't need the + operand to convert string to Number.
  const amount = Math.floor(inputLoanAmount.value);

  //1.Amount need to be positive number (>0).
  //2.If we have any deposit that is greater or equal of 10% of request amount, then we can perform loan.
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //Add that loan amount to the array movements.
    currentAccount.movements.push(amount);

    //Add loan date to the account object in array movemenetsDates.
    currentAccount.movementsDates.push(new Date().toISOString());

    //UPDATE UI
    updateUI(currentAccount);
  }
  //Clean input field for loan.
  inputLoanAmount.value = '';
});

//CLOSING ACCOUNT ACTUALLY MEANS DELETING AN ACCOUNT OBJECT FROM ACCOUNTS ARRAY.
btnClose.addEventListener('click', function (e) {
  //This method prevent form from submitting (reload page).
  e.preventDefault();

  //console.log('Delete');

  //First we need to check, if the username from the input field is equal to current user, same we need to check for a pin.
  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    //Give me an index where is username from the account object equal the current username.
    const index = accounts.findIndex(
      account => account.username === currentAccount.username
    );

    console.log(index);

    //We want to delete that account object from accounts array, using index.
    accounts.splice(index, 1);

    //When we delete user account, we want to hide UI.
    containerApp.style.opacity = 0;
  }

  //We want to clear username and pin input fields.
  inputCloseUsername.value = inputClosePin.value = '';
});

//This is a state variable which monitoring state of sorted array.When we start our application we want to see our original movements array and because of that sorted variable have false value.
let sorted = false;

//FEATURE FOR SORTING ARRAY MOVEMENTS
btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  //We are going to use NOT operator, because we want to have opposite value of sorted variable.
  displayMovements(currentAccount.movements, !sorted);

  //Now we want to reassign that value.If it was be false to true and opposite.
  sorted = !sorted;
});
