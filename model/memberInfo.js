class MemberInfo {
    constructor(
      name,
      dob,
      nrc,
      address,
      city,
      township,
      member_level,
      current_point,
      user_id,
      created_date,
      isVIP

    ) {
      this.name = name;
      this.dob = dob;
      this.nrc = nrc;
      this.address = address;
      this.city = city;
      this.township = township;
      this.member_level = member_level;
      this.current_point = current_point;
      this.user_id = user_id;
      this.created_date = created_date;
      this.isVIP = isVIP;
    }
  }
  
  export default MemberInfo;
  