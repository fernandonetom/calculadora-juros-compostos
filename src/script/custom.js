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
      .value.replace('.', '')
      .replace(',', '.');

    if (valueInput.trim() === '' || valueInput === '0' || valueInput === '0.00')
      return alert('Preencha o valor');
    const jurosInput = document
      .getElementById('juros-dia')
      .value.replace('.', '')
      .replace(',', '.');

    if (jurosInput.trim() === '' || jurosInput === '0' || jurosInput === '0.00')
      return alert('Preencha os juros ao dia');

    const valor = parseFloat(
      document
        .getElementById('valor-inicial')
        .value.replace('.', '')
        .replace(',', '.')
    );
    const juros =
      parseFloat(
        document
          .getElementById('juros-dia')
          .value.replace('.', '')
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
    let percent = [];
    const values = days.map(() => {
      const result = (sum * juros).toFixed(2);
      sum = result;
      const lucroAtual = (result - valor).toFixed(2);
      lucro.push(lucroAtual);
      const percentLucro = ((lucroAtual / valor) * 100).toFixed(2);
      percent.push(percentLucro);
      return result;
    });

    document.getElementById('alert').classList.add('d-none');

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
          {
            label: '% de lucro composto',
            data: percent,
            backgroundColor: 'rgb(153, 102, 255)',
            borderColor: 'rgb(153, 102, 255)',
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

    document.getElementById('result-list').classList.remove('d-none');
    document.getElementById(
      'result-inicio'
    ).innerHTML = `Banca inicial: R$${valor.toLocaleString('pt-br', {
      minimumFractionDigits: 2,
    })}`;
    document.getElementById(
      'result-fim'
    ).innerHTML = `Banca final: R$${parseFloat(
      values[values.length - 1]
    ).toLocaleString('pt-br', { minimumFractionDigits: 2 })}`;

    document.getElementById('result-lucro').innerHTML = `Lucro: R$${parseFloat(
      lucro[lucro.length - 1]
    ).toLocaleString('pt-br', { minimumFractionDigits: 2 })}`;

    document.getElementById('result-dias').innerHTML = `Dias corridos: ${
      days[days.length - 1]
    }`;

    document.getElementById('result-percent').innerHTML = `Evolução: ${(
      (values[values.length - 1] / valor) *
      100
    ).toFixed(2)}%`;

    document.getElementById(
      'result-lucro-percent'
    ).innerHTML = `Evolução do lucro: ${(
      (lucro[lucro.length - 1] / valor) *
      100
    ).toFixed(2)}%`;
  });
});
