import diffInHours from 'date-fns/differenceInHours';
import diffInMinutes from 'date-fns/differenceInMinutes';
import diffInSeconds from 'date-fns/differenceInSeconds';
import * as React from 'react';
import { useInterval } from '../hooks/use-interval';
import { padStart } from '../lib/pad-start';
import styles from './count-down.module.css';

export type CountDownProps = {
  endTime: Date;
  className?: string;
};

export const CountDown = (props: CountDownProps) => {
  const [remainingTime, setRemainingTime] = React.useState('');

  const now = new Date();
  const isEnded = now > props.endTime;

  useInterval(
    () => {
      setRemainingTime(getRemainingTime(props.endTime, now));
    },
    isEnded ? null : 1000
  );

  return (
    <div className={props.className}>
      {isEnded
        ? 'Closed'
        : remainingTime && (
            <div>
              <div>
                <small>Time Remaining</small>
              </div>
              <div className={styles.clock}>{remainingTime}</div>
            </div>
          )}
    </div>
  );
};

function getRemainingTime(later: Date, earlier: Date) {
  const sec = `${diffInSeconds(later, earlier) % 60}`;
  const min = `${diffInMinutes(later, earlier) % 60}`;
  return `${diffInHours(later, earlier)}:${padStart(min, 2, '0')}:${padStart(sec, 2, '0')}`;
}
