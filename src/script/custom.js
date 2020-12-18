$(document).ready(function () {
  let myChart = {};
  $('#valor-inicial').maskMoney({
    thousands: '.',
    decimal: ',',
    allowZero: true,
  });
  $('#juros-dia').maskMoney({
    thousands: '.',
    decimal: ',',
    allowZero: false,
  });
  document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();

    const valueInput = document
      .getElementById('valor-inicial')
      .value.replace('.', ',')
      .replace(',', '.');

    if (valueInput.trim() === '' || valueInput === '0' || valueInput === '0.00')
      return alert('Preencha o valor');
    const jurosInput = document
      .getElementById('juros-dia')
      .value.replace('.', ',')
      .replace(',', '.');

    if (jurosInput.trim() === '' || jurosInput === '0' || jurosInput === '0.00')
      return alert('Preencha os juros ao dia');

    const valor = parseFloat(
      document
        .getElementById('valor-inicial')
        .value.replace('.', ',')
        .replace(',', '.')
    );
    const juros =
      parseFloat(
        document
          .getElementById('juros-dia')
          .value.replace('.', ',')
          .replace(',', '.')
      ) /
        100 +
      1;
    const dias = document
      .getElementById('dias')
      .value.replace('.', ',')
      .replace(',', '.');
    console.log('Valor' + valor);
    if (dias.trim() === '' || dias === '0')
      return alert('Preencha a quantidade de dias');
    let days = [];

    for (let i = 1; i <= dias; i++) {
      days.push(i);
    }

    let sum = valor;
    let lucro = [];
    const values = days.map(() => {
      const result = (sum * juros).toFixed(2);
      sum = result;
      lucro.push((result - valor).toFixed(2));
      return result;
    });

    console.log(days, values, lucro);
    var ctx = document.getElementById('resultado').getContext('2d');
    if (myChart.destroy) myChart.destroy();
    myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: days,
        datasets: [
          {
            label: 'Evolução do capital',
            data: values,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgb(255, 99, 132)',
            fill: false,
          },
          {
            label: 'Evolução do lucro',
            data: lucro,
            backgroundColor: 'rgb(54, 162, 235)',
            borderColor: 'rgb(54, 162, 235)',
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        title: {
          display: false,
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Dias',
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'R$',
              },
            },
          ],
        },
      },
    });
  });
});
