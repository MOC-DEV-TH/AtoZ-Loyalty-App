class RegisterUser {
  constructor(
    name,
    dob,
    nrc,
    address,
    city,
    township,
    phone,
    password,
    confirm_password
  ) {
    this.name = name;
    this.dob = dob;
    this.nrc = nrc;
    this.address = address;
    this.city = city;
    this.township = township;
    this.phone = phone;
    this.password = password;
    this.confirm_password = confirm_password;
  }
}

export default RegisterUser;
