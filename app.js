// ========== DATA STORAGE ==========
// Seeded transactions: one income and one expense per month (Jan-Dec).
// Jan/Feb amounts decreased and March–Dec populated so the monthly breakdown is populated.
let transactions = [
  { date: '2025-01-15', desc: 'Client Revenue - Jan', type: 'income', category: 'operations', amt: 200000 },
  { date: '2025-01-20', desc: 'Operational Expense - Jan', type: 'expense', category: 'operations', amt: 500000 },

  { date: '2025-02-14', desc: 'Consulting Revenue - Feb', type: 'income', category: 'operations', amt: 300000 },
  { date: '2025-02-25', desc: 'Marketing Spend - Feb', type: 'expense', category: 'marketing', amt: 300000 },

  { date: '2025-03-10', desc: 'Product License Sales - Mar', type: 'income', category: 'operations', amt: 800000 },
  { date: '2025-03-18', desc: 'Infrastructure Upgrade - Mar', type: 'expense', category: 'infrastructure', amt: 1200000 },

  { date: '2025-04-12', desc: 'Enterprise Renewal - Apr', type: 'income', category: 'operations', amt: 800000 },
  { date: '2025-04-22', desc: 'Cloud Hosting - Apr', type: 'expense', category: 'infrastructure', amt: 600000 },

  { date: '2025-05-05', desc: 'Partnership Revenue - May', type: 'income', category: 'operations', amt: 900000 },
  { date: '2025-05-20', desc: 'Platform Maintenance - May', type: 'expense', category: 'operations', amt: 600000 },

  { date: '2025-06-08', desc: 'Q2 Contract Revenue - Jun', type: 'income', category: 'operations', amt: 900000 },
  { date: '2025-06-28', desc: 'Team Bonuses - Jun', type: 'expense', category: 'salaries', amt: 600000 },

  { date: '2025-07-14', desc: 'Consulting Revenue - Jul', type: 'income', category: 'operations', amt: 900000 },
  { date: '2025-07-30', desc: 'R&D Spending - Jul', type: 'expense', category: 'infrastructure', amt: 600000 },

  { date: '2025-08-11', desc: 'Annual License - Aug', type: 'income', category: 'operations', amt: 900000 },
  { date: '2025-08-25', desc: 'Marketing Campaign - Aug', type: 'expense', category: 'marketing', amt: 500000 },

  { date: '2025-09-09', desc: 'Subscription Revenue - Sep', type: 'income', category: 'operations', amt: 900000 },
  { date: '2025-09-21', desc: 'Office Maintenance - Sep', type: 'expense', category: 'operations', amt: 400000 },

  { date: '2025-10-02', desc: 'New Client Revenue - Oct', type: 'income', category: 'operations', amt: 900000 },
  { date: '2025-10-19', desc: 'Utilities & Services - Oct', type: 'expense', category: 'other', amt: 300000 },

  { date: '2025-11-06', desc: 'Retention Revenue - Nov', type: 'income', category: 'operations', amt: 900000 },
  { date: '2025-11-24', desc: 'Minor Capital Expense - Nov', type: 'expense', category: 'infrastructure', amt: 200000 },

  { date: '2025-12-20', desc: 'Year-end Contract Revenue - Dec', type: 'income', category: 'operations', amt: 1600000 },
  { date: '2025-12-27', desc: 'Year-end Bonuses & Events - Dec', type: 'expense', category: 'salaries', amt: 700000 }
];
let investments = [];
let salaryData = [
  { designation: "CEO", staff: 1, monthlySalary: 500000 },
  { designation: "CFO", staff: 1, monthlySalary: 400000 },
  { designation: "Senior Manager", staff: 5, monthlySalary: 150000 },
  { designation: "Manager", staff: 10, monthlySalary: 100000 },
  { designation: "Executive", staff: 30, monthlySalary: 60000 },
  { designation: "Associate", staff: 50, monthlySalary: 40000 },
  { designation: "Intern", staff: 20, monthlySalary: 20000 }
];

let charts = {};

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function() {
  // Show home section by default
  showSection('home');
  initializeCharts();
  updateDashboard();
  loadSalaryData();
  updateHomeTransactions();
});

