(function(window, document) {
  const topHand = document.querySelector('.top-hand');
  const backHand = document.querySelector('.back-hand');
  const clappingHands = document.querySelector('.clapping-hands');

  const topHandData = {
    element: topHand,
    x: 0,
    y: 0,
    width: topHand.offsetWidth,
    height: topHand.offsetHeight,
    visible: true,
    getRenderData() {
      return `translate(${this.x}px, ${this.y}px)`;
    }
  };

  const backHandData = {
    element: backHand,
    x: 0,
    y: 0,
    width: backHand.offsetWidth,
    height: backHand.offsetHeight,
    visible: true,
    getRenderData() {
      return `translate(${this.x}px, ${this.y}px) rotateY(180deg)`;
    }
  };

  const clappingHandsData = {
    element: clappingHands,
    x: 0,
    y: 0,
    width: clappingHands.offsetWidth,
    height: clappingHands.offsetHeight,
    visible: false,
    getRenderData() {
      return `translate(${this.x}px, ${this.y}px) rotate(45deg)`;
    }
  };

  const mousePosition = {
    x: window.innerWidth / 2 + topHandData.width,
    y: window.innerHeight / 2
  };

  function checkCollision(rect1, rect2) {
    if (rect1.x < rect2.x + rect2.width - rect2.width / 2 &&
        rect1.x + rect1.width - rect1.width / 2 > rect2.x &&
        rect1.y < rect2.y + rect2.height - rect2.height / 2 &&
        rect1.y + rect1.height - rect1.height / 2 > rect2.y) {
      clappingHandsData.visible = true;
      topHandData.visible = false;
      backHandData.visible = false;
    }
    else {
      clappingHandsData.visible = false;
      topHandData.visible = true;
      backHandData.visible = true;
    }
  }

  function updateTopHandData(mouseX, mouseY) {
    topHandData.x = window.innerWidth - mouseX - topHandData.width / 2;
    topHandData.y = window.innerHeight - mouseY - topHandData.height / 2;
  }

  function updateBackHandData(mouseX, mouseY) {
    backHandData.x = mouseX - backHandData.width / 2;
    backHandData.y = mouseY - backHandData.height / 2;
  }

  function updateClappingHands(mouseX, mouseY) {
    clappingHandsData.x = mouseX - clappingHandsData.width / 2;
    clappingHandsData.y = mouseY - clappingHandsData.height / 2;
  }

  function update(x, y) {
    updateBackHandData(x, y);
    updateTopHandData(x, y);
    updateClappingHands(x, y);
  }

  function render(elementData) {
    const { element } = elementData;

    if (elementData.visible) {
      element.style.display = 'block';
    }
    else {
      element.style.display = 'none';
    }

    element.style.transform = elementData.getRenderData();
  }

  function renderAll() {
    render(topHandData);
    render(backHandData);
    render(clappingHandsData);
  }

  function animate() {
    const { x, y } = mousePosition;
    checkCollision(topHandData, backHandData);
    update(x, y);
    renderAll();
    window.requestAnimationFrame(animate);
  }

  function handleMove({ clientX, clientY }) {
    mousePosition.x = clientX;
    mousePosition.y = clientY;
  }

  window.addEventListener('mousemove', handleMove);

  window.addEventListener('touchmove', (e) => {
    handleMove(e.touches[0]);
  });

  window.requestAnimationFrame(animate);
}(window, document));
