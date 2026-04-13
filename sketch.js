// 定義海葵的顏色組合 (可自行替換喜歡的色碼)
let colors = ["#ef476f", "#ffd166", "#06d6a0", "#118ab2"];

function setup() {
  // 建立符合視窗大小的畫布
  createCanvas(windowWidth, windowHeight);
  noFill();
}

function draw() {
  background(20, 25, 30); // 深色背景讓海葵的色彩更突顯
  translate(0, height);   // 將座標原點移動到畫面左下角

  // 利用迴圈產生多個海葵的基準位置
  for (let j = 0; j < 30; j++) {
    let xx = map(j, 0, 30, 0, width);

    // 利用 foreach 產生連續幾種顏色的海葵，達到不同顏色互疊的效果
    colors.forEach((clr, index) => {
      let rid = j * 10 + index; // 給予不同的 noise 種子，讓擺動錯開
      
      // 利用 noise 讓高度與粗細有不規則但固定的變化
      let hh = map(noise(rid * 0.1), 0, 1, 100, 350) + index * 30;
      let sw = map(noise(rid * 0.2), 0, 1, 15, 35) - index * 5;

      // 呼叫海葵繪製函式，並稍微錯開 x 座標增加立體感
      anemone(xx + index * 10, rid, clr, hh, sw);
    });
  }
}

// 繪製單一海葵的函式
function anemone(xx, rid, clr, hh, sw) {
  beginShape();

  // 設定顏色與透明度，產生互疊效果
  let c = color(clr);
  c.setAlpha(150);
  stroke(c);
  strokeWeight(sw);

  // 利用迴圈畫出海葵的每個節點
  for (let i = 0; i < hh; i += 3) { // 每次增加 3 可以稍微提升效能
    // 讓底部的移動幅度較小 (0 到 50 間移動較慢)
    let deltaFactor = map(i, 0, 50, 0, 1, true);
    let deltaX = deltaFactor * (noise(i / 400, frameCount / 100, rid) - 0.5) * 200;

    // 加入滑鼠互動因子，讓滑鼠可以撥動海葵
    let mouseFactor = map(i, 0, 500, 0, 1) * log(hh) / 10;
    let mouseDelta = map(mouseX, 0, width, -200, 200);

    // 結合原本的擺動與滑鼠的偏移量
    curveVertex(xx + deltaX + mouseDelta * mouseFactor, -i * 2);
  }
  endShape();
}