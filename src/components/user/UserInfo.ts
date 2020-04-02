class UserInfo {
  uid: string | null;
  name: string;

  constructor(uid: string | null, name: string) {
    this.name = name;
    this.uid = uid;
  }
}

export default UserInfo;
