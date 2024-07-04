interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string;
  }
  
  interface FormattedWalletBalance extends WalletBalance {
    formatted: string;
    usdValue: number;
  }
  
  class Datasource {
    url: string;
  
    constructor(url: string) {
      this.url = url;
    }
  
    async getPrices(): Promise<{ [key: string]: number }> {
      const response = await fetch(this.url);
      if (!response.ok) {
        throw new Error("Failed to fetch prices");
      }
      return response.json();
    }
  }
  
  interface Props extends BoxProps {}
  
  const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const [prices, setPrices] = useState<{ [key: string]: number }>({});
  
    useEffect(() => {
      const datasource = new Datasource("https://interview.switcheo.com/prices.json");
      datasource.getPrices()
        .then(setPrices)
        .catch(console.error);
    }, []);
  
    const getPriority = (blockchain: string): number => {
      switch (blockchain) {
        case 'Osmosis': return 100;
        case 'Ethereum': return 50;
        case 'Arbitrum': return 30;
        case 'Zilliqa': return 20;
        case 'Neo': return 20;
        default: return -99;
      }
    }
  
    const sortedBalances = useMemo(() => {
      return balances
        .filter((balance) => getPriority(balance.blockchain) > -99 && balance.amount > 0)
        .sort((lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain));
    }, [balances]);
  
    const formattedBalances: FormattedWalletBalance[] = useMemo(() => {
      return sortedBalances.map((balance) => ({
        ...balance,
        formatted: balance.amount.toFixed(2),
        usdValue: (prices[balance.currency] || 0) * balance.amount,
      }));
    }, [sortedBalances, prices]);
  
    const rows = formattedBalances.map((balance, index) => (
      <WalletRow
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={balance.usdValue}
        formattedAmount={balance.formatted}
      />
    ));
  
    return (
      <div {...rest}>
        {rows}
      </div>
    );
  }
  
  export default WalletPage;
  