'use strict';

// Data
const account1 = {
  owner: 'Brane Marjanovic',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Mira Marjanovic',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
  pin: 2222,
};

const account3 = {
  owner: 'Elon Musk',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 3333,
};

const account4 = {
  owner: 'Bill Gates',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 4444,
};

const account5 = {
  owner: 'Jeff Bezos',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 5555,
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

//We are going to make a function to display all the movements.
const displayMovements = function (movements) {
  //First we want to empty the entire container and only then we start adding new elements.
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    //First we need to check if movements is deposit or withdrawal.
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    //We making template string,with template literals to create HTML template elements.
    const html = `
  <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}€</div>
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
  labelBalance.textContent = `${account.balance} €`;
};

//We are calling this function
//calcDisplayBalance(account1.movements);

//We want to show in this function incomes, costs and interest in our application.
const calcDisplaySummary = function (account) {
  //Incomes
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${incomes}€`;

  //Costs
  const out = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = `${Math.abs(out)}€`;

  //Interest is 1.2% for all deposits, and bank pays interest only if it's interest grater then 1 euro or some other currency.
  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter((intrest, i, arr) => {
      //console.log(arr);
      return intrest >= 1;
    })
    .reduce((acc, intrest) => acc + intrest, 0);

  labelSumInterest.textContent = `${interest}€`;
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
  displayMovements(account.movements);
  //DISPLAY BALANCE
  calcDisplayBalance(account);
  //DISPLAY SUMMARY
  calcDisplaySummary(account);
};

//We want to store current account object in this global variable, because we will need this information in some other functions.
let currentAccount;

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
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //console.log('LOGIN');

    //DISPLAY WELCOME MESSAGE
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    //DISPLAY USER INTERFACE
    containerApp.style.opacity = 100;

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
  const amount = Number(inputTransferAmount.value);

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

    //UPDATE UI (MOVEMENTS, BALANCE I SUMMERY-IN, OUT,   INTEREST)
    //We are going to create a function which calling all 3 methods for updating UI.
    updateUI(currentAccount);
  }

  //inputTransferTo.value = inputTransferAmount.value = '';
});

//CLOSING ACCOUNT ACTUALLY MEANS DELETING AN ACCOUNT OBJECT FROM ACCOUNTS ARRAY.
btnClose.addEventListener('click', function (e) {
  //This method prevent form from submitting (reload page).
  e.preventDefault();

  //console.log('Delete');

  //First we need to check, if the username from the input field is equal to current user, same we need to check for a pin.
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
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
