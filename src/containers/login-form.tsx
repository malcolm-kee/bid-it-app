import * as React from 'react';
import { useAuthActions } from '../data/auth.data';
import { TextField } from '../components/text-field';
import { Button } from '../components/button';
import { UiStatus } from '../type';

export const LoginForm = () => {
  const [mode, setMode] = React.useState<'login' | 'register'>('login');
  const [status, setStatus] = React.useState<UiStatus>('idle');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const { login, register } = useAuthActions();

  const handleSubmit = () => {
    setStatus('busy');
    Promise.resolve(
      mode === 'login'
        ? login(email)
        : register({
            name,
            email,
          })
    ).catch(() => setStatus('error'));
  };

  return (
    <form
      onSubmit={ev => {
        ev.preventDefault();
        handleSubmit();
      }}
      className="max-w-sm mx-auto"
    >
      {status === 'error' && <p className="text-red-700">Error: something wrong happens.</p>}
      <TextField
        label="Email"
        value={email}
        onChangeValue={setEmail}
        type="email"
        required
        readOnly={status === 'busy'}
      />
      {mode === 'register' && (
        <TextField
          label="Name"
          value={name}
          onChangeValue={setName}
          required
          readOnly={status === 'busy'}
        />
      )}
      <div className="py-4">
        <Button type="submit" className="w-full" disabled={status === 'busy'}>
          {mode === 'login' ? 'Login' : 'Signup'}
        </Button>
      </div>
      <div className="py-2">
        {mode === 'login' ? (
          <p>
            No account?{' '}
            <button type="button" onClick={() => setMode('register')}>
              Sign up
            </button>
          </p>
        ) : (
          <p>
            Already has an account?{' '}
            <button type="button" onClick={() => setMode('login')}>
              Login instead
            </button>
          </p>
        )}
      </div>
    </form>
  );
};
