function isLowerCase(str) {
	return str === str.toLowerCase() && str !== str.toUpperCase();
}
function getBit(str) {
	return str.substring(0, str.indexOf("-"));
}
function shortBit(arr) {
	let listOne = [];
	// get  number of 1 in string, push to a list
	for (let i = 0; i < arr.length; i++) {
		let s = arr[i];
		let num1 = s.length - s.replaceAll("1", "").length;
		listOne.push(num1);
	}
	for (let i = 0; i < listOne.length; i++) {
		for (let j = 0; j < listOne.length - i - 1; j++) {
			if (listOne[j] > listOne[j + 1]) {
				// swap if greater is at the rear position
				let temp = listOne[j];
				listOne[j] = listOne[j + 1];
				listOne[j + 1] = temp;
				let temp2 = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp2;
			}
		}
	}
	// console.log(listOne, arr);
	return arr;
}
function check1under(arr) {
	console.log(arr);
	// ý tưởng: đưa bit trùng về dấu _, sau đó kiểm tra dấu _ sau khi kết thúc, nếu số lượng dấu gạch = 1 thì tức là có phần tử trùng => thêm vào mảng
	let indexOfDash = arr[0].indexOf("-");
	let check1underList = [];
	let check1underListBoole = Array.from({ length: arr.length }, (i) => (i = false));
	// lặp qua từng phần tử
	for (let i = 0; i < arr.length; i++) {
		// console.log("=== 1 ===");
		let count = 0;

		for (let j = i + 1; j < arr.length; j++) {
			// console.log("=== 2 ===");

			// console.log(j);
			let result = "";
			// loop through charter of string
			for (let k = 0; k < indexOfDash; k++) {
				if (arr[i][k] == arr[j][k]) {
					result = result + arr[i][k];
				} else {
					result = result + "_";
				}
			}
			// reformat
			result = result + arr[i].substring(indexOfDash, arr[i].length);
			// check == 1 and push, bang 1 la so phan tu bi thay doi, nếu nhiều hơn 1 -> lớn 1 phần tử khác
			console.log("hi");
			if ((result.length - result.replaceAll("_", "").length )==1) {
				
				check1underListBoole[i] = true;
				check1underListBoole[j] = true;
				check1underList.push(result);
				// count++;
			}
			// console.log(check1underListBoole);

			// console.log(check1underList);
		}
		// if (count == 0) {
		// 	check1underList.push(arr[i]);
		// }
	}
	console.log(check1underList);
	for(let i=0;i <check1underListBoole.length;i++){
		if(!check1underListBoole[i]){
			check1underList.push(arr[i])
		}
	}
	// console.log(check1underList);
	return check1underList;
}
function check2under(arr) {
	// console.log(arr);
	// ý tưởng giống check 1 nhưng thay _ bằng +
	let indexOfDash = arr[0].indexOf("-");
	let check2underList = [];
	let check2underListBoole = Array.from({ length: arr.length }, (i) => (i = false));
	// console.log(check2underListBoole);
	for (let i = 0; i < arr.length; i++) {
		let count = 0;
		for (let j = i + 1; j < arr.length; j++) {
			let result = "";
			// check nếu trùng thì dán +
			for (let k = 0; k < indexOfDash; k++) {
				if (arr[i][k] == arr[j][k]) {
					result = result + arr[j][k];
				} else {
					result = result + "+";
				}
			}
			// console.log(result);
			// kiểm tra số lương phần tử bị thay đôi
			// bien count kiem tra so lan phan tu bi doi, neu biến count không bị đổi tức phần tử độc lập và vẫn thêm vào kết quả cho bước tiếp
			result = result + arr[i].substring(indexOfDash, arr[i].length);
			// console.log(result);
			if (result.length - result.replaceAll("+", "").length == 1) {
				check2underListBoole[i] = true;
				check2underListBoole[j] = true;
				check2underList.push(result.replaceAll("+", "_"));
				// count++;
			}
		}
		// if (count == 0 && check2underListBoole[i] ) {
		// 	check2underList.push(arr[i]);
		// }
	}
	// console.log(check2underList);
	// console.log(check2underList);
	for(let i=0;i <check2underListBoole.length;i++){
		if(!check2underListBoole[i]){
			check2underList.push(arr[i])
		}
	}
	// console.log(check2underListBoole);
	// kiem tra phan tu trung va xoa
	for (let i = 0; i < check2underList.length; i++) {
		for (let j = 0; j < check2underList.length; j++) {
			if (i != j) {
				let s1 = check2underList[i].substring(0, indexOfDash);
				let s2 = check2underList[j].substring(0, indexOfDash);
				if (s1 == s2) {
					check2underList.splice(j, 1);
				}
				// console.log(check2underList);
			}
		}
	}

	return check2underList;
}
function generateCombinations(list) {
	const result = [];
	for (let i = 0; i < list.length; i++) {
		result.push([list[i]]);
		for (let j = i + 1; j < list.length; j++) {
			const combination = [...result[result.length - 1], list[j]];
			if (!result.some((item) => item.join() === combination.join())) {
				result.push(combination);
			}
		}
	}
	return result;
}
String.prototype.replaceAt = function (index, replacement) {
	return this.substring(0, index) + replacement + this.substring(index + replacement.length);
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
function hasSubstring(str1, str2) {
	const set1 = new Set(str1);
	const set2 = new Set(str1.concat(str2));
	return set1.size === set2.size;
}
function checkResult(listKq, listCheck, listEnd) {
	// console.log(listKq);

	// ý tưởng: tạo bảng true false của mỗi tổ hợp, sau đó kiểm tra kết quả của từng cột, nếu cột có 1 giá trị true thì cột đó vẫn thỏa mãn, tất cả các cột thỏa mãn thì chấp nhận
	listKq = getResult(listKq);
	// console.log(listKq);
	let length = listKq[0].length;
	// tạo bằng true false tại mỗi phần tử so sánh
	for (let i = 0; i < listKq.length; i++) {
		for (let j = 0; j < listCheck.length; j++) {
			// console.log(listKq[i], listCheck[j]);
			if (hasSubstring(listCheck[j], listKq[i])) {
				listEnd[i][j] = true;
			}
		}
	}
	// console.log(listEnd);
	// check kết quả nếu mỗi cột đều là true thì trả về chuỗi true
	let listFinal = [];
	for (let i = 0; i < listEnd[0].length; i++) {
		let checkCol = false;
		for (let j = 0; j < listEnd.length; j++) {
			if (listEnd[j][i] == true) {
				checkCol = true;
			}
		}
		listFinal.push(checkCol);
	}
	// console.log(listFinal);
	// kiểm tra chuỗi kết quả
	return listFinal.includes(false) ? false : true;
}

export { isLowerCase, shortBit, getBit, check1under, check2under, generateCombinations, checkResult };
// XYZT+XYZt+xyzt+XYzT+xYZT+XYzt+XyZt+Xyzt+xyzT+xyzt
// XYZT+XYZt+xyzt+XYzT+xYZT+XYzt+XyZt+xYzT+Xyzt+xyzT+xyzt
// xyzu+xYzu+Xyzu+xYZu+XYzu+xYZU+XYZU