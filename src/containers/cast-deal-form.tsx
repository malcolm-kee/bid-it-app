import * as React from 'react';
import { Button } from '../components/button';
import { TextField } from '../components/text-field';
import { useAuthUser } from '../data/auth.data';
import { placeBid } from '../services/deal.service';
import { LoginForm } from './login-form';

type CastDealFormProps = {
  dealId: string;
  minBid: number;
};

export const CastDealForm = (props: CastDealFormProps) => {
  const user = useAuthUser();
  const [amount, setAmount] = React.useState(() => `${props.minBid + 100}`);

  return user ? (
    <form
      onSubmit={ev => {
        ev.preventDefault();
        placeBid({
          dealerId: user._id,
          dealId: props.dealId,
          price: Number(amount),
        });
      }}
    >
      <TextField
        label="Bid Amount"
        value={amount}
        onChangeValue={setAmount}
        type="number"
        min={props.minBid}
      />
      <div className="py-4">
        <Button type="submit">Place Bid</Button>
      </div>
    </form>
  ) : (
    <div>
      <p>Login first to place cast.</p>
      <LoginForm />
    </div>
  );
};