// ========== SECTION NAVIGATION ==========
function showSection(sectionId) {
  // Hide all sections
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.classList.remove('active');
  });

  // Show selected section
  const selectedSection = document.getElementById(sectionId);
  if (selectedSection) {
    selectedSection.classList.add('active');
    window.scrollTo(0, 0);
  }

  // Update active nav link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.style.color = '#cbd5e1';
    link.style.background = 'none';
  });

  const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
  if (activeLink) {
    activeLink.style.color = '#38bdf8';
    activeLink.style.background = 'rgba(56, 189, 248, 0.1)';
  }
}

// ========== TRANSACTION MANAGEMENT ==========
function addTransaction() {
  const desc = document.getElementById('txnDesc').value;
  const amt = Number(document.getElementById('txnAmount').value);
  const type = document.getElementById('txnType').value;
  const category = document.getElementById('txnCategory').value;
  const date = document.getElementById('txnDate').value || new Date().toISOString().split('T')[0];

  if (!desc || !amt) {
    alert('Please fill all fields');
    return;
  }

  transactions.push({
    date: date,
    desc: desc,
    type: type,
    category: category,
    amt: amt
  });

  // Clear inputs
  document.getElementById('txnDesc').value = '';
  document.getElementById('txnAmount').value = '';
  document.getElementById('txnDate').value = '';

  updateDashboard();
  updateHomeTransactions();
  updateCharts();
  alert('Transaction added successfully!');
}

// ========== INVESTMENT MANAGEMENT ==========
function addInvestment() {
  const name = document.getElementById('invName').value;
  const amount = Number(document.getElementById('invAmount').value);
  const roi = Number(document.getElementById('invReturn').value);
  const date = document.getElementById('invDate').value || new Date().toISOString().split('T')[0];

  if (!name || !amount || !roi) {
    alert('Please fill all investment fields');
    return;
  }

  investments.push({
    name: name,
    amount: amount,
    roi: roi,
    date: date
  });

  // Clear inputs
  document.getElementById('invName').value = '';
  document.getElementById('invAmount').value = '';
  document.getElementById('invReturn').value = '';
  document.getElementById('invDate').value = '';

  updateDashboard();
  updateCharts();
  alert('Investment added successfully!');
}

// ========== BILL SPLIT CALCULATOR ==========
function splitBill() {
  const bill = Number(document.getElementById('billAmount').value);
  const people = Number(document.getElementById('members').value);

  if (!bill || !people) {
    alert('Please enter both bill amount and number of members');
    return;
  }

  const perPerson = (bill / people).toFixed(2);
  document.getElementById('splitResult').innerHTML = 
    `<strong style="color: #38bdf8;">Each person pays: ₹${perPerson}</strong>`;
}

// ========== DASHBOARD UPDATE ==========
function updateDashboard() {
  const transactionTable = document.getElementById("transactionTable");
  const investmentTable = document.getElementById("investmentTable");
  
  transactionTable.innerHTML = "";
  investmentTable.innerHTML = "";

  let income = 0, expense = 0;

  // Update transactions table
  transactions.forEach(t => {
    const row = `<tr>
      <td>${t.date}</td>
      <td>${t.desc}</td>
      <td><span style="color: ${t.type === 'income' ? '#10b981' : '#ef4444'}">${t.type.toUpperCase()}</span></td>
      <td>${t.category}</td>
      <td style="color: ${t.type === 'income' ? '#10b981' : '#ef4444'}">₹${t.amt.toLocaleString()}</td>
    </tr>`;
    transactionTable.innerHTML += row;

    if (t.type === "income") {
      income += t.amt;
    } else {
      expense += t.amt;
    }
  });

  // Update investments table
  investments.forEach(i => {
    const projectedReturn = ((i.amount * i.roi) / 100).toFixed(2);
    const row = `<tr>
      <td>${i.name}</td>
      <td>₹${i.amount.toLocaleString()}</td>
      <td>${i.roi}%</td>
      <td style="color: #10b981">₹${projectedReturn}</td>
    </tr>`;
    investmentTable.innerHTML += row;
  });

  // Update stats
  let profit = income - expense;
  let savings = profit;

  // If there are no recorded transactions, show the requested default annual figures
  if (transactions.length === 0) {
    income = 10000000; // ₹1,00,00,000
    expense = 6500000; // ₹65,00,000
    profit = income - expense; // ₹35,00,000
    savings = 3000000; // ₹30,00,000 (explicit savings target)
  }

  document.getElementById('totalFunds').innerText = "₹" + income.toLocaleString();
  document.getElementById('totalExpenses').innerText = "₹" + expense.toLocaleString();
  document.getElementById('annualSavings').innerText = "₹" + savings.toLocaleString();
  document.getElementById('profitLoss').innerText = "₹" + profit.toLocaleString();

  // Update reports
  document.getElementById('repIncome').innerText = "₹" + income.toLocaleString();
  document.getElementById('repExpense').innerText = "₹" + expense.toLocaleString();
  document.getElementById('repBalance').innerText = "₹" + profit.toLocaleString();
  
  const savingsRate = income > 0 ? ((savings / income) * 100).toFixed(2) : 0;
  document.getElementById('repSavingsRate').innerText = savingsRate + "%";

  // Update investment list
  const investmentList = document.getElementById('investmentList');
  investmentList.innerHTML = "";
  investments.forEach(i => {
    const projectedReturn = ((i.amount * i.roi) / 100).toFixed(2);
    investmentList.innerHTML += `
      <li style="padding: 10px 0; border-bottom: 1px solid rgba(56, 189, 248, 0.1);">
        <strong>${i.name}</strong> – Amount: ₹${i.amount.toLocaleString()} – ROI: ${i.roi}% – Projected Return: ₹${projectedReturn}
      </li>`;
  });

  // Render 12-month breakdown in the reports section
  renderAnnualMonthlyBreakdown();
}

