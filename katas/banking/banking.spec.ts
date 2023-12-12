import { describe, it, expect } from "vitest";
import { Account, Transaction } from "./account";

describe("Account", () => {
  it("should open an account with a balance", () => {
    const account_1 = new Account({
      date: new Date(2023, 3, 7),
      txHistory: Array.from([new Transaction(5, new Date(2023, 3, 7))]),
    });
    expect(account_1.balance()).toBe(5);
    const account_2 = new Account({
      date: new Date(2023, 3, 7),
      txHistory: Array.from([]),
    });
    expect(account_2.balance()).toBe(0);
  });

  it("should not open an account with a negative balance", () => {
    const invalidAccount = () =>
      new Account({
        date: new Date(2023, 3, 7),
        txHistory: Array.from([new Transaction(-5, new Date(2023, 3, 7))]),
      });
    expect(invalidAccount).toThrow();
  });

  it("should deposit into an account", () => {
    const account = new Account({
      date: new Date(2023, 3, 7),
      txHistory: Array.from([new Transaction(5, new Date(2023, 3, 7))]),
    });
    account.deposit(5);
    expect(account.balance()).toBe(10);
  });

  it("should not deposit a non-positive amount", () => {
    const account = new Account({
      date: new Date(2023, 3, 7),
      txHistory: Array.from([new Transaction(5, new Date(2023, 3, 7))]),
    });
    const invalidDeposit = (amount: number) => account.deposit(amount);
    expect(() => invalidDeposit(-5)).toThrow();
    expect(() => invalidDeposit(0)).toThrow();
  });

  it("should withdraw from an account", () => {
    const account = new Account({
      date: new Date(2023, 3, 7),
      txHistory: Array.from([new Transaction(5, new Date(2023, 3, 7))]),
    });
    account.withdraw(3);
    expect(account.balance()).toBe(2);
  });

  it("should not withdraw a non-positive amount", () => {
    const account = new Account({
      date: new Date(2023, 3, 7),
      txHistory: Array.from([new Transaction(5, new Date(2023, 3, 7))]),
    });
    const invalidWithdrawal = (amount: number) => account.withdraw(amount);
    expect(() => invalidWithdrawal(-5)).toThrow();
    expect(() => invalidWithdrawal(0)).toThrow();
  });

  describe("Acceptance Criteria", () => {
    const headers = "Date        Amount  Balance";
    it("should render the headers", () => {
      const account = new Account({
        date: new Date(2023, 3, 7),
        txHistory: Array.from([]),
      });
      expect(account.statement()).toBe(headers);
    });

    it("should render a credit row", () => {
      const account = new Account({
        date: new Date(2015, 11, 24),
        txHistory: Array.from([new Transaction(500, new Date(2015, 11, 24))]),
      });

      const row = "24.12.2015   +500      500 ";
      const statement = headers + "\n" + row;
      expect(account.statement()).toBe(statement);
    });
    it("should render a debit row", () => {
      const account = new Account({
        date: new Date(2015, 11, 24),
        txHistory: Array.from([
          new Transaction(500, new Date(2015, 11, 24)),
          new Transaction(-600, new Date(2015, 11, 24)),
        ]),
      });

      const row_0 = "24.12.2015   +500      500 ";
      const row_1 = "24.12.2015   -600    (100) ";
      const statement = headers + "\n" + row_0 + "\n" + row_1;
      expect(account.statement()).toBe(statement);
      console.log(account.statement());
    });

    it("acceptance test", () => {
      const account = new Account({
        date: new Date(2016, 7, 23),
        txHistory: Array.from([new Transaction(500, new Date(2015, 11, 24))]),
      });
      account.withdraw(100);
      const row_0 = "24.12.2015   +500      500 ";
      const row_1 = "23.8.2016    -100      400 ";
      const statement = headers + "\n" + row_0 + "\n" + row_1;
      expect(account.statement()).toBe(statement);
      console.log(account.statement());
    });
  });
});

describe("Transaction", () => {
  it("should create a credit transaction", () => {
    const tx = new Transaction(5, new Date(2023, 3, 7));
    expect(tx.amount).toBe(5);
  });

  it("should create a debit transaction", () => {
    const tx = new Transaction(-5, new Date(2023, 3, 7));
    expect(tx.amount).toBe(-5);
  });
});
