const data = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "User Activity",
        data: [65, 59, 80, 81, 56],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };