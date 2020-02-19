class Wallet {
  constructor(money) {
    let _money = money;
    //pobieranie aktualnej zawartości portfela
    this.getWalletValue = () => {
      return _money;
    }
    //sprawdzanie czy użytkownik ma odpowiednią ilość środków
    this.checkCanPlay = (value) => {
      if (money >= value) {
        return true;
      }
      return false;
    }
  }
}
const wallet = new Wallet(200);