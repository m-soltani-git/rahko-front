import React from 'react';
import { Stack, Typography } from '@mui/material';
import { digitsEnToFa, digitsFaToEn, remainingTime, timeAgo } from '@persian-tools/persian-tools';
import jMoment from 'moment-jalaali';
import moment from 'moment/moment';

const ExpiredNotice = ({ timeAgo }) => {
  return (
    <Stack p={0.5} width={96} borderRadius={1} alignItems="center" justifyContent="center" bgcolor="#f7f7f7">
      <Typography variant="subtitle1" color="text.disabled" fontSize={12}>
        {digitsEnToFa(timeAgo)}
      </Typography>
    </Stack>
  );
};

const ShowCounter = ({ data, color, bgcolor, title }) => {
  const isDanger = data <= 3;
  const mColor = isDanger ? 'error.dark' : color;
  const mBgcolor = isDanger ? 'error.lighter' : bgcolor;
  return (
    <Stack
      p={0.5}
      width={96}
      columnGap={0.5}
      borderRadius={1}
      direction="row"
      bgcolor={mBgcolor}
      alignItems="center"
      justifyContent="center"
    >
      <Typography color={mColor} variant="subtitle1" fontSize={12}>
        {digitsEnToFa(data)}
      </Typography>
      <Typography color={mColor} variant="subtitle1" fontSize={10}>
        {`${title} دیگه`}
      </Typography>
    </Stack>
  );
};

const CountdownTimer = ({ targetDate, color, bgcolor }) => {
  if(targetDate) {
    const newDate = digitsFaToEn(moment(targetDate).format('YYYY/MM/DD HH:mm:ss'));
    const { years, months, days, hours, minutes, seconds, isFinished } = remainingTime(newDate);
    const ago = timeAgo(digitsFaToEn(jMoment(newDate).format('jYYYY/jMM/jDD HH:mm:ss')));
  
    if (days > 0) {
      return <ShowCounter data={days} color={color} bgcolor={bgcolor} title="روز" />;
    }
    if (hours > 0) {
      return <ShowCounter data={hours} color={color} bgcolor={bgcolor} title="ساعت" />;
    }
    if (minutes > 0) {
      return <ShowCounter data={minutes} color={color} bgcolor={bgcolor} title="دقیقه" />;
    }
    if (seconds > 0) {
      return <ShowCounter data={seconds} color={color} bgcolor={bgcolor} title="ثانیه" />;
    }
  
    if (isFinished) {
      return <ExpiredNotice timeAgo={ago} />;
    }
  }
};

export default CountdownTimer;
