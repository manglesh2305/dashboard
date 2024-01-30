function getYearFromTimestamp(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  return year;
}

const downsampleData = (data, factor) => {
  const downsampledData = [];

  let size = data.length;
  for (let i = 0; i < size; i++) {
    let sum = 0;
    let count = 0;
    let year = getYearFromTimestamp(data[i].timestamp);
    while (i < size && getYearFromTimestamp(data[i].timestamp) == year) {
      sum += data[i].profit;
      count++;
      i++;
    }
    let profit = sum/count;
    profit = profit.toFixed(2);
    downsampledData.push({'timestamp':year,'profit':profit});
  }

  return downsampledData;
};

module.exports = downsampleData;