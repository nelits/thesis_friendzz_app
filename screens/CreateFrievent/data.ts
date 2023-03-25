function generateMeetHours() {
  const meetHours = [];

  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMinute = minute.toString().padStart(2, "0");
      meetHours.push(`${formattedHour}:${formattedMinute}`);
    }
  }

  return meetHours;
}

export const MEET_HOURS = generateMeetHours();

export const PERSONS_COUNT = [3, 4, 5, 6, 7, 8, 9, 10];