// ========== HOME PAGE RECENT TRANSACTIONS ==========
function updateHomeTransactions() {
  const homeTable = document.getElementById('homeTransactionTable');
  homeTable.innerHTML = "";

  // Show last 5 transactions
  const recentTxns = transactions.slice(-5).reverse();
  recentTxns.forEach(t => {
    const row = `<tr>
      <td>${t.date}</td>
      <td>${t.desc}</td>
      <td><span style="color: ${t.type === 'income' ? '#10b981' : '#ef4444'}">${t.type.toUpperCase()}</span></td>
      <td style="color: ${t.type === 'income' ? '#10b981' : '#ef4444'}">₹${t.amt.toLocaleString()}</td>
    </tr>`;
    homeTable.innerHTML += row;
  });
}

// ========== SALARY DISTRIBUTION ==========
function loadSalaryData() {
  const salaryTable = document.getElementById('salaryTable');
  salaryTable.innerHTML = "";
  let totalMonthlyCost = 0;

  salaryData.forEach(salary => {
    const totalCost = salary.staff * salary.monthlySalary;
    totalMonthlyCost += totalCost;
    const row = `<tr>
      <td>${salary.designation}</td>
      <td>${salary.staff}</td>
      <td>₹${salary.monthlySalary.toLocaleString()}</td>
      <td style="color: #38bdf8; font-weight: bold;">₹${totalCost.toLocaleString()}</td>
    </tr>`;
    salaryTable.innerHTML += row;
  });

  const totalRow = `<tr style="background: rgba(56, 189, 248, 0.1);">
    <td colspan="2"><strong>Total Monthly Salary Cost</strong></td>
    <td colspan="2" style="color: #38bdf8; font-weight: bold;">₹${totalMonthlyCost.toLocaleString()}</td>
  </tr>`;
  salaryTable.innerHTML += totalRow;
}

// ========== MONTHLY REPORT GENERATION ==========
function generateMonthlyReport() {
  const monthSelect = document.getElementById('monthSelect').value;
  const monthlyReport = document.getElementById('monthlyReport');
  
  if (!monthSelect) {
    monthlyReport.innerHTML = '<p style="color: #cbd5e1;">Select a month to view details</p>';
    return;
  }

  // Filter transactions for selected month
  const monthTransactions = transactions.filter(t => {
    const txnMonth = new Date(t.date).getMonth() + 1;
    return txnMonth == monthSelect;
  });

  let monthIncome = 0, monthExpense = 0;
  const categoryBreakdown = {};

  monthTransactions.forEach(t => {
    if (t.type === 'income') {
      monthIncome += t.amt;
    } else {
      monthExpense += t.amt;
      categoryBreakdown[t.category] = (categoryBreakdown[t.category] || 0) + t.amt;
    }
  });

  const monthProfit = monthIncome - monthExpense;
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  let html = `
    <p><strong>Month:</strong> ${months[monthSelect - 1]}</p>
    <p><strong>Income:</strong> <span style="color: #10b981;">₹${monthIncome.toLocaleString()}</span></p>
    <p><strong>Expense:</strong> <span style="color: #ef4444;">₹${monthExpense.toLocaleString()}</span></p>
    <p><strong>Net Profit:</strong> <span style="color: ${monthProfit >= 0 ? '#10b981' : '#ef4444'};">₹${monthProfit.toLocaleString()}</span></p>
  `;

  if (Object.keys(categoryBreakdown).length > 0) {
    html += '<p><strong>Expense Breakdown:</strong></p><ul>';
    Object.entries(categoryBreakdown).forEach(([category, amount]) => {
      html += `<li>${category}: ₹${amount.toLocaleString()}</li>`;
    });
    html += '</ul>';
  }

  monthlyReport.innerHTML = html;
}

