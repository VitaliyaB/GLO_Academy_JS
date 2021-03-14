const command = () => {
  const command = document.getElementById('command');
  let originalImg;

  command.addEventListener('mouseover', (event) => {
    if (event.target.matches('.command__photo')) {
      originalImg = event.target.src;
      event.target.src = event.target.dataset.img;
    } else {
      return;
    }
  });

  command.addEventListener('mouseout', (event) => {
    if (event.target.matches('.command__photo')) {
      event.target.src = originalImg;
    } else {
      return;
    }
  });
};

export default command;
