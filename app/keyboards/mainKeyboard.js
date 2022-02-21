import { Keyboard } from "grammy"

const main = new Keyboard()
  .text("SUM-USD")
  .text("SUM-RUBL")
  .text("SUM-EURO")
  .row()
  .text("USD-SUM")
  .text("RUBL-SUM")
  .text("EURO-SUM")
export default main
