import { Text, StyleSheet } from 'react-native';
import { useHolidays } from '../hooks/useHolidays';

type Props = {
  date: string;
};

export function HolidayNote({ date }: Props) {
  const year = Number(date.slice(0, 4));
  const { data, isPending, isError } = useHolidays(year);

  if (isPending) {
    return <Text style={styles.text}>Checking holidays</Text>;
  }

  if (isError) {
    return <Text style={styles.text}>Holidays unavailable</Text>;
  }

  const holiday = data.find((h) => h.date === date);
  
  if (holiday) {
    return <Text style={styles.holiday}>Public holiday: {holiday.name}</Text>;
  }

  return <Text style={styles.text}>Not a public holiday</Text>;
}

const styles = StyleSheet.create({
  text: { fontSize: 14, color: '#6b7280', marginTop: 8 },
  holiday: { fontSize: 14, color: '#7c3aed', fontWeight: 'bold', marginTop: 8 },
});