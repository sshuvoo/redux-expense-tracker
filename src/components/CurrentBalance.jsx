import { useSelector } from 'react-redux';

export default function CurrentBalance() {
   const { transactions } = useSelector((state) => state.transaction);
   const balance =
      transactions?.length > 0 &&
      transactions.reduce((total, transaction) => {
         const { type, amount } = transaction;
         if (type === 'income') total += amount;
         else if (type === 'expense') total -= amount;
         return total;
      }, 0);

   return (
      <div className="top_card">
         <p>Your Current Balance</p>
         <h3>
            <span>{'৳ '}</span>
            <span>{balance || '00'}</span>
         </h3>
      </div>
   );
}
