import { isLowerCase, shortBit, getBit, check1under, check2under, generateCombinations, checkResult } from "./extend.js";
// import * as dfs from "https://cdn.jsdelivr.net/npm/danfojs@1.1.2/lib/bundle.min.js";
// import { DataFrame } from "danfojs/dist/danfojs-base/index.js";
// let df = new DataFrame()
// console.log(dfs);
Array.prototype.map2 = function (Callback) {
	var Output = [];
	// console.log(this)
	for (var i = 0; i < this.length; i++) {
		Output.push(Callback(this[i]));
	}

	return Output;
};
let input = document.querySelector(".user-input");
let tinh = document.querySelector(".tinh");
let buoc1 = document.querySelector(".buoc1");
let buoc2 = document.querySelector(".buoc2");
let buoc3 = document.querySelector(".buoc3");
let buoc4 = document.querySelector(".buoc4");
let buoc5 = document.querySelector(".buoc5");

tinh.onclick = function () {
	let debai = input.value;
	// console.log(debai);
	let listDebai = debai.split("+");
	listDebai = listDebai.reverse();
	listDebai = listDebai.map((x) => x.trim());
	// nối thêm 01
	listDebai = listDebai.map(function (x) {
		let result = "";
		let lengthX = x.length;
		for (let i = 0; i < lengthX; i++) {
			if (isLowerCase(x[i])) {
				result = result.concat("1");
			} else {
				result = result.concat("0");
			}
		}
		return result + "-" + x;
	});
	// console.log(listDebai);
	buoc1.innerHTML = listDebai
		.map((e) => {
			return "<li>" + e + "</li>";
		})
		.join("");
	let listGroupByNumerOf1 = shortBit(listDebai);
	buoc2.innerHTML = listGroupByNumerOf1
		.map((e) => {
			return "<li>" + e + "</li>";
		})
		.join("");
	let check1underList = check1under(listGroupByNumerOf1);
	buoc3.innerHTML = check1underList
		.map((e) => {
			return "<li>" + e + "</li>";
		})
		.join("");
	let check2underList = check2under(check1underList);
	buoc4.innerHTML = check2underList
		.map((e) => {
			return "<li>" + e + "</li>";
		})
		.join("");

	let listKq = generateCombinations(check2underList);
	console.log(listKq);
	// checkResult(listKq[1],listDebai,firstData)
	let listFinal = [];
	for (let i = 0; i < listKq.length; i++) {
		let firstData = [];
		for (let i = 0; i < check2underList.length; i++) {
			firstData.push(Array.from({ length: debai.split("+").length }, (i) => (i = false)));
		}
		if (checkResult(listKq[i], listDebai, firstData)) {
			listFinal.push(listKq[i]);
		}
	}
	listFinal = listFinal.map((i) => {
		return getResult(i);
	});
	console.log(listFinal);
	buoc5.innerHTML = listFinal
		.map2((kq) => {
			kq = kq.map((e) => {
				let indexOfDash = e.indexOf("-");
				return e.substring(indexOfDash + 1, e.length);
			});
			return `<li> ${kq.join("+")}<li>`;
		})
		.join("");
};
function getResult(listKq) {
	// rút gọn chuỗi ví dụ 0011 ABcv -> cd
	let list = [];
	for (let i = 0; i < listKq.length; i++) {
		let indexOfDash = listKq[i].indexOf("-");
		let start = listKq[i].substring(0, indexOfDash);
		let end = listKq[i].substring(indexOfDash + 1, listKq[i].length);
		// console.log(start,end);
		// lặp xuyên qua, thay vị trí có _ vế trái vào vị trí tương tự vế phải

		for (let j = 0; j < start.length; j++) {
			if (start[j] === "_") {
				end = end.replaceAt(j, "_");
			}
		}
		// xóa  _
		list.push(end.replaceAll("_", ""));
	}
	return list;
}
