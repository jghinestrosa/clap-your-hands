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
    visible: true
  };

  const backHandData = {
    element: backHand,
    x: 0,
    y: 0,
    width: backHand.offsetWidth,
    height: backHand.offsetHeight,
    visible: true
  };

  const clappingHandsData = {
    element: clappingHands,
    x: 0,
    y: 0,
    width: clappingHands.offsetWidth,
    height: clappingHands.offsetHeight,
    visible: false
  };

  const mousePosition = { x: 0, y: 0 };

  function checkCollision(rect1, rect2) {
    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y) {
      // collision detected!
      console.log('>>> there is a collision');
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

    element.style.transform = `translate(${elementData.x}px, ${elementData.y}px)`;
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

  window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    mousePosition.x = clientX;
    mousePosition.y = clientY;
  });

  window.requestAnimationFrame(animate);
}(window, document));
