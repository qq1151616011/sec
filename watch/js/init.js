function createGrid(transform, xx, yy, isHorizon) {
		var elemWidth, elemHeight;

		if (isHorizon) {
			elemWidth = window.innerWidth / 4;
			elemHeight = window.innerHeight / 3;
		} else {
			elemWidth = window.innerWidth / 3;
			elemHeight = window.innerHeight / 4;
		}

		var xPos = elemWidth * xx;
		var yPos = elemHeight * yy;


		var curTopLeft = { x: transform.topLeft.x, y: transform.topLeft.y };
		var curTopRight = { x: transform.topRight.x, y: transform.topRight.y };
		var curBotLeft = { x: transform.bottomLeft.x, y: transform.bottomLeft.y };
		var curBotRight = { x: transform.bottomRight.x, y: transform.bottomRight.y };

		var targetTopLeft = { x: xPos, y: yPos };
		var targetTopRight = { x: xPos + elemWidth, y: yPos };
		var targetBotLeft = { x: xPos, y: yPos + elemHeight };
		var targetBotRight = { x: xPos + elemWidth, y: yPos + elemHeight };

		var curObject = { rate0: 1, rate1: 1, rate2: 1, rate3: 1, rate4: 1 };

		function onUpdateGridHandler() {
			var tempTopLeftX = curTopLeft.x * curObject.rate + targetTopLeft.x * (1 - curObject.rate);
			var tempTopLeftY = curTopLeft.y * curObject.rate + targetTopLeft.y * (1 - curObject.rate);

			var tempTopRightX = curTopRight.x * curObject.rate + targetTopRight.x * (1 - curObject.rate);
			var tempTopRightY = curTopRight.y * curObject.rate + targetTopRight.y * (1 - curObject.rate);

			var tempBotLeftX = curBotLeft.x * curObject.rate + targetBotLeft.x * (1 - curObject.rate);
			var tempBotLeftY = curBotLeft.y * curObject.rate + targetBotLeft.y * (1 - curObject.rate);

			var tempBotRightX = curBotRight.x * curObject.rate + targetBotRight.x * (1 - curObject.rate);
			var tempBotRightY = curBotRight.y * curObject.rate + targetBotRight.y * (1 - curObject.rate);

			transform.topLeft.x = tempTopLeftX;
			transform.topLeft.y = tempTopLeftY;

			transform.topRight.x = tempTopRightX;
			transform.topRight.y = tempTopRightY;

			transform.bottomLeft.x = tempBotLeftX;
			transform.bottomLeft.y = tempBotLeftY;

			transform.bottomRight.x = tempBotRightX;
			transform.bottomRight.y = tempBotRightY;

		}

		function onUpdate0GridHandler() {

			var tempTopLeftX = curTopLeft.x * curObject.rate0 + targetTopLeft.x * (1 - curObject.rate0);
			var tempTopLeftY = curTopLeft.y * curObject.rate0 + targetTopLeft.y * (1 - curObject.rate0);

			transform.topLeft.x = tempTopLeftX;
			transform.topLeft.y = tempTopLeftY;
		}

		function onUpdate1GridHandler() {

			var tempTopRightX = curTopRight.x * curObject.rate1 + targetTopRight.x * (1 - curObject.rate1);
			var tempTopRightY = curTopRight.y * curObject.rate1 + targetTopRight.y * (1 - curObject.rate1);


			transform.topRight.x = tempTopRightX;
			transform.topRight.y = tempTopRightY;

		}

		function onUpdate2GridHandler() {

			var tempBotLeftX = curBotLeft.x * curObject.rate2 + targetBotLeft.x * (1 - curObject.rate2);
			var tempBotLeftY = curBotLeft.y * curObject.rate2 + targetBotLeft.y * (1 - curObject.rate2);

			transform.bottomLeft.x = tempBotLeftX;
			transform.bottomLeft.y = tempBotLeftY;

		}

		function onUpdate3GridHandler() {

			var tempBotRightX = curBotRight.x * curObject.rate3 + targetBotRight.x * (1 - curObject.rate3);
			var tempBotRightY = curBotRight.y * curObject.rate3 + targetBotRight.y * (1 - curObject.rate3);

			transform.bottomRight.x = tempBotRightX;
			transform.bottomRight.y = tempBotRightY;

		}

		TweenLite.to(curObject, .4, { rate0: 0, onUpdate: onUpdate0GridHandler, ease: "Power2.easeOut" });
		TweenLite.to(curObject, .4, { rate1: 0, onUpdate: onUpdate1GridHandler, ease: "Power1.easeOut" });
		TweenLite.to(curObject, .4, { rate2: 0, onUpdate: onUpdate2GridHandler, ease: "Power4.easeOut" });
		TweenLite.to(curObject, .4, { rate3: 0, onUpdate: onUpdate3GridHandler, ease: "Power3.easeOut" });

		//console.log(transform)
		var cover = $(transform.element).find(".cover")[0]
		TweenLite.to(cover, .4, { opacity: 0, ease: "Power1.easeOut" });
	}
	function pileElement(transform, num, maxNumber) {
		var windowWidth = window.innerWidth;
		var windowHeight = window.innerHeight;

		// -----------------------------

		var camera = {
			focus: 400,
			self: {
				x: 0,
				y: 0,
				z: 0
			},
			rotate: {
				x: 0,
				y: 0,
				z: 0
			},
			up: {
				x: 0,
				y: 1,
				z: 0
			},
			zoom: 1,
			display: {
				x: width / 2,
				y: height / 2,
				z: 0
			}
		};

		// ================================

		var y = -10 * (num + 1) + window.innerHeight / 2 * .8;
		var width = 400;
		var height = 400 * 9 / 16;
		var topLeftPos = { x: -width / 2, z: -height };
		var topRightPos = { x: width / 2, z: -height };
		var botLeftPos = { x: -width / 2, z: 0 };
		var botRightPos = { x: width / 2, z: 0 };

		var topScale = ((camera.focus - camera.self.z) / ((camera.focus - camera.self.z) - topLeftPos.z)) * camera.zoom;
		var botScale = ((camera.focus - camera.self.z) / ((camera.focus - camera.self.z) - botLeftPos.z)) * camera.zoom; //console.log("topScale: " + topScale); //console.log("BotScale: " + botScale);

		var targetTopLeftX = topScale * topLeftPos.x;
		var targetTopLeftY = topScale * y;

		var targetTopRightX = topScale * topRightPos.x;
		var targetTopRightY = topScale * y;

		var targetBotLeftX = botScale * botLeftPos.x;
		var targetBotLeftY = botScale * y;

		var targetBotRightX = botScale * botRightPos.x;
		var targetBotRightY = botScale * y;

		var halfWidth = window.innerWidth / 2;
		var halfHeight = window.innerHeight / 2;

		// --------------------------------------

		transform.topLeft.x = targetTopLeftX + halfWidth;
		transform.topLeft.y = targetTopLeftY + halfHeight;


		transform.topRight.x = targetTopRightX + halfWidth;
		transform.topRight.y = targetTopRightY + halfHeight;

		transform.bottomLeft.x = targetBotLeftX + halfWidth;
		transform.bottomLeft.y = targetBotLeftY + halfHeight;

		transform.bottomRight.x = targetBotRightX + halfWidth;
		transform.bottomRight.y = targetBotRightY + halfHeight;


	};

	function createPile(transform, num) {
		var windowWidth = window.innerWidth;
		var windowHeight = window.innerHeight;

		// -----------------------------

		var camera = {
			focus: 400,
			self: {
				x: 0,
				y: 0,
				z: 0
			},
			rotate: {
				x: 0,
				y: 0,
				z: 0
			},
			up: {
				x: 0,
				y: 1,
				z: 0
			},
			zoom: 1,
			display: {
				x: width / 2,
				y: height / 2,
				z: 0
			}
		};

		// ================================
		var halfWidth = window.innerWidth / 2;
		var halfHeight = window.innerHeight / 2;

		var y = -10 * (num + 1) + window.innerHeight / 2 * .8;
		var width = 400;
		var height = 400 * 9 / 16;
		var topLeftPos = { x: -width / 2, z: -height };
		var topRightPos = { x: width / 2, z: -height };
		var botLeftPos = { x: -width / 2, z: 0 };
		var botRightPos = { x: width / 2, z: 0 };

		var topScale = ((camera.focus - camera.self.z) / ((camera.focus - camera.self.z) - topLeftPos.z)) * camera.zoom;
		var botScale = ((camera.focus - camera.self.z) / ((camera.focus - camera.self.z) - botLeftPos.z)) * camera.zoom; //console.log("topScale: " + topScale); //console.log("BotScale: " + botScale);

		var targetTopLeftX = topScale * topLeftPos.x + halfWidth;
		var targetTopLeftY = topScale * y + halfHeight;

		var targetTopRightX = topScale * topRightPos.x + halfWidth;
		var targetTopRightY = topScale * y + halfHeight;

		var targetBotLeftX = botScale * botLeftPos.x + halfWidth;
		var targetBotLeftY = botScale * y + halfHeight;

		var targetBotRightX = botScale * botRightPos.x + halfWidth;
		var targetBotRightY = botScale * y + halfHeight;

		var curTopLeft = { x: transform.topLeft.x, y: transform.topLeft.y };
		var curTopRight = { x: transform.topRight.x, y: transform.topRight.y };
		var curBotLeft = { x: transform.bottomLeft.x, y: transform.bottomLeft.y };
		var curBotRight = { x: transform.bottomRight.x, y: transform.bottomRight.y };

		var targetTopLeft = { x: targetTopLeftX, y: targetTopLeftY };
		var targetTopRight = { x: targetTopRightX, y: targetTopRightY };
		var targetBotLeft = { x: targetBotLeftX, y: targetBotLeftY };
		var targetBotRight = { x: targetBotRightX, y: targetBotRightY };

		var curObject = { rate0: 1, rate1: 1, rate2: 1, rate3: 1, rate4: 1 };


		function onUpdate0GridHandler() {

			var tempTopLeftX = curTopLeft.x * curObject.rate0 + targetTopLeft.x * (1 - curObject.rate0);
			var tempTopLeftY = curTopLeft.y * curObject.rate0 + targetTopLeft.y * (1 - curObject.rate0);

			transform.topLeft.x = tempTopLeftX;
			transform.topLeft.y = tempTopLeftY;
		}

		function onUpdate1GridHandler() {

			var tempTopRightX = curTopRight.x * curObject.rate1 + targetTopRight.x * (1 - curObject.rate1);
			var tempTopRightY = curTopRight.y * curObject.rate1 + targetTopRight.y * (1 - curObject.rate1);


			transform.topRight.x = tempTopRightX;
			transform.topRight.y = tempTopRightY;

		}

		function onUpdate2GridHandler() {

			var tempBotLeftX = curBotLeft.x * curObject.rate2 + targetBotLeft.x * (1 - curObject.rate2);
			var tempBotLeftY = curBotLeft.y * curObject.rate2 + targetBotLeft.y * (1 - curObject.rate2);

			transform.bottomLeft.x = tempBotLeftX;
			transform.bottomLeft.y = tempBotLeftY;

		}

		function onUpdate3GridHandler() {

			var tempBotRightX = curBotRight.x * curObject.rate3 + targetBotRight.x * (1 - curObject.rate3);
			var tempBotRightY = curBotRight.y * curObject.rate3 + targetBotRight.y * (1 - curObject.rate3);

			transform.bottomRight.x = tempBotRightX;
			transform.bottomRight.y = tempBotRightY;

		}


		TweenLite.to(curObject, .4, { rate0: 0, onUpdate: onUpdate0GridHandler, ease: "Power1.easeOut" });
		TweenLite.to(curObject, .4, { rate1: 0, onUpdate: onUpdate1GridHandler, ease: "Power1.easeOut" });
		TweenLite.to(curObject, .4, { rate2: 0, onUpdate: onUpdate2GridHandler, ease: "Power3.easeOut" });
		TweenLite.to(curObject, .4, { rate3: 0, onUpdate: onUpdate3GridHandler, ease: "Power3.easeOut" });


		var cover = $(transform.element).find(".cover")[0];
		TweenLite.to(cover, .4, { opacity: 1, ease: "Power1.easeIn" });


		// --------------------------------------

		/*
		transform.topLeft.x = targetTopLeftX + halfWidth;
		transform.topLeft.y = targetTopLeftY + halfHeight;


		transform.topRight.x = targetTopRightX + halfWidth;
		transform.topRight.y = targetTopRightY + halfHeight;

		transform.bottomLeft.x = targetBotLeftX + halfWidth;
		transform.bottomLeft.y = targetBotLeftY + halfHeight;

		transform.bottomRight.x = targetBotRightX + halfWidth;
		transform.bottomRight.y = targetBotRightY + halfHeight;*/


	};


	(function () {
		// create PerspectiveTransfrom
		var elem = document.getElementById("t-content00");
		var width = 400;
		var height = 225;
		var useBackFacing = true;
		var curCount;
		var $elem = $(".t-content");
		var isHorizon = false;
		var isAnimation = true;
		var isOpen = true;
		if (window.innerWidth > window.innerHeight) isHorizon = true;



		var transformArr = [];

		//console.log(typeof $elem);
		$elem.each(function (index) {
			var transform = new PerspectiveTransform(this, width, height, true);
			transformArr.push(transform);
		});

		curCount = transformArr.length - 1;

		//

		$elem.each(function (index) {
			var transform = transformArr[index]
			pileElement(transform, index);
		});

		function animation() {
			isAnimation = true;
			var transformCount = transformArr.length - curCount - 1;
			var xx, yy;

			if (isHorizon) {
				xx = transformCount % 4;
				yy = parseInt(transformCount / 4);
			} else {
				xx = transformCount % 3;
				yy = parseInt(transformCount / 3);
			}

			createGrid(transformArr[curCount], xx, yy, isHorizon);

			curCount--;
			if (curCount >= 0) {

				setTimeout(animation, 100);
			}
			else isAnimation = false;
		}


		function animation2() {
			isAnimation = true;

			createPile(transformArr[curCount], curCount)

			curCount++;
			if (curCount <= transformArr.length - 1) setTimeout(animation2, 50);
			else isAnimation = false;
		};




		function loop() {

			$elem.each(function (index) {
				transformArr[index].update();
			});

			requestAnimationFrame(loop);
		};

		loop();

		setTimeout(animation, 500);


		$("#toggle").click(function (ev) {
			if (!isAnimation) {

				if (isOpen) {
					curCount = 0;
					animation2();
				}
				else {
					curCount = transformArr.length - 1;
					animation();
				}

				isOpen = !isOpen;
			}
		});
	})();