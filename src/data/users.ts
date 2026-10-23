export const PASSWORD = 'secret_sauce';

export const users = {
  standard: { username: 'standard_user', password: PASSWORD },
  lockedOut: { username: 'locked_out_user', password: PASSWORD },
  invalidPassword: { username: 'standard_user', password: 'wrong_password' },
};

export const checkoutInfo = {
  firstName: 'Shubham',
  lastName: 'Tester',
  postalCode: '400701',
};

export const products = {
  backpack: 'sauce-labs-backpack',
  bikeLight: 'sauce-labs-bike-light',
  onesie: 'sauce-labs-onesie',
};
