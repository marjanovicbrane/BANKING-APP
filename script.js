'use strict';

// Data
const account1 = {
  owner: 'Brane Marjanovic',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Elon Musk',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Bill Gates',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Jeff Bezos',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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
    containerMovements.insertAdjacentHTML('beforeend', html);
  });
};

//We are calling this function
displayMovements(account1.movements);

//We will calculate balance of our account
const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  //We want to display that balance in our application.
  labelBalance.textContent = `${balance} €`;
};

//We are calling this function
calcDisplayBalance(account1.movements);

//We want to show in this function incomes, costs and interest in our application.
const calcDisplaySummary = function (movements) {
  //Incomes
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${incomes}€`;

  //Costs
  const out = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = `${Math.abs(out)}€`;

  //Interest is 1.2% for all deposits, and bank pays interest only if it's interest grater then 1 euro or some other currency.
  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * 1.2) / 100)
    .filter((intrest, i, arr) => {
      console.log(arr);
      return intrest >= 1;
    })
    .reduce((acc, intrest) => acc + intrest, 0);

  labelSumInterest.textContent = `${interest}€`;
};

//We are calling this function
calcDisplaySummary(account1.movements);

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
