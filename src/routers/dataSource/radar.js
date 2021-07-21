function getRadarConfig (option = {}) {
  const { title } = option
  const data = {
    labels: ['STR', 'CON', 'DEX', 'MAG', 'CHR'],
    datasets: [
      {
        label: 'ice breaker',
        data: [72, 88, 65, 99, 98],
        borderColor: '#059669',
        backgroundColor: 'rgba(167, 243, 208, 0.5)'
        // fill: true
      }
    ]
  }
  const options = {}
  if (title) {
    options.title = {
      display: true,
      text: title
    }
  }
  return {
    type: 'radar',
    data,
    options
    // scales: {
    //   r: {
    //     angleLines: {
    //       display: false
    //     },
    //     suggestedMin: 0,
    //     suggestedMax: 100
    //   }
    // }
  }
}

module.exports = {
  getRadarConfig
}
