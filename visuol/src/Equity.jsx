// Inspiration from https://triplebyte.com/startup-equity-value-calculator

export default function Equity (percentOwnership, exitValue, numOptions = 0, strike = 0,
  vestPercent = 1, numRounds = 0, dilution = 20) {
  return percentOwnership * exitValue * vestPercent * (1 / (1 + dilution / 100)) ** numRounds
    - numOptions * strike;
}
