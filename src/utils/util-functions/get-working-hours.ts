const isWorkingHour = (startTime = "08:00:0", endTime = "16:00:00") => {
  const currentDate = new Date();

  const startDate = new Date(currentDate.getTime());
  startDate.setHours(+startTime.split(":")[0]);
  startDate.setMinutes(+startTime.split(":")[1]);
  startDate.setSeconds(+startTime.split(":")[2]);

  const endDate = new Date(currentDate.getTime());
  endDate.setHours(+endTime.split(":")[0]);
  endDate.setMinutes(+endTime.split(":")[1]);
  endDate.setSeconds(+endTime.split(":")[2]);

  const valid = startDate < currentDate && endDate > currentDate;
  return valid;
};

export { isWorkingHour };