// Renders a 12-month breakdown (Income / Expense / Net) into #monthlyReport
function renderAnnualMonthlyBreakdown() {
  const monthlyReport = document.getElementById('monthlyReport');
  if (!monthlyReport) return;

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  let html = `<h4 style="margin-bottom:8px;">12-Month Breakdown</h4>`;
  html += `<table style="width:100%; border-collapse: collapse;">
    <thead>
      <tr style="text-align:left; border-bottom:1px solid rgba(148,163,184,0.2);">
        <th style="padding:8px">Month</th>
        <th style="padding:8px">Income</th>
        <th style="padding:8px">Expense</th>
        <th style="padding:8px">Net</th>
      </tr>
    </thead>
    <tbody>`;

  for (let m = 1; m <= 12; m++) {
    let monthIncome = 0, monthExpense = 0;
    transactions.forEach(t => {
      const txnMonth = new Date(t.date).getMonth() + 1;
      if (txnMonth === m) {
        if (t.type === 'income') monthIncome += t.amt;
        else monthExpense += t.amt;
      }
    });

    const monthNet = monthIncome - monthExpense;
    html += `
      <tr style="border-bottom:1px solid rgba(148,163,184,0.06);">
        <td style="padding:8px">${months[m-1]}</td>
        <td style="padding:8px; color:#10b981">₹${monthIncome.toLocaleString()}</td>
        <td style="padding:8px; color:#ef4444">₹${monthExpense.toLocaleString()}</td>
        <td style="padding:8px; color:${monthNet>=0? '#10b981' : '#ef4444'}">₹${monthNet.toLocaleString()}</td>
      </tr>`;
  }

  html += `</tbody></table>`;
  monthlyReport.innerHTML = html;
}

// ========== CONTACT FORM SUBMISSION ==========
function sendMessage(event) {
  event.preventDefault();

  const name = document.getElementById('senderName').value;
  const email = document.getElementById('senderEmail').value;
  const org = document.getElementById('senderOrg').value;
  const phone = document.getElementById('senderPhone').value;
  const subject = document.getElementById('messageSubject').value;
  const message = document.getElementById('senderMessage').value;

  const messageStatus = document.getElementById('messageStatus');

  if (!name || !email || !org || !subject || !message) {
    messageStatus.textContent = 'Please fill all required fields!';
    messageStatus.className = 'error';
    return;
  }

  // Simulate sending message
  const fullMessage = `
    From: ${name} (${org})
    Email: ${email}
    Phone: ${phone}
    Subject: ${subject}
    Message: ${message}
  `;

  console.log('Message sent:', fullMessage);

  messageStatus.textContent = '✓ Message sent successfully! We will contact you soon.';
  messageStatus.className = 'success';

  // Clear form
  document.getElementById('contactForm').reset();

  setTimeout(() => {
    messageStatus.className = '';
    messageStatus.textContent = '';
  }, 5000);
}

