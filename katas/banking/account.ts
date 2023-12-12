export class Transaction {
  public readonly amount: number;
  public readonly date: Date;

  constructor(amount: number, date: Date) {
    this.amount = amount;
    this.date = date;
  }
}

export type AccountProps = {
  date: Date;
  txHistory: Array<Transaction>;
};

export class Account {
  private date: Date;

  private txHistory: Array<Transaction>;

  constructor({ date, txHistory }: AccountProps) {
    this.date = date;
    this.txHistory = txHistory;
    if (this.txHistory.length > 0 && this.txHistory[0].amount <= 0)
      throw new Error(
        `AccountError: initial transaction must be a debit transaction`
      );
  }

  balance(): number {
    return this.txHistory.reduce((acc: number, curr: Transaction) => {
      return acc + curr.amount;
    }, 0);
  }

  statement(): string {
    let statement = "Date        Amount  Balance";
    let runningBalance = 0;
    this.txHistory.forEach((tx: Transaction) => {
      const date = `${tx.date.getDate()}.${
        tx.date.getUTCMonth() + 1
      }.${tx.date.getFullYear()}`;
      const withSign = (amount: number) => (amount >= 0 ? "+" : "");
      const amount = ` ${withSign(tx.amount)}${tx.amount}`;
      runningBalance += tx.amount;
      const balance: string =
        runningBalance >= 0 ? `${runningBalance} ` : `(${-runningBalance}) `;
      const row = date.padEnd(12) + amount.padEnd(8) + balance.padStart(7);
      statement = statement + "\n" + row;
    });
    return statement;
  }

  deposit(amount: number): void {
    if (amount <= 0)
      throw new Error(
        `AccountError: deposit must be more than 0, received ${amount}`
      );
    this.txHistory.push(new Transaction(amount, this.date));
  }

  withdraw(amount: number): void {
    if (amount <= 0)
      throw new Error(
        `AccountError: withdrawal must be more than 0, received ${amount}`
      );
    this.txHistory.push(new Transaction(-amount, this.date));
  }
}
