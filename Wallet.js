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
    this.changeWallet = (value, type = '+') => {
      if (typeof value === "number" && !isNaN(value)) {
        if (type === "+") {
          return _money += value;
        } else if (type === "-") {
          return _money -= value;
        } else {
          throw new Error("Nieprawidłowy typ działania!")
        }

      } else {
        console.log(typeof value);
        throw new Error("Nieprawidłowa liczba!")
      }
    }
  }
}
// const wallet = new Wallet(200);