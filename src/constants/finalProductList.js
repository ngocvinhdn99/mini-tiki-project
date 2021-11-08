import { eighthProductList, fifthProductList, firstProductList, fourthProductList, secondProductList, seventhProductList, sixthProductList, thirdProductList } from "./productList"

const finalProductList = []
finalProductList.push(...firstProductList, ...secondProductList, ...thirdProductList, ...fourthProductList, ...fifthProductList, ...sixthProductList, ...seventhProductList, ...eighthProductList)

export default finalProductList