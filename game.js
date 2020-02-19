class Game {
  constructor(start) {
    //tworzymy instancje dwóch klas
    this.stats = new Statistics();
    this.wallet = new Wallet(start);

    //pobieramy elementy
    document.getElementById('start').addEventListener('click', this.startGame.bind(this));
    this.spanWallet = document.querySelector('.panel span.wallet');
    this.boards = [...document.querySelectorAll('div.color')];
    this.inputBid = document.getElementById('bid');
    this.spanResult = document.querySelector('.score span.result');
    this.spanGames = document.querySelector('.score span.number');
    this.spanWins = document.querySelector('.score span.win');
    this.spanLosses = document.querySelector('.score span.loss');
    //uruchamianie
    this.render();
  }

  render(colors = ['gray', 'gray', 'gray'], money = this.wallet.getWalletValue(), result = "", stats = [0, 0, 0], bid = 0, wonManey = 0) {
    this.boards.forEach((board, index) => {
      board.style.backgroundColor = colors[index];
    })
    this.spanWallet.textContent = money;
    if (result) {
      result = `Wygrałeś ${wonManey}$. `;
    } else if (!result && result !== "") {
      result = `Przegrałeś ${bid}$. `;
    }
    this.spanResult.textContent = result;
    this.spanGames.textContent = stats[0];
    this.spanWins.textContent = stats[1];
    this.spanLosses.textContent = stats[2];
    this.inputBid.value = "";
  }
  startGame() {
    //sprawdzam czy wpisana kwota jest większa od 1
    if (this.inputBid.value < 1) {
      return alert("Kwota niedopuszczalna, wstaw kwotę większą lub równą 1")
    }
    const bid = Math.floor(this.inputBid.value);
    //sprawdzam czy mam tyle środków
    if (!this.wallet.checkCanPlay(bid)) {
      return alert("Masz za mało środków lub podana została nieprawidłowa wartość!")
    }
    //mechaniz zabierania kasy
    this.wallet.changeWallet(bid, '-');
    //rysowanie
    this.draw = new Draw();
    //losowanie
    const colors = this.draw.getDrawResult();
    //czy wygana
    const win = Result.checkWinner(colors);
    //ile wynosi wygrana
    const wonMoney = Result.moneyWinInGame(win, bid);
    //dodawanie środków
    this.wallet.changeWallet(wonMoney);
    //statystyki
    this.stats.addGameToStatistics(win, bid);
    //render
    this.render(colors, this.wallet.getWalletValue(), win, this.stats.showGameStatistics(), bid, wonMoney)
  }
}
