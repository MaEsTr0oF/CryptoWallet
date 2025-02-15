import { cryptoAssets,cryptoData } from "./data";

export function fetchCrypto() {
	return new Promise(resolve =>{
		setTimeout(() => {
			resolve(cryptoData)
		}, 1);
	})
}

export function fetchAssets() {
	return new Promise(resolve =>{
		setTimeout(() => {
			resolve(cryptoAssets)
		}, 1);
	})
}