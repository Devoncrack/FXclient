import { getVar } from "./gameInterface.js";
import { keybindFunctions } from "./keybinds.js";

const aiBot = new (function () {
  let isRunning = false;

  this.start = function () {
    isRunning = true;
    console.log("AI Bot started!");
    this.loop();
  };

  this.stop = function () {
    isRunning = false;
    console.log("AI Bot stopped.");
  };

  this.loop = async function () {
    while (isRunning) {
      try {
        this.makeDecision();
        await new Promise((resolve) => setTimeout(resolve, 500)); // 500ms delay
      } catch (e) {
        console.error("Error in AI loop:", e);
        this.stop();
      }
    }
  };

  this.makeDecision = function () {
    // Fetch game variables
    const playerId = getVar("playerId");
    const playerBalances = getVar("playerBalances");
    const playerTerritories = getVar("playerTerritories");

    // Example AI Logic: Attack if balance exceeds threshold
    if (playerBalances[playerId] > 1000) {
      console.log("Attacking...");
      keybindFunctions.setAbsolute(0.8); // Set 80% attack percentage
    } else {
      console.log("Expanding...");
      keybindFunctions.setAbsolute(0.5); // Set 50% for expansion
    }
  };
})();

export default aiBot;
