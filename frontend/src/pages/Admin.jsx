import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';

const StatCard = ({ icon, label, value }) => (
  <div className="w-full xl:w-1/4 px-3 mb-6">
    <div className="bg-white border text-blue-500 rounded-lg flex items-center p-6 shadow-sm">
      <div className="w-16 h-16 mr-4 hidden lg:block text-3xl">{icon}</div>
      <div className="text-gray-700">
        <p className="font-semibold text-3xl">{value}</p>
        <p>{label}</p>
      </div>
    </div>
  </div>
);

const TransactionItem = ({ name, product, amount }) => (
  <div className="w-full bg-gray-100 border rounded-lg flex justify-between items-center px-4 py-2 mb-4">
    <div>
      <p className="font-semibold text-xl">{name}</p>
      <p>{product}</p>
    </div>
    <span className={`font-semibold text-lg ${amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
      ${Math.abs(amount).toFixed(2)}
    </span>
  </div>
);

const Admin = () => {
  const [data, setData] = useState(null);
  const buyersChartRef = useRef(null);
  const reviewsChartRef = useRef(null);
  const buyersChartInstance = useRef(null);
  const reviewsChartInstance = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/admin')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(() =>
        setData({
          totalUsers: 237,
          totalPins: 177,
          totalComments: 31,
          totalFollowers: 1653,
          recentPins: [
            { title: 'Nature Landscape', createdAt: new Date().toISOString() },
            { title: 'City Vibes', createdAt: new Date().toISOString() },
          ],
          recentTransactions: [
            { name: 'Trent Murphy', product: 'Product 1', amount: 25 },
            { name: 'Joseph Brent', product: 'Product 34', amount: -74.99 },
            { name: 'Jacob Bator', product: 'Product 23', amount: 14.95 },
            { name: 'Alex Mason', product: 'Product 66', amount: 44.99 },
          ],
        })
      );
  }, []);

  useEffect(() => {
    if (!data) return;

    if (buyersChartInstance.current) buyersChartInstance.current.destroy();
    if (reviewsChartInstance.current) reviewsChartInstance.current.destroy();

    buyersChartInstance.current = new Chart(buyersChartRef.current, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'This Week',
            backgroundColor: 'rgba(99,179,237,0.4)',
            borderColor: '#63b3ed',
            data: [203, 156, 99, 251, 305, 247, 256],
            fill: true,
          },
          {
            label: 'Last Week',
            backgroundColor: 'rgba(198,198,198,0.4)',
            borderColor: '#cbd5e0',
            data: [86, 97, 144, 114, 94, 108, 156],
            fill: true,
          },
        ],
      },
      options: {
        plugins: { legend: { display: false } },
        scales: {
          y: { grid: { display: false }, ticks: { display: false } },
          x: { grid: { display: false } },
        },
      },
    });

    reviewsChartInstance.current = new Chart(reviewsChartRef.current, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            backgroundColor: 'rgba(99,179,237,0.4)',
            borderColor: '#63b3ed',
            data: [203, 156, 99, 251, 305, 247, 256],
          },
        ],
      },
      options: {
        plugins: { legend: { display: false } },
        scales: {
          y: { grid: { display: false }, ticks: { display: false } },
          x: { grid: { display: false } },
        },
      },
    });
  }, [data]);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        <svg className="animate-spin h-8 w-8 text-white mr-3" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
        </svg>
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-10 font-sans bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] text-gray-900">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Welcome back, Admin!</h1>

        {/* Stats */}
        <div className="flex flex-wrap -mx-3 mb-12">
          <StatCard label="Total Users" value={data.totalUsers} icon="👥" />
          <StatCard label="Total Pins" value={data.totalPins} icon="📌" />
          <StatCard label="Total Comments" value={data.totalComments} icon="💬" />
          <StatCard label="Total Followers" value={data.totalFollowers} icon="📣" />
        </div>

        {/* Charts and Transactions */}
        <div className="flex flex-wrap -mx-3 mb-12">
          <div className="w-full xl:w-1/3 px-3 mb-6 xl:mb-0">
            <p className="text-xl font-semibold mb-4">Recent Sales</p>
            <div className="bg-white border rounded-lg p-4">
              <canvas ref={buyersChartRef} height="200"></canvas>
            </div>
          </div>

          <div className="w-full xl:w-1/3 px-3 mb-6 xl:mb-0">
            <p className="text-xl font-semibold mb-4">Recent Reviews</p>
            <div className="bg-white border rounded-lg p-4">
              <canvas ref={reviewsChartRef} height="200"></canvas>
            </div>
          </div>

          <div className="w-full xl:w-1/3 px-3">
            <p className="text-xl font-semibold mb-4">Recent Transactions</p>
            <div className="bg-white border rounded-lg p-4">
              {data.recentTransactions?.map((t, i) => (
                <TransactionItem key={i} {...t} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
