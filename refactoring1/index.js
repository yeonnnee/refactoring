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

function statement(invoice, plays) {
  let totalAmount = 0;
  let volumnCredits = 0;
  let result = `청구내역 (고객명 : ${invoice.customer})\n`;

  // Intl.NumberFromat => Constructor for objects that enable language-sensitive number formatting. 언어에 따라 숫자 포맷 구성해주는 메서드
  const format = new Intl.NumberFormat('en-Us', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format;

  for (let perf of invoice.performances) {
    const play = plays[perf.playId];
    let thisAmount = 0;

    switch (play.type) {
      case "tragedy":
        thisAmount = 40000;
        if (perf.audience > 30) {
          thisAmount += 1000 * (perf.audience - 30);
        }
        break;
      case "comedy":
        thisAmount = 30000;
        if (perf.audience > 20) {
          thisAmount += 1000 + 500 * (perf.audience - 20);
        }
        thisAmount += 300 * perf.audience;
        break;

      default:
        throw new Error(`알 수 없는 장르: ${play.type}`);
    }

    //포인트 적립
    volumnCredits += Math.max(perf.audience - 30, 0);

    // 희극의 경우 관객 5명마다 추가 포인트 제공
    if ("comedy" === play.type) volumnCredits += Math.floor(perf.audience / 5);

    //청구 내역 출력
    result += `${play.name} : ${format(thisAmount / 100)} (${perf.audience}석)\n`;
    totalAmount += thisAmount;
  }

  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumnCredits}점\n`;
  return result;
}

statement(invoices[0], plays);