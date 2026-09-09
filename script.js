function calculateTax() {
    const incomeInput = document.getElementById("income");
    const allowanceInput = document.getElementById("allowance");
    const result = document.getElementById("result");

    const income = Number(incomeInput.value) || 0;
    const allowance = Number(allowanceInput.value) || 0;

    if (income <= 0) {
        result.innerHTML = "กรุณากรอกรายได้ต่อปี";
        return;
    }

    const taxableIncome = Math.max(0, income - allowance);

    let tax = 0;
    let remaining = taxableIncome;

    const brackets = [
        { amount: 150000, rate: 0 },
        { amount: 150000, rate: 0.05 },
        { amount: 200000, rate: 0.10 },
        { amount: 250000, rate: 0.15 },
        { amount: 1000000, rate: 0.20 },
        { amount: 2000000, rate: 0.25 },
        { amount: 5000000, rate: 0.30 },
        { amount: Infinity, rate: 0.35 }
    ];

    for (const bracket of brackets) {
        if (remaining <= 0) break;

        const taxableInBracket = Math.min(remaining, bracket.amount);
        tax += taxableInBracket * bracket.rate;
        remaining -= taxableInBracket;
    }

    result.innerHTML = `
        <div style="margin-top:20px;">
            <h3>ผลการคำนวณ</h3>
            <p>รายได้ต่อปี: <strong>${income.toLocaleString()} บาท</strong></p>
            <p>ค่าลดหย่อน: <strong>${allowance.toLocaleString()} บาท</strong></p>
            <p>เงินได้สุทธิ: <strong>${taxableIncome.toLocaleString()} บาท</strong></p>
            <p style="font-size:22px;">
                ภาษีโดยประมาณ: 
                <strong>${tax.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })} บาท</strong>
            </p>
            <small>
                * เป็นเครื่องคำนวณเบื้องต้นเพื่อการศึกษา
                ไม่ใช่การคำนวณเพื่อยื่นภาษีอย่างเป็นทางการ
            </small>
        </div>
    `;
}