// ========== CHARTS INITIALIZATION ==========
function initializeCharts() {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          color: '#cbd5e1'
        }
      }
    },
    scales: {
      y: {
        ticks: { color: '#cbd5e1' },
        grid: { color: 'rgba(56, 189, 248, 0.1)' }
      },
      x: {
        ticks: { color: '#cbd5e1' },
        grid: { color: 'rgba(56, 189, 248, 0.1)' }
      }
    }
  };

  // Income vs Expenditure Trend
  const trendCtx = document.getElementById('trendChart');
  if (trendCtx) {
    charts.trendChart = new Chart(trendCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Income',
            data: [250000, 280000, 290000, 310000, 330000, 350000, 380000, 400000, 420000, 450000, 480000, 500000],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'Expenditure',
            data: [150000, 160000, 170000, 180000, 190000, 200000, 210000, 220000, 230000, 240000, 250000, 260000],
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: chartOptions
    });
  }

  // Monthly Revenue Distribution
  const revenueCtx = document.getElementById('revenueChart');
  if (revenueCtx) {
    charts.revenueChart = new Chart(revenueCtx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Revenue',
            data: [250000, 280000, 290000, 310000, 330000, 350000, 380000, 400000, 420000, 450000, 480000, 500000],
            backgroundColor: [
              'rgba(56, 189, 248, 0.8)',
              'rgba(56, 189, 248, 0.7)',
              'rgba(56, 189, 248, 0.6)',
              'rgba(56, 189, 248, 0.8)',
              'rgba(56, 189, 248, 0.7)',
              'rgba(56, 189, 248, 0.6)',
              'rgba(56, 189, 248, 0.8)',
              'rgba(56, 189, 248, 0.7)',
              'rgba(56, 189, 248, 0.6)',
              'rgba(56, 189, 248, 0.8)',
              'rgba(56, 189, 248, 0.7)',
              'rgba(56, 189, 248, 0.6)'
            ],
            borderColor: '#38bdf8',
            borderWidth: 1
          }
        ]
      },
      options: chartOptions
    });
  }

  // Expense Categories
  const expenseCtx = document.getElementById('expenseChart');
  if (expenseCtx) {
    charts.expenseChart = new Chart(expenseCtx, {
      type: 'doughnut',
      data: {
        labels: ['Operations', 'Marketing', 'Infrastructure', 'Salaries', 'Other'],
        datasets: [{
          data: [35, 20, 25, 15, 5],
          backgroundColor: [
            'rgba(56, 189, 248, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(244, 114, 182, 0.8)',
            'rgba(251, 146, 60, 0.8)',
            'rgba(168, 85, 247, 0.8)'
          ],
          borderColor: '#0f172a',
          borderWidth: 2
        }]
      },
      options: {
        ...chartOptions,
        plugins: {
          ...chartOptions.plugins,
          legend: {
            position: 'right',
            labels: { color: '#cbd5e1', padding: 15 }
          }
        }
      }
    });
  }

  // Quarterly Performance
  const quarterlyCtx = document.getElementById('quarterlyChart');
  if (quarterlyCtx) {
    charts.quarterlyChart = new Chart(quarterlyCtx, {
      type: 'radar',
      data: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
          {
            label: 'Income',
            data: [820000, 990000, 1200000, 1430000],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            pointBackgroundColor: '#10b981'
          },
          {
            label: 'Expenditure',
            data: [480000, 570000, 660000, 750000],
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.2)',
            pointBackgroundColor: '#ef4444'
          }
        ]
      },
      options: chartOptions
    });
  }

  // Shareholding Pattern
  const sharesCtx = document.getElementById('sharesChart');
  if (sharesCtx) {
    charts.sharesChart = new Chart(sharesCtx, {
      type: 'pie',
      data: {
        labels: ['Promoters (40%)', 'Institutional (35%)', 'Retail (20%)', 'ESOP (5%)'],
        datasets: [{
          data: [40, 35, 20, 5],
          backgroundColor: [
            'rgba(56, 189, 248, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(244, 114, 182, 0.8)',
            'rgba(251, 146, 60, 0.8)'
          ],
          borderColor: '#0f172a',
          borderWidth: 2
        }]
      },
      options: {
        ...chartOptions,
        plugins: {
          ...chartOptions.plugins,
          legend: {
            position: 'bottom',
            labels: { color: '#cbd5e1', padding: 15 }
          }
        }
      }
    });
  }

  // Share Performance
  const performanceCtx = document.getElementById('sharePerformanceChart');
  if (performanceCtx) {
    charts.sharePerformanceChart = new Chart(performanceCtx, {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
        datasets: [{
          label: 'Share Price (₹)',
          data: [120, 125, 128, 130, 135, 140, 145, 150],
          borderColor: '#38bdf8',
          backgroundColor: 'rgba(56, 189, 248, 0.1)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#38bdf8',
          pointBorderColor: '#0f172a',
          pointRadius: 5
        }]
      },
      options: chartOptions
    });
  }
}

// ========== UPDATE CHARTS WITH NEW DATA ==========
function updateCharts() {
  // This function will update charts when new data is added
  if (charts.trendChart) {
    charts.trendChart.update();
  }
  if (charts.revenueChart) {
    charts.revenueChart.update();
  }
  if (charts.expenseChart) {
    charts.expenseChart.update();
  }
}
