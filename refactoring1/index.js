const invoices = [
  {
    customer:"BigCo",
    performances: [
      {
        playId: "hamlet",
        audience: 55
      },
      {
        playId: "othello",
        audience: 75
      },
      {
        playId: "as_like",
        audience: 45
      }
    ]
  }
]

const plays = {
  hamlet:{name:"Hamlet", type:"tragedy"},
  as_like:{name:"As You Like it", type:"comedy"},
  othello:{name:"Othello", type:"tragedy"}
}

function getAmountForPlay(performance) {
  let amount = 0;

  switch (getPlayTitle(performance).type) {
    case "tragedy":
      amount = 40000;
      if (performance.audience > 30) {
        amount += 1000 * (performance.audience - 30);
      }
      break;
    case "comedy":
      amount = 30000;
      if (performance.audience > 20) {
        amount += 1000 + 500 * (performance.audience - 20);
      }
      amount += 300 * performance.audience;
      break;

    default:
      throw new Error(`알 수 없는 장르: ${getPlayTitle(performance).type}`);
  }
  return amount;
};

function getPlayTitle(performance) {
  return plays[performance.playId];
}

function statement(invoice, plays) {
  let totalAmount = 0;
  let volumnCredits = 0;
  let result = `청구내역 (고객명 : ${invoice.customer})\n`;

  // Intl.NumberFromat => Constructor for objects that enable language-sensitive number formatting. 언어에 따라 숫자 포맷 구성해주는 메서드
  const format = new Intl.NumberFormat('en-Us', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format;

  for (let perf of invoice.performances) {
    //포인트 적립
    volumnCredits += Math.max(perf.audience - 30, 0);

    // 희극의 경우 관객 5명마다 추가 포인트 제공
    if ("comedy" === getPlayTitle(perf).type) volumnCredits += Math.floor(perf.audience / 5);

    //청구 내역 출력
    result += `${getPlayTitle(perf).name} : ${format( getAmountForPlay(perf) / 100)} (${perf.audience}석)\n`;
    totalAmount += getAmountForPlay(perf);
  }

  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumnCredits}점\n`;
  return result;
};

statement(invoices[0], plays);